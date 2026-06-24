#!/bin/bash
# Leish! Clone - Delta Sync Part 2: Updated pages
# Run: chmod +x part2.sh && ./part2.sh
set -e
TARGET="$HOME/Project/leish-clone/leish-clone"
mkdir -p "$TARGET/src/app/artists/[id]" "$TARGET/src/app/favorites" "$TARGET/src/app/profile" "$TARGET/src/app/studios"
echo "📁 Part 2: Syncing updated pages..."

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
  const [sortBy, setSortBy] = useState<"rating" | "price-low" | "price-high">("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
              onClick={() => setSelectedCategory("all")}
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
                onClick={() => setSelectedCategory(cat.id)}
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
              onClick={() => { setSearch(""); setSelectedCategory("all"); }}
              className="px-6 py-2.5 bg-rose-500 text-white text-sm font-medium rounded-xl hover:bg-rose-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((artist) => {
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
            <div
              key={studio.id}
              className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-rose-900/10 transition-all duration-300"
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
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
LEISHEOF
echo "  ✓ src/app/studios/page.tsx"

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

echo "✅ Part 2 complete! All files synced. Run:"
echo "  cd $TARGET && npm run dev"
