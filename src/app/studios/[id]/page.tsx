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
                {[...new Set(studio.categories)].map((cat, ci) => {
                  const found = categories.find((c) => c.id === cat);
                  return (
                    <Link key={`${cat}-${ci}`} href={`/artists?category=${cat}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full capitalize hover:bg-rose-100 dark:hover:bg-rose-950/70 transition-colors">
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
