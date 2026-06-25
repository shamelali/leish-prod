import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/lib/i18n";

const COOKIE_NAME = "leish_locale";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip api, _next, static files, and sitemap/robots
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json" ||
    pathname === "/sw.js" ||
    pathname.startsWith("/images/") ||
    pathname.includes(".") // static file extensions
  ) {
    return;
  }

  // Check if path already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect root or non-localized path to default locale
  const locale =
    request.cookies.get(COOKIE_NAME)?.value ?? request.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ?? defaultLocale;

  const detectedLocale = isLocale(locale) ? locale : defaultLocale;

  const newUrl = new URL(`/${detectedLocale}${pathname === "/" ? "" : pathname}`, request.url);

  const response = NextResponse.redirect(newUrl);
  response.cookies.set(COOKIE_NAME, detectedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api/|_next/|static/|.*\\..*).*)"],
};
