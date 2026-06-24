"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { artists, studios, categories } from "@/data/artists";
import ImageWithFallback from "@/components/ImageWithFallback";
import {
  LayoutDashboard, Users, Paintbrush, Building2, Star, DollarSign,
  TrendingUp, Eye, Calendar, Settings, BarChart3, ArrowUpRight,
  Search, Bell, CheckCircle, XCircle, Clock, ChevronRight
} from "lucide-react";

const mockStats = {
  totalUsers: 1247,
  totalArtists: 8,
  totalStudios: 3,
  totalBookings: 583,
  monthlyRevenue: 156800,
  pendingVerifications: 2,
  avgRating: 4.85,
  activeUsers: 342,
};

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "artists" | "studios" | "users" | "bookings">("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !user) router.push("/login");
  }, [mounted, user, router]);

  if (!mounted || !user) return null;

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-rose-500" /> Admin Panel
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage Leish! platform</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full">
              {mockStats.pendingVerifications} Pending
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: mockStats.totalUsers.toLocaleString(), icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/50" },
            { label: "Total Bookings", value: mockStats.totalBookings, icon: Calendar, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/50" },
            { label: "Revenue", value: `RM ${(mockStats.monthlyRevenue / 1000).toFixed(1)}K`, icon: DollarSign, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950/50" },
            { label: "Avg Rating", value: mockStats.avgRating, icon: Star, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/50" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-neutral-800 rounded-xl p-1 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "artists", label: "Artists", icon: Paintbrush },
            { id: "studios", label: "Studios", icon: Building2 },
            { id: "users", label: "Users", icon: Users },
            { id: "bookings", label: "Bookings", icon: Calendar },
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

        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
              <div className="p-5 border-b border-gray-100 dark:border-neutral-800">
                <h2 className="font-bold text-gray-900 dark:text-white">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-neutral-800">
                {[
                  { icon: CheckCircle, text: "Aiko Nakamura verified", time: "5m ago", color: "text-green-500" },
                  { icon: Calendar, text: "New booking: Glam Full Package", time: "12m ago", color: "text-blue-500" },
                  { icon: Star, text: "5★ review from Catherine M.", time: "1h ago", color: "text-amber-500" },
                  { icon: Users, text: "New user registered: priya@email.com", time: "2h ago", color: "text-purple-500" },
                  { icon: XCircle, text: "Booking cancelled by Sarah L.", time: "3h ago", color: "text-red-500" },
                  { icon: Clock, text: "Pending verification: Studio Pro KL", time: "5h ago", color: "text-amber-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <item.icon className={`w-4 h-4 ${item.color} shrink-0`} />
                    <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">{item.text}</p>
                    <span className="text-[10px] text-gray-400 shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Stats */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
              <div className="p-5 border-b border-gray-100 dark:border-neutral-800">
                <h2 className="font-bold text-gray-900 dark:text-white">Platform Stats</h2>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { label: "Artists", value: mockStats.totalArtists, max: 50, color: "bg-rose-500" },
                  { label: "Studios", value: mockStats.totalStudios, max: 20, color: "bg-pink-500" },
                  { label: "Active Users (7d)", value: mockStats.activeUsers, max: mockStats.totalUsers, color: "bg-blue-500" },
                  { label: "Bookings This Month", value: mockStats.totalBookings, max: 1000, color: "bg-green-500" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">{stat.label}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className={`h-full ${stat.color} rounded-full transition-all`} style={{ width: `${(stat.value / stat.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "artists" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white">Manage Artists ({artists.length})</h2>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-neutral-800">
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Artist</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Categories</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Rating</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Price</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-neutral-800">
                    {artists.map((a) => (
                      <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img src={a.image} alt={a.name} className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{a.name}</p>
                              <p className="text-xs text-gray-400">{a.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{[...new Set(a.categories)].slice(0, 2).join(", ")}</td>
                        <td className="px-5 py-3"><span className="flex items-center gap-1 font-medium text-gray-900 dark:text-white"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {a.rating}</span></td>
                        <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">RM {a.price}/hr</td>
                        <td className="px-5 py-3">
                          {a.verified ? (
                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full">Verified</span>
                          ) : (
                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 rounded-full">Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "studios" && (
          <div className="animate-fade-in">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Manage Studios ({studios.length})</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {studios.map((s) => (
                <div key={s.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
                  <div className="aspect-[16/9] relative">
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{s.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{s.location} · {s.artists} artists</p>
                    <div className="flex items-center gap-1 mt-2 text-xs"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> <span className="font-medium">{s.rating}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="animate-fade-in">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Users ({mockStats.totalUsers})</h2>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-8 text-center">
              <Users className="w-12 h-12 text-gray-200 dark:text-neutral-700 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">User management with search, filters, and role management coming with backend integration.</p>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="animate-fade-in">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">All Bookings</h2>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-200 dark:text-neutral-700 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">Booking management with filters, export, and analytics coming with backend integration.</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
