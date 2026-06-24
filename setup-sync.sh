#!/bin/bash
# Leish! Clone - File Sync Script
# Run this from: ~/Project/leish-clone/leish-clone/
# Usage: bash setup-sync.sh

set -e
echo "🔧 Creating missing directories..."
mkdir -p src/context
mkdir -p src/app/login
mkdir -p src/app/forgot-password
mkdir -p src/app/profile
mkdir -p src/app/register/artist/success
mkdir -p src/app/register/studio/success
mkdir -p src/app/favorites
mkdir -p src/app/studios
mkdir -p src/app/loading

echo "📝 Creating ThemeContext.tsx..."
cat > src/context/ThemeContext.tsx << 'EOF'
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("leish_theme") as Theme;
      if (stored === "dark" || stored === "light") {
        setThemeState(stored);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setThemeState("dark");
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("leish_theme", theme); } catch {}
  }, [theme, mounted]);

  const toggle = () => setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  const setTheme = (t: Theme) => setThemeState(t);

  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { theme: "light" as Theme, toggle: () => {}, setTheme: (_t: Theme) => {} };
  return ctx;
}
EOF

echo "📝 Updating layout.tsx with ThemeProvider..."
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Leish! | Your Beauty, Perfected", template: "%s | Leish!" },
  description: "Book Beauty. Anywhere. Discover makeup artists and studios across Malaysia.",
  keywords: ["makeup artist", "beauty booking", "Malaysia", "makeup studio", "Hari Raya", "hijab makeup"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-white`}>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
EOF

echo "📝 Updating Navbar.tsx with dark mode toggle..."
cat > src/components/Navbar.tsx << 'EOF'
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Heart, Search, User, LogOut, Calendar, Sun, Moon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();

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
    <nav className={"fixed top-0 left-0 right-0 z-50 transition-all duration-300 " + navBg}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Leish!</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all">Home</Link>
            <Link href="/artists" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all">Artists</Link>
            <Link href="/studios" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all">Studios</Link>
            <Link href="/artists?category=event" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all">Events</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/artists" className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all" aria-label="Search">
              <Search className="w-5 h-5" />
            </Link>
            <button onClick={toggle} className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all border border-gray-200 dark:border-neutral-700 hover:border-rose-200 dark:hover:border-rose-800" aria-label="Toggle dark mode">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {user && (
              <Link href="/profile" className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all" aria-label="Favorites">
                <Heart className="w-5 h-5" />
              </Link>
            )}
            {user ? (
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all">
                  <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">{user.name.charAt(0)}</div>
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
                      <Link href="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"><User className="w-4 h-4" /> My Profile</Link>
                      <Link href="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"><Calendar className="w-4 h-4" /> My Bookings</Link>
                      <div className="border-t border-gray-100 dark:border-neutral-800 mt-1 pt-1">
                        <button onClick={() => { logout(); setProfileOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-full text-left"><LogOut className="w-4 h-4" /> Sign Out</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all">Log In</Link>
                <Link href="/register" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 hover:scale-105 active:scale-100">Sign Up</Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-1">
            <button onClick={toggle} className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 border border-gray-200 dark:border-neutral-700" aria-label="Toggle dark mode">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setOpen(!open)} className="p-2 text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-b border-rose-100 dark:border-neutral-800 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors">Home</Link>
            <Link href="/artists" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors">Browse Artists</Link>
            <Link href="/studios" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-colors">Studios</Link>
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
                  <button onClick={() => { logout(); setOpen(false); }} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl w-full text-left"><LogOut className="w-4 h-4" /> Sign Out</button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link href="/login" onClick={() => setOpen(false)} className="block text-center px-5 py-3 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-neutral-700">Log In</Link>
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
EOF

echo "📝 Updating globals.css with dark mode styles..."
cat > src/app/globals.css << 'EOF'
@import "tailwindcss";

@theme {
  --color-rose-50: #fff1f2;
  --color-rose-100: #ffe4e6;
  --color-rose-200: #fecdd3;
  --color-rose-300: #fda4af;
  --color-rose-400: #fb7185;
  --color-rose-500: #f43f5e;
  --color-rose-600: #e11d48;
  --color-rose-700: #be123c;
  --color-rose-800: #9f1239;
  --color-rose-900: #881337;
  --color-rose-950: #4c0519;
  --color-pink-50: #fdf2f8;
  --color-pink-100: #fce7f3;
  --color-pink-500: #ec4899;
  --color-pink-600: #db2777;
  --color-gold-400: #d4a843;
  --color-gold-500: #c9952c;
  --color-gold-600: #b8860b;
  --color-amber-400: #fbbf24;
  --color-amber-500: #f59e0b;
  --color-green-50: #f0fdf4;
  --color-green-500: #22c55e;
  --color-green-600: #16a34a;
  --font-sans: var(--font-inter);
  --font-serif: var(--font-playfair);
}

html { scroll-behavior: smooth; }
html.dark { color-scheme: dark; }
html.dark body { background-color: #0a0a0a; color: #e5e5e5; }
html.dark *:not(input):not(textarea):not(img):not(video):not(iframe):not(svg):not(canvas) {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.15s ease;
}
body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #fef2f2; }
::-webkit-scrollbar-thumb { background: #fda4af; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #fb7185; }
html.dark ::-webkit-scrollbar-track { background: #1a1a1a; }
html.dark ::-webkit-scrollbar-thumb { background: #9f1239; }
html.dark ::-webkit-scrollbar-thumb:hover { background: #be123c; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes pulse-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }

.animate-fade-in-up { animation: fadeInUp 0.6s ease-out both; }
.animate-fade-in { animation: fadeIn 0.5s ease-out both; }
.animate-scale-in { animation: scaleIn 0.4s ease-out both; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }

.glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.3); }
html.dark .glass { background: rgba(23, 23, 23, 0.8); border: 1px solid rgba(255, 255, 255, 0.06); }
.gradient-text { background: linear-gradient(135deg, #e11d48, #db2777, #f43f5e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
html.dark .gradient-text { background: linear-gradient(135deg, #fb7185, #f472b6, #f43f5e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
::selection { background-color: #fda4af; color: #881337; }
html.dark ::selection { background-color: #9f1239; color: #fda4af; }
EOF

echo "📝 Updating page.tsx with dark mode..."
cat > src/app/page.tsx << 'EOF'
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedArtists from "@/components/FeaturedArtists";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <FeaturedArtists />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
EOF

echo ""
echo "✅ Core dark mode files synced!"
echo ""
echo "Now run: npm run dev"
