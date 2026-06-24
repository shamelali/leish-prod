import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { NotificationsProvider } from "@/context/NotificationsContext";
import BackToTop from "@/components/BackToTop";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Leish! | Your Beauty, Perfected",
    template: "%s | Leish!",
  },
  description:
    "Book Beauty. Anywhere. Discover makeup artists and studios, view real-time availability, and secure your booking in minutes.",
  keywords: [
    "makeup artist",
    "beauty booking",
    "Malaysia",
    "makeup studio",
    "Hari Raya",
    "hijab makeup",
    "bridal makeup",
    "event makeup",
  ],
  authors: [{ name: "Leish!" }],
  openGraph: {
    type: "website",
    locale: "en_MY",
    siteName: "Leish!",
    title: "Leish! | Your Beauty, Perfected",
    description:
      "Book Beauty. Anywhere. Discover makeup artists and studios across Malaysia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leish! | Your Beauty, Perfected",
    description:
      "Book Beauty. Anywhere. Discover makeup artists and studios across Malaysia.",
  },
  manifest: "/manifest.json",
    icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-white dark:bg-neutral-950`}><a href="#main-content" className="skip-link">Skip to main content</a>
        <AuthProvider>
          <ThemeProvider>
            <FavoritesProvider>
              <NotificationsProvider>
                <ToastProvider>
                  <Suspense>
                    <ScrollToTop />
                  </Suspense>
                  {children}
                  <BackToTop />
                <PWAInstallPrompt />
                <AccessibilityMenu />
                </ToastProvider>
              </NotificationsProvider>
            </FavoritesProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
