import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

export interface Notification {
  id: string;
  type:
    | "booking_confirmed"
    | "booking_cancelled"
    | "booking_reminder"
    | "review_request"
    | "new_artist"
    | "welcome";
  title: string;
  message: string;
  read: boolean;
  date: string;
  link?: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unread: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (notif: Omit<Notification, "id" | "read" | "date">) => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  // Mount: load from localStorage or seed defaults
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("leish-notifications");
      if (saved) {
        setNotifications(JSON.parse(saved));
      } else {
        setNotifications([
          {
            id: "notif-welcome",
            type: "welcome",
            title: "Welcome to Leish! 🎉",
            message:
              "Discover amazing makeup artists and book your first appointment.",
            read: false,
            date: new Date().toISOString(),
            link: "/artists",
          },
          {
            id: "notif-new",
            type: "new_artist",
            title: "New artist near you!",
            message:
              "Aiko Nakamura just joined Leish! Check out her stunning portfolio.",
            read: false,
            date: new Date(Date.now() - 86400000).toISOString(),
            link: "/artists/aiko-nakamura",
          },
          {
            id: "notif-tip",
            type: "review_request",
            title: "Leave a review 💬",
            message:
              "Help other clients by sharing your experience with artists you've booked.",
            read: true,
            date: new Date(Date.now() - 172800000).toISOString(),
          },
        ]);
      }
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(
          "leish-notifications",
          JSON.stringify(notifications),
        );
      } catch {}
    }
  }, [notifications, mounted]);

  const unread = notifications.filter((n) => !n.read).length;

  // Server sync helpers
  const fetchFromServer = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(
        `/api/user?action=notifications&userId=${user.id}`,
      );
      if (res.ok) {
        const data = await res.json();
        const mapped = (data.notifications || []).map((n: any) => ({
          id: n.id,
          type: n.type,
          title: n.title,
          message: n.body,
          read: !!n.readAt,
          date: n.date,
          link: n.data?.link,
        }));
        setNotifications(mapped);
      }
    } catch {}
  }, [user?.id]);

  const syncToServer = useCallback(
    async (
      action: "mark-read" | "mark-all-read" | "delete" | "clear-all",
      id?: string,
    ) => {
      if (!user?.id) return;
      try {
        await fetch(`/api/user?action=notifications&userId=${user.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, notificationId: id }),
        });
      } catch {}
    },
    [user?.id],
  );

  // When user logs in, fetch their server notifications
  useEffect(() => {
    if (mounted && user?.id) {
      fetchFromServer();
    }
  }, [mounted, user?.id, fetchFromServer]);

  // Actions
  const markRead = useCallback(
    (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
      syncToServer("mark-read", id);
    },
    [syncToServer],
  );

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    syncToServer("mark-all-read");
  }, [syncToServer]);

  const addNotification = useCallback(
    (notif: Omit<Notification, "id" | "read" | "date">) => {
      const newNotif: Notification = {
        ...notif,
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        read: false,
        date: new Date().toISOString(),
      };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    [],
  );

  const clearAll = useCallback(() => {
    setNotifications([]);
    syncToServer("clear-all");
  }, [syncToServer]);

  // SSR-safe: return defaults
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unread,
        markRead,
        markAllRead,
        addNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    // SSR-safe defaults
    return {
      notifications: [] as Notification[],
      unread: 0,
      markRead: (_id: string) => {},
      markAllRead: () => {},
      addNotification: (_n: Omit<Notification, "id" | "read" | "date">) => {},
      clearAll: () => {},
    };
  }
  return ctx;
}
