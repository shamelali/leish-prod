import { Link } from "react-router-dom";
import {
  Star,
  MapPin,
  ArrowRight,
  BadgeCheck,
  Clock,
  Heart,
} from "lucide-react";
import { artists } from "../data/artists";
import ImageWithFallback from "./ImageWithFallback";
import { useFavorites } from "../context/FavoritesContext";
import { getDictionary, type Locale } from "../lib/i18n";

export default function FeaturedArtists({
  locale = "en",
  dict,
}: {
  locale?: Locale;
  dict?: Record<string, any>;
} = {}) {
  const t = dict ?? getDictionary(locale as Locale);
  const featured = artists.slice(0, 3);
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <section
      className="py-24 bg-gradient-to-b from-white via-rose-50/20 to-white dark:from-neutral-950 dark:via-rose-950/5 dark:to-neutral-950"
      id="featured"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-rose-500 uppercase tracking-wider mb-2">
            Curated For You
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            {t.featured.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t.featured.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((artist, i) => {
            const liked = isFavorite(artist.id);
            return (
              <div
                key={artist.id}
                className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-rose-900/10 transition-all duration-300 relative"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Link to={`/artists/${artist.id}`}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <ImageWithFallback
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {artist.rating}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        ({artist.reviewCount})
                      </span>
                    </div>
                    {artist.verified && (
                      <div className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 bg-blue-500/90 backdrop-blur-sm rounded-full">
                        <BadgeCheck className="w-3.5 h-3.5 text-white" />
                        <span className="text-[10px] font-semibold text-white">
                          Verified
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">
                        {artist.name}
                      </h3>
                      <div className="flex items-center gap-3 text-white/70 text-sm mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {artist.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {artist.responseTime}
                        </span>
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
                  aria-label={
                    liked ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Heart className={`w-4 h-4 ${liked ? "fill-white" : ""}`} />
                </button>

                <Link to={`/artists/${artist.id}`}>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {[...new Set(artist.categories)]
                        .slice(0, 3)
                        .map((cat, ci) => (
                          <span
                            key={`${cat}-${ci}`}
                            className="px-2.5 py-0.5 text-[11px] font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full capitalize"
                          >
                            {cat.replace(/-/g, " ")}
                          </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400">
                          {t.featured.from}{" "}
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          MYR {artist.price}
                        </span>
                        <span className="text-xs text-gray-400">/hr</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
                        {t.featured.viewProfile}{" "}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/artists"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
          >
            {t.common.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
