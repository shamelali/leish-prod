"use client";

import Image from "next/image";
import { useState } from "react";

const screenshots = [
  { src: "/screenshots/homepage-light.png", label: "Homepage (Light)", category: "Home" },
  { src: "/screenshots/homepage-dark.png", label: "Homepage (Dark)", category: "Home" },
  { src: "/screenshots/homepage-mobile.png", label: "Homepage (Mobile)", category: "Home" },
  { src: "/screenshots/artists-listing.png", label: "Artists Listing", category: "Browse" },
  { src: "/screenshots/artist-detail.png", label: "Artist Detail", category: "Browse" },
  { src: "/screenshots/studios-listing.png", label: "Studios Listing", category: "Browse" },
  { src: "/screenshots/studio-detail.png", label: "Studio Detail", category: "Browse" },
  { src: "/screenshots/blog.png", label: "Blog Listing", category: "Browse" },
  { src: "/screenshots/blog-detail.png", label: "Blog Detail", category: "Browse" },
  { src: "/screenshots/login.png", label: "Login", category: "Auth" },
  { src: "/screenshots/register.png", label: "Client Registration", category: "Auth" },
  { src: "/screenshots/artist-register.png", label: "Artist Registration", category: "Auth" },
  { src: "/screenshots/studio-register.png", label: "Studio Registration", category: "Auth" },
  { src: "/screenshots/forgot-password.png", label: "Forgot Password", category: "Auth" },
  { src: "/screenshots/profile.png", label: "Profile", category: "User" },
  { src: "/screenshots/favorites.png", label: "Favorites", category: "User" },
  { src: "/screenshots/messages.png", label: "Messages", category: "User" },
  { src: "/screenshots/artist-dashboard.png", label: "Artist Dashboard", category: "Dashboard" },
  { src: "/screenshots/studio-dashboard.png", label: "Studio Dashboard", category: "Dashboard" },
  { src: "/screenshots/admin.png", label: "Admin Panel", category: "Dashboard" },
];

const categories = ["All", "Home", "Browse", "Auth", "User", "Dashboard"];

export default function PreviewGallery() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? screenshots : screenshots.filter((s) => s.category === filter);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center font-bold text-lg">L</div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
            Leish.my Clone — Preview Gallery
          </h1>
        </div>
        <p className="text-gray-400 text-lg mt-2">
          Next.js 16 + Tailwind v4 + TypeScript — 39 routes, 0 build errors
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
          {[
            { label: "Pages", value: "20+", color: "from-pink-500 to-rose-500" },
            { label: "API Routes", value: "11", color: "from-violet-500 to-purple-500" },
            { label: "Components", value: "21", color: "from-blue-500 to-cyan-500" },
            { label: "Dark Mode", value: "✓", color: "from-amber-500 to-orange-500" },
            { label: "Build Errors", value: "0", color: "from-emerald-500 to-green-500" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-gray-900 border border-gray-800 p-4">
              <div className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mt-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((s) => (
          <div
            key={s.label}
            className="group relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 cursor-pointer"
            onClick={() => setSelected(s.src)}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.label}
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">{s.label}</h3>
                <span className="text-xs text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full">{s.category}</span>
              </div>
              <span className="text-gray-500 text-sm group-hover:text-pink-400 transition-colors">Click to expand →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selected}
              alt="Preview"
              className="w-full h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-600 text-sm">
        Leish.my Clone — Built with Next.js 16, Tailwind CSS v4, TypeScript — {new Date().getFullYear()}
      </div>
    </div>
  );
}
