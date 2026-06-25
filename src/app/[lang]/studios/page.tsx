import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import { studios } from "@/data/artists";
import { Star, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { isLocale, defaultLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export default async function StudiosPage({ params }: Props) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
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
              href={`/${locale}/studios/${studio.id}`}
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
                  {[...new Set(studio.categories)].slice(0, 3).map((cat, ci) => (
                    <span key={`${cat}-${ci}`} className="px-2.5 py-0.5 text-[11px] font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full capitalize">
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
