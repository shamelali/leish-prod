"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
  timestamp: string;
}

// In-memory event store (mock — replace with real analytics SDK)
const eventStore: AnalyticsEvent[] = [];
const MAX_EVENTS = 100;

function track(name: string, properties?: Record<string, string | number | boolean>) {
  const event: AnalyticsEvent = {
    name,
    properties,
    timestamp: new Date().toISOString(),
  };
  eventStore.unshift(event);
  if (eventStore.length > MAX_EVENTS) eventStore.pop();

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", name, properties || "");
  }

  // Store in localStorage for dashboard
  try {
    const existing = JSON.parse(localStorage.getItem("leish-analytics") || "[]");
    existing.unshift(event);
    if (existing.length > 200) existing.length = 200;
    localStorage.setItem("leish-analytics", JSON.stringify(existing));
  } catch {}
}

// Page view tracking
export function usePageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      track("page_view", {
        path: pathname,
        search: searchParams?.toString() || "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
      });
    }
  }, [pathname, searchParams]);
}

// Predefined events
export const analytics = {
  track,

  pageView: (path: string) => track("page_view", { path }),

  artistView: (artistId: string, artistName: string) =>
    track("artist_view", { artistId, artistName }),

  studioView: (studioId: string, studioName: string) =>
    track("studio_view", { studioId, studioName }),

  bookingStarted: (artistId: string, service: string) =>
    track("booking_started", { artistId, service }),

  bookingCompleted: (artistId: string, service: string, price: number) =>
    track("booking_completed", { artistId, service, price }),

  bookingCancelled: (artistId: string, bookingId: string) =>
    track("booking_cancelled", { artistId, bookingId }),

  search: (query: string, resultsCount: number) =>
    track("search", { query, resultsCount }),

  favoriteToggled: (artistId: string, action: "add" | "remove") =>
    track("favorite_toggled", { artistId, action }),

  shareClick: (artistId: string, platform: string) =>
    track("share_click", { artistId, platform }),

  login: (method: string) =>
    track("login", { method }),

  register: (type: string) =>
    track("register", { type }),

  reviewSubmitted: (artistId: string, rating: number) =>
    track("review_submitted", { artistId, rating }),
};

// Analytics dashboard data helper
export function getAnalyticsData() {
  try {
    return JSON.parse(localStorage.getItem("leish-analytics") || "[]");
  } catch {
    return [];
  }
}
