

## Expanded Plan: Structured Data + Performance & WebP Audit

### Part 1: Structured Data (from approved plan)

**File: `src/components/StructuredData.tsx`**
- Fix broken logo URL: `/logo.png` → `/images/drake-fitness-logo2.png`
- Add `@id: "https://www.drake.fitness#localbusiness"` to LocalBusiness
- Add `hasOfferCatalog` with intro offer + Foundation + Unlimited memberships (from `pricing.ts`)
- Add individual `review` array from `FEATURED_REVIEWS`
- Add `organizationSchema` export
- Add `buildBreadcrumbSchema(items: {name, url}[])` helper

**Pages receiving new schemas:**
- `Home.tsx` — add `organizationSchema`
- `About.tsx` — add `organizationSchema` + breadcrumb
- `Classes.tsx` (redirect, skip), `Coaching.tsx`, `Pricing.tsx`, `FAQ.tsx`, `Insights.tsx`, `Contact.tsx`, `Schedule.tsx` — add breadcrumb schema

---

### Part 2: WebP Image Conversion Audit

**The problem:** 9 files use `?format=webp` (Home, Schedule, Footer, Navigation, etc.) but **8 key pages still import raw `.jpg`/`.png`** — shipping uncompressed originals that are 3-5x larger than WebP equivalents.

**Pages missing WebP conversion:**

| Page | Raw imports | Fix |
|------|-------------|-----|
| `About.tsx` | 14 images (davidImage, mistyImage, kbCollection, studio-*, etc.) | Add `?format=webp&w=768` to all |
| `Coaching.tsx` | 13 images (oneOnOneCoaching, davidCoach, mistyCoach, member-*, etc.) | Add `?format=webp&w=768` |
| `Contact.tsx` | 1 image (davidStorefrontPortrait) | Add `?format=webp&w=768` |
| `SuccessStories.tsx` | 5 images (communityImage, memberYoga, etc.) | Add `?format=webp&w=768` |
| `StrengthTrainingCharleston.tsx` | 4 images (heroKettlebellTraining, davidGobletSquat, etc.) | Add `?format=webp&w=768` |
| `ResetWeekCharleston.tsx` | 7 images (heroGroupClass, proofStrip1-4, etc.) | Add `?format=webp&w=768` |
| `WestAshleyFitness.tsx` | 3 images (heroKettlebellTraining, groupKettlebellTraining, studioMobilityTraining) | Add `?format=webp&w=768` |
| `LowImpactFitnessCharleston.tsx` | 3 images (studioMobilityTraining, communityTurkishGetup, davidGobletSquat) | Add `?format=webp&w=768` |
| `NewYearChallenge.tsx` | 4 images (heroImage, davidImage, mistyImage, studioImage) — only logo has webp | Add `?format=webp&w=768` |
| `Ruckathon.tsx` | 2 images (heroImage, ruckathonImage) — only logo has webp | Add `?format=webp&w=768` |
| `TrustStatsBar.tsx` | 1 image (googleLogoG — no webp) | Add `?format=webp&w=32` |
| `TestimonialCard.tsx` | 1 image (testimonialBg) | Add `?format=webp&w=768` |

**Total: ~58 raw image imports → WebP**

**Hero images on sub-pages** (About hero via VideoHero, Coaching hero, service page heroes) should use `w=1920` for desktop-width heroes, `w=768` for body/card images.

**Additional `vite-env.d.ts` declarations needed** for any new width queries not already declared.

---

### Part 3: LCP / Core Web Vitals Check

- Hero component already uses `fetchPriority="high"` + `<picture>` with mobile source — good
- `OptimizedImage` uses `loading="lazy"` by default, `eager` when `priority=true` — good
- Verify hero images on sub-pages (About, Coaching, service pages) pass `priority={true}` to avoid lazy-loading above-the-fold content
- The `index.html` critical CSS skeleton is already in place

---

### Files Changed Summary

| File | Changes |
|------|---------|
| `src/components/StructuredData.tsx` | Fix logo, add @id, offers, reviews, org schema, breadcrumb builder |
| `src/pages/Home.tsx` | Add organization schema |
| `src/pages/About.tsx` | WebP on 14 imports + breadcrumb + org schema |
| `src/pages/Coaching.tsx` | WebP on 13 imports + breadcrumb |
| `src/pages/Contact.tsx` | WebP on 1 import + breadcrumb |
| `src/pages/Pricing.tsx` | Breadcrumb schema |
| `src/pages/FAQ.tsx` | Breadcrumb schema |
| `src/pages/Insights.tsx` | WebP on 1 import + breadcrumb |
| `src/pages/Schedule.tsx` | Breadcrumb schema |
| `src/pages/SuccessStories.tsx` | WebP on 5 imports |
| `src/pages/services/StrengthTrainingCharleston.tsx` | WebP on 4 imports |
| `src/pages/services/ResetWeekCharleston.tsx` | WebP on 7 imports |
| `src/pages/services/WestAshleyFitness.tsx` | WebP on 3 imports |
| `src/pages/services/LowImpactFitnessCharleston.tsx` | WebP on 3 imports |
| `src/pages/NewYearChallenge.tsx` | WebP on 4 imports |
| `src/pages/Ruckathon.tsx` | WebP on 2 imports |
| `src/components/TrustStatsBar.tsx` | WebP on 1 import |
| `src/components/TestimonialCard.tsx` | WebP on 1 import |
| `src/vite-env.d.ts` | Add any missing `?format=webp&w=N` type declarations |

