"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import {
  Building2, Calendar, Star, Users, DollarSign, TrendingUp,
  ArrowUpRight, Settings, Plus, ChevronRight, BarChart3,
  UserPlus, Clock, Eye
} from "lucide-react";

const mockStudioStats = {
  totalBookings: 156,
  monthlyBookings: 38,
  monthlyChange: 22.1,
  revenue: 45600,
  revenueChange: 15.7,
  avgRating: 4.8,
  profileViews: 1205,
  teamSize: 8,
};

const mockTeam = [
  { name: "Aiko Nakamura", role: "Lead Artist", rating: 4.9, bookings: 47, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { name: "Mei Lin", role: "Editorial Artist", rating: 4.8, bookings: 35, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { name: "Kenji Sato", role: "SFX Artist", rating: 4.9, bookings: 31, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Nurul Ain", role: "Traditional Specialist", rating: 4.9, bookings: 43, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face" },
];

export default function StudioDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "team" | "settings">("overview");
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Studio Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your studio, team, and bookings</p>
          </div>
          <Link href="/studios" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 hover:from-rose-600 hover:to-pink-700 transition-all">
            View Studio Page <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: mockStudioStats.totalBookings, icon: Calendar, change: mockStudioStats.monthlyChange },
            { label: "Revenue (MYR)", value: `RM ${mockStudioStats.revenue.toLocaleString()}`, icon: DollarSign, change: mockStudioStats.revenueChange },
            { label: "Avg Rating", value: mockStudioStats.avgRating, icon: Star, change: 0 },
            { label: "Profile Views", value: mockStudioStats.profileViews, icon: Eye, change: 8.2 },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-rose-50 dark:bg-rose-950/50 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-rose-500" />
                </div>
                {stat.change > 0 && (
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" /> {stat.change}%
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-neutral-800 rounded-xl p-1 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "team", label: "Team", icon: Users },
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

        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Team Performance */}
            <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
              <div className="p-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 dark:text-white">Team Performance</h2>
                <button onClick={() => setActiveTab("team")} className="text-xs font-medium text-rose-500 hover:text-rose-600">Manage team</button>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-neutral-800">
                {mockTeam.map((member) => (
                  <div key={member.name} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={member.image} alt={member.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {member.rating}</p>
                        <p className="text-gray-400">Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-white">{member.bookings}</p>
                        <p className="text-gray-400">Bookings</p>
                      </div>
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
                    <UserPlus className="w-4 h-4 text-rose-500" /> Add Team Member
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors text-left">
                    <Clock className="w-4 h-4 text-amber-500" /> Set Availability
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors text-left">
                    <TrendingUp className="w-4 h-4 text-green-500" /> View Analytics
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-5 text-white">
                <Building2 className="w-8 h-8 mb-3 opacity-80" />
                <h3 className="font-bold mb-1">Studio Pro</h3>
                <p className="text-sm text-white/70 mb-4">Unlock advanced analytics, priority listing, and team management tools.</p>
                <button className="px-4 py-2 bg-white text-rose-600 text-sm font-semibold rounded-xl hover:bg-rose-50 transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900 dark:text-white">Team Members ({mockTeam.length})</h2>
              <button onClick={() => toast.info("Add member form coming soon!")} className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-sm font-semibold rounded-xl hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors">
                <Plus className="w-4 h-4" /> Add Member
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockTeam.map((member) => (
                <div key={member.name} className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-5 text-center hover:shadow-md transition-shadow">
                  <img src={member.image} alt={member.name} className="w-16 h-16 rounded-2xl object-cover mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{member.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{member.role}</p>
                  <div className="flex items-center justify-center gap-3 text-xs">
                    <span className="flex items-center gap-0.5 font-medium text-gray-700 dark:text-gray-300"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {member.rating}</span>
                    <span className="text-gray-400">{member.bookings} bookings</span>
                  </div>
                  <button className="mt-3 text-xs font-medium text-rose-500 hover:text-rose-600">Edit Profile</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl animate-fade-in">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 space-y-6">
              <h2 className="font-bold text-gray-900 dark:text-white">Studio Settings</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Studio Name</label>
                <input defaultValue="Glam Studio KL" className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                <textarea rows={4} defaultValue="Kuala Lumpur's premier beauty studio featuring award-winning artists." className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Starting Price (MYR/hr)</label>
                <input type="number" defaultValue={200} className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Location</label>
                <input defaultValue="Bukit Bintang, Kuala Lumpur" className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
              </div>
              <button onClick={() => toast.success("Studio settings saved!")} className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
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
