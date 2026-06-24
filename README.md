# Leish! Clone — Beauty Marketplace

A full-featured clone of [leish.my](https://leish.my), Malaysia's luxury beauty marketplace for discovering and booking makeup artists.

## ✨ Features

### Pages
- **Homepage** — Hero with animated image grid, categories with image overlays, featured artists, how-it-works, testimonials, CTA
- **Artists Listing** — Search, category filtering (9 categories), sort by rating/price, grid/list view toggle
- **Artist Detail** — Full profile with portfolio lightbox, verified badges, services, date/time booking flow, reviews with rating breakdown, similar artists
- **Studios** — Browse beauty studios across Malaysia
- **Favorites** — Saved artists (placeholder)
- **Custom 404** — Branded not-found page

### UI/UX
- 🎨 Rose/Pink gradient design system matching Leish.my
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth animations (fade-in-up, float, scale-in, shimmer)
- 🔍 Sticky filter bar with search and category pills
- 💜 Heart/favorite buttons on artist cards
- 🖼️ Portfolio lightbox with keyboard navigation
- 🏷️ Verified artist badges
- 💬 Floating WhatsApp button
- 🌊 Frosted glass navbar with scroll detection
- 📊 Rating breakdown bars on reviews

### Data
- **8 artists** with full bios, portfolios, services, reviews
- **9 categories** (Bridal, Event, Photoshoot, SFX, Lessons, Hari Raya, CNY, Traditional Malay, Hijab)
- **3 studios** with descriptions
- **4 testimonials** with star ratings

## 🛠 Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (icons)

## 🚀 Getting Started

### With npm
```bash
npm install
npm run dev        # Development server
npm run build      # Production build
npm start          # Production server
```

### With pnpm
```bash
pnpm install
pnpm dev           # Development server
pnpm build         # Production build
pnpm start         # Production server
```

> **Note:** If `pnpm approve-builds` prompts you, select all packages and set them to `true` (allow builds). This is needed for native dependencies like `sharp`.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Homepage
│   ├── loading.tsx             # Global loading state
│   ├── not-found.tsx           # Custom 404
│   ├── globals.css             # Design tokens + animations
│   ├── artists/
│   │   ├── page.tsx            # Listing (with Suspense)
│   │   ├── ArtistsPageClient.tsx # Search, filter, sort
│   │   └── [id]/page.tsx       # Detail + booking flow
│   ├── studios/page.tsx        # Studios listing
│   └── favorites/page.tsx      # Favorites page
├── components/
│   ├── Navbar.tsx              # Sticky navbar with scroll effect
│   ├── HeroSection.tsx         # Animated hero
│   ├── CategoriesSection.tsx   # Category cards with images
│   ├── FeaturedArtists.tsx     # Featured artists grid
│   ├── HowItWorks.tsx          # 3-step process
│   ├── Testimonials.tsx        # Client reviews
│   ├── CTASection.tsx          # Call to action
│   ├── ArtistCard.tsx          # Reusable card with like
│   └── Footer.tsx              # Full footer
└── data/
    └── artists.ts              # All mock data (artists, categories, studios, testimonials)
```

## 📄 License

Educational/learning project. Not affiliated with Leish.my.
