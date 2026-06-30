import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authClient } from "../lib/auth-client";

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
  loginWithOtp: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>;
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

const PROFILE_KEY = "leish_user_profile";

function loadProfile(): Partial<User> | null {
  try {
    const stored = localStorage.getItem(PROFILE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveProfile(profile: Partial<User>) {
  const slim = {
    phone: profile.phone,
    role: profile.role,
    location: profile.location,
    area: profile.area,
    specialties: profile.specialties,
    languages: profile.languages,
    portfolio: profile.portfolio,
    createdAt: profile.createdAt,
    bookings: profile.bookings,
  };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(slim));
}

function buildUser(session: { user?: { id: string; name?: string; email?: string; image?: string | null } | null }, profile: Partial<User> | null): User | null {
  if (!session?.user) return null;
  const p = profile || {};
  return {
    id: session.user.id || p.id || '',
    name: session.user.name || p.name || '',
    email: session.user.email || p.email || '',
    phone: p.phone || '',
    avatar: session.user.image || p.avatar,
    role: p.role || 'client',
    location: p.location || '',
    area: p.area || '',
    specialties: p.specialties || [],
    languages: p.languages || [],
    portfolio: p.portfolio || [],
    createdAt: p.createdAt || new Date().toISOString(),
    bookings: p.bookings || [],
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const profile = loadProfile();
    return profile ? buildUser({ user: { id: profile.id || '', name: profile.name, email: profile.email } }, profile) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    authClient.getSession().then((res: { data?: { user?: { id: string; name?: string; email?: string; image?: string | null } | null } | null }) => {
      if (cancelled) return;
      if (res?.data?.user) {
        const profile = loadProfile();
        setUser(buildUser(res.data, profile));
      } else {
        setUser(null);
      }
      setLoading(false);
    }).catch(() => {
      if (!cancelled) {
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (user) {
      saveProfile(user);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    const { error } = await authClient.signIn.email({ email, password });
    if (error) return { success: false, error: error.message || "Invalid email or password." };

    const session = await authClient.getSession();
    const profile = loadProfile();
    if (session?.data?.user) {
      setUser(buildUser(session.data, profile));
    }
    return { success: true };
  };

  const loginWithOtp = async (email: string) => {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });
    if (error) return { success: false, error: error.message || "Failed to send OTP." };
    return { success: true };
  };

  const verifyOtp = async (email: string, otp: string) => {
    const { error } = await authClient.signIn.emailOtp({ email, otp });
    if (error) return { success: false, error: error.message || "Invalid OTP." };
    return { success: true };
  };

  const register = async (data: RegisterData) => {
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (error) return { success: false, error: error.message || "Registration failed." };

    const session = await authClient.getSession();
    const neonUserId = session?.data?.user?.id;

    const profile: Partial<User> = {
      id: neonUserId || data.email.replace(/[^a-z0-9]/g, "_"),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      location: data.location,
      area: data.area,
      specialties: data.specialties,
      languages: data.languages,
      portfolio: data.portfolio,
      createdAt: new Date().toISOString(),
      bookings: [],
    };
    saveProfile(profile);

    if (neonUserId) {
      try {
        await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: neonUserId, name: data.name, email: data.email, role: data.role }),
        });
      } catch (err) {
        console.error('Profile sync failed:', err);
      }
    }

    setUser(buildUser({ user: { id: profile.id || '', name: profile.name, email: profile.email } }, profile));

    (async () => {
      try {
        await fetch('/api/user?action=send-welcome-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, name: data.name, role: data.role }),
        });
      } catch (err) {
        console.error('Welcome email failed:', err);
      }
    })();

    return { success: true };
  };

  const logout = () => {
    authClient.signOut();
    setUser(null);
    localStorage.removeItem(PROFILE_KEY);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      saveProfile(updated);
    }
  };

  const addBooking = (booking: Omit<Booking, "id" | "createdAt" | "status">) => {
    if (user) {
      const newBooking: Booking = {
        ...booking,
        id: `b${Date.now()}`,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
      const updated = { ...user, bookings: [newBooking, ...user.bookings] };
      setUser(updated);
      saveProfile(updated);
    }
  };

  const cancelBooking = (bookingId: string) => {
    if (user) {
      const updated = {
        ...user,
        bookings: user.bookings.map((b) =>
          b.id === bookingId ? { ...b, status: "cancelled" as const } : b
        ),
      };
      setUser(updated);
      saveProfile(updated);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithOtp, verifyOtp, register, logout, updateProfile, addBooking, cancelBooking }}>
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
      loginWithOtp: async () => ({ success: false, error: "Not available" }),
      verifyOtp: async () => ({ success: false, error: "Not available" }),
      register: async () => ({ success: false, error: "Not available" }),
      logout: () => {},
      updateProfile: () => {},
      addBooking: () => {},
      cancelBooking: async () => {},
    };
  }
  return ctx;
}
