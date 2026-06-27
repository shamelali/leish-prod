# Leish! Development Roadmap

## Phase 1 — Core Infrastructure (Done ✓)
- [x] Vite + React 19 SPA setup
- [x] React Router v7 routing
- [x] Neon DB + Drizzle ORM schema (16 tables)
- [x] Neon Auth (email/password, OTP)
- [x] Artist/Studio listing + detail pages
- [x] User profile, favorites, dashboards
- [x] Cloudinary image upload + delivery
- [x] Billplz sandbox integration (escrow flow)
- [x] Seeded database (8 categories, 8 artists, 32 services, 26 reviews)
- [x] ESLint cleanup (57 parse errors → 0)

## Phase 2 — Payments & Tooling (Done ✓)
- [x] Production-ready Billplz with env var toggle
- [x] Admin refund flow
- [x] Artist payout scheduling + bank registration
- [x] Social auth buttons (Facebook, Instagram, Apple)
- [x] Mobile test suite (Jest)

## Phase 3 — Production Hardening
- [ ] Enable social auth in Neon Console (Google/GitHub OAuth credentials)
- [ ] Configure Cloudflare DNS — disable proxying on `leish.my` (grey cloud)
- [ ] Set production Billplz credentials in Vercel:
  - `BILLPLZ_API_URL` → `https://www.billplz.com/api/v3`
  - `BILLPLZ_API_KEY`
  - `BILLPLZ_COLLECTION_ID`
  - `BILLPLZ_SIGNATURE_KEY`
  - `NEXT_PUBLIC_URL`
- [ ] Final ESLint warnings cleanup (`no-explicit-any`, `no-unused-vars`)
- [ ] GitHub Actions CI pipeline (Neon branching for PRs)

## Phase 4 — Polish & Growth
- [ ] PWA install prompt + service worker
- [ ] Push notifications
- [ ] Email notifications for bookings/payouts
- [ ] Advanced search (filters, radius, availability)
- [ ] Booking calendar integration
- [ ] Review verification (booking-confirmed only)
- [ ] MUA portfolio galleries with before/after slider
- [ ] Analytics dashboard

## Phase 5 — Scale
- [ ] Load testing / performance audit
- [ ] Redis caching layer
- [ ] Multi-region deployment
- [ ] Mobile app (React Native / Expo)