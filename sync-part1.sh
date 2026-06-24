#!/bin/bash
# Leish! Clone - Delta Sync Part 1: New files + core infrastructure
# Run: chmod +x part1.sh && ./part1.sh
set -e
TARGET="$HOME/Project/leish-clone/leish-clone"
mkdir -p "$TARGET/src/context" "$TARGET/src/components" "$TARGET/src/app/favorites" "$TARGET/src/app/profile"
echo "📁 Part 1: Syncing core infrastructure..."

cat <<'LEISHEOF' > "$TARGET/src/context/FavoritesContext.tsx"
"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (artistId: string) => boolean;
  toggleFavorite: (artistId: string) => void;
  addFavorite: (artistId: string) => void;
  removeFavorite: (artistId: string) => void;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = "leish_favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites, mounted]);

  const isFavorite = useCallback(
    (artistId: string) => favorites.includes(artistId),
    [favorites]
  );

  const toggleFavorite = useCallback((artistId: string) => {
    setFavorites((prev) =>
      prev.includes(artistId)
        ? prev.filter((id) => id !== artistId)
        : [...prev, artistId]
    );
  }, []);

  const addFavorite = useCallback((artistId: string) => {
    setFavorites((prev) =>
      prev.includes(artistId) ? prev : [...prev, artistId]
    );
  }, []);

  const removeFavorite = useCallback((artistId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== artistId));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        count: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    return {
      favorites: [] as string[],
      isFavorite: (_id: string) => false,
      toggleFavorite: (_id: string) => {},
      addFavorite: (_id: string) => {},
      removeFavorite: (_id: string) => {},
      count: 0,
    };
  }
  return ctx;
}
LEISHEOF
echo "  ✓ src/context/FavoritesContext.tsx"

cat <<'LEISHEOF' > "$TARGET/src/components/Skeleton.tsx"
"use client";

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800">
      <div className="aspect-[4/5] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-4 skeleton w-3/4" />
        <div className="h-3 skeleton w-1/2" />
        <div className="flex gap-2">
          <div className="h-6 w-16 skeleton rounded-full" />
          <div className="h-6 w-16 skeleton rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 w-20 skeleton" />
          <div className="h-4 w-12 skeleton" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 p-5">
      <div className="flex gap-4">
        <div className="w-24 h-24 skeleton rounded-xl shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-4 skeleton w-1/3" />
          <div className="h-3 skeleton w-1/4" />
          <div className="h-3 skeleton w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonArtistDetail() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      {/* Hero skeleton */}
      <div className="h-96 skeleton" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-32 skeleton rounded-2xl" />
            <div className="h-64 skeleton rounded-2xl" />
            <div className="h-48 skeleton rounded-2xl" />
          </div>
          <div className="space-y-6">
            <div className="h-96 skeleton rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
LEISHEOF
echo "  ✓ src/components/Skeleton.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/layout.tsx"
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Leish! | Your Beauty, Perfected",
    template: "%s | Leish!",
  },
  description:
    "Book Beauty. Anywhere. Discover makeup artists and studios, view real-time availability, and secure your booking in minutes.",
  keywords: [
    "makeup artist",
    "beauty booking",
    "Malaysia",
    "makeup studio",
    "Hari Raya",
    "hijab makeup",
    "bridal makeup",
    "event makeup",
  ],
  authors: [{ name: "Leish!" }],
  openGraph: {
    type: "website",
    locale: "en_MY",
    siteName: "Leish!",
    title: "Leish! | Your Beauty, Perfected",
    description:
      "Book Beauty. Anywhere. Discover makeup artists and studios across Malaysia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leish! | Your Beauty, Perfected",
    description:
      "Book Beauty. Anywhere. Discover makeup artists and studios across Malaysia.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-white dark:bg-neutral-950`}>
        <AuthProvider>
          <ThemeProvider>
            <FavoritesProvider>
              <ToastProvider>
                {children}
                <BackToTop />
              </ToastProvider>
            </FavoritesProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
LEISHEOF
echo "  ✓ src/app/layout.tsx"

cat <<'LEISHEOF' > "$TARGET/src/components/Navbar.tsx"
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Heart, Search, User, LogOut, Calendar, Sun, Moon, HeartOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const { count: favCount } = useFavorites();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { if (open) setProfileOpen(false); }, [open]);

  const navBg = scrolled
    ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-2xl shadow-sm border-b border-rose-100/50 dark:border-neutral-800/50"
    : "bg-transparent border-b border-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Leish!
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all">
              Home
            </Link>
            <Link href="/artists" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all">
              Artists
            </Link>
            <Link href="/studios" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all">
              Studios
            </Link>
            <Link href="/artists?category=event" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all">
              Events
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/artists" className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all" aria-label="Search">
              <Search className="w-5 h-5" />
            </Link>

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-rose-500 bg-gray-100 dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full transition-all border border-gray-200 dark:border-neutral-700"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              <span className="hidden lg:inline">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>

            {/* Favorites */}
            <Link href="/favorites" className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all relative" aria-label="Favorites">
              <Heart className="w-5 h-5" />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favCount > 9 ? "9+" : favCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 py-2 z-50 animate-scale-in">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-neutral-800">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link href="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link href="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                        <Calendar className="w-4 h-4" /> My Bookings
                      </Link>
                      <Link href="/favorites" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                        <Heart className="w-4 h-4" /> Favorites
                        {favCount > 0 && (
                          <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-full">{favCount}</span>
                        )}
                      </Link>
                      <div className="border-t border-gray-100 dark:border-neutral-800 mt-1 pt-1">
                        <button onClick={() => { logout(); setProfileOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-full text-left">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all">
                  Log In
                </Link>
                <Link href="/register" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 hover:scale-105 active:scale-100">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-1">
            <button onClick={toggle} className="p-2 text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full transition-all" aria-label="Toggle dark mode">
              {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>
            <Link href="/favorites" className="p-2 text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all relative">
              <Heart className="w-5 h-5" />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favCount > 9 ? "9+" : favCount}
                </span>
              )}
            </Link>
            <button onClick={() => setOpen(!open)} className="p-2 text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-b border-rose-100 dark:border-neutral-800 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors">Home</Link>
            <Link href="/artists" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors">Browse Artists</Link>
            <Link href="/studios" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors">Studios</Link>
            <Link href="/favorites" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors">
              <Heart className="w-4 h-4" /> Favorites
              {favCount > 0 && <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-full">{favCount}</span>}
            </Link>

            <div className="pt-3 border-t border-gray-100 dark:border-neutral-800 mt-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">{user.name.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl"><User className="w-4 h-4" /> My Profile</Link>
                  <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl"><Calendar className="w-4 h-4" /> My Bookings</Link>
                  <button onClick={() => { logout(); setOpen(false); }} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl w-full text-left"><LogOut className="w-4 h-4" /> Sign Out</button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link href="/login" onClick={() => setOpen(false)} className="block text-center px-5 py-3 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-neutral-700 hover:border-rose-200">Log In</Link>
                  <Link href="/register" onClick={() => setOpen(false)} className="block text-center px-5 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">Sign Up Free</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
LEISHEOF
echo "  ✓ src/components/Navbar.tsx"

cat <<'LEISHEOF' > "$TARGET/src/components/ArtistCard.tsx"
"use client";

import Link from "next/link";
import { Star, MapPin, ArrowRight, BadgeCheck, Clock, Heart } from "lucide-react";
import { artists } from "@/data/artists";
import ImageWithFallback from "./ImageWithFallback";
import { useFavorites } from "@/context/FavoritesContext";

export default function ArtistCard({ artist }: { artist: (typeof artists)[0] }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(artist.id);

  return (
    <div className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-rose-900/10 transition-all duration-300 relative">
      <Link href={`/artists/${artist.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <ImageWithFallback
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-gray-900 dark:text-white">{artist.rating}</span>
            <span className="text-[10px] text-gray-400">({artist.reviewCount})</span>
          </div>
          {artist.verified && (
            <div className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full">
              <BadgeCheck className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] font-semibold text-white">Verified</span>
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white">{artist.name}</h3>
            <div className="flex items-center gap-3 text-white/70 text-sm mt-1">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{artist.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{artist.responseTime}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Favorite button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(artist.id);
        }}
        className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
          liked
            ? "bg-rose-500 text-white shadow-rose-200 dark:shadow-rose-900/40"
            : "bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-gray-500 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100"
        } ${artist.verified ? "top-14" : ""}`}
        aria-label={liked ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`w-4 h-4 ${liked ? "fill-white" : ""}`} />
      </button>

      <Link href={`/artists/${artist.id}`} className="block">
        <div className="p-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {artist.categories.slice(0, 3).map((cat) => (
              <span key={cat} className="px-2.5 py-0.5 text-[11px] font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full capitalize">{cat.replace(/-/g, " ")}</span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400">From </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">MYR {artist.price}</span>
              <span className="text-xs text-gray-400">/hr</span>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
              View <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
LEISHEOF
echo "  ✓ src/components/ArtistCard.tsx"

cat <<'LEISHEOF' > "$TARGET/src/components/FeaturedArtists.tsx"
"use client";

import Link from "next/link";
import { Star, MapPin, ArrowRight, BadgeCheck, Clock, Heart } from "lucide-react";
import { artists } from "@/data/artists";
import ImageWithFallback from "./ImageWithFallback";
import { useFavorites } from "@/context/FavoritesContext";

export default function FeaturedArtists() {
  const featured = artists.slice(0, 3);
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <section className="py-24 bg-gradient-to-b from-white via-rose-50/20 to-white dark:from-neutral-950 dark:via-rose-950/5 dark:to-neutral-950" id="featured">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-rose-500 uppercase tracking-wider mb-2">Curated For You</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Featured Artists</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Hand-selected artists known for exceptional craft and outstanding client experiences.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((artist, i) => {
            const liked = isFavorite(artist.id);
            return (
              <div key={artist.id} className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-rose-900/10 transition-all duration-300 relative" style={{ animationDelay: `${i * 100}ms` }}>
                <Link href={`/artists/${artist.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <ImageWithFallback
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{artist.rating}</span>
                      <span className="text-[10px] text-gray-400">({artist.reviewCount})</span>
                    </div>
                    {artist.verified && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full">
                        <BadgeCheck className="w-3.5 h-3.5 text-white" />
                        <span className="text-[10px] font-semibold text-white">Verified</span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{artist.name}</h3>
                      <div className="flex items-center gap-3 text-white/70 text-sm mt-1">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{artist.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{artist.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Favorite button */}
                <button
                  onClick={() => toggleFavorite(artist.id)}
                  className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                    liked
                      ? "bg-rose-500 text-white shadow-rose-200 dark:shadow-rose-900/40"
                      : "bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-gray-500 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100"
                  } ${artist.verified ? "top-14" : ""}`}
                  aria-label={liked ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`w-4 h-4 ${liked ? "fill-white" : ""}`} />
                </button>

                <Link href={`/artists/${artist.id}`}>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {artist.categories.slice(0, 3).map((cat) => (
                        <span key={cat} className="px-2.5 py-0.5 text-[11px] font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full capitalize">{cat.replace(/-/g, " ")}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400">From </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">MYR {artist.price}</span>
                        <span className="text-xs text-gray-400">/hr</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
                        View <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/artists" className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-100">
            See All Artists <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
LEISHEOF
echo "  ✓ src/components/FeaturedArtists.tsx"

echo "✅ Part 1 complete! Now run part2.sh"
