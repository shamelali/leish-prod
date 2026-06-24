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
                      {[...new Set(artist.categories)].slice(0, 3).map((cat, ci) => (
                        <span key={`${cat}-${ci}`} className="px-2 py-0.5 text-[10px] font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full capitalize">
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
