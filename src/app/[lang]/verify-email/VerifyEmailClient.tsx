"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function VerifyEmailPage({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (token) {
      // Simulate verification API call
      const timer = setTimeout(() => {
        setStatus("success");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setStatus("error");
    }
  }, [token]);

  const handleResend = () => {
    if (email) {
      setStatus("loading");
      setTimeout(() => setStatus("success"), 1500);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <Navbar />
      <div className="max-w-md mx-auto px-4 pt-32 pb-16">
        {status === "loading" && (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verifying your email...</h1>
            <p className="text-gray-500 dark:text-gray-400">Please wait while we confirm your email address.</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center animate-scale-in">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Email Verified! 🎉</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Your email has been successfully verified. You can now access all features of Leish!.
            </p>
            <div className="space-y-3">
              <Link
                href={`/${locale}/login`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/artists`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-neutral-700 hover:border-rose-200 dark:hover:border-rose-700 transition-all"
              >
                Browse Artists
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="text-center animate-scale-in">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verification Link Expired</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              The verification link is invalid or has expired. Please request a new one.
            </p>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6 mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resend verification email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                />
              </div>
              <button
                onClick={handleResend}
                disabled={!email.includes("@")}
                className="w-full mt-3 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Resend Verification Email
              </button>
            </div>

            <Link href={`/${locale}/login`} className="text-sm text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium">
              Back to Login
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
