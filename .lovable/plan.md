

# Set Unique OG Images Per Page and Fix Blog Post OG Images

## Problem

Every page on the site currently uses the same default `og-image.png` for social sharing previews. No page passes the `ogImage` prop to the `<SEO>` component, and blog posts don't pass their thumbnails either. This means sharing any page on Facebook, LinkedIn, or X shows the same generic image.

## Approach

Since Vite-imported images produce hashed paths (e.g., `/assets/hero-group-abc123.webp`), we need to convert them to absolute URLs by prepending `https://drake.fitness`. A small helper will handle this.

## Changes

### 1. `src/components/SEO.tsx` -- Add helper for absolute OG image URLs

Add a utility that ensures any image path becomes a full `https://drake.fitness/...` URL. This handles both already-absolute URLs and relative Vite-hashed paths.

### 2. `src/pages/Home.tsx` -- Add `ogImage` prop

Use the hero image (`hero-group-turkish-getup.jpg`) as the OG image for the homepage.

### 3. `src/pages/About.tsx` -- Add `ogImage` prop

Use the team/studio image (`studio-team-photo.jpg` or `group-kettlebell-training.jpg`) as the OG image.

### 4. `src/pages/Schedule.tsx` -- Add `ogImage` prop

Use one of the class gallery images (`community-group-photo-large.jpg` or `group-overhead-press-class.jpg`).

### 5. `src/pages/Coaching.tsx` -- Add `ogImage` prop

Use `one-on-one-coaching.jpg` or `david-coaching-turkish-getup.jpg`.

### 6. `src/pages/Pricing.tsx` -- Add `ogImage` prop

Use the default `og-image.png` (already branded) or a studio image. Since Pricing has no hero image import, we'll use an existing asset like `studio-full-view.jpg`.

### 7. `src/pages/Contact.tsx` -- Add `ogImage` prop

Use `david-kettlebell-storefront-portrait.jpg` (already imported).

### 8. `src/pages/Insights.tsx` -- Add `ogImage` prop

Use a blog-representative image like the insights hero.

### 9. `src/pages/InsightPost.tsx` -- Pass `post.thumbnail` as `ogImage`

This is the key fix for blog posts. Each post already has a `thumbnail` field. Pass it through the absolute URL helper so every blog post gets its own unique social preview image.

## Image-to-Page Mapping

| Page | OG Image Source | Already Imported? |
|---|---|---|
| Home | `hero-group-turkish-getup.jpg` | Yes |
| About | `group-kettlebell-training.jpg` | Yes |
| Schedule | `group-overhead-press-class.jpg` | Yes |
| Coaching | `david-coaching-turkish-getup.jpg` | Yes |
| Pricing | `studio-full-view.jpg` | Need to import |
| Contact | `david-kettlebell-storefront-portrait.jpg` | Yes |
| Insights | `insights-hero-turkish-getup-class.jpg` | Need to check |
| Each Blog Post | `post.thumbnail` (dynamic) | Yes (from data) |

## Technical Detail

The `SEO` component will gain a small helper:

```typescript
function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `https://drake.fitness${path.startsWith('/') ? '' : '/'}${path}`;
}
```

This is applied to the `ogImage` value before injecting into meta tags. Pages simply pass their imported image variable as `ogImage={myImage}`, and Vite's import resolution + this helper ensures crawlers get a full URL.

