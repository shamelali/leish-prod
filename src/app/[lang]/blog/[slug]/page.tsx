import { Suspense } from "react";
import { blogPosts } from "../page";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale } from "@/lib/i18n";
import BlogPostClient from "./BlogPostClient";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50/50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <BlogPostClient post={post} relatedPosts={relatedPosts} locale={locale} />
    </Suspense>
  );
}
