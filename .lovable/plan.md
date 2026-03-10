

# OG Images, Sharing Strategy & Google Business Profile — Marketing Analysis

## Current State

Every page already has unique SEO meta tags (title, description, canonical) via the `<SEO>` component. The `og-redirect` edge function serves OG tags to social crawlers. The `page_og_images` table + admin UI supports per-page custom OG images. **The infrastructure is already built — it just needs to be fully utilized.**

## Strategic Recommendations

### 1. Google Business Profile — Which Page to Link

**Link: `https://drake.fitness/try-free-charleston`** (the 3-Class Intro landing page)

Why: The GBP website link is the single highest-intent click a local searcher makes. It should go to the lowest-friction conversion page — not the home page. `/try-free-charleston` has:
- A single clear CTA ("Claim 3 Free Classes")
- Zero cost barrier
- Location-specific copy (Charleston, West Ashley)
- Structured data with `"price": "0"`

The home page is a brand page — it educates. The intro page converts.

### 2. Which Pages Should Be Shared (and Where)

| Page | Share Channel | Why |
|------|--------------|-----|
| `/try-free-charleston` | Facebook Ads, Google Ads, GBP, Instagram bio | Primary conversion page — free offer, local intent |
| `/insights/{slug}` | Organic social (FB, LinkedIn, X) | Content marketing — builds authority, shareable |
| `/strength-training-charleston` | Google organic only | SEO money page — not for social sharing |
| `/west-ashley-fitness` | Google organic only | Hyper-local SEO page |
| `/low-impact-fitness-charleston` | Google organic only | Niche SEO page |
| `/` (Home) | Brand mentions, press, directories | General brand awareness |
| `/intro` | Direct outreach, email, text | Clean URL for personal referrals |

**Key insight**: SEO pages rank — they shouldn't be shared socially. The intro page converts — it should be shared everywhere.

### 3. OG Images — What Each Page Needs

Yes, each page can (and should) have its own OG image. The system already supports this via `page_og_images`. Here's the strategy:

| Page | OG Image Strategy | Current Status |
|------|------------------|----------------|
| `/` (Home) | Group training action shot — community energy | Has default `og-image.png` |
| `/try-free-charleston` | **Highest priority** — welcoming group photo, "3 FREE CLASSES" text overlay | Missing custom OG |
| `/strength-training-charleston` | Kettlebell training action shot | Missing custom OG |
| `/intro` | Same as `/try-free-charleston` or distinct referral-focused image | Missing custom OG |
| `/insights/{slug}` | Per-post `og_image` from blog_images bucket | Already working |
| All other pages | AI-cropped from hero images via admin tool | Partially done |

**The `/try-free-charleston` OG image is the most important one to get right** — it's the page people will actually share and see in Facebook/LinkedIn previews.

### 4. Fixes Needed

**a) Stale copy in `StrengthTrainingCharleston.tsx`** — SEO description still says "Start with Reset Week — $50"

**b) Missing OG image mappings** — Several pages in the admin `PAGE_MAPPINGS` are missing:
- `/intro` (the referral-friendly intro page)
- `/strength-training-charleston`
- `/west-ashley-fitness`
- `/low-impact-fitness-charleston`

**c) og-redirect edge function** — Missing entries for `/intro`, `/strength-training-charleston`, `/west-ashley-fitness`, `/low-impact-fitness-charleston`

## Implementation Plan (5 files)

### 1. `src/pages/services/StrengthTrainingCharleston.tsx`
- Fix SEO description: replace "Start with Reset Week — $50" with "Try 3 classes free."

### 2. `src/pages/admin/OGImages.tsx`
- Add missing page mappings: `/intro`, `/strength-training-charleston`, `/west-ashley-fitness`, `/low-impact-fitness-charleston`

### 3. `supabase/functions/og-redirect/index.ts`
- Add static page entries for `/intro`, `/strength-training-charleston`, `/west-ashley-fitness`, `/low-impact-fitness-charleston`

### 4. `src/components/insights/SocialShareButtons.tsx`
- No changes needed — already uses og-redirect URLs

### 5. No new pages needed
- The SEO component already supports per-page `ogImage` props. Once OG images are generated via the admin tool, the og-redirect function will serve them automatically from the `page_og_images` table.

## Summary: How to Think About This

```text
Google Business Profile → /try-free-charleston (converts strangers)
Social Sharing         → /try-free-charleston + blog posts (converts followers)  
Email/Text Referrals   → /intro (clean URL for word-of-mouth)
Google Organic         → /strength-training-charleston, /west-ashley-fitness (ranks for keywords)
Brand/Press            → / (home page)
```

Each page gets its own OG image via the existing admin tool. Priority: generate the `/try-free-charleston` OG image first — it's the most shared URL.

