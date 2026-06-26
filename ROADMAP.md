# Leish! — Development Roadmap

## Phase 1 — MVP (Complete)

Core marketplace functionality deployed and operational.

- [x] SPA architecture (Vite + React 19 + React Router v7)
- [x] Neon DB schema — 16 tables (auth + app)
- [x] Seed data — 8 categories, 8 artists, 32 services, 26 reviews, 3 studios
- [x] Artist listing + detail pages with search/filter/sort
- [x] Studio listing + detail pages
- [x] Booking flow on artist detail page
- [x] User profile + favorites (DB-sync when logged in, localStorage fallback)
- [x] Billplz payment integration (sandbox escrow — pending → held → released/refunded)
- [x] Cloudinary image upload + delivery
- [x] Neon Auth (email/password, email OTP)
- [x] 3 dashboards (artist, studio, admin)
- [x] Artist onboarding flow
- [x] Review system
- [x] 9 API endpoints (consolidated for Vercel Hobby 12-fn limit)
- [x] Code-splitting — all routes `React.lazy()`
- [x] Tailwind CSS v4 + dark/light theme
- [x] Playwright e2e tests
- [x] Mobile app (Expo React Native) — 14 screens, listing + detail + auth + payments
- [x] CI workflow (GitHub Actions — lint, typecheck, build, e2e)
- [x] Vercel deployment (static + serverless)

## Phase 2 — Short-term (Next 2-4 Weeks)

### Social Authentication
- [ ] Configure Google OAuth credentials in Neon Console
- [ ] Configure GitHub OAuth credentials in Neon Console
- [ ] Enable social provider buttons in `<SocialLoginButtons>`
- [ ] Remove `coming soon` toast — wire up real flow

### Infrastructure & Tooling
- [ ] Fix Cloudflare DNS for `leish.my` — disable proxying (grey cloud) to resolve Vercel SSL
- [ ] Grant GitHub token `workflow` scope so `.github/workflows/` can be pushed
- [ ] Install `@types/express` — fix TS error in `api/admin.ts`
- [ ] Fix `ZodError` property access in `src/lib/validate.ts`
- [ ] Fix `enforceRateLimit` call signature in `api/notifications.ts`
- [ ] Resolve ESLint warnings (`no-explicit-any`, `no-unused-vars`)

### Payments
- [ ] Switch Billplz from sandbox to production API keys
- [ ] Add payout scheduling UI for artists/studios
- [ ] Implement refund flow (admin-initiated)

## Phase 3 — Medium-term (1-3 Months)

### Feature Growth
- [ ] Real-time chat / messaging between clients and artists
- [ ] Push notifications (Expo Push + backend endpoint)
- [ ] Promo codes / discount system
- [ ] Multi-language support (Bahasa Malaysia, Chinese, Tamil — framework already in place)
- [ ] Location-based search (radius/map view)
- [ ] Availability calendar per artist
- [ ] Recurring booking support
- [ ] Waitlist for booked-out artists

### Admin & Operations
- [ ] Payout dashboard (approve/release artist payouts)
- [ ] Dispute resolution workflow
- [ ] Analytics dashboard — booking trends, revenue, user growth
- [ ] Webhook management UI
- [ ] Email notification templates (Brevo — module already created)

### Mobile App
- [ ] Push notification integration
- [ ] Offline support (cached listings)
- [ ] Deep linking for artist/studio share
- [ ] App store submission (iOS + Android)

## Phase 4 — Long-term (3-6 Months)

### Platform Expansion
- [ ] Loyalty / tiered membership program
- [ ] Subscription plans for artists (featured listings, analytics)
- [ ] Marketplace for beauty products (cross-sell)
- [ ] Virtual try-on (AR) integration
- [ ] AI-powered artist recommendations
- [ ] Integrated video consultation booking

### Enterprise
- [ ] White-label solution for studio chains
- [ ] API marketplace for third-party integrators
- [ ] Corporate account management
- [ ] Advanced fraud detection

### Scale
- [ ] Database read replicas / caching layer (Redis)
- [ ] CDN optimization for global delivery
- [ ] Load testing and performance tuning
- [ ] SOC2 / compliance readiness

## Key Milestones

| Milestone | Target | Status |
|---|---|---|
| MVP launch | Jun 2026 | ✅ Done |
| Social auth live | Jul 2026 | ⏳ Blocked (Neon Console config) |
| Production payments | Jul 2026 | ⏳ Blocked (sandbox → live keys) |
| Custom domain `leish.my` | Jul 2026 | ⏳ Blocked (Cloudflare DNS) |
| Mobile app stores | Aug 2026 | 🔜 |
| 50 active artists | Sep 2026 | 📊 |
| Messaging system | Sep 2026 | 🔜 |
| Breakeven (RM 10k/mo GMV) | Q4 2026 | 📊 |

## How to Contribute

See `AGENTS.md` for the full project reference — stack, routing, API endpoints, components, contexts, and build commands.
