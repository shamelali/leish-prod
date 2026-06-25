import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Booking, RegisterData } from '../types/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  cancelBooking: (bookingId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'leish_auth_user';

const sampleBookings: Booking[] = [
  {
    id: 'b1',
    artistId: 'aiko-nakamura',
    artistName: 'Aiko Nakamura',
    artistImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    service: 'Bridal Full Glam',
    date: '2026-07-15',
    time: '09:00',
    price: 450,
    status: 'confirmed',
    createdAt: '2026-06-20T10:00:00Z',
  },
  {
    id: 'b2',
    artistId: 'mei-lin',
    artistName: 'Mei Lin',
    artistImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    service: 'Event Glam',
    date: '2026-06-28',
    time: '14:00',
    price: 300,
    status: 'completed',
    createdAt: '2026-06-15T08:00:00Z',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      AsyncStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800));

    if (!email || !password) return { success: false, error: 'Please fill in all fields.' };
    if (password.length < 6) return { success: false, error: 'Invalid credentials.' };

    try {
      const stored = await AsyncStorage.getItem('leish_users');
      if (stored) {
        const users: Array<{ email: string; name: string; phone: string; password: string }> = JSON.parse(stored);
        const found = users.find((u) => u.email === email && u.password === password);
        if (found) {
          const existingStr = await AsyncStorage.getItem(STORAGE_KEY);
          const existingData = existingStr ? JSON.parse(existingStr) : {};
          setUser({
            id: email.replace(/[^a-z0-9]/g, '_'),
            name: found.name,
            email: found.email,
            phone: found.phone,
            createdAt: new Date().toISOString(),
            bookings: existingData?.bookings || sampleBookings,
          });
          return { success: true };
        }
        return { success: false, error: 'Invalid email or password.' };
      }
    } catch {}

    setUser({
      id: 'demo_user',
      name: 'Siti Nurhaliza',
      email,
      phone: '+60 12-345 6789',
      createdAt: '2025-06-15T00:00:00Z',
      bookings: sampleBookings,
    });
    return { success: true };
  };

  const register = async (data: RegisterData) => {
    await new Promise((r) => setTimeout(r, 1000));

    if (!data.name || !data.email || !data.phone || !data.password) {
      return { success: false, error: 'Please fill in all fields.' };
    }
    if (data.password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters.' };
    }
    if (data.password !== data.confirmPassword) {
      return { success: false, error: 'Passwords do not match.' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    try {
      const stored = await AsyncStorage.getItem('leish_users');
      const users: Array<{ email: string; name: string; phone: string; password: string }> = stored ? JSON.parse(stored) : [];
      if (users.find((u) => u.email === data.email)) {
        return { success: false, error: 'An account with this email already exists.' };
      }
      users.push({ email: data.email, name: data.name, phone: data.phone, password: data.password });
      await AsyncStorage.setItem('leish_users', JSON.stringify(users));
    } catch {}

    setUser({
      id: data.email.replace(/[^a-z0-9]/g, '_'),
      name: data.name,
      email: data.email,
      phone: data.phone,
      createdAt: new Date().toISOString(),
      bookings: [],
    });
    return { success: true };
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) setUser({ ...user, ...data });
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    if (user) {
      const newBooking: Booking = {
        ...booking,
        id: `b${Date.now()}`,
        status: 'confirmed',
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
          b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
        ),
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateProfile, addBooking, cancelBooking }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isLoading: true,
      login: async () => ({ success: false, error: 'Not available' }),
      register: async () => ({ success: false, error: 'Not available' }),
      logout: async () => {},
      updateProfile: () => {},
      addBooking: () => {},
      cancelBooking: () => {},
    };
  }
  return context;
};
