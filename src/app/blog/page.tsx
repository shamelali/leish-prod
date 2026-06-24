import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import { ArrowRight, Clock, User, Tag, Calendar } from "lucide-react";

const blogPosts = [
  {
    slug: "hijab-makeup-tips",
    title: "10 Essential Hijab-Friendly Makeup Tips for Every Occasion",
    excerpt: "From everyday looks to special events, master the art of hijab-friendly makeup with these pro tips from our top artists.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=400&fit=crop",
    author: "Nurul Ain",
    date: "2026-06-20",
    readTime: "5 min",
    category: "Beauty Tips",
  },
  {
    slug: "wedding-makeup-guide",
    title: "The Ultimate Malaysian Wedding Makeup Guide: Traditional to Modern",
    excerpt: "Planning your wedding look? From traditional Malay henna to contemporary glam, here's everything you need to know.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=400&fit=crop",
    author: "Aiko Nakamura",
    date: "2026-06-15",
    readTime: "8 min",
    category: "Wedding",
  },
  {
    slug: "sfx-makeup-beginners",
    title: "Getting Started with SFX Makeup: A Beginner's Guide",
    excerpt: "Ever wanted to create amazing special effects makeup? Our SFX experts share their secrets for beginners.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=400&fit=crop",
    author: "Mei Lin",
    date: "2026-06-10",
    readTime: "6 min",
    category: "SFX",
  },
  {
    slug: "hari-raya-looks",
    title: "5 Stunning Hari Raya Makeup Looks to Try This Year",
    excerpt: "Elevate your Raya celebrations with these gorgeous makeup ideas from modest glam to bold and beautiful.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=400&fit=crop",
    author: "Farah Izyan",
    date: "2026-06-05",
    readTime: "4 min",
    category: "Festive",
  },
  {
    slug: "artist-spotlight-aiko",
    title: "Artist Spotlight: Aiko Nakamura's Journey from Tokyo to KL",
    excerpt: "Discover how Aiko became one of Malaysia's most sought-after makeup artists, blending Japanese precision with local culture.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=400&fit=crop",
    author: "Leish! Team",
    date: "2026-05-28",
    readTime: "7 min",
    category: "Artist Spotlight",
  },
  {
    slug: "skincare-prep",
    title: "The Perfect Skincare Prep Before Your Makeup Appointment",
    excerpt: "Your makeup artist can only work with the canvas you give them. Here's how to prep your skin for the best results.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=400&fit=crop",
    author: "Rachel Tan",
    date: "2026-05-20",
    readTime: "5 min",
    category: "Skincare",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />

      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-rose-500 uppercase tracking-wider mb-2">Blog & Tips</p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-3">Beauty Insights</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">Expert tips, artist spotlights, and the latest beauty trends from Malaysia's top makeup professionals.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured */}
        <Link href={`/blog/${blogPosts[0].slug}`} className="group block mb-12">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                <ImageWithFallback src={blogPosts[0].image} alt={blogPosts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-rose-500 text-white text-xs font-semibold rounded-full">Featured</div>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{blogPosts[0].category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blogPosts[0].readTime}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(blogPosts[0].date).toLocaleDateString("en-MY", { month: "short", day: "numeric" })}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{blogPosts[0].title}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 text-xs font-bold">{blogPosts[0].author[0]}</div>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{blogPosts[0].author}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-all">
              <div className="relative aspect-[16/9] overflow-hidden">
                <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-2">
                  <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/50 text-rose-500 rounded-full font-medium">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 text-sm">{post.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                  <User className="w-3 h-3" /> {post.author}
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

export { blogPosts };
