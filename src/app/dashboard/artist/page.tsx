"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import {
  Calendar, Star, Users, DollarSign, Eye, Clock,
  TrendingUp, ArrowUpRight, ArrowDownRight, BarChart3,
  ChevronRight, Settings, Image as ImageIcon, MessageSquare,
  Check, X
} from "lucide-react";

const mockStats = {
  totalBookings: 47,
  monthlyBookings: 12,
  monthlyChange: 18.5,
  revenue: 12800,
  revenueChange: 12.3,
  avgRating: 4.9,
  profileViews: 342,
  viewsChange: 8.2,
  responseRate: 96,
};

const mockBookings = [
  { id: "b1", client: "Catherine M.", service: "Glam Full Package", date: "2026-06-25", time: "10:00", status: "upcoming", price: 450 },
  { id: "b2", client: "Sarah L.", service: "Event Glam", date: "2026-06-26", time: "14:00", status: "upcoming", price: 250 },
  { id: "b3", client: "Priya K.", service: "Natural Glam", date: "2026-06-22", time: "09:00", status: "completed", price: 300 },
  { id: "b4", client: "Amirah H.", service: "Touch-up Session", date: "2026-06-20", time: "11:00", status: "completed", price: 150 },
  { id: "b5", client: "Nina W.", service: "Event Glam", date: "2026-06-18", time: "16:00", status: "cancelled", price: 250 },
];

const recentReviews = [
  { author: "Catherine M.", rating: 5, text: "Absolutely stunning work! Best decision I made.", date: "2026-06-22" },
  { author: "James T.", rating: 5, text: "Incredibly talented and professional.", date: "2026-06-19" },
];

export default function ArtistDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "reviews" | "settings">("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !user) router.push("/login");
  }, [mounted, user, router]);

  if (!mounted || !user) return null;

  const statusBadge = (status: string) => {
    switch (status) {
      case "upcoming": return <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-full">Upcoming</span>;
      case "completed": return <span className="px-2 py-0.5 text-[10px] font-semibold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full">Completed</span>;
      case "cancelled": return <span className="px-2 py-0.5 text-[10px] font-semibold bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full">Cancelled</span>;
      default: return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Artist Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {user.name}!</p>
          </div>
          <Link href="/artists" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 hover:from-rose-600 hover:to-pink-700 transition-all">
            View Public Profile <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: mockStats.totalBookings, icon: Calendar, change: mockStats.monthlyChange, sub: `${mockStats.monthlyBookings} this month` },
            { label: "Revenue (MYR)", value: `RM ${mockStats.revenue.toLocaleString()}`, icon: DollarSign, change: mockStats.revenueChange, sub: "This month" },
            { label: "Avg Rating", value: mockStats.avgRating, icon: Star, change: 0, sub: "From 127 reviews" },
            { label: "Profile Views", value: mockStats.profileViews, icon: Eye, change: mockStats.viewsChange, sub: "Last 30 days" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-rose-50 dark:bg-rose-950/50 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-rose-500" />
                </div>
                {stat.change !== 0 && (
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.change > 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                    {stat.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(stat.change)}%
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-neutral-800 rounded-xl p-1 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "bookings", label: "Bookings", icon: Calendar },
            { id: "reviews", label: "Reviews", icon: MessageSquare },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white dark:bg-neutral-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Upcoming Bookings */}
            <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
              <div className="p-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 dark:text-white">Upcoming Bookings</h2>
                <button onClick={() => setActiveTab("bookings")} className="text-xs font-medium text-rose-500 hover:text-rose-600">View all</button>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-neutral-800">
                {mockBookings.filter((b) => b.status === "upcoming").map((b) => (
                  <div key={b.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{b.client}</p>
                        <p className="text-xs text-gray-400">{b.service} · {b.date} at {b.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">RM {b.price}</p>
                      {statusBadge(b.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors text-left">
                    <ImageIcon className="w-4 h-4 text-rose-500" /> Update Portfolio
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors text-left">
                    <Clock className="w-4 h-4 text-amber-500" /> Set Availability
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors text-left">
                    <TrendingUp className="w-4 h-4 text-green-500" /> View Analytics
                  </button>
                </div>
              </div>

              {/* Response Rate */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Response Rate</h3>
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-100 dark:text-neutral-800" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${mockStats.responseRate} 100`} strokeLinecap="round" className="text-green-500" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{mockStats.responseRate}%</span>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-400 dark:text-gray-500">Responding within 1 hour</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm animate-fade-in">
            <div className="p-5 border-b border-gray-100 dark:border-neutral-800">
              <h2 className="font-bold text-gray-900 dark:text-white">All Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-neutral-800">
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Client</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Service</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Date</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Amount</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-neutral-800">
                  {mockBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{b.client}</td>
                      <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{b.service}</td>
                      <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{b.date} {b.time}</td>
                      <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white">RM {b.price}</td>
                      <td className="px-5 py-3">{statusBadge(b.status)}</td>
                      <td className="px-5 py-3">
                        {b.status === "upcoming" && (
                          <button onClick={() => { toast.info("Booking marked as completed"); }} className="text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700">
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        {b.status === "upcoming" && (
                          <button onClick={() => { toast.info("Booking cancelled"); }} className="text-xs font-medium text-red-500 hover:text-red-600 ml-2">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm animate-fade-in">
            <div className="p-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 dark:text-white">Recent Reviews</h2>
              <div className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /><span className="font-bold text-gray-900 dark:text-white">4.9</span><span className="text-xs text-gray-400">(127)</span></div>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-neutral-800">
              {recentReviews.map((r, i) => (
                <div key={i} className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{r.author}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} className={`w-3 h-3 ${si < r.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 dark:text-neutral-700"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{r.text}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(r.date).toLocaleDateString("en-MY", { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl animate-fade-in">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 space-y-6">
              <h2 className="font-bold text-gray-900 dark:text-white">Artist Settings</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Display Name</label>
                <input defaultValue={user.name} className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
                <textarea rows={4} defaultValue="Professional makeup artist with years of experience." className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Hourly Rate (MYR)</label>
                <input type="number" defaultValue={250} className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Response Time</label>
                <select className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all">
                  <option>Under 30 min</option>
                  <option>Under 1 hour</option>
                  <option>Under 2 hours</option>
                  <option>Under 4 hours</option>
                </select>
              </div>
              <button onClick={() => toast.success("Settings saved!")} className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
