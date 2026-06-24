#!/bin/bash
# ============================================================
# Leish! Clone - Full Dark Mode Sync Script
# Run on your local machine to sync ALL project files.
# Usage: chmod +x setup-sync-dark.sh && ./setup-sync-dark.sh
# ============================================================

set -e
TARGET="$HOME/Project/leish-clone/leish-clone"

echo "🎨 Syncing ALL Leish! Clone files with dark mode..."

# Create directory structure
mkdir -p "$TARGET/src/app/artists/[id]"
mkdir -p "$TARGET/src/app/favorites"
mkdir -p "$TARGET/src/app/forgot-password"
mkdir -p "$TARGET/src/app/login"
mkdir -p "$TARGET/src/app/profile"
mkdir -p "$TARGET/src/app/register/artist/success"
mkdir -p "$TARGET/src/app/register/studio/success"
mkdir -p "$TARGET/src/app/studios/[id]"
mkdir -p "$TARGET/src/components"
mkdir -p "$TARGET/src/context"
mkdir -p "$TARGET/src/data"
mkdir -p "$TARGET/public"
echo "📁 Directory structure created"

# === Source Files ===
cat <<'LEISHEOF' > "$TARGET/src/app/globals.css"
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;

  /* Rose accent overrides */
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

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
}

@theme inline {
  --font-sans: var(--font-inter);
  --font-serif: var(--font-playfair);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* ===== Custom Styles ===== */

html {
  scroll-behavior: smooth;
}

html.dark {
  color-scheme: dark;
}

html.dark body {
  background-color: #0a0a0a;
  color: #e5e5e5;
}

/* Smooth theme transition */
html.dark *:not(input):not(textarea):not(img):not(video):not(iframe):not(svg):not(canvas) {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.15s ease;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #fef2f2; }
::-webkit-scrollbar-thumb { background: #fda4af; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #fb7185; }
html.dark ::-webkit-scrollbar-track { background: #1a1a1a; }
html.dark ::-webkit-scrollbar-thumb { background: #9f1239; }
html.dark ::-webkit-scrollbar-thumb:hover { background: #be123c; }

/* Keyframes */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-24px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-fade-in-up { animation: fadeInUp 0.6s ease-out both; }
.animate-fade-in { animation: fadeIn 0.5s ease-out both; }
.animate-slide-in-left { animation: slideInLeft 0.5s ease-out both; }
.animate-scale-in { animation: scaleIn 0.4s ease-out both; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
.delay-600 { animation-delay: 600ms; }

/* Glass morphism */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
html.dark .glass {
  background: rgba(23, 23, 23, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #e11d48, #db2777, #f43f5e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
html.dark .gradient-text {
  background: linear-gradient(135deg, #fb7185, #f472b6, #f43f5e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Line clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Selection */
::selection {
  background-color: #fda4af;
  color: #881337;
}
html.dark ::selection {
  background-color: #9f1239;
  color: #fda4af;
}

/* Skeleton */
.skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0.5rem;
}
html.dark .skeleton {
  background: linear-gradient(90deg, #262626 25%, #333 50%, #262626 75%);
  background-size: 200% 100%;
}

LEISHEOF
echo "  ✓ src/app/globals.css"

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

cat <<'LEISHEOF' > "$TARGET/src/app/loading.tsx"
export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="relative w-16 h-16 mx-auto mb-5">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 opacity-20 animate-pulse-soft" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-rose-500 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}

LEISHEOF
echo "  ✓ src/app/loading.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/page.tsx"
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

LEISHEOF
echo "  ✓ src/app/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/not-found.tsx"
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-sm font-semibold rounded-full mb-6">
          404 — Page Not Found
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          Oops, beauty took a <span className="gradient-text">detour</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to discovering amazing artists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-neutral-700 hover:border-rose-200 dark:hover:border-rose-700 hover:text-rose-600 dark:hover:text-rose-400 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Artists
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/not-found.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/artists/page.tsx"
import { Suspense } from "react";
import ArtistsPageClient from "./ArtistsPageClient";

export default function ArtistsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading artists...</p>
        </div>
      </main>
    }>
      <ArtistsPageClient />
    </Suspense>
  );
}

LEISHEOF
echo "  ✓ src/app/artists/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/artists/ArtistsPageClient.tsx"
"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtistCard from "@/components/ArtistCard";
import ImageWithFallback from "@/components/ImageWithFallback";
import { artists, categories } from "@/data/artists";
import { Search, SlidersHorizontal, X, LayoutGrid, List, Heart } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

export default function ArtistsPageClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const setCategory = (cat: string) => { setSelectedCategory(cat); setPage(1); };
  const [sortBy, setSortBy] = useState<"rating" | "price-low" | "price-high">("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const { isFavorite, toggleFavorite } = useFavorites();

  const filtered = useMemo(() => {
    let result = artists.filter((a) => {
      const matchesSearch =
        search === "" ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.location.toLowerCase().includes(search.toLowerCase()) ||
        a.categories.some((c) => c.includes(search.toLowerCase()));
      const matchesCategory =
        selectedCategory === "all" || a.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [search, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const activeCategoryName = selectedCategory !== "all"
    ? categories.find((c) => c.id === selectedCategory)?.name
    : null;

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            {activeCategoryName || "Browse Makeup Artists"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            {selectedCategory !== "all"
              ? categories.find((c) => c.id === selectedCategory)?.description
              : "Discover professional makeup artists across Malaysia. Browse portfolios, compare prices, and book your next appointment."}
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-40 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-b border-gray-100 dark:border-neutral-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
            <button
              onClick={() => setCategory("all")}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                selectedCategory === "all"
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
                  : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400"
              }`}
            >
              All Artists
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Search + controls */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search artists, locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                showFilters
                  ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400"
                  : "bg-gray-50 dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:border-rose-200 dark:hover:border-rose-800"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Sort</span>
            </button>

            <div className="hidden sm:flex items-center border border-gray-200 dark:border-neutral-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sort options */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-neutral-800 animate-fade-in">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400 dark:text-gray-500">Sort by:</span>
                {[
                  { key: "rating" as const, label: "Top Rated" },
                  { key: "price-low" as const, label: "Price: Low to High" },
                  { key: "price-high" as const, label: "Price: High to Low" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSortBy(opt.key)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      sortBy === opt.key
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                        : "bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} artist{filtered.length !== 1 ? "s" : ""} found
            {activeCategoryName && (
              <span> in <span className="font-medium text-rose-600 dark:text-rose-400">{activeCategoryName}</span></span>
            )}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-rose-300 dark:text-rose-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No artists found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearch(""); setCategory("all"); }}
              className="px-6 py-2.5 bg-rose-500 text-white text-sm font-medium rounded-xl hover:bg-rose-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paged.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {paged.map((artist) => {
              const liked = isFavorite(artist.id);
              return (
                <Link
                  key={artist.id}
                  href={`/artists/${artist.id}`}
                  className="flex items-center gap-5 p-4 bg-white dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-md transition-all group relative"
                >
                  <ImageWithFallback src={artist.image} alt={artist.name} className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{artist.name}</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{artist.location}, {artist.area}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {artist.categories.slice(0, 3).map((cat) => (
                        <span key={cat} className="px-2 py-0.5 text-[10px] font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full capitalize">
                          {cat.replace(/-/g, " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900 dark:text-white">MYR {artist.price}<span className="text-xs font-normal text-gray-400 dark:text-gray-500">/hr</span></p>
                    <div className="flex items-center gap-0.5 justify-end mt-1">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{artist.rating}</span>
                      <span className="text-amber-400 text-xs">★</span>
                    </div>
                  </div>
                  {/* Quick favorite in list view */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(artist.id);
                    }}
                    className={`absolute top-3 right-3 p-1.5 rounded-full transition-all ${
                      liked
                        ? "text-rose-500"
                        : "text-gray-300 dark:text-neutral-600 hover:text-rose-400 opacity-0 group-hover:opacity-100"
                    }`}
                    aria-label={liked ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={`w-4 h-4 ${liked ? "fill-rose-500" : ""}`} />
                  </button>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Previous</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (<button key={p} onClick={() => setPage(p)} className={`w-10 h-10 text-sm font-medium rounded-xl transition-all ${p === page ? "bg-rose-500 text-white shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30" : "text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30"}`}>{p}</button>))}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Next</button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/artists/ArtistsPageClient.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/artists/[id]/page.tsx"
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import { artists, categories } from "@/data/artists";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useFavorites } from "@/context/FavoritesContext";
import {
  Star,
  MapPin,
  ArrowLeft,
  Clock,
  Check,
  Calendar,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  BadgeCheck,
  Heart,
  Share2,
  Globe2,
  Zap,
  X,
  Users,
  Eye,
  LogIn,
  User,
  ThumbsUp,
} from "lucide-react";

export default function ArtistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const artist = artists.find((a) => a.id === params.id);

  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const { user, addBooking } = useAuth();
  const toast = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!artist) {
    return (
      <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-rose-300 dark:text-rose-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Artist Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">The artist you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/artists" className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Browse Artists
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const liked = isFavorite(artist.id);
  const relatedArtists = artists.filter((a) => a.id !== artist.id && a.categories.some((c) => artist.categories.includes(c))).slice(0, 3);

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00",
  ];

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      date: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("en-MY", { weekday: "short" }),
      num: d.getDate(),
      month: d.toLocaleDateString("en-MY", { month: "short" }),
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    };
  });

  // Rating breakdown
  const ratingCounts = [0, 0, 0, 0, 0];
  artist.reviews.forEach((r) => { ratingCounts[r.rating - 1]++; });
  const maxRatingCount = Math.max(...ratingCounts, 1);

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />

      {/* Back button */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-neutral-800">
              <div className="relative h-64 sm:h-80 lg:h-96">
                <ImageWithFallback
                  src={artist.portfolio[0]}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => {
                      toggleFavorite(artist.id);
                      toast.success(liked ? "Removed from favorites" : "Added to favorites ❤️");
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      liked ? "bg-rose-500 text-white" : "bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? "fill-white" : ""}`} />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      toast.success("Link copied to clipboard!");
                    }}
                    className="w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors shadow-lg"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end gap-5">
                  <ImageWithFallback
                    src={artist.image}
                    alt={artist.name}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-neutral-800 shadow-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">{artist.name}</h1>
                      {artist.verified && (
                        <BadgeCheck className="w-6 h-6 text-blue-400 fill-blue-400 shrink-0" />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-white/70 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-white">{artist.rating}</span>
                        <span>({artist.reviewCount} reviews)</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {artist.location}, {artist.area}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-gray-100 dark:border-neutral-800">
                <div className="p-4 flex items-center gap-3 border-r border-gray-50 dark:border-neutral-800">
                  <div className="w-10 h-10 bg-rose-50 dark:bg-rose-950/50 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Experience</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{artist.experience}+ years</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3 border-r border-gray-50 dark:border-neutral-800">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-950/50 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Response</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{artist.responseTime}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3 border-r border-gray-50 dark:border-neutral-800">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center">
                    <Globe2 className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Languages</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{artist.languages.join(", ")}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 dark:bg-amber-950/50 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Bookings</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{artist.reviewCount * 3}+</p>
                  </div>
                </div>
              </div>

              {/* Bio + Tags */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {artist.categories.map((cat) => {
                    const found = categories.find((c) => c.id === cat);
                    return (
                      <Link
                        key={cat}
                        href={`/artists?category=${cat}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full capitalize hover:bg-rose-100 dark:hover:bg-rose-950/70 transition-colors"
                      >
                        {found?.icon} {cat.replace(/-/g, " ")}
                      </Link>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{artist.bio}</p>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Portfolio</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {artist.portfolio.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setPortfolioIndex(i); setShowLightbox(true); }}
                    className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${artist.name} portfolio ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-gray-900 dark:text-white">{artist.rating}</span>
                  <span className="text-sm text-gray-400">({artist.reviewCount})</span>
                </div>
              </div>

              {/* Rating breakdown */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2 mb-1 last:mb-0">
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-3">{star}</span>
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${(ratingCounts[star - 1] / maxRatingCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-6 text-right">{ratingCounts[star - 1]}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                {artist.reviews.map((review, i) => (
                  <div key={i} className="pb-5 border-b border-gray-50 dark:border-neutral-800 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-rose-200 to-pink-200 dark:from-rose-800 dark:to-pink-800 rounded-full flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-rose-600 dark:text-rose-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{review.author}</span>
                          <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString("en-MY", { month: "short", day: "numeric", year: "numeric" })}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, si) => (
                            <Star key={si} className={`w-3 h-3 ${si < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 dark:text-neutral-700"}`} />
                          ))}
                          {review.service && (
                            <span className="ml-2 text-xs text-gray-400 bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">{review.service}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Artists */}
            {relatedArtists.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Similar Artists</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relatedArtists.map((ra) => (
                    <Link key={ra.id} href={`/artists/${ra.id}`} className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-md transition-all">
                      <div className="relative aspect-square overflow-hidden">
                        <ImageWithFallback src={ra.image} alt={ra.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <p className="text-sm font-bold text-white">{ra.name}</p>
                          <div className="flex items-center gap-1 text-white/70 text-xs">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {ra.rating}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column — Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Book This Artist</h2>
                    <div className="flex items-center gap-1 text-amber-400">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{artist.reviewCount} reviews</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">From <span className="font-bold text-gray-900 dark:text-white">MYR {artist.price}</span>/hr</p>
                </div>

                {/* Services */}
                <div className="p-6 border-b border-gray-100 dark:border-neutral-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">1. Choose a Service</h3>
                  <div className="space-y-2">
                    {artist.services.map((svc, i) => (
                      <button
                        key={svc.id}
                        onClick={() => { setSelectedService(i); setSelectedDate(""); setSelectedTime(""); }}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                          selectedService === i
                            ? "border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/30 ring-1 ring-rose-200 dark:ring-rose-800"
                            : "border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 hover:bg-rose-50/30 dark:hover:bg-rose-950/10"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{svc.name}</span>
                              {svc.popular && (
                                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 rounded uppercase">Popular</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{svc.duration} · {svc.description}</p>
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white shrink-0">MYR {svc.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time */}
                {selectedService !== null && (
                  <div className="p-6 border-b border-gray-100 dark:border-neutral-800 animate-fade-in">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">2. Pick a Date</h3>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                      {next7Days.map((d) => (
                        <button
                          key={d.date}
                          onClick={() => { setSelectedDate(d.date); setSelectedTime(""); }}
                          className={`flex flex-col items-center min-w-[60px] py-2.5 px-3 rounded-xl border text-xs transition-all shrink-0 ${
                            selectedDate === d.date
                              ? "border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-800"
                              : "border-gray-100 dark:border-neutral-800 text-gray-600 dark:text-gray-400 hover:border-rose-200 dark:hover:border-rose-800"
                          }`}
                        >
                          <span className="font-medium">{d.day}</span>
                          <span className="text-lg font-bold">{d.num}</span>
                          <span>{d.month}</span>
                        </button>
                      ))}
                    </div>

                    {selectedDate && (
                      <div className="mt-4 animate-fade-in">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">3. Select Time</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((t) => {
                            const isPast = selectedDate === new Date().toISOString().split("T")[0] && parseInt(t) <= new Date().getHours();
                            return (
                              <button
                                key={t}
                                onClick={() => setSelectedTime(t)}
                                disabled={isPast}
                                className={`py-2.5 text-xs font-medium rounded-lg border transition-all ${
                                  selectedTime === t
                                    ? "border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-800"
                                    : isPast
                                    ? "border-gray-100 dark:border-neutral-800 text-gray-300 dark:text-neutral-700 cursor-not-allowed line-through"
                                    : "border-gray-100 dark:border-neutral-800 text-gray-600 dark:text-gray-400 hover:border-rose-200 dark:hover:border-rose-800"
                                }`}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Summary & Confirm */}
                {selectedService !== null && selectedDate && selectedTime && (
                  <div className="p-6 animate-fade-in">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">4. Confirm Booking</h3>
                    <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl mb-4 text-sm">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500 dark:text-gray-400">Service</span>
                        <span className="font-medium text-gray-900 dark:text-white">{artist.services[selectedService].name}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500 dark:text-gray-400">Date</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {new Date(selectedDate).toLocaleDateString("en-MY", { weekday: "short", month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500 dark:text-gray-400">Time</span>
                        <span className="font-medium text-gray-900 dark:text-white">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500 dark:text-gray-400">Duration</span>
                        <span className="font-medium text-gray-900 dark:text-white">{artist.services[selectedService].duration}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-3 border-t border-rose-200 dark:border-rose-800/50 mt-2">
                        <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                        <span className="font-bold text-rose-600 dark:text-rose-400 text-lg">MYR {artist.services[selectedService].price}</span>
                      </div>
                    </div>

                    {user ? (
                      <button
                        onClick={() => {
                          if (selectedService !== null) {
                            addBooking({
                              artistId: artist.id,
                              artistName: artist.name,
                              artistImage: artist.image,
                              service: artist.services[selectedService].name,
                              date: selectedDate,
                              time: selectedTime,
                              price: artist.services[selectedService].price,
                            });
                          }
                          toast.success("Booking confirmed! 🎉");
                          setShowBooking(true);
                        }}
                        className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 hover:shadow-rose-300/50 hover:scale-[1.02] active:scale-100"
                      >
                        Confirm Booking
                      </button>
                    ) : (
                      <Link
                        href="/login"
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 hover:shadow-rose-300/50"
                      >
                        <LogIn className="w-4 h-4" /> Sign In to Book
                      </Link>
                    )}

                    <a
                      href="https://wa.me/601137633788"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 font-semibold rounded-xl hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors border border-green-200 dark:border-green-800 mt-3"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp
                    </a>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 dark:text-gray-500 mt-3">
                      <Shield className="w-3 h-3" />
                      Secure booking &bull; Free cancellation up to 24h before
                    </div>
                  </div>
                )}

                {selectedService === null && (
                  <p className="px-6 pb-6 text-xs text-gray-400 dark:text-gray-500 text-center py-3">Select a service to see available dates</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center animate-fade-in">
          <button onClick={() => setShowLightbox(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() => setPortfolioIndex((portfolioIndex - 1 + artist.portfolio.length) % artist.portfolio.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="max-w-5xl max-h-[85vh] mx-4">
            <ImageWithFallback
              src={artist.portfolio[portfolioIndex]}
              alt={`Portfolio ${portfolioIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
          <button
            onClick={() => setPortfolioIndex((portfolioIndex + 1) % artist.portfolio.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {portfolioIndex + 1} / {artist.portfolio.length}
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-5">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                Your appointment with <strong className="text-gray-700 dark:text-gray-200">{artist.name}</strong> has been booked for{" "}
                <strong className="text-gray-700 dark:text-gray-200">{new Date(selectedDate).toLocaleDateString("en-MY", { weekday: "long", month: "long", day: "numeric" })}</strong> at{" "}
                <strong className="text-gray-700 dark:text-gray-200">{selectedTime}</strong>.
              </p>

              <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl mb-6 text-left text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Service</span>
                  <span className="font-medium text-gray-900 dark:text-white">{artist.services[selectedService!].name}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Duration</span>
                  <span className="font-medium text-gray-900 dark:text-white">{artist.services[selectedService!].duration}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-neutral-700 mt-2">
                  <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">MYR {artist.services[selectedService!].price}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/profile"
                  onClick={() => {
                    setShowBooking(false);
                    setSelectedService(null);
                    setSelectedDate("");
                    setSelectedTime("");
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all block text-center"
                >
                  View My Bookings
                </Link>
                <button
                  onClick={() => {
                    setShowBooking(false);
                    setSelectedService(null);
                    setSelectedDate("");
                    setSelectedTime("");
                  }}
                  className="w-full py-3 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/601137633788"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-green-200/50 dark:shadow-green-900/30 hover:scale-110 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <Footer />
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/artists/[id]/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/favorites/page.tsx"
"use client";

import Link from "next/link";
import { Heart, ArrowRight, Star, MapPin, Clock, BadgeCheck, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import { artists } from "@/data/artists";
import { useFavorites } from "@/context/FavoritesContext";
import { useToast } from "@/context/ToastContext";

export default function FavoritesPage() {
  const { favorites, removeFavorite, count } = useFavorites();
  const toast = useToast();

  const favoriteArtists = artists.filter((a) => favorites.includes(a.id));

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />

      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white">
              My Favorites
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            {count === 0
              ? "You haven't saved any artists yet."
              : `You have ${count} saved artist${count > 1 ? "s" : ""}.`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favoriteArtists.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-16 text-center border border-gray-100 dark:border-neutral-800 shadow-sm">
            <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-rose-300 dark:text-rose-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No favorites yet</h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 max-w-md mx-auto">
              Tap the heart icon on any artist to save them here for easy access later.
            </p>
            <Link
              href="/artists"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
            >
              Browse Artists
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click the trash icon to remove an artist from your favorites.
              </p>
              <Link
                href="/artists"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
              >
                Browse More
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-rose-900/10 transition-all duration-300 relative"
                >
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

                  {/* Remove button */}
                  <button
                    onClick={() => {
                      removeFavorite(artist.id);
                      toast.info(`Removed ${artist.name} from favorites`);
                    }}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md bg-rose-500 text-white shadow-rose-200 dark:shadow-rose-900/40 hover:bg-rose-600"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
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
                          Book <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/favorites/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/forgot-password/page.tsx"
"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">
              {sent ? "Check Your Email" : "Reset Password"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {sent
                ? `We've sent a password reset link to ${email}`
                : "Enter your email and we'll send you a reset link"}
            </p>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-neutral-800 animate-fade-in-up delay-100">
            {sent ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  We&apos;ve sent instructions to reset your password to <strong className="text-gray-700 dark:text-gray-200">{email}</strong>. Please check your inbox and spam folder.
                </p>
                <button
                  onClick={() => { setSent(false); setEmail(""); }}
                  className="w-full py-3.5 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all mb-3"
                >
                  Didn&apos;t receive it? Try again
                </button>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Send Reset Link <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Back to login */}
          {!sent && (
            <p className="text-center mt-6 animate-fade-in delay-200">
              <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/forgot-password/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/login/page.tsx"
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    router.push("/profile");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      toast.success("Welcome back! 👋");
      router.push("/profile");
    } else {
      setError(result.error || "Login failed.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Sign in to manage your bookings and favorites</p>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-neutral-800 animate-fade-in-up delay-100">
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl text-sm text-red-600 dark:text-red-400 animate-scale-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  <Link href="/forgot-password" className="text-xs text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 hover:shadow-rose-300/50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100 dark:border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white dark:bg-neutral-900 text-gray-400">or continue with</span>
              </div>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600 transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                GitHub
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 animate-fade-in delay-200">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-semibold">
              Sign up free
            </Link>
          </p>

          {/* Other signups */}
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <Link href="/register/artist" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">Artist Sign Up</Link>
            <span className="text-gray-300 dark:text-neutral-700">|</span>
            <Link href="/register/studio" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">Studio Sign Up</Link>
          </div>

          {/* Demo hint */}
          <div className="mt-4 p-3 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl border border-rose-100/50 dark:border-rose-900/50 text-center animate-fade-in delay-300">
            <p className="text-xs text-rose-600 dark:text-rose-400">
              💡 <strong>Demo:</strong> Enter any email &amp; password (6+ chars) to sign in
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/login/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/profile/page.tsx"
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Star,
  MapPin,
  Clock,
  Edit3,
  Save,
  X,
  ChevronRight,
  Heart,
  Settings,
  Shield,
  LogOut,
  Check,
  XCircle,
  Trash2,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateProfile, cancelBooking } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<"bookings" | "profile">("bookings");
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [mounted, user, router]);

  if (!mounted || !user) {
    return null;
  }

  const startEdit = () => {
    setEditForm({ name: user.name, email: user.email, phone: user.phone });
    setEditing(true);
    setSaved(false);
  };

  const cancelEdit = () => {
    setEditing(false);
    setSaved(false);
  };

  const saveEdit = () => {
    updateProfile(editForm);
    setEditing(false);
    setSaved(true);
    toast.success("Profile updated successfully!");
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancelBooking = (bookingId: string) => {
    cancelBooking(bookingId);
    toast.info("Booking cancelled");
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-semibold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full">
            <Check className="w-3 h-3" /> Confirmed
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-semibold bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 rounded-full">
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-semibold bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const inputCls = "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all";

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden mb-8 animate-fade-in-up">
          <div className="h-32 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-neutral-900 shadow-xl">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0 pt-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <p className="text-sm text-gray-400 dark:text-gray-500">{user.email}</p>
              </div>
              {saved && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium rounded-xl border border-green-200 dark:border-green-800 animate-scale-in">
                  <Check className="w-4 h-4" /> Profile updated!
                </div>
              )}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.bookings.filter((b) => b.status === "confirmed").length}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Upcoming</p>
              </div>
              <div className="text-center p-3 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.bookings.filter((b) => b.status === "completed").length}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Completed</p>
              </div>
              <div className="text-center p-3 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.bookings.length}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Total Bookings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
              <nav className="divide-y divide-gray-50 dark:divide-neutral-800">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-medium transition-colors ${
                    activeTab === "bookings" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  <Calendar className="w-4 h-4" /> My Bookings
                  {user.bookings.filter((b) => b.status === "confirmed").length > 0 && (
                    <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-full">
                      {user.bookings.filter((b) => b.status === "confirmed").length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-medium transition-colors ${
                    activeTab === "profile" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400" : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  <User className="w-4 h-4" /> Edit Profile
                </button>
                <Link
                  href="/favorites"
                  className="flex items-center gap-3 px-5 py-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Heart className="w-4 h-4" /> Favorites
                </Link>
                <button className="w-full flex items-center gap-3 px-5 py-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button className="w-full flex items-center gap-3 px-5 py-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                  <Shield className="w-4 h-4" /> Privacy & Security
                </button>
                <button
                  onClick={() => { toast.info("Signed out. See you soon! 👋"); logout(); router.push("/"); }}
                  className="w-full flex items-center gap-3 px-5 py-4 text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "bookings" && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Bookings</h2>
                  <Link
                    href="/artists"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
                  >
                    New Booking
                  </Link>
                </div>

                {user.bookings.length === 0 ? (
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl p-12 text-center border border-gray-100 dark:border-neutral-800 shadow-sm">
                    <Calendar className="w-12 h-12 text-gray-200 dark:text-neutral-700 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No bookings yet</h3>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">Start by browsing our talented artists and book your first appointment.</p>
                    <Link
                      href="/artists"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
                    >
                      Browse Artists <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all overflow-hidden"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-24 h-24 sm:h-auto shrink-0">
                            <ImageWithFallback
                              src={booking.artistImage}
                              alt={booking.artistName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-5">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                              <div>
                                <Link
                                  href={`/artists/${booking.artistId}`}
                                  className="font-semibold text-gray-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                                >
                                  {booking.artistName}
                                </Link>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{booking.service}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {statusBadge(booking.status)}
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 dark:text-gray-500 mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(booking.date).toLocaleDateString("en-MY", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {booking.time}
                              </span>
                              <span className="font-semibold text-gray-700 dark:text-gray-300">MYR {booking.price}</span>
                            </div>

                            {/* Cancel button for confirmed bookings */}
                            {booking.status === "confirmed" && (
                              <div className="mt-3 pt-3 border-t border-gray-50 dark:border-neutral-800">
                                <button
                                  onClick={() => handleCancelBooking(booking.id)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" /> Cancel Booking
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                  {!editing ? (
                    <button
                      onClick={startEdit}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" /> Edit
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={cancelEdit}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-neutral-800 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                      <button
                        onClick={saveEdit}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl shadow-sm hover:from-rose-600 hover:to-pink-700 transition-all"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6">
                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                      {editing ? (
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className={inputCls}
                          />
                        </div>
                      ) : (
                        <p className="py-3 text-sm text-gray-900 dark:text-white">{user.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                      {editing ? (
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className={inputCls}
                          />
                        </div>
                      ) : (
                        <p className="py-3 text-sm text-gray-900 dark:text-white">{user.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                      {editing ? (
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className={inputCls}
                          />
                        </div>
                      ) : (
                        <p className="py-3 text-sm text-gray-900 dark:text-white">{user.phone}</p>
                      )}
                    </div>

                    {/* Member since */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Member Since</label>
                      <p className="py-3 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString("en-MY", { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="mt-8 bg-white dark:bg-neutral-900 rounded-2xl border border-red-100 dark:border-red-900/50 shadow-sm p-6">
                  <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button className="px-5 py-2.5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors border border-red-200 dark:border-red-800">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/profile/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/register/page.tsx"
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, Check, Camera, Building2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  const router = useRouter();
  const { register, user } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (user) {
    router.push("/profile");
    return null;
  }

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-emerald-400", "bg-green-500"][passwordStrength];

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }
    setLoading(true);
    const result = await register(form);
    setLoading(false);
    if (result.success) {
      toast.success("Account created! Welcome to Leish! 🎉");
      router.push("/profile");
    } else {
      setError(result.error || "Registration failed.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">Create Your Account</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Join Leish! and discover Malaysia&apos;s finest beauty artists</p>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-neutral-800 animate-fade-in-up delay-100">
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl text-sm text-red-600 dark:text-red-400 animate-scale-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Siti Nurhaliza"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+60 12-345 6789"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength indicator */}
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1.5 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            passwordStrength >= level ? strengthColor : "bg-gray-200 dark:bg-neutral-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${
                      passwordStrength <= 1 ? "text-red-400" :
                      passwordStrength === 2 ? "text-amber-400" :
                      passwordStrength === 3 ? "text-emerald-500" :
                      "text-green-600"
                    }`}>
                      {strengthLabel}
                    </p>
                  </div>
                )}
                <div className="mt-2 space-y-1">
                  <p className={`text-[11px] flex items-center gap-1.5 ${form.password.length >= 8 ? "text-green-500" : "text-gray-300 dark:text-neutral-600"}`}>
                    <Check className="w-3 h-3" /> At least 8 characters
                  </p>
                  <p className={`text-[11px] flex items-center gap-1.5 ${/[A-Z]/.test(form.password) ? "text-green-500" : "text-gray-300 dark:text-neutral-600"}`}>
                    <Check className="w-3 h-3" /> One uppercase letter
                  </p>
                  <p className={`text-[11px] flex items-center gap-1.5 ${/[0-9]/.test(form.password) ? "text-green-500" : "text-gray-300 dark:text-neutral-600"}`}>
                    <Check className="w-3 h-3" /> One number
                  </p>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                      form.confirmPassword && form.confirmPassword !== form.password
                        ? "border-red-300 dark:border-red-800"
                        : form.confirmPassword && form.confirmPassword === form.password
                          ? "border-green-300 dark:border-green-800"
                          : "border-gray-200 dark:border-neutral-700"
                    }`}
                    required
                  />
                  {form.confirmPassword && form.confirmPassword === form.password && (
                    <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                    agreed
                      ? "bg-rose-500 border-rose-500"
                      : "border-gray-300 dark:border-neutral-600 group-hover:border-rose-300 dark:group-hover:border-rose-700"
                  }`}>
                    {agreed && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-rose-600 dark:text-rose-400 hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-rose-600 dark:text-rose-400 hover:underline">Privacy Policy</a>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !agreed}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100 dark:border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white dark:bg-neutral-900 text-gray-400">or sign up with</span>
              </div>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600 transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                GitHub
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 animate-fade-in delay-200">
            Already have an account?{" "}
            <Link href="/login" className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-semibold">
              Sign in
            </Link>
          </p>

          {/* Artist & Studio links */}
          <div className="mt-4 flex items-center justify-center gap-4 text-sm animate-fade-in delay-300">
            <Link href="/register/artist" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" /> Artist Sign Up
            </Link>
            <span className="text-gray-300 dark:text-neutral-700">|</span>
            <Link href="/register/studio" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Studio Sign Up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/register/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/register/artist/page.tsx"
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, Camera, Upload, Star, MapPin, Clock, Check, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/artists";

export default function RegisterArtistPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    area: "",
    experience: "",
    categories: [] as string[],
    languages: "",
    bio: "",
    portfolio: [] as string[],
    services: [{ name: "", duration: "", price: "", description: "" }],
    responseTime: "Under 1 hour",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const toggleCategory = (catId: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(catId)
        ? prev.categories.filter((c) => c !== catId)
        : [...prev.categories, catId],
    }));
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const updated = [...form.services];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, services: updated }));
  };

  const addService = () => {
    setForm((prev) => ({
      ...prev,
      services: [...prev.services, { name: "", duration: "", price: "", description: "" }],
    }));
  };

  const removeService = (index: number) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("You must agree to the Terms of Service.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push("/register/artist/success");
  };

  const canProceedStep1 = form.name && form.email && form.phone && form.password && form.confirmPassword;
  const canProceedStep2 = form.location && form.area && form.experience && form.categories.length > 0;
  const canProceedStep3 = form.bio.length >= 50;

  const inputCls = "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500";

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
              <Camera className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">Join as an Artist</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Share your talent with clients across Malaysia</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-up delay-100">
            {[
              { num: 1, label: "Account" },
              { num: 2, label: "Profile" },
              { num: 3, label: "Portfolio" },
              { num: 4, label: "Review" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => { if (s.num < step) setStep(s.num); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    step === s.num
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
                      : step > s.num
                        ? "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400"
                        : "bg-gray-100 dark:bg-neutral-800 text-gray-400 dark:text-gray-500"
                  }`}
                >
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-white/20">
                    {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < 3 && <ChevronRight className="w-4 h-4 text-gray-300 dark:text-neutral-600 mx-1" />}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-neutral-800 animate-fade-in-up delay-200">
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Account */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Create Your Account</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Start with your basic account information</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Display Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Your professional name" className={inputCls} required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="you@example.com" className={inputCls} required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+60 12-345 6789" className={inputCls} required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="Min 8 characters" className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="password" value={form.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} placeholder="Re-enter password" className={inputCls} required />
                    </div>
                  </div>

                  <button type="button" onClick={() => canProceedStep1 ? setStep(2) : setError("Please fill in all fields.")} className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 flex items-center justify-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Profile */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Your Profile</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Tell clients about yourself and your expertise</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">State / Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" value={form.location} onChange={(e) => handleChange("location", e.target.value)} placeholder="Selangor" className={inputCls} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Area / City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" value={form.area} onChange={(e) => handleChange("area", e.target.value)} placeholder="Petaling Jaya" className={inputCls} required />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Years of Experience</label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="number" value={form.experience} onChange={(e) => handleChange("experience", e.target.value)} placeholder="5" min="0" className={inputCls} required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Specialties</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button key={cat.id} type="button" onClick={() => toggleCategory(cat.id)} className={`px-3 py-2 text-xs font-medium rounded-xl border-2 transition-all ${form.categories.includes(cat.id) ? "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400" : "border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:border-rose-200 dark:hover:border-rose-800"}`}>
                          {cat.icon} {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Languages</label>
                    <input type="text" value={form.languages} onChange={(e) => handleChange("languages", e.target.value)} placeholder="English, Malay, Mandarin" className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="px-6 py-3.5 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all">Back</button>
                    <button type="button" onClick={() => canProceedStep2 ? setStep(3) : setError("Please fill in location, experience, and select specialties.")} className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 flex items-center justify-center gap-2">
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Portfolio & Services */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Portfolio & Services</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Showcase your work and list your services</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">About You (min 50 characters)</label>
                    <textarea
                      value={form.bio}
                      onChange={(e) => handleChange("bio", e.target.value)}
                      placeholder="Describe your artistry, style, and what makes you unique..."
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      required
                    />
                    <p className={`text-xs mt-1 ${form.bio.length >= 50 ? "text-green-500" : "text-gray-400 dark:text-gray-500"}`}>{form.bio.length}/50 minimum</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Portfolio Images</label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-xl p-8 text-center hover:border-rose-300 dark:hover:border-rose-800 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Drag & drop images here</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">or click to browse (JPG, PNG up to 5MB each)</p>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Upload 4-10 of your best work. High-quality images attract more clients.</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Services</label>
                      <button type="button" onClick={addService} className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium">+ Add Service</button>
                    </div>
                    <div className="space-y-3">
                      {form.services.map((svc, i) => (
                        <div key={i} className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Service {i + 1}</span>
                            {form.services.length > 1 && (
                              <button type="button" onClick={() => removeService(i)} className="text-xs text-red-400 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400">Remove</button>
                            )}
                          </div>
                          <input type="text" value={svc.name} onChange={(e) => handleServiceChange(i, "name", e.target.value)} placeholder="Service name (e.g. Event Glam)" className="w-full px-3 py-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" value={svc.duration} onChange={(e) => handleServiceChange(i, "duration", e.target.value)} placeholder="Duration (e.g. 2 hours)" className="px-3 py-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                            <input type="text" value={svc.price} onChange={(e) => handleServiceChange(i, "price", e.target.value)} placeholder="Price (e.g. 250)" className="px-3 py-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                          </div>
                          <textarea value={svc.description} onChange={(e) => handleServiceChange(i, "description", e.target.value)} placeholder="Brief description of this service..." rows={2} className="w-full px-3 py-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="px-6 py-3.5 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all">Back</button>
                    <button type="button" onClick={() => canProceedStep3 ? setStep(4) : setError("Please write a bio of at least 50 characters.")} className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 flex items-center justify-center gap-2">
                      Review <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {step === 4 && (
                <div className="space-y-5 animate-fade-in">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Review & Submit</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Double-check your details before submitting</p>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Account</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Name:</strong> {form.name}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Email:</strong> {form.email}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Phone:</strong> {form.phone}</p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Profile</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Location:</strong> {form.location}, {form.area}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Experience:</strong> {form.experience} years</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Specialties:</strong> {form.categories.map((c) => categories.find((cat) => cat.id === c)?.name).join(", ")}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Languages:</strong> {form.languages}</p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Services</h3>
                      {form.services.map((svc, i) => (
                        <p key={i} className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {svc.name || `Service ${i + 1}`} — {svc.price ? `MYR ${svc.price}` : "Price TBD"} • {svc.duration || "Duration TBD"}
                        </p>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="sr-only" />
                      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${agreed ? "bg-rose-500 border-rose-500" : "border-gray-300 dark:border-neutral-600 group-hover:border-rose-300 dark:group-hover:border-rose-700"}`}>
                        {agreed && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      I agree to the <a href="#" className="text-rose-600 dark:text-rose-400 hover:underline">Artist Terms of Service</a>, <a href="#" className="text-rose-600 dark:text-rose-400 hover:underline">Commission Policy</a>, and <a href="#" className="text-rose-600 dark:text-rose-400 hover:underline">Privacy Policy</a>
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(3)} className="px-6 py-3.5 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all">Back</button>
                    <button type="submit" disabled={loading || !agreed} className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Star className="w-4 h-4" /> Submit Application</>}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 text-sm">
            <Link href="/register" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">Client Sign Up</Link>
            <span className="text-gray-300 dark:text-neutral-700">|</span>
            <Link href="/register/studio" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">Studio Sign Up</Link>
            <span className="text-gray-300 dark:text-neutral-700">|</span>
            <Link href="/login" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">Already have an account?</Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/register/artist/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/register/artist/success/page.tsx"
"use client";

import Link from "next/link";
import { Check, ArrowRight, Clock, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ArtistSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3">Application Submitted!</h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
            Thank you for applying to join Leish! as an artist. Our team will review your application and get back to you within <strong className="text-gray-700 dark:text-gray-200">2-3 business days</strong>.
          </p>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800 mb-6 text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-rose-50 dark:bg-rose-950/50 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Check your email</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">We&apos;ll send a confirmation and status updates to your inbox.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-50 dark:bg-amber-950/50 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Review takes 2-3 days</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">We verify your portfolio and professional credentials.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-50 dark:bg-green-950/50 rounded-lg flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">You&apos;ll be notified</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Once approved, your profile goes live and clients can book you instantly.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/artists" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
              Browse Artists <ArrowRight className="w-4 h-4" />
            </Link>
            <br />
            <Link href="/" className="inline-flex text-sm text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/register/artist/success/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/register/studio/page.tsx"
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, MapPin, Building2, Upload, Users, Check, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/artists";

export default function RegisterStudioPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    studioName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    area: "",
    address: "",
    artistCount: "",
    categories: [] as string[],
    description: "",
    website: "",
    instagram: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const toggleCategory = (catId: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(catId)
        ? prev.categories.filter((c) => c !== catId)
        : [...prev.categories, catId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setError("You must agree to the Terms of Service."); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push("/register/studio/success");
  };

  const canProceed1 = form.studioName && form.ownerName && form.email && form.phone && form.password && form.confirmPassword;
  const canProceed2 = form.location && form.area && form.artistCount && form.categories.length > 0;

  const inputCls = "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500";
  const plainInputCls = "w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500";

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">Register Your Studio</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">List your studio and team of artists on Leish!</p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-up delay-100">
            {[
              { num: 1, label: "Account" },
              { num: 2, label: "Studio" },
              { num: 3, label: "Review" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  step === s.num ? "bg-rose-500 text-white shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
                    : step > s.num ? "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-400 dark:text-gray-500"
                }`}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-white/20">
                    {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < 2 && <ChevronRight className="w-4 h-4 text-gray-300 dark:text-neutral-600 mx-1" />}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-neutral-800 animate-fade-in-up delay-200">
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl text-sm text-red-600 dark:text-red-400">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Account Details</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Studio owner / manager information</p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Studio Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" value={form.studioName} onChange={(e) => handleChange("studioName", e.target.value)} placeholder="Glam Studio KL" className={inputCls} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Owner / Manager Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" value={form.ownerName} onChange={(e) => handleChange("ownerName", e.target.value)} placeholder="Your full name" className={inputCls} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Business Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="hello@yourstudio.com" className={inputCls} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+60 12-345 6789" className={inputCls} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="Min 8 chars" className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm</label>
                      <input type="password" value={form.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} placeholder="Re-enter" className={plainInputCls} required />
                    </div>
                  </div>

                  <button type="button" onClick={() => canProceed1 ? setStep(2) : setError("Please fill in all fields.")} className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 flex items-center justify-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Studio Details</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Tell us about your studio</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">State / Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" value={form.location} onChange={(e) => handleChange("location", e.target.value)} placeholder="Selangor" className={inputCls} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Area / City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" value={form.area} onChange={(e) => handleChange("area", e.target.value)} placeholder="Petaling Jaya" className={inputCls} required />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Address</label>
                    <input type="text" value={form.address} onChange={(e) => handleChange("address", e.target.value)} placeholder="Unit, Building, Street" className={plainInputCls} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Number of Artists</label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select value={form.artistCount} onChange={(e) => handleChange("artistCount", e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all appearance-none" required>
                        <option value="">Select</option>
                        <option value="1-2">1-2 artists</option>
                        <option value="3-5">3-5 artists</option>
                        <option value="6-10">6-10 artists</option>
                        <option value="10+">10+ artists</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Specialties</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button key={cat.id} type="button" onClick={() => toggleCategory(cat.id)} className={`px-3 py-2 text-xs font-medium rounded-xl border-2 transition-all ${form.categories.includes(cat.id) ? "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400" : "border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:border-rose-200 dark:hover:border-rose-800"}`}>
                          {cat.icon} {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Studio Description</label>
                    <textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="Describe your studio, atmosphere, and what makes it special..." rows={4} className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Studio Photos</label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-xl p-8 text-center hover:border-rose-300 dark:hover:border-rose-800 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Upload studio interior & exterior photos</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">JPG, PNG up to 5MB each</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Website (optional)</label>
                      <input type="url" value={form.website} onChange={(e) => handleChange("website", e.target.value)} placeholder="https://..." className={plainInputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Instagram (optional)</label>
                      <input type="text" value={form.instagram} onChange={(e) => handleChange("instagram", e.target.value)} placeholder="@yourstudio" className={plainInputCls} />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="px-6 py-3.5 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all">Back</button>
                    <button type="button" onClick={() => canProceed2 ? setStep(3) : setError("Please fill in location, artist count, and select specialties.")} className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 flex items-center justify-center gap-2">
                      Review <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Review & Submit</h2>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Confirm your studio details</p>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Account</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Studio:</strong> {form.studioName}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Owner:</strong> {form.ownerName}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Email:</strong> {form.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
                      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Studio</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Location:</strong> {form.location}, {form.area}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Artists:</strong> {form.artistCount}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-700 dark:text-gray-300">Specialties:</strong> {form.categories.map((c) => categories.find((cat) => cat.id === c)?.name).join(", ")}</p>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="sr-only" />
                      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${agreed ? "bg-rose-500 border-rose-500" : "border-gray-300 dark:border-neutral-600 group-hover:border-rose-300 dark:group-hover:border-rose-700"}`}>
                        {agreed && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      I agree to the <a href="#" className="text-rose-600 dark:text-rose-400 hover:underline">Studio Terms of Service</a> and <a href="#" className="text-rose-600 dark:text-rose-400 hover:underline">Privacy Policy</a>
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="px-6 py-3.5 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all">Back</button>
                    <button type="submit" disabled={loading || !agreed} className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Building2 className="w-4 h-4" /> Submit Studio Application</>}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 text-sm">
            <Link href="/register" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">Client Sign Up</Link>
            <span className="text-gray-300 dark:text-neutral-700">|</span>
            <Link href="/register/artist" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">Artist Sign Up</Link>
            <span className="text-gray-300 dark:text-neutral-700">|</span>
            <Link href="/login" className="text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors">Already have an account?</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/register/studio/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/register/studio/success/page.tsx"
"use client";

import Link from "next/link";
import { Check, ArrowRight, Clock, Mail, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StudioSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3">Studio Application Submitted!</h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
            Thank you for registering your studio on Leish!. Our team will review your application and verify your studio details within <strong className="text-gray-700 dark:text-gray-200">3-5 business days</strong>.
          </p>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800 mb-6 text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-rose-50 dark:bg-rose-950/50 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Confirmation email sent</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Check your inbox for a confirmation receipt.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-50 dark:bg-amber-950/50 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Verification takes 3-5 days</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">We verify studio location, team credentials, and quality standards.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-50 dark:bg-green-950/50 rounded-lg flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Your studio goes live</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Once approved, your studio listing appears in search and clients can book.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/studios" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
              Browse Studios <ArrowRight className="w-4 h-4" />
            </Link>
            <br />
            <Link href="/" className="inline-flex text-sm text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium">Back to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/register/studio/success/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/studios/page.tsx"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import { studios } from "@/data/artists";
import { Star, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StudiosPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            Browse Studios
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Discover top-rated beauty studios across Malaysia with professional teams and luxurious setups.
          </p>
        </div>
      </div>

      {/* Studios Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studios.map((studio) => (
            <Link
              key={studio.id}
              href={`/studios/${studio.id}`}
              className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-rose-900/10 transition-all duration-300 block"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={studio.image}
                  alt={studio.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{studio.rating}</span>
                  <span className="text-[10px] text-gray-400">({studio.reviewCount})</span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-lg font-bold text-white">{studio.name}</h3>
                  <div className="flex items-center gap-1 text-white/70 text-xs mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {studio.location}, {studio.area}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{studio.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {studio.categories.slice(0, 3).map((cat) => (
                    <span key={cat} className="px-2.5 py-0.5 text-[11px] font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full capitalize">
                      {cat.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-neutral-800">
                  <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {studio.artists} artists</span>
                    <span>From MYR {studio.price}/hr</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300">
                    View <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/studios/page.tsx"

cat <<'LEISHEOF' > "$TARGET/src/app/studios/[id]/page.tsx"
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import { studios, artists, categories } from "@/data/artists";
import { Star, MapPin, Users, ArrowLeft, Clock, MessageCircle, Shield, Check, Globe2, Zap } from "lucide-react";

export default function StudioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const studio = studios.find((s) => s.id === params.id);

  if (!studio) {
    return (
      <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Studio Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">The studio you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/studios" className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Browse Studios
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const studioArtists = artists.slice(0, studio.artists);

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />

      <div className="bg-white dark:bg-neutral-900 border-b border-gray-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white dark:bg-neutral-900">
        <div className="relative h-72 sm:h-96">
          <ImageWithFallback src={studio.image} alt={studio.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">{studio.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> <span className="font-semibold text-white">{studio.rating}</span> ({studio.reviewCount} reviews)</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {studio.location}, {studio.area}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {studio.artists} artists</span>
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-gray-100 dark:border-neutral-800">
          <div className="p-4 flex items-center gap-3 border-r border-gray-50 dark:border-neutral-800">
            <div className="w-10 h-10 bg-rose-50 dark:bg-rose-950/50 rounded-xl flex items-center justify-center"><Star className="w-5 h-5 text-rose-500" /></div>
            <div><p className="text-xs text-gray-400 dark:text-gray-500">Rating</p><p className="text-sm font-semibold text-gray-900 dark:text-white">{studio.rating}/5</p></div>
          </div>
          <div className="p-4 flex items-center gap-3 border-r border-gray-50 dark:border-neutral-800">
            <div className="w-10 h-10 bg-green-50 dark:bg-green-950/50 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-green-500" /></div>
            <div><p className="text-xs text-gray-400 dark:text-gray-500">From</p><p className="text-sm font-semibold text-gray-900 dark:text-white">MYR {studio.price}/hr</p></div>
          </div>
          <div className="p-4 flex items-center gap-3 border-r border-gray-50 dark:border-neutral-800">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center"><Users className="w-5 h-5 text-blue-500" /></div>
            <div><p className="text-xs text-gray-400 dark:text-gray-500">Team Size</p><p className="text-sm font-semibold text-gray-900 dark:text-white">{studio.artists} artists</p></div>
          </div>
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 dark:bg-amber-950/50 rounded-xl flex items-center justify-center"><Check className="w-5 h-5 text-amber-500" /></div>
            <div><p className="text-xs text-gray-400 dark:text-gray-500">Reviews</p><p className="text-sm font-semibold text-gray-900 dark:text-white">{studio.reviewCount}+</p></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About {studio.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{studio.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {studio.categories.map((cat) => {
                  const found = categories.find((c) => c.id === cat);
                  return (
                    <Link key={cat} href={`/artists?category=${cat}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full capitalize hover:bg-rose-100 dark:hover:bg-rose-950/70 transition-colors">
                      {found?.icon} {cat.replace(/-/g, " ")}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Team */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {studioArtists.map((artist) => (
                  <Link key={artist.id} href={`/artists/${artist.id}`} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors group">
                    <ImageWithFallback src={artist.image} alt={artist.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors truncate">{artist.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {artist.rating}</span>
                        <span>MYR {artist.price}/hr</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Book This Studio</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Starting from <span className="font-bold text-gray-900 dark:text-white">MYR {studio.price}/hr</span></p>
                <Link href="/artists" className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 flex items-center justify-center gap-2">
                  Browse Artists <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
                <a href="https://wa.me/601137633788" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 font-semibold rounded-xl hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors border border-green-200 dark:border-green-800 mt-3">
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 dark:text-gray-500 mt-3">
                  <Shield className="w-3 h-3" /> Secure booking &bull; Free cancellation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

LEISHEOF
echo "  ✓ src/app/studios/[id]/page.tsx"

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

cat <<'LEISHEOF' > "$TARGET/src/components/BackToTop.tsx"
"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-40 w-11 h-11 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300 dark:hover:border-rose-700 shadow-lg transition-all hover:scale-110"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

LEISHEOF
echo "  ✓ src/components/BackToTop.tsx"

cat <<'LEISHEOF' > "$TARGET/src/components/CategoriesSection.tsx"
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/artists";
import ImageWithFallback from "./ImageWithFallback";

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-950" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-rose-500 uppercase tracking-wider mb-2">Specialties</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white">Browse by Category</h2>
          </div>
          <Link href="/artists" className="hidden sm:inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium text-sm transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/artists?category=${cat.id}`}
              className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 dark:from-neutral-800 dark:to-neutral-900 hover:from-rose-900 hover:to-pink-900 dark:hover:from-rose-950 dark:hover:to-pink-950 transition-all duration-500"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="absolute inset-0">
                <ImageWithFallback src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="relative p-5 flex items-start gap-3 min-h-[130px]">
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-rose-100 transition-colors mb-1 text-sm">{cat.name}</h3>
                  <span className="text-xs text-rose-300 dark:text-rose-400 font-medium">{cat.count} artists</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-rose-300 group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
              </div>
            </Link>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/artists" className="inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium text-sm">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

LEISHEOF
echo "  ✓ src/components/CategoriesSection.tsx"

cat <<'LEISHEOF' > "$TARGET/src/components/CTASection.tsx"
import Link from "next/link";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 text-xs font-semibold rounded-full mb-6 backdrop-blur-sm border border-white/20">
          <Sparkles className="w-3.5 h-3.5" /> Ready to Glow?
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">Your Perfect Look Awaits</h2>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of happy clients who found their ideal makeup artist through Leish!. Book today and experience beauty perfected.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/artists" className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-rose-600 font-bold rounded-2xl hover:bg-rose-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100 text-base">
            Browse Artists <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="https://wa.me/601137633788" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/25 hover:bg-white/20 transition-all backdrop-blur-sm text-base">
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

LEISHEOF
echo "  ✓ src/components/CTASection.tsx"

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

cat <<'LEISHEOF' > "$TARGET/src/components/Footer.tsx"
import Link from "next/link";
import { Sparkles, Heart, MessageCircle, Camera, Mail } from "lucide-react";
import { categories } from "@/data/artists";

export default function Footer() {
  return (
    <footer className="bg-gray-950 dark:bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
              <span className="text-xl font-bold text-white">Leish!</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">Your beauty, perfected. Discover and book Malaysia&apos;s finest makeup artists for any occasion.</p>
            <a href="https://wa.me/601137633788" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.id}><Link href={`/artists?category=${cat.id}`} className="text-sm text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-2"><span className="text-xs">{cat.icon}</span>{cat.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">More</h3>
            <ul className="space-y-2.5">
              {categories.slice(4).map((cat) => (
                <li key={cat.id}><Link href={`/artists?category=${cat.id}`} className="text-sm text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-2"><span className="text-xs">{cat.icon}</span>{cat.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/#how-it-works" className="text-sm text-gray-400 hover:text-rose-400 transition-colors">How It Works</Link></li>
              <li><Link href="/artists" className="text-sm text-gray-400 hover:text-rose-400 transition-colors">Browse Artists</Link></li>
              <li><Link href="/studios" className="text-sm text-gray-400 hover:text-rose-400 transition-colors">Browse Studios</Link></li>
              <li><Link href="/register/artist" className="text-sm text-gray-400 hover:text-rose-400 transition-colors">Join as Artist</Link></li>
              <li><Link href="/register/studio" className="text-sm text-gray-400 hover:text-rose-400 transition-colors">Register Studio</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Leish! All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-rose-400 transition-colors" aria-label="Instagram"><Camera className="w-5 h-5" /></a>
            <a href="mailto:hello@leish.my" className="text-gray-500 hover:text-rose-400 transition-colors" aria-label="Email"><Mail className="w-5 h-5" /></a>
            <a href="https://wa.me/601137633788" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-rose-400 transition-colors" aria-label="WhatsApp"><MessageCircle className="w-5 h-5" /></a>
            <p className="text-sm text-gray-500 flex items-center gap-1">Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> in Malaysia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

LEISHEOF
echo "  ✓ src/components/Footer.tsx"

cat <<'LEISHEOF' > "$TARGET/src/components/HeroSection.tsx"
"use client";

import Link from "next/link";
import { ArrowRight, Star, Users, Award, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ImageWithFallback from "./ImageWithFallback";

const stats = [
  { icon: Users, value: "500+", label: "Happy Brides", color: "text-rose-600 dark:text-rose-400" },
  { icon: Star, value: "4.9", label: "Avg Rating", color: "text-amber-500 dark:text-amber-400" },
  { icon: Award, value: "50+", label: "Pro Artists", color: "text-pink-600 dark:text-pink-400" },
  { icon: Clock, value: "<2h", label: "Response Time", color: "text-rose-500 dark:text-rose-400" },
];

export default function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 pt-16">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-pink-200/20 dark:bg-pink-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-rose-100/30 dark:bg-rose-900/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-pink-100/30 dark:bg-pink-900/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100/60 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-semibold rounded-full mb-6 backdrop-blur-sm border border-rose-200/50 dark:border-rose-800/50">
              <Star className="w-3.5 h-3.5 fill-rose-500 dark:fill-rose-400 text-rose-500 dark:text-rose-400" />
              Malaysia&apos;s #1 Beauty Marketplace
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-gray-900 dark:text-white leading-[1.08] mb-6 tracking-tight">
              Book Beauty.
              <br />
              <span className="gradient-text">Anywhere.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
              Discover makeup artists and studios, view real-time availability, and secure your booking in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/artists" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-2xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-xl shadow-rose-200/50 dark:shadow-rose-900/30 hover:scale-105 active:scale-100 text-base">
                Browse Artists <ArrowRight className="w-4 h-4" />
              </Link>
              {user ? (
                <Link href="/profile" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl border border-gray-200 dark:border-neutral-700 hover:border-rose-200 dark:hover:border-rose-700 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all shadow-sm hover:shadow-md text-base">
                  My Bookings
                </Link>
              ) : (
                <Link href="/register" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl border border-gray-200 dark:border-neutral-700 hover:border-rose-200 dark:hover:border-rose-700 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all shadow-sm hover:shadow-md text-base">
                  Sign Up Free
                </Link>
              )}
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${200 + i * 100}ms` }}>
                  <stat.icon className={`w-5 h-5 mx-auto mb-1.5 ${stat.color}`} />
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4 animate-fade-in delay-300">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-rose-200/40 dark:shadow-rose-900/20 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-[3/4] relative group">
                    <ImageWithFallback src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=800&fit=crop" alt="Soft glam makeup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-rose-200/40 dark:shadow-rose-900/20 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-square group">
                    <ImageWithFallback src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop" alt="Contemporary beauty" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-rose-200/40 dark:shadow-rose-900/20 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-square group">
                    <ImageWithFallback src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop" alt="Warm tones" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-rose-200/40 dark:shadow-rose-900/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-[3/4] group">
                    <ImageWithFallback src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=800&fit=crop" alt="Beautiful look" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl shadow-rose-100/50 dark:shadow-rose-900/20 p-4 flex items-center gap-3 animate-float border border-rose-100/50 dark:border-neutral-700">
              <div className="w-11 h-11 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Top Rated</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">4.9 avg from 500+ reviews</p>
              </div>
            </div>

            <div className="absolute -top-2 -right-2 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl shadow-rose-100/50 dark:shadow-rose-900/20 p-3 animate-float border border-rose-100/50 dark:border-neutral-700" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-rose-300 dark:bg-rose-600 border-2 border-white dark:border-neutral-800" />
                  <div className="w-7 h-7 rounded-full bg-pink-300 dark:bg-pink-600 border-2 border-white dark:border-neutral-800" />
                  <div className="w-7 h-7 rounded-full bg-rose-400 dark:bg-rose-500 border-2 border-white dark:border-neutral-800" />
                </div>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">+50 artists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

LEISHEOF
echo "  ✓ src/components/HeroSection.tsx"

cat <<'LEISHEOF' > "$TARGET/src/components/HowItWorks.tsx"
import { Search, CalendarCheck, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  { num: "01", icon: Search, title: "Discover", description: "Browse portfolios, read reviews, and find your perfect artist.", color: "#e11d48", bgColor: "bg-rose-50 dark:bg-rose-950/30" },
  { num: "02", icon: CalendarCheck, title: "Book", description: "Select your service, pick a convenient time, and secure your booking instantly.", color: "#db2777", bgColor: "bg-pink-50 dark:bg-pink-950/30" },
  { num: "03", icon: Sparkles, title: "Glow", description: "Sit back and let your artist work their magic. Arrive looking and feeling radiant.", color: "#8b5cf6", bgColor: "bg-purple-50 dark:bg-purple-950/30" },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-rose-50/30 dark:from-neutral-950 dark:to-neutral-900" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-rose-500 uppercase tracking-wider mb-2">The Process</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white">How It Works</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">Three simple steps to your perfect look</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center group">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[60%] w-[80%]">
                  <div className="border-t-2 border-dashed border-rose-200 dark:border-rose-900/50" />
                  <ArrowRight className="absolute -right-3 -top-2 w-4 h-4 text-rose-300 dark:text-rose-700" />
                </div>
              )}
              <div className="relative">
                <div className={`inline-flex items-center justify-center w-28 h-28 rounded-3xl ${step.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <step.icon className="w-12 h-12" style={{ color: step.color }} />
                </div>
                <p className="text-xs font-bold text-rose-300 dark:text-rose-700 mb-2 tracking-[0.2em]">{step.num}</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link href="/artists" className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-2xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 hover:scale-105">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

LEISHEOF
echo "  ✓ src/components/HowItWorks.tsx"

cat <<'LEISHEOF' > "$TARGET/src/components/ImageWithFallback.tsx"
"use client";

import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackColor?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className = "",
  fallbackColor = "bg-gradient-to-br from-rose-100 to-pink-100 dark:from-neutral-800 dark:to-neutral-700",
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} ${fallbackColor} flex items-center justify-center`}>
        <svg className="w-8 h-8 text-rose-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}

LEISHEOF
echo "  ✓ src/components/ImageWithFallback.tsx"

cat <<'LEISHEOF' > "$TARGET/src/components/Navbar.tsx"
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Heart, User, LogOut, Calendar, Sun, Moon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useFavorites } from "@/context/FavoritesContext";
import SearchModal from "./SearchModal";

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
            <SearchModal />

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
            <SearchModal />
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

cat <<'LEISHEOF' > "$TARGET/src/components/SearchModal.tsx"
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, ArrowRight, Star, MapPin, Clock } from "lucide-react";
import { artists, categories } from "@/data/artists";
import ImageWithFallback from "./ImageWithFallback";

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    if (!open) setQuery("");
  }, [open]);

  const results = query.trim()
    ? artists.filter((a) =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.location.toLowerCase().includes(query.toLowerCase()) ||
        a.categories.some((c) => c.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  const categoryResults = query.trim()
    ? categories.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.id.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const hasResults = results.length > 0 || categoryResults.length > 0;

  return (
    <>
      {/* Trigger button - hidden on mobile, shown in navbar area */}
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm text-gray-400 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl hover:border-rose-200 dark:hover:border-rose-800 transition-all min-w-[200px]"
      >
        <Search className="w-4 h-4" />
        <span>Search artists...</span>
        <kbd className="ml-auto px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-neutral-700 rounded">⌘K</kbd>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-xl mx-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-neutral-700 overflow-hidden animate-scale-in">
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-neutral-800">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artists, categories, locations..."
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-neutral-800 rounded">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto">
              {query.trim() === "" ? (
                <div className="p-8 text-center">
                  <Search className="w-8 h-8 text-gray-200 dark:text-neutral-700 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 dark:text-gray-500">Start typing to search...</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {categories.slice(0, 5).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { setOpen(false); router.push(`/artists?category=${cat.id}`); }}
                        className="px-3 py-1.5 text-xs font-medium bg-gray-50 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : !hasResults ? (
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-400 dark:text-gray-500">No results for &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                <div className="py-2">
                  {categoryResults.length > 0 && (
                    <>
                      <p className="px-5 py-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Categories</p>
                      {categoryResults.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => { setOpen(false); router.push(`/artists?category=${cat.id}`); }}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                        >
                          <span className="text-lg">{cat.icon}</span>
                          <div className="flex-1">
                            <span className="font-medium">{cat.name}</span>
                            <span className="text-xs text-gray-400 ml-2">{cat.count} artists</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-neutral-600" />
                        </button>
                      ))}
                    </>
                  )}
                  {results.length > 0 && (
                    <>
                      <p className="px-5 py-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">Artists</p>
                      {results.map((artist) => (
                        <button
                          key={artist.id}
                          onClick={() => { setOpen(false); router.push(`/artists/${artist.id}`); }}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                        >
                          <ImageWithFallback src={artist.image} alt={artist.name} className="w-10 h-10 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{artist.name}</p>
                            <p className="text-xs text-gray-400">
                              <MapPin className="w-3 h-3 inline" /> {artist.location}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">{artist.rating}</span>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                  <div className="px-5 py-3 border-t border-gray-50 dark:border-neutral-800">
                    <button
                      onClick={() => { setOpen(false); router.push(`/artists?category=&search=${encodeURIComponent(query)}`); }}
                      className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium flex items-center gap-1"
                    >
                      View all results <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

LEISHEOF
echo "  ✓ src/components/SearchModal.tsx"

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

cat <<'LEISHEOF' > "$TARGET/src/components/Testimonials.tsx"
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/artists";

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-rose-50/30 to-white dark:from-neutral-900 dark:to-neutral-950" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-rose-500 uppercase tracking-wider mb-2">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white">Loved by our clients</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="relative bg-white dark:bg-neutral-900 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-lg dark:hover:shadow-neutral-900/50 hover:border-rose-100 dark:hover:border-rose-900/50 transition-all duration-300 group">
              <Quote className="w-8 h-8 text-rose-100 dark:text-rose-900/50 mb-4 fill-rose-100 dark:fill-rose-900/50 group-hover:text-rose-200 dark:group-hover:text-rose-800/50 group-hover:fill-rose-200 dark:group-hover:fill-rose-800/50 transition-colors" />
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50 dark:border-neutral-800">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">{t.author.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.author}</p>
                  <p className="text-xs text-rose-500 dark:text-rose-400 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

LEISHEOF
echo "  ✓ src/components/Testimonials.tsx"

cat <<'LEISHEOF' > "$TARGET/src/context/AuthContext.tsx"
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
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
        const users: Array<{ email: string; name: string; phone: string; password: string }> = JSON.parse(stored);
        const found = users.find((u) => u.email === email && u.password === password);
        if (found) {
          const existingUser = localStorage.getItem(STORAGE_KEY);
          const existingData = existingUser ? JSON.parse(existingUser) : {};
          setUser({
            id: email.replace(/[^a-z0-9]/g, "_"),
            name: found.name,
            email: found.email,
            phone: found.phone,
            avatar: undefined,
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
      const users: Array<{ email: string; name: string; phone: string; password: string }> = stored ? JSON.parse(stored) : [];
      if (users.find((u) => u.email === data.email)) {
        return { success: false, error: "An account with this email already exists." };
      }
      users.push({ email: data.email, name: data.name, phone: data.phone, password: data.password });
      localStorage.setItem("leish_users", JSON.stringify(users));
    } catch {}

    setUser({
      id: data.email.replace(/[^a-z0-9]/g, "_"),
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: undefined,
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

LEISHEOF
echo "  ✓ src/context/AuthContext.tsx"

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

cat <<'LEISHEOF' > "$TARGET/src/context/ThemeContext.tsx"
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

  // Prevent flash by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  // During SSR or before mount, return defaults instead of throwing
  if (!ctx) return { theme: "light" as Theme, toggle: () => {}, setTheme: (_t: Theme) => {} };
  return ctx;
}

LEISHEOF
echo "  ✓ src/context/ThemeContext.tsx"

cat <<'LEISHEOF' > "$TARGET/src/context/ToastContext.tsx"
"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Check, X, AlertCircle, Info, XCircle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toast: (type: ToastType, message: string, duration?: number) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const icons: Record<ToastType, typeof Check> = { success: Check, error: XCircle, info: Info, warning: AlertCircle };
const colors: Record<ToastType, string> = {
  success: "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300",
  error: "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300",
  info: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  warning: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300",
};
const iconColors: Record<ToastType, string> = {
  success: "text-green-500 dark:text-green-400",
  error: "text-red-500 dark:text-red-400",
  info: "text-blue-500 dark:text-blue-400",
  warning: "text-amber-500 dark:text-amber-400",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, type, message, duration }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  }, [removeToast]);

  const value: ToastContextType = {
    toast: addToast,
    success: (msg) => addToast("success", msg),
    error: (msg) => addToast("error", msg, 6000),
    info: (msg) => addToast("info", msg),
    warning: (msg) => addToast("warning", msg, 5000),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
        {toasts.map((t) => {
          const Icon = icons[t.type];
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl border shadow-lg backdrop-blur-sm animate-fade-in-up ${colors[t.type]}`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${iconColors[t.type]}`} />
              <p className="text-sm font-medium">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 ml-2 opacity-50 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      toast: () => {},
      success: () => {},
      error: () => {},
      info: () => {},
      warning: () => {},
    };
  }
  return ctx;
}

LEISHEOF
echo "  ✓ src/context/ToastContext.tsx"

cat <<'LEISHEOF' > "$TARGET/src/data/artists.ts"
export interface Artist {
  id: string;
  name: string;
  image: string;
  location: string;
  area: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  price: number;
  bio: string;
  portfolio: string[];
  services: Service[];
  reviews: Review[];
  available: boolean;
  verified: boolean;
  experience: number;
  languages: string[];
  responseTime: string;
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  popular?: boolean;
}

export interface Review {
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  service?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  count: number;
}

export interface Studio {
  id: string;
  name: string;
  image: string;
  location: string;
  area: string;
  rating: number;
  reviewCount: number;
  artists: number;
  price: number;
  categories: string[];
  description: string;
}

export const categories: Category[] = [
  {
    id: "event",
    name: "Event Makeup",
    description: "Statement-ready glam for dinners, launches, galas, and celebrations that need impact.",
    icon: "🎉",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop",
    count: 18,
  },
  {
    id: "photoshoot",
    name: "Photoshoot Makeup",
    description: "Camera-ready artistry for campaigns, fashion editorials, and creative productions.",
    icon: "📸",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop",
    count: 9,
  },
  {
    id: "sfx",
    name: "SFX Makeup",
    description: "Transformational special effects artistry for film, cosplay, theatre, and concept shoots.",
    icon: "🎭",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop",
    count: 6,
  },
  {
    id: "lessons",
    name: "Makeup Lessons",
    description: "Learn makeup techniques from professional artists in personalized one-on-one sessions.",
    icon: "🎓",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop",
    count: 8,
  },
  {
    id: "hari-raya",
    name: "Hari Raya Makeup",
    description: "Traditional Hari Raya makeup with elegant, modest looks perfect for festive celebrations.",
    icon: "🌙",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop",
    count: 14,
  },
  {
    id: "chinese-new-year",
    name: "Chinese New Year Makeup",
    description: "Auspicious Chinese New Year makeup featuring red accents and traditional festive styles.",
    icon: "🧧",
    image: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&h=400&fit=crop",
    count: 10,
  },
  {
    id: "traditional-malay",
    name: "Traditional Malay Makeup",
    description: "Authentic Malay makeup with traditional henna designs and cultural elements.",
    icon: "🌺",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    count: 11,
  },
  {
    id: "hijab",
    name: "Hijab-Friendly Makeup",
    description: "Beautiful hijab-friendly makeup that complements modest fashion and cultural preferences.",
    icon: "👗",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop",
    count: 7,
  },
];

export const artists: Artist[] = [
  {
    id: "aiko-nakamura",
    name: "Aiko Nakamura",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face",
    location: "Selangor",
    area: "Petaling",
    rating: 4.9,
    reviewCount: 127,
    categories: ["event", "event"],
    price: 250,
    bio: "With over 8 years of experience specializing in wedding and event makeup, Aiko brings a refined touch of elegance to every client. Her signature soft glam style has graced over 500 weddings across Malaysia, blending contemporary trends with timeless sophistication. Aiko is passionate about making every bride feel like the most beautiful version of themselves on their special day.",
    portfolio: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "aiko-1", name: "Glam Full Package", duration: "3 hours", price: 450, description: "Complete wedding makeup with trial session, airbrush finish, and touch-up kit.", popular: true },
      { id: "aiko-2", name: "Natural Glam", duration: "2 hours", price: 300, description: "Soft, natural wedding look focusing on enhancing your natural beauty." },
      { id: "aiko-3", name: "Event Glam", duration: "1.5 hours", price: 250, description: "Full glam makeup for galas, dinners, and special events.", popular: true },
      { id: "aiko-4", name: "Touch-up Session", duration: "1 hour", price: 150, description: "Quick touch-up and refresh for any occasion." },
    ],
    reviews: [
      { author: "Catherine M.", rating: 5, text: "Aiko made me feel like a queen on my wedding day. Absolutely stunning work!", date: "2025-12-15", service: "Glam Full Package" },
      { author: "Sarah L.", rating: 5, text: "The best makeup artist I've ever worked with. Professional and talented.", date: "2025-11-20", service: "Event Glam" },
      { author: "Priya K.", rating: 5, text: "My wedding makeup lasted the entire night. Aiko is a true artist!", date: "2025-10-08", service: "Glam Full Package" },
      { author: "Amirah H.", rating: 5, text: "So happy with the natural wedding look. Exactly what I wanted.", date: "2025-09-14", service: "Natural Glam" },
    ],
    available: true,
    verified: true,
    experience: 8,
    languages: ["English", "Malay", "Japanese"],
    responseTime: "Under 1 hour",
  },
  {
    id: "mei-lin",
    name: "Mei Lin",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop&crop=face",
    location: "Wilayah Persekutuan Kuala Lumpur",
    area: "Bukit Bintang",
    rating: 4.8,
    reviewCount: 89,
    categories: ["photoshoot", "event", "sfx"],
    price: 300,
    bio: "Mei Lin is a visionary makeup artist known for her bold editorial work and creative SFX transformations. With a background in fashion and film, she brings an artistic edge to every project. Her work has been featured in Vogue Malaysia, Harper's Bazaar, and numerous international campaigns.",
    portfolio: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "mei-1", name: "Editorial Shoot", duration: "3 hours", price: 500, description: "High-fashion editorial makeup for magazine shoots and campaigns.", popular: true },
      { id: "mei-2", name: "SFX Full Transformation", duration: "4 hours", price: 600, description: "Complete special effects transformation for film, cosplay, or concept shoots.", popular: true },
      { id: "mei-3", name: "Event Glam", duration: "1.5 hours", price: 300, description: "Bold, statement-making makeup for high-profile events." },
      { id: "mei-4", name: "Creative Consultation", duration: "1 hour", price: 200, description: "One-on-one creative consultation for your project vision." },
    ],
    reviews: [
      { author: "Alexandra R.", rating: 5, text: "Mei Lin understands editorial beauty at the highest level. Incredibly talented.", date: "2025-12-01", service: "Editorial Shoot" },
      { author: "James T.", rating: 5, text: "Her SFX work is mind-blowing. Transformed our entire film set.", date: "2025-11-15", service: "SFX Full Transformation" },
      { author: "Nina W.", rating: 4, text: "Creative and professional. A true artist in every sense.", date: "2025-10-22", service: "Event Glam" },
    ],
    available: true,
    verified: true,
    experience: 6,
    languages: ["English", "Mandarin", "Malay"],
    responseTime: "Under 2 hours",
  },
  {
    id: "kenji-sato",
    name: "Kenji Sato",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
    location: "Pulau Pinang",
    area: "Timur Laut",
    rating: 4.9,
    reviewCount: 95,
    categories: ["photoshoot", "event", "sfx"],
    price: 275,
    bio: "Kenji brings a unique fusion of Japanese precision and Malaysian warmth to his artistry. Specializing in photoshoot and SFX makeup, he has built a reputation for creating looks that are both technically flawless and deeply creative. His calm demeanor puts clients at ease while his artistry speaks for itself.",
    portfolio: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "kenji-1", name: "Photoshoot Package", duration: "2.5 hours", price: 400, description: "Complete photoshoot makeup with touch-ups between looks.", popular: true },
      { id: "kenji-2", name: "SFX Character Design", duration: "4 hours", price: 550, description: "Full character design and application for film or cosplay.", popular: true },
      { id: "kenji-3", name: "Event Makeup", duration: "1.5 hours", price: 275, description: "Polished event makeup tailored to your outfit and occasion." },
      { id: "kenji-4", name: "Modern Glam", duration: "2 hours", price: 350, description: "Contemporary wedding look with modern techniques and finishes." },
    ],
    reviews: [
      { author: "Diana K.", rating: 5, text: "Kenji's work is absolutely impeccable. I recommend him to all my clients.", date: "2025-12-10", service: "Photoshoot Package" },
      { author: "Raj M.", rating: 5, text: "Professional, creative, and incredibly talented. A joy to work with.", date: "2025-11-28", service: "SFX Character Design" },
      { author: "Lisa P.", rating: 4, text: "Great SFX work for our theatre production. Very detailed and creative.", date: "2025-10-15", service: "SFX Character Design" },
    ],
    available: true,
    verified: true,
    experience: 7,
    languages: ["English", "Japanese", "Malay"],
    responseTime: "Under 1 hour",
  },
  {
    id: "nurul-ain",
    name: "Nurul Ain",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=600&fit=crop&crop=face",
    location: "Johor",
    area: "Johor Bahru",
    rating: 4.9,
    reviewCount: 142,
    categories: ["event", "traditional-malay", "hijab", "hari-raya"],
    price: 200,
    bio: "Nurul Ain is a master of traditional Malay wedding beauty, with a deep understanding of cultural heritage and modern aesthetics. Her hijab-friendly techniques have made her one of the most sought-after artists in Southern Malaysia. She combines traditional henna artistry with contemporary makeup trends for a truly unique wedding experience.",
    portfolio: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "nurul-1", name: "Traditional Malay Glam", duration: "3 hours", price: 380, description: "Complete traditional Malay wedding package with henna and cultural styling.", popular: true },
      { id: "nurul-2", name: "Hijab Wedding Package", duration: "2.5 hours", price: 320, description: "Wedding makeup designed to perfectly complement hijab styling.", popular: true },
      { id: "nurul-3", name: "Henna Artistry", duration: "2 hours", price: 200, description: "Intricate traditional henna designs for hands and feet." },
      { id: "nurul-4", name: "Hari Raya Glam", duration: "1.5 hours", price: 180, description: "Elegant festive makeup perfect for Hari Raya celebrations." },
    ],
    reviews: [
      { author: "Fatimah Z.", rating: 5, text: "Nurul made my traditional wedding absolutely magical. Her henna work is breathtaking.", date: "2025-12-05", service: "Traditional Malay Glam" },
      { author: "Aisyah R.", rating: 5, text: "The best hijab-friendly makeup artist in Malaysia. Truly understands our needs.", date: "2025-11-18", service: "Hijab Wedding Package" },
      { author: "Siti N.", rating: 5, text: "My wedding party all used Nurul and we were all stunning. Highly recommend!", date: "2025-10-30", service: "Traditional Malay Glam" },
      { author: "Hafiza M.", rating: 5, text: "Her Hari Raya look was perfect for our family gathering. Elegant and modest.", date: "2025-10-01", service: "Hari Raya Glam" },
    ],
    available: true,
    verified: true,
    experience: 10,
    languages: ["Malay", "English"],
    responseTime: "Under 30 min",
  },
  {
    id: "rachel-tan",
    name: "Rachel Tan",
    image: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&h=600&fit=crop&crop=face",
    location: "Wilayah Persekutuan Kuala Lumpur",
    area: "Mont Kiara",
    rating: 4.7,
    reviewCount: 76,
    categories: ["event", "chinese-new-year", "lessons"],
    price: 280,
    bio: "Rachel combines Eastern and Western beauty techniques to create stunning, versatile looks. As a certified makeup educator, she's passionate about empowering women through makeup knowledge. Her Chinese New Year packages are legendary, blending traditional auspicious elements with modern elegance.",
    portfolio: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "rachel-1", name: "Luxury Glam Package", duration: "3 hours", price: 500, description: "Premium wedding experience with airbrush, touch-up kit, and evening refresh.", popular: true },
      { id: "rachel-2", name: "CNY Glam Package", duration: "2 hours", price: 350, description: "Auspicious CNY look with traditional red accents and modern styling.", popular: true },
      { id: "rachel-3", name: "Personal Makeup Lesson", duration: "3 hours", price: 280, description: "Learn professional techniques in a personalized one-on-one session." },
      { id: "rachel-4", name: "Group Makeup Workshop", duration: "4 hours", price: 180, description: "Fun group workshop for 4-6 people. Perfect for wedding showers!" },
    ],
    reviews: [
      { author: "Michelle L.", rating: 5, text: "Rachel's CNY makeup was absolutely stunning. I got so many compliments!", date: "2025-12-08", service: "CNY Glam Package" },
      { author: "Hannah C.", rating: 4, text: "The makeup lesson was so informative. I finally learned how to do my own glam look.", date: "2025-11-25", service: "Personal Makeup Lesson" },
      { author: "Wendy T.", rating: 5, text: "My wedding makeup was flawless. Rachel is so talented and patient.", date: "2025-10-12", service: "Luxury Glam Package" },
    ],
    available: true,
    verified: true,
    experience: 5,
    languages: ["English", "Mandarin", "Cantonese"],
    responseTime: "Under 1 hour",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&crop=face",
    location: "Selangor",
    area: "Subang Jaya",
    rating: 4.8,
    reviewCount: 108,
    categories: ["event", "event", "photoshoot"],
    price: 220,
    bio: "Priya's multicultural background informs her versatile approach to beauty. She seamlessly blends South Asian wedding traditions with modern Malaysian aesthetics, creating looks that honor heritage while embracing contemporary style. Her calm, nurturing presence makes every bride feel at ease.",
    portfolio: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "priya-1", name: "Glam Fusion", duration: "3 hours", price: 400, description: "East-meets-West wedding look blending cultural traditions with modern elegance.", popular: true },
      { id: "priya-2", name: "Pre-Wedding Shoot", duration: "2 hours", price: 300, description: "Camera-ready makeup for pre-wedding photography sessions." },
      { id: "priya-3", name: "Event Statement", duration: "1.5 hours", price: 220, description: "Bold, confident makeup for galas and celebrations.", popular: true },
      { id: "priya-4", name: "Cultural Consultation", duration: "1 hour", price: 150, description: "Guidance on choosing the perfect look for your cultural celebration." },
    ],
    reviews: [
      { author: "Anita S.", rating: 5, text: "Priya understood exactly what I wanted for my fusion wedding. She's amazing!", date: "2025-12-12", service: "Glam Fusion" },
      { author: "Deepa M.", rating: 5, text: "The best decision I made for my wedding was booking Priya. Absolutely beautiful work.", date: "2025-11-05", service: "Glam Fusion" },
      { author: "Karen W.", rating: 4, text: "Priya is so talented and makes you feel so comfortable. Love her energy!", date: "2025-10-18", service: "Event Statement" },
    ],
    available: true,
    verified: true,
    experience: 9,
    languages: ["English", "Tamil", "Malay", "Hindi"],
    responseTime: "Under 30 min",
  },
  {
    id: "farah-izyan",
    name: "Farah Izyan",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop&crop=face",
    location: "Selangor",
    area: "Shah Alam",
    rating: 4.8,
    reviewCount: 93,
    categories: ["event", "hijab", "hari-raya"],
    price: 180,
    bio: "Farah Izyan specializes in creating elegant, modest beauty looks that celebrate Islamic values while embracing modern trends. Her hijab styling and modest makeup techniques have earned her a devoted following across Malaysia. Every look she creates tells a story of grace and sophistication.",
    portfolio: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "farah-1", name: "Hijab Glam Complete", duration: "3 hours", price: 350, description: "Full hijab wedding styling with makeup, tudung draping, and accessories.", popular: true },
      { id: "farah-2", name: "Modest Glam Session", duration: "1.5 hours", price: 180, description: "Elegant modest makeup perfect for any occasion." },
      { id: "farah-3", name: "Raya Collection", duration: "2 hours", price: 220, description: "Exclusive Hari Raya look with hijab styling and festive makeup.", popular: true },
      { id: "farah-4", name: "Tudung Styling Only", duration: "1 hour", price: 120, description: "Professional hijab draping and styling session." },
    ],
    reviews: [
      { author: "Zainab A.", rating: 5, text: "Farah's hijab styling for my wedding was absolute perfection. I felt so beautiful.", date: "2025-12-18", service: "Hijab Glam Complete" },
      { author: "Huda M.", rating: 5, text: "My Raya look was the talk of the family. Farah is incredibly talented!", date: "2025-11-30", service: "Raya Collection" },
      { author: "Nur I.", rating: 4, text: "Very professional and understanding of modesty requirements. Loved it!", date: "2025-10-25", service: "Modest Glam Session" },
    ],
    available: true,
    verified: true,
    experience: 6,
    languages: ["Malay", "English", "Arabic"],
    responseTime: "Under 1 hour",
  },
  {
    id: "elaine-ong",
    name: "Elaine Ong",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop&crop=face",
    location: "Pulau Pinang",
    area: "George Town",
    rating: 4.7,
    reviewCount: 68,
    categories: ["event", "chinese-new-year", "event", "lessons"],
    price: 240,
    bio: "Elaine brings a refined Peranakan sensibility to her artistry, drawing inspiration from the rich cultural tapestry of Penang. Her ability to blend traditional Chinese wedding elements with contemporary style has made her a favorite for weddings and festive celebrations across Northern Malaysia.",
    portfolio: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "elaine-1", name: "Peranakan Glam", duration: "3 hours", price: 420, description: "Traditional Peranakan-inspired wedding makeup with modern finishes.", popular: true },
      { id: "elaine-2", name: "CNY Luxe Package", duration: "2 hours", price: 320, description: "Premium CNY look with gold and red traditional elements." },
      { id: "elaine-3", name: "Event Elegance", duration: "1.5 hours", price: 240, description: "Sophisticated event makeup for any celebration." },
      { id: "elaine-4", name: "Makeup Masterclass", duration: "4 hours", price: 350, description: "Intimate masterclass covering wedding and festive techniques.", popular: true },
    ],
    reviews: [
      { author: "Lilian C.", rating: 5, text: "Elaine captured the Peranakan heritage in my wedding look beautifully. Stunning work!", date: "2025-12-03", service: "Peranakan Glam" },
      { author: "Jasmine L.", rating: 4, text: "The CNY makeup was gorgeous with perfect red accents. Very skilled.", date: "2025-11-10", service: "CNY Luxe Package" },
      { author: "Rebecca T.", rating: 5, text: "Her masterclass was worth every ringgit. I learned so much!", date: "2025-10-20", service: "Makeup Masterclass" },
    ],
    available: true,
    verified: false,
    experience: 4,
    languages: ["English", "Mandarin", "Hokkien"],
    responseTime: "Under 2 hours",
  },
];

export const studios: Studio[] = [
  {
    id: "glam-studio-kl",
    name: "Glam Studio KL",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
    location: "Kuala Lumpur",
    area: "Bukit Bintang",
    rating: 4.9,
    reviewCount: 234,
    artists: 8,
    price: 200,
    categories: ["event", "event", "photoshoot"],
    description: "Kuala Lumpur's premier beauty studio featuring a team of award-winning artists. Full-service wedding suites, professional photography setup, and a luxurious client experience.",
  },
  {
    id: "beauty-haven-pj",
    name: "Beauty Haven PJ",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop",
    location: "Selangor",
    area: "Petaling Jaya",
    rating: 4.8,
    reviewCount: 189,
    artists: 5,
    price: 150,
    categories: ["event", "hijab", "hari-raya"],
    description: "A warm and welcoming studio specializing in modest beauty and hijab-friendly services. Known for exceptional Malay wedding work and festive makeup.",
  },
  {
    id: "editial-haus",
    name: "Editorial Haus",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop",
    location: "Kuala Lumpur",
    area: "Bangsar",
    rating: 4.7,
    reviewCount: 156,
    artists: 6,
    price: 280,
    categories: ["photoshoot", "sfx", "event"],
    description: "A cutting-edge creative studio for editorial, fashion, and SFX work. Home to some of Malaysia's most innovative makeup artists.",
  },
];

export const testimonials = [
  {
    quote: "Leish! connected me with the most incredible artist for my wedding. The whole experience, from browsing to booking, was seamless and luxurious.",
    author: "Catherine M.",
    role: "Bride",
    rating: 5,
  },
  {
    quote: "As someone who works in fashion, I have high standards. Leish! consistently delivers artists who understand editorial beauty at the highest level.",
    author: "Alexandra R.",
    role: "Fashion Editor",
    rating: 5,
  },
  {
    quote: "I recommend Leish! to all my clients. The quality of artists on this platform is unmatched, and the booking process is effortless.",
    author: "Diana K.",
    role: "Event Planner",
    rating: 5,
  },
  {
    quote: "Booked a hijab-friendly artist through Leish! for my Raya celebration and she was absolutely wonderful. Will definitely use again!",
    author: "Nurul H.",
    role: "Client",
    rating: 5,
  },
];

LEISHEOF
echo "  ✓ src/data/artists.ts"

# === Config Files ===
cat <<'LEISHEOF' > "$TARGET/next.config.mjs"
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

LEISHEOF
echo "  ✓ next.config.mjs"

cat <<'LEISHEOF' > "$TARGET/package.json"
{
  "name": "leish-clone",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "./node_modules/.bin/next dev",
    "build": "./node_modules/.bin/next build",
    "start": "./node_modules/.bin/next start",
    "lint": "./node_modules/.bin/next lint"
  },
  "dependencies": {
    "lucide-react": "^1.21.0",
    "next": "16.2.9",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.9",
    "playwright": "^1.61.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  },
  "pnpm": {
    "onlyBuiltDependencies": [
      "sharp",
      "@tailwindcss/postcss",
      "unrs-resolver"
    ]
  }
}

LEISHEOF
echo "  ✓ package.json"

cat <<'LEISHEOF' > "$TARGET/postcss.config.mjs"
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

LEISHEOF
echo "  ✓ postcss.config.mjs"

cat <<'LEISHEOF' > "$TARGET/tsconfig.json"
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

LEISHEOF
echo "  ✓ tsconfig.json"

cat <<'LEISHEOF' > "$TARGET/.npmrc"
shamefully-hoist=true
strict-peer-dependencies=false

LEISHEOF
echo "  ✓ .npmrc"

# === Public Assets ===
cat <<'LEISHEOF' > "$TARGET/public/favicon.svg"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#db2777"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#g)"/>
  <path d="M16 7c-1.1 0-2 .9-2 2 0 .4.1.7.3 1-1.4.7-2.3 2-2.3 3.5 0 .8.3 1.5.8 2.1-.8.3-1.5.8-2 1.4-.7.9-1 2-.8 3.1.4 2.2 2.3 3.9 4.5 3.9h3c2.2 0 4.1-1.7 4.5-3.9.2-1.1-.1-2.2-.8-3.1-.5-.6-1.2-1.1-2-1.4.5-.6.8-1.3.8-2.1 0-1.6-.9-2.9-2.3-3.5.2-.3.3-.6.3-1 0-1.1-.9-2-2-2z" fill="white" opacity="0.9"/>
  <circle cx="14.5" cy="13" r="1.2" fill="url(#g)"/>
  <circle cx="17.5" cy="13" r="1.2" fill="url(#g)"/>
  <path d="M14 17.5c0 0 1 1.5 2 1.5s2-1.5 2-1.5" stroke="white" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.7"/>
</svg>

LEISHEOF
echo "  ✓ public/favicon.svg"


echo ""
echo "✅ All files synced! Run these commands to start:"
echo "  cd $TARGET"
echo "  npm install"
echo "  npm run dev"
echo ""
echo "🌙 Dark mode: Click the Sun/Moon icon in the navbar to toggle!"