"use client";

export const dynamic = 'force-dynamic';

import { use } from "react";
import Link from "next/link";
import { Check, ArrowRight, Clock, Mail } from "lucide-react";
import { isLocale, defaultLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ArtistSuccessPage({ params }: Props) {
  const { lang } = use(params);
  const locale = isLocale(lang) ? lang : defaultLocale;
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3">Application Submitted!</h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
            Thank you for applying to join Leish! as an artist. Our team will review your application and get back to you within <strong className="text-gray-700 dark:text-gray-200">2-3 business days</strong>.
          </p>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800 mb-6 text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-rose-50 dark:bg-rose-950/50 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Check your email</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">We&apos;ll send a confirmation and status updates to your inbox.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-50 dark:bg-amber-950/50 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Review takes 2-3 days</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">We verify your portfolio and professional credentials.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-50 dark:bg-green-950/50 rounded-lg flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">You&apos;ll be notified</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Once approved, your profile goes live and clients can book you instantly.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href={`/${locale}/artists`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30">
              Browse Artists <ArrowRight className="w-4 h-4" />
            </Link>
            <br />
            <Link href={`/${locale}`} className="inline-flex text-sm text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
