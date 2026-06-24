# Leish! — Beauty Booking Marketplace

## Stack

| Layer | Technology |
|---|---|
| Framework | Vite + React 19 (SPA) |
| Routing | react-router-dom v7 (BrowserRouter) |
| Database | Neon (serverless Postgres) |
| ORM | Drizzle ORM 0.45.2 |
| Auth | Neon Auth (`@neondatabase/neon-js` SDK, client-side) |
| Styling | Tailwind CSS v4 + tw-animate-css |
| Icons | Lucide React |
| Payments | Billplz (sandbox, escrow flow) |
| Testing | Playwright 1.61.0 |
| Deployment | Vercel (static build `dist/` + serverless `api/`) |

## Database

16 tables in `src/db/schema.ts`:
- **Auth (4):** user, account, session, verificationToken
- **App (12):** categories, artists, artist_categories, studios, studio_categories, services, reviews, bookings, favorites, testimonials, webhook_events, payments, mua_bank_accounts, payouts

Seeded via `scripts/seed.ts` (8 categories, 8 artists, 32 services, 26 reviews, 3 studios, 4 testimonials).

## Auth

- Neon Auth SDK (client-side), supports email/password, email OTP, social providers (Google, GitHub, Vercel)
- Config: `src/lib/auth.ts`
- UI: Neon Auth `<AuthView>` component at `/auth/:pathname`

## API Routes — 8 endpoints (consolidated to fit Vercel Hobby 12-fn limit)

| File | Action | Purpose |
|---|---|---|
| `api/artists.ts` | GET | List artists with category joins |
| `api/artists/[id].ts` | GET | Artist detail + services + reviews + similar |
| `api/studios.ts` | GET | List studios with categories + artist count |
| `api/studios/[id].ts` | GET | Studio detail + artists + services + reviews |
| `api/user.ts` | GET/POST/DELETE `?action=favorites\|review\|cancel-booking` | User actions (favorites sync, review submit, booking cancel) |
| `api/payments.ts` | GET/POST `?action=create-bill\|status\|release\|register-bank\|webhook` | Billplz payment lifecycle (5 actions in 1 fn) |
| `api/cron/release-escrow.ts` | GET/POST | Batch escrow release for held payments |
| `api/webhook.ts` | POST | Generic webhook receiver (validates via CRON_SECRET) |

All API functions are self-contained — they use `neon()` directly with raw SQL. Cannot import from `src/`.

## Routing

| Path | Page | Source |
|---|---|---|
| `/` | Landing | `pages/home.tsx` |
| `/artists` | Artist listing (search/filter/sort) | `pages/artists.tsx` |
| `/artists/:id` | Artist detail + booking flow | `pages/artist-detail.tsx` |
| `/studios` | Studio listing | `pages/studios.tsx` |
| `/studios/:id` | Studio detail | `pages/studio-detail.tsx` |
| `/profile` | User profile + settings | `pages/profile.tsx` |
| `/favorites` | Saved artists (DB-synced when logged in, localStorage otherwise) | `pages/favorites.tsx` |
| `/dashboard/artist` | Artist dashboard (stats, recent bookings) | `pages/dashboard-artist.tsx` |
| `/dashboard/studio` | Studio dashboard | `pages/dashboard-studio.tsx` |
| `/auth/:pathname` | Neon Auth login/signup/OTP | `pages/auth.tsx` |
| `/account/:pathname` | Neon Auth account view | `pages/account.tsx` |
| `*` | 404 Not Found | `pages/not-found.tsx` |

## Build Status

- `npm run build` — Vite build to `dist/`, ~13s
- `npm run dev` — Vite dev server (port 5173+)
- Production bundle: 1.37 MB JS (383 KB gzipped), 154 KB CSS (23 KB gzipped)

## Key Decisions

- **SPA architecture** (Vite + React Router) — migrated from Next.js App Router
- **Neon Auth** (client-side) — migrated from NextAuth.js
- **Catalog data** in Neon DB, fetched via API routes
- **Favorites** — sync to DB (`favorites` table) when user is logged in; fall back to `localStorage` when not
- **API consolidation** — Vercel Hobby plan limits to 12 serverless functions; consolidated payments (5 → 1) and user actions (3 → 1 mapped via `?action=` query param)
- **Billplz in sandbox** mode with full escrow flow (pending → held → released/refunded)

