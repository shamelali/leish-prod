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
                        {[...new Set(artist.categories)].slice(0, 3).map((cat, ci) => (
                          <span key={`${cat}-${ci}`} className="px-2.5 py-0.5 text-[11px] font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full capitalize">{cat.replace(/-/g, " ")}</span>
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
