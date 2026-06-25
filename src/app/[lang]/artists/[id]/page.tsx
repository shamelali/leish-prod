"use client";

export const dynamic = 'force-dynamic';

import { useState, use } from "react";
import { useParams, useRouter } from "next/navigation";
import { isLocale, defaultLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

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
import ReviewForm from "@/components/ReviewForm";

export default function ArtistDetailPage({ params: langParams }: Props) {
  const { lang } = use(langParams);
  const locale = isLocale(lang) ? lang : defaultLocale;
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
          <Link href={`/${locale}/artists`} className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors">
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
                  {[...new Set(artist.categories)].map((cat, ci) => {
                    const found = categories.find((c) => c.id === cat);
                    return (
                      <Link
                        key={`${cat}-${ci}`}
                        href={`/${locale}/artists?category=${cat}`}
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

            {/* Write a Review */}
            <ReviewForm artistId={artist.id} artistName={artist.name} services={artist.services.map((s) => ({ id: s.id, name: s.name }))} />

            {/* Similar Artists */}
            {relatedArtists.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Similar Artists</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relatedArtists.map((ra) => (
                    <Link key={ra.id} href={`/${locale}/artists/${ra.id}`} className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-800 shadow-sm hover:shadow-md transition-all">
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
                        href={`/${locale}/login`}
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
                  href={`/${locale}/profile`}
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
