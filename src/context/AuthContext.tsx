import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'client' | 'artist' | 'studio';
  location: string;
  area: string;
  specialties: string[];
  languages: string[];
  portfolio: string[];
  createdAt: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  artistId: string;
  artistName: string;
  artistImage: string;
  service: string;
  date: string;
  time: string;
  price: number;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => void;
  cancelBooking: (bookingId: string) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'client' | 'artist' | 'studio';
  location: string;
  area: string;
  specialties: string[];
  languages: string[];
  portfolio: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "leish_auth_user";

const sampleBookings: Booking[] = [
  {
    id: "b1",
    artistId: "aiko-nakamura",
    artistName: "Aiko Nakamura",
    artistImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    service: "Bridal Full Glam",
    date: "2026-07-15",
    time: "09:00",
    price: 450,
    status: "confirmed",
    createdAt: "2026-06-20T10:00:00Z",
  },
  {
    id: "b2",
    artistId: "mei-lin",
    artistName: "Mei Lin",
    artistImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    service: "Event Glam",
    date: "2026-06-28",
    time: "14:00",
    price: 300,
    status: "completed",
    createdAt: "2026-06-15T08:00:00Z",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800));

    if (!email || !password) return { success: false, error: "Please fill in all fields." };
    if (password.length < 6) return { success: false, error: "Invalid credentials." };

    // Check if user already exists in localStorage
    try {
      const stored = localStorage.getItem("leish_users");
      if (stored) {
        const users: Array<RegisterData> = JSON.parse(stored);
        const found = users.find((u) => u.email === email && u.password === password);
        if (found) {
          const existingUser = localStorage.getItem(STORAGE_KEY);
          const existingData = existingUser ? JSON.parse(existingUser) : {};
          setUser({
            id: email.replace(/[^a-z0-9]/g, "_"),
            name: found.name,
            email: found.email,
            phone: found.phone,
            avatar: found.portfolio?.[0] || undefined,
            role: found.role || 'client',
            location: found.location || '',
            area: found.area || '',
            specialties: found.specialties || [],
            languages: found.languages || [],
            portfolio: found.portfolio || [],
            createdAt: new Date().toISOString(),
            bookings: existingData?.bookings || sampleBookings,
          });
          return { success: true };
        }
        return { success: false, error: "Invalid email or password." };
      }
    } catch {}

    // Default demo login
    setUser({
      id: "demo_user",
      name: "Siti Nurhaliza",
      email,
      phone: "+60 12-345 6789",
      avatar: undefined,
      role: 'client',
      location: 'Kuala Lumpur',
      area: 'Bukit Bintang',
      specialties: [],
      languages: ['English', 'Malay (Bahasa Melayu)'],
      portfolio: [],
      createdAt: "2025-06-15T00:00:00Z",
      bookings: sampleBookings,
    });
    return { success: true };
  };

  const register = async (data: RegisterData) => {
    await new Promise((r) => setTimeout(r, 1000));

    if (!data.name || !data.email || !data.phone || !data.password) {
      return { success: false, error: "Please fill in all fields." };
    }
    if (data.password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters." };
    }
    if (data.password !== data.confirmPassword) {
      return { success: false, error: "Passwords do not match." };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    // Save to users list
    try {
      const stored = localStorage.getItem("leish_users");
      const users: Array<RegisterData> = stored ? JSON.parse(stored) : [];
      if (users.find((u) => u.email === data.email)) {
        return { success: false, error: "An account with this email already exists." };
      }
      users.push(data);
      localStorage.setItem("leish_users", JSON.stringify(users));
    } catch {}

    // Simulate email sending based on role
    try {
      const emailSubject = data.role === 'artist'
        ? 'Welcome to Leish! Artist Community'
        : data.role === 'studio'
        ? 'Your Studio Registration on Leish!'
        : 'Welcome to Leish!';

      const emailBody = data.role === 'artist'
        ? `Hi ${data.name},\n\nThank you for joining Leish! as an artist. Your profile is now live in ${data.location}, ${data.area}. Start receiving bookings!\n\nLeish! Team`
        : data.role === 'studio'
        ? `Hi ${data.name},\n\nThank you for registering your studio on Leish!. Your studio listing in ${data.location}, ${data.area} is being reviewed.\n\nLeish! Team`
        : `Hi ${data.name},\n\nWelcome to Leish! Start booking Malaysia's finest makeup artists today.\n\nLeish! Team`;

      console.log(`[EMAIL] To: ${data.email} | Subject: ${emailSubject} | Body: ${emailBody}`);
      localStorage.setItem(`leish_email_${data.email}`, JSON.stringify({ subject: emailSubject, body: emailBody, sentAt: new Date().toISOString() }));
    } catch {}

    setUser({
      id: data.email.replace(/[^a-z0-9]/g, "_"),
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: data.portfolio[0] || undefined,
      role: data.role,
      location: data.location,
      area: data.area,
      specialties: data.specialties,
      languages: data.languages,
      portfolio: data.portfolio,
      createdAt: new Date().toISOString(),
      bookings: [],
    });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) setUser({ ...user, ...data });
  };

  const addBooking = (booking: Omit<Booking, "id" | "createdAt" | "status">) => {
    if (user) {
      const newBooking: Booking = {
        ...booking,
        id: `b${Date.now()}`,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
      setUser({ ...user, bookings: [newBooking, ...user.bookings] });
    }
  };

  const cancelBooking = (bookingId: string) => {
    if (user) {
      setUser({
        ...user,
        bookings: user.bookings.map((b) =>
          b.id === bookingId ? { ...b, status: "cancelled" as const } : b
        ),
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, addBooking, cancelBooking }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: null,
      loading: true,
      login: async () => ({ success: false, error: "Not available" }),
      register: async () => ({ success: false, error: "Not available" }),
      logout: () => {},
      updateProfile: () => {},
      addBooking: () => {},
      cancelBooking: () => {},
    };
  }
  return ctx;
}
