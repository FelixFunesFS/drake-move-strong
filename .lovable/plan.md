

# Fix OG Image Cropping — Social Platforms Cut Photos in Half

## The Problem

Social media platforms (Facebook, LinkedIn, X) display link previews at a fixed **1.91:1 aspect ratio** (approximately 1200×630px). The current OG images are training photos imported through Vite with arbitrary aspect ratios — tall portraits, square crops, etc. When a platform forces these into a wide rectangle, the subject gets cut in half (heads chopped, bodies split at the waist).

There's also a **conflict in `index.html`**: lines 84–85 contain hardcoded `og:image` and `twitter:image` tags pointing to an old Google Storage URL. These compete with the dynamic tags injected by the `<SEO>` component via `react-helmet`, and crawlers may pick up the wrong one depending on which tag appears first.

## Root Cause

1. **Wrong aspect ratio**: Training photos are shot in portrait/square orientation. Social platforms crop them to landscape 1.91:1, cutting the subject.
2. **Hardcoded conflict**: `index.html` still has old Google Storage OG image tags that may override or duplicate the React-injected tags.
3. **WebP format risk**: Some older social crawlers don't support WebP. The Home page passes a `?format=webp&w=1920` processed image.

## Recommended Approach

Use a **single, purpose-built OG image** (`/og-image.png`) as the default for all main pages, and only override it for blog posts (which have landscape thumbnails). This is the industry-standard approach — a branded 1200×630 image with the Drake Fitness logo, tagline, and a background photo works far better than uncontrolled photo crops.

For blog posts, the thumbnails are already landscape-oriented (aspect-video = 16:9), so they work well as OG images.

## Changes

### 1. `index.html` — Remove conflicting hardcoded OG image tags

Delete lines 84–85 (the Google Storage `og:image` and `twitter:image` tags). The `<SEO>` component already injects these dynamically for every page. Keeping both causes duplicate/conflicting tags.

### 2. `src/pages/Home.tsx` — Remove `ogImage` prop (use default)

Remove `ogImage={heroImage1Desktop}` from the `<SEO>` call. The default `https://drake.fitness/og-image.png` will be used — a properly sized, branded social image.

### 3. `src/pages/About.tsx` — Remove `ogImage` prop (use default)

Remove `ogImage={studioTeamPhoto}`. Fall back to the branded default.

### 4. `src/pages/Schedule.tsx` — Remove `ogImage` prop (use default)

Remove `ogImage={groupOverheadPressClass}`. Fall back to the branded default.

### 5. `src/pages/Coaching.tsx` — Remove `ogImage` prop (use default)

Remove `ogImage={davidCoachingTurkishGetup}`. Fall back to the branded default.

### 6. `src/pages/Pricing.tsx` — Remove `ogImage` prop and unused import

Remove `ogImage={studioFullView}` and the `studioFullView` import (if only used for OG). Fall back to the branded default.

### 7. `src/pages/Contact.tsx` — Remove `ogImage` prop (use default)

Remove `ogImage={davidStorefrontPortrait}`. Fall back to the branded default.

### 8. `src/pages/Insights.tsx` — Remove `ogImage` prop (use default)

Remove `ogImage={heroImage}`. Fall back to the branded default.

### 9. `src/pages/InsightPost.tsx` — Keep `ogImage={post.thumbnail}` (already landscape)

Blog post thumbnails are rendered in `aspect-video` (16:9) containers, so they're already the correct aspect ratio for social sharing. No change needed here.

## Summary

| Page | Current OG Image | After Fix |
|---|---|---|
| Home | `hero-group-turkish-getup.webp` (cropped) | `og-image.png` (branded, 1200×630) |
| About | `studio-team-photo.jpg` (cropped) | `og-image.png` |
| Schedule | `group-overhead-press-class.jpg` (cropped) | `og-image.png` |
| Coaching | `david-coaching-turkish-getup.jpg` (cropped) | `og-image.png` |
| Pricing | `studio-full-view.jpg` (cropped) | `og-image.png` |
| Contact | `david-kettlebell-storefront.jpg` (cropped) | `og-image.png` |
| Insights | `insights-hero.jpg` (cropped) | `og-image.png` |
| Blog Posts | `post.thumbnail` (16:9 ✓) | No change — already correct |

## Future Enhancement

If you want unique images per page without cropping, the right approach is to create purpose-built 1200×630 graphics for each page (logo + text overlay + background photo) using the Social Generator tool already built into the admin panel. That's a separate design task.