## Commands

```sh
npm run dev       # Vite dev server
npm run build     # Production build (dist/)
npm run preview   # Preview production build
npm run db:push   # Push Drizzle schema to Neon
npm run db:seed   # Seed database
npm run db:setup  # Push + seed
```

## Components

| Component | Description |
|---|---|
| `Navbar` | Frosted glass nav with auth, search, favorites badge |
| `HeroSection` | Animated hero with image grid |
| `CategoriesSection` | Category grid from `constants.ts` |
| `HowItWorks` | 3-step explainer |
| `FeaturedArtists` | Fetches top artists from `/api/artists` |
| `Testimonials` | Client reviews from `constants.ts` |
| `CTASection` | Call-to-action banner |
| `Footer` | Full site footer |
| `ArtistCard` | Reusable artist card with favorite |
| `SearchModal` | Cmd+K search (fetches from API) |
| `ScrollToTop` / `BackToTop` | Scroll position helpers |
| `ImageWithFallback` | Image with error fallback |
| `Skeleton` | Loading skeleton |
| `PaymentStatusBadge` | Payment status UI |
| `ReviewForm` | Review submission (→ `/api/user?action=review`) |
| `ShareButtons` / `PromoCodeInput` / `PWAInstallPrompt` / `AccessibilityMenu` | Feature widgets |
| `NotificationsDropdown` | Notifications bell |
| `LocationMap` | Location display |

## Contexts

| Context | Storage | Description |
|---|---|---|
| `AuthContext` | Neon Auth SDK | Auth state, user session |
| `FavoritesContext` | DB (logged in) / localStorage | Saved artist IDs. Syncs to `/api/user?action=favorites` when authenticated |
| `NotificationsContext` | localStorage | Notifications |
| `ThemeContext` | localStorage | Dark/light mode |
| `ToastContext` | state | Toast notifications |

## Deployment

- **Production URL:** https://leish-clone-cvybwdbg7-shamelalis-projects.vercel.app
- **Region:** iad1 (Vercel default)
- **Build command:** `vite build`
- **Output directory:** `dist/`
- **API:** 8 serverless functions via `/api/*`
- Deploy: `npx vercel deploy --prod --force --scope shamelalis-projects`

## Known Issues / Next Steps

- E2e tests in `e2e/` are stale (expect Next.js routes) — need rewrite for SPA
- Favorites sync on login doesn't auto-merge localStorage to DB (just reads one source)
- Billplz amount conversion: `Math.round(Number(amount) * 100)` may double-convert in `createBillOnBillplz` (called with already-cents `amount`)
- `.env.production` has `VITE_NEON_AUTH_URL=""` (empty) — relies on `.env.local` at build time
- No admin dashboard yet
- `eslint.config.mjs` has warnings about unused ts-eslint directives but builds fine
- Bundle > 500 KB — consider code-splitting via `React.lazy()` per route

## Session Log

### 2026-06-25
- Built full artist/studio listing + detail pages
- Built profile, favorites, dashboard pages (4 stub routes → real)
- Added 404 catch-all route
- Created `src/index.css` with Tailwind v4 + `tw-animate-css` imports + global reset + animation keyframes (fixed missing CSS entry point)
- Fixed all `<Link href>` → `<Link to>` across 8 nav/component files (44 occurrences — React Router uses `to`, not `href`)
- Deleted stale `.next/` directory, duplicate `auth-client.ts`, orphaned `SocialLoginButtons.tsx`
- Fixed `eslint.config.mjs` (was referencing missing `eslint-config-next`)
- Fixed nested `leish-clone/leish-clone/` directory — flattened to single project root
- Migrated `FavoritesContext` to sync DB when user is logged in, localStorage fallback otherwise
- Consolidated 14 API functions → 8 to fit Vercel Hobby plan 12-fn limit (merged 5 payment endpoints into `api/payments.ts`, 3 user actions into `api/user.ts`)
- Updated all client callers (`FavoritesContext.tsx`, `AuthContext.tsx`, `ReviewForm.tsx`) to use new action-based endpoints
- Deployed to production: https://leish-clone-cvybwdbg7-shamelalis-projects.vercel.app
