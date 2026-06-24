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
