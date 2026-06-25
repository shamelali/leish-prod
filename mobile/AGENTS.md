# Leish! Mobile App — Expo React Native

## Stack

| Layer | Version |
|---|---|
| Expo SDK | ~56.0.12 |
| React Native | 0.85.3 |
| Expo Router | ~5.0.7 (file-based routing) |
| React Query | ^5.101.1 |
| Axios | ^1.10.0 |
| AsyncStorage | 2.1.2 |
| Expo Vector Icons | ^14.1.0 |
| Expo Web Browser | ^56.0.5 |
| TypeScript | ~6.0.3 |

## Project Structure

```
mobile/
├── app/                         # Expo Router routes
│   ├── _layout.tsx              # Root layout (Auth + Favorites + Query providers)
│   ├── index.tsx                # Entry redirect (→ login or tabs)
│   ├── login.tsx                # Login screen (inline form)
│   ├── signup.tsx               # Register screen (inline form with validation)
│   ├── screens/                 # Stack screens (presentation: card/modal)
│   │   ├── ArtistDetailScreen.tsx
│   │   ├── StudioDetailScreen.tsx
│   │   ├── PaymentScreen.tsx
│   │   ├── DashboardArtistScreen.tsx
│   │   └── DashboardStudioScreen.tsx
│   └── (tabs)/                  # Tab navigator (artists, studios, favorites, profile)
│       ├── _layout.tsx
│       ├── artists.tsx
│       ├── studios.tsx
│       ├── favorites.tsx
│       └── profile.tsx
├── src/
│   ├── components/
│   │   ├── ArtistCard.tsx        # Tappable → ArtistDetailScreen
│   │   ├── StudioCard.tsx        # Tappable → StudioDetailScreen
│   │   ├── SearchModal.tsx       # Full-screen search (debounced API)
│   │   └── ReviewForm.tsx        # Star rating + text submission
│   ├── context/
│   │   ├── AuthContext.tsx       # Mock auth (localStorage) + booking CRUD
│   │   └── FavoritesContext.tsx  # Backend-synced favorites (API when logged in)
│   ├── lib/
│   │   └── queryClient.ts       # TanStack Query client config
│   ├── navigation/
│   │   └── TabLayout.tsx        # Bottom tab bar (Ionicons)
│   ├── screens/
│   │   ├── ArtistsScreen.tsx     # Artist listing + categories + search
│   │   ├── StudiosScreen.tsx     # Studio listing + categories + search
│   │   ├── FavoritesScreen.tsx   # Favorited artists (React Query)
│   │   ├── ProfileScreen.tsx     # User profile + bookings + dashboards
│   │   ├── ArtistDetailScreen.tsx # Detail + booking flow + reviews
│   │   ├── StudioDetailScreen.tsx # Detail + team + contact
│   │   ├── PaymentScreen.tsx     # Billplz via expo-web-browser + poll
│   │   ├── DashboardArtistScreen.tsx # Stats + bookings + activity
│   │   └── DashboardStudioScreen.tsx # Stats + activity
│   ├── services/
│   │   ├── api.ts               # Axios client + artist/studio/category APIs
│   │   └── user.ts              # User actions + payments APIs
│   └── types/
│       └── api.ts               # TypeScript interfaces
```

## Auth Flow

- `AuthContext` uses **AsyncStorage** (mock auth, matching web app pattern)
- `login()` — checks stored users, falls back to demo user (Siti Nurhaliza)
- `register()` — validates fields, saves to `leish_users`, creates profile
- `useAuth()` — safe fallback (never throws), returns `{ user: null, isLoading: true, ... }`
- All tab routes redirect to `/login` if user is null
- Sample bookings included for demo

## API Endpoints

Base URL: `https://leish-clone-cvybwdbg7-shamelalis-projects.vercel.app/api`

| Endpoint | Mobile Usage |
|---|---|
| GET `/artists?category=` | ArtistsScreen listing |
| GET `/artists/:id` | ArtistDetailScreen (detail + services + reviews) |
| GET `/artists?search=` | SearchModal |
| GET `/studios` | StudiosScreen listing |
| GET `/studios/:id` | StudioDetailScreen (detail + artists + services) |
| GET/POST/DELETE `/user?action=favorites&userId=` | FavoritesContext sync |
| POST `/user?action=review` | ReviewForm submission |
| POST `/user?action=cancel-booking` | Profile booking cancel |
| POST `/payments?action=create-bill` | Booking → Billplz bill creation |
| GET `/payments?action=status&paymentId=` | PaymentScreen polling |

## Build Commands

```sh
pnpm start       # Expo dev server
pnpm android     # Run on Android
pnpm ios         # Run on iOS
pnpm web         # Run as web
npx tsc --noEmit # TypeScript check
```

## Current State

- **Route screens**: 14 (5 tabs + 5 stack + 2 auth + 1 index + 1 tab-layout)
- **Source files**: 18 (8 screens + 4 components + 2 contexts + 2 services + 1 lib + 1 types)
- **TypeScript**: Zero errors (source, excluding `__tests__/`)
- **Auth**: Mock (AsyncStorage) — matches web app pattern
- **Payments**: Billplz sandbox via `expo-web-browser`, polling for status
- **Favorites**: Backend-synced when logged in + AsyncStorage fallback
- **Search**: Debounced artist search via SearchModal (React Query)

## Known Issues

- `__tests__/` has Jest errors — needs `@types/jest` installed
- Detail API endpoints use numeric IDs but listing data uses slug IDs — fallback handled client-side
- Push notifications not implemented (requires Expo push + backend)
