import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-sm font-semibold rounded-full mb-6">
          404 — Page Not Found
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          Oops, beauty took a <span className="gradient-text">detour</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to discovering amazing artists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-neutral-700 hover:border-rose-200 dark:hover:border-rose-700 hover:text-rose-600 dark:hover:text-rose-400 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Artists
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
