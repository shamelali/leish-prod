"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import { ArrowLeft, Clock, User, Tag, Calendar, Share2, Heart } from "lucide-react";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
};

export default function BlogPostClient({ post, relatedPosts, locale }: { post: BlogPost; relatedPosts: BlogPost[]; locale: string }) {
  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950">
      <Navbar />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
          <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <span className="px-2.5 py-0.5 bg-rose-50 dark:bg-rose-950/50 text-rose-500 rounded-full font-medium">{post.category}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} read</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString("en-MY", { month: "long", day: "numeric", year: "numeric" })}</span>
          <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">{post.title}</h1>

        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100 dark:border-neutral-800">
          <button className="p-2 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all">
            <Heart className="w-5 h-5" />
          </button>
          <button onClick={() => { navigator.clipboard?.writeText(window.location.href); }} className="p-2 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="prose prose-rose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{post.excerpt}</p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Malaysia&apos;s beauty scene is one of the most vibrant in Southeast Asia. With a rich tapestry of cultures and traditions, makeup artistry here goes far beyond mere cosmetics — it&apos;s an expression of identity, heritage, and creativity.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Key Takeaways</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-4">
            <li className="flex items-start gap-2"><span className="text-rose-500 mt-1">•</span> Always prep your skin before any makeup application</li>
            <li className="flex items-start gap-2"><span className="text-rose-500 mt-1">•</span> Choose products that match your skin type and climate</li>
            <li className="flex items-start gap-2"><span className="text-rose-500 mt-1">•</span> Don&apos;t be afraid to blend traditional and modern techniques</li>
            <li className="flex items-start gap-2"><span className="text-rose-500 mt-1">•</span> Invest in quality brushes and tools — they make a world of difference</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">The Malaysian Beauty Landscape</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            From the intricate henna designs of Malay weddings to the bold editorial looks featured in Kuala Lumpur Fashion Week, Malaysian beauty is as diverse as its people. Our artists draw inspiration from both local traditions and global trends, creating unique looks that are truly one-of-a-kind.
          </p>

          <blockquote className="border-l-4 border-rose-500 pl-4 py-2 my-6 bg-rose-50/50 dark:bg-rose-950/20 rounded-r-xl pr-4">
            <p className="text-gray-700 dark:text-gray-300 italic">&quot;Beauty is not about fitting a mold — it&apos;s about expressing who you are, where you come from, and who you want to be.&quot;</p>
          </blockquote>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Conclusion</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Whether you&apos;re preparing for your wedding day, a festive celebration, or just want to feel beautiful, Leish! connects you with artists who understand your unique needs. Book your appointment today and experience beauty perfected.
          </p>
        </div>

        <div className="mt-10 p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">{post.author[0]}</div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{post.author}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Leish! Beauty Expert</p>
          </div>
          <Link href={`/${locale}/artists`} className="ml-auto text-xs font-medium text-rose-500 hover:text-rose-600">View Profile →</Link>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">More Articles</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/${locale}/blog/${rp.slug}`} className="group">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-2">
                    <ImageWithFallback src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">{rp.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}
