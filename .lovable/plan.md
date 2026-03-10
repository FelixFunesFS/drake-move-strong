

## Sitemap, Robots & Full Publishing Audit

### Current State Issues

**Sitemap (`public/sitemap.xml`)**:
1. `/reset` listed at priority 0.9 — this is a 301 redirect to `/intro`, should not be in sitemap
2. `/reset-week-charleston` listed at priority 0.9 — this is a 301 redirect to `/try-free-charleston`, should not be in sitemap
3. `/try-free-charleston` is **missing** — this is the primary conversion landing page
4. `/intro` is **missing** — general intro landing page
5. `/classes` is **missing** — public page with nav link
6. `/welcome` is **missing** — post-purchase page (debatable, but useful for indexing)
7. Blog slug uses legacy "reset-week" language: `too-out-of-shape-to-start-reset-week-for-beginners`

**Robots.txt**: Currently correct. No changes needed — private routes blocked, social bots allowed, sitemap declared.

**OG Redirect (`og-redirect/index.ts`)**: Missing `/try-free-charleston` entry (already added in prior fix — confirmed present at line 46). Good.

**Blog internal links (`BlogContentComponents.tsx`)**: 10+ links still point to `/reset-week-charleston` instead of `/try-free-charleston`. These work (301 redirect catches them) but are bad practice — every click goes through a redirect, and Google sees low-quality internal linking.

**Structured Data (`StructuredData.tsx`)**: `og-image.jpg` referenced but actual file is `og-image.png`. Minor but could cause broken image in Google Knowledge Panel.

**ChatMessage.tsx**: Still maps `drake.fitness/reset-week-charleston` as a friendly link label — cosmetic but should point to `/try-free-charleston`.

---

### Changes

#### 1. Update `public/sitemap.xml`
- Remove `/reset` (redirect)
- Remove `/reset-week-charleston` (redirect)
- Add `/try-free-charleston` at priority 1.0 (primary conversion page)
- Add `/intro` at priority 0.8
- Add `/classes` at priority 0.7

#### 2. Update `src/components/insights/BlogContentComponents.tsx`
- Replace all `/reset-week-charleston` links with `/try-free-charleston` (10 occurrences)

#### 3. Update `src/components/StructuredData.tsx`
- Fix `og-image.jpg` → `og-image.png` in localBusinessSchema

#### 4. Update `src/components/chat/ChatMessage.tsx`
- Remove the `/reset-week-charleston` friendly link entry (the redirect handles it, but clean up the map)

#### 5. No robots.txt changes needed
The current file is correct and comprehensive.

---

### Marketing Framework for Thinking About This

```text
LAYER 1: INDEXING (Can Google find it?)
  ├── sitemap.xml — only real, non-redirect pages
  ├── robots.txt — block private routes
  └── structured data — accurate business info

LAYER 2: SOCIAL SHARING (Does it look good when shared?)
  ├── og-redirect edge function — metadata for crawlers
  ├── page_og_images table — AI-cropped 1200x630 previews
  └── SEO component — per-page meta tags

LAYER 3: INTERNAL LINKING (Does the site link to itself well?)
  ├── Footer — primary nav paths
  ├── Blog CTAs — link to /try-free-charleston (not redirects)
  ├── ChatBot — friendly link labels
  └── Cross-page CTAs — consistent INTRO_URL usage

LAYER 4: CONVERSION (Does every page push toward action?)
  ├── /try-free-charleston — cold traffic landing
  ├── /intro — warm traffic landing
  ├── /welcome — post-purchase onboarding
  └── Every page CTA → PunchPass via INTRO_URL
```

**Rule of thumb**: Never put a redirect URL in sitemap, internal links, or social shares. Always link to the final destination.

