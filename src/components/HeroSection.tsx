"use client";

import Link from "next/link";
import { ArrowRight, Star, Users, Award, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ImageWithFallback from "./ImageWithFallback";
import { getDictionary, type Locale } from "@/lib/i18n";

const stats = [
  { icon: Users, value: "500+", label: "Happy Brides", color: "text-rose-600 dark:text-rose-400" },
  { icon: Star, value: "4.9", label: "Avg Rating", color: "text-amber-500 dark:text-amber-400" },
  { icon: Award, value: "50+", label: "Pro Artists", color: "text-pink-600 dark:text-pink-400" },
  { icon: Clock, value: "<2h", label: "Response Time", color: "text-rose-500 dark:text-rose-400" },
];

export default function HeroSection({
  locale = "en",
  dict
}: {
  locale?: Locale;
  dict?: Record<string, any>;
} = {}) {
  const t = dict ?? getDictionary(locale as Locale);
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
              {t.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/artists" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-2xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-xl shadow-rose-200/50 dark:shadow-rose-900/30 hover:scale-105 active:scale-100 text-base">
                {t.hero.browseArtists} <ArrowRight className="w-4 h-4" />
              </Link>
              {user ? (
                <Link href="/profile" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl border border-gray-200 dark:border-neutral-700 hover:border-rose-200 dark:hover:border-rose-700 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all shadow-sm hover:shadow-md text-base">
                  {t.hero.myBookings}
                </Link>
              ) : (
                <Link href="/register" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl border border-gray-200 dark:border-neutral-700 hover:border-rose-200 dark:hover:border-rose-700 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-all shadow-sm hover:shadow-md text-base">
                  {t.hero.signupFree}
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
