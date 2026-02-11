
# Fix PageSpeed Insights Issues

## Overview
Address the three biggest performance problems flagged by Google PageSpeed Insights: unoptimized images (~6.9 MB savings), render-blocking Google Fonts (750ms delay), and missing cache headers.

---

## 1. Convert Community Gallery and Logo Images to WebP (est. ~6.9 MB savings)

### `src/pages/Home.tsx`
The 4 community/gallery images on lines 39-42 are imported as raw JPGs without vite-imagetools processing. Convert them:

```
- import communityGroupPhotoNew from "@/assets/community-group-photo-new.jpg";
- import communityTurkishGetupClass from "@/assets/community-turkish-getup-class.jpg";
- import communityKettlebellRackPair from "@/assets/community-kettlebell-rack-pair.jpg";
- import communityPlankRowsKettlebells from "@/assets/community-plank-rows-kettlebells.jpg";
+ import communityGroupPhotoNew from "@/assets/community-group-photo-new.jpg?format=webp&w=768";
+ import communityTurkishGetupClass from "@/assets/community-turkish-getup-class.jpg?format=webp&w=768";
+ import communityKettlebellRackPair from "@/assets/community-kettlebell-rack-pair.jpg?format=webp&w=768";
+ import communityPlankRowsKettlebells from "@/assets/community-plank-rows-kettlebells.jpg?format=webp&w=768";
```

Also convert other raw JPG imports on lines 15-21 that aren't yet using imagetools:
- `davidCoach`, `coachNick`, `startHereImage`, `kbCollection`, `maceTraining`, `communityMoment`, `memberYoga`, `studioGroupSquats` -- add `?format=webp&w=768`
- `communityGroupPhotoLarge`, `groupOverheadPressClass`, `membersOverheadLungeNaturalLight`, `groupClassPlankWide` -- add `?format=webp&w=768`

### `src/components/Navigation.tsx`
The logo PNG (552 KiB) is imported raw. Convert it:
```
- import drakeLogo from "@/assets/drake-fitness-logo-kettlebell.png";
+ import drakeLogo from "@/assets/drake-fitness-logo-kettlebell.png?format=webp&w=268";
```

### `src/vite-env.d.ts`
Add missing module declarations for any new imagetools query patterns used above (e.g., already has `?format=webp&w=768`).

---

## 2. Fix Render-Blocking Google Fonts (750ms savings)

### `index.html`
The Google Fonts CSS `<link>` is render-blocking. Switch it to a non-blocking pattern using `media="print" onload`:

```html
<!-- Replace the current blocking link -->
- <link href="https://fonts.googleapis.com/css2?..." rel="stylesheet">
+ <link href="https://fonts.googleapis.com/css2?..." rel="stylesheet" media="print" onload="this.media='all'">
+ <noscript><link href="https://fonts.googleapis.com/css2?..." rel="stylesheet"></noscript>
```

The font files themselves are already preloaded, so the CSS sheet just needs to apply non-blockingly. The critical CSS already in `<style>` handles FOUT prevention.

---

## 3. Cache Headers (Cloudflare -- informational only, no code change)

All assets show "Cache TTL: None" because Cloudflare isn't sending `Cache-Control` headers for hashed assets. This requires a Cloudflare Page Rule or Transform Rule:

- `/assets/*` -- `Cache-Control: public, max-age=31536000, immutable` (Vite content-hashed)
- `/images/*` -- `Cache-Control: public, max-age=31536000, immutable`
- `/*.html` -- `Cache-Control: no-cache` or short TTL

This is a Cloudflare dashboard change, not a code change. I'll note it but cannot implement it here.

---

## Summary of Expected Impact

| Issue | Est. Savings |
|---|---|
| WebP community images | ~6.5 MB transfer |
| WebP logo | ~500 KB transfer |
| Non-blocking fonts CSS | ~750ms render-block |
| Cache headers (Cloudflare) | Repeat visit speed |
