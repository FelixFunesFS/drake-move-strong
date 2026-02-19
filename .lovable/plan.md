

# Fix: Mobile Hero Image Still Showing Old Photo

## Root Cause

The code change in `Home.tsx` (switching to a Vite import) was correct, but `index.html` has **two hardcoded references** to the old `/images/hero-mobile.jpg` file that load before React even mounts:

1. **Line 50** -- A `<link rel="preload">` tag that eagerly fetches the old image
2. **Line 64** -- The hero skeleton CSS uses the old image as a background while the page loads

These references cause the browser to display the old public directory image immediately, and since the `srcSet` in the Hero component offers both the old-path image (via preload/cache) and the new Vite-processed image, the browser may prefer the already-cached old one.

## Solution

### File: `index.html`

**Change 1 (Line 50):** Remove or update the preload link. Since the Vite-processed image URL is dynamic (content-hashed), we cannot hardcode it in `index.html`. The best approach is to remove this preload entirely -- the `<img>` tag in Hero.tsx already uses `fetchPriority="high"` and `loading="eager"` which achieves the same fast loading.

```
// Remove this line:
<link rel="preload" as="image" href="/images/hero-mobile.jpg" fetchpriority="high">
```

**Change 2 (Line 64):** Remove the old image reference from the skeleton CSS. Replace it with a simple dark gradient background so the skeleton still looks correct without referencing any specific image file.

```css
/* Before: */
.hero-skeleton::before{content:"";position:absolute;inset:0;background:url('/images/hero-mobile.jpg') center/cover no-repeat;opacity:0.6}

/* After: */
.hero-skeleton::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,hsl(222.2 84% 6%) 0%,hsl(222.2 84% 10%) 100%);opacity:0.6}
```

No changes needed in `Home.tsx` or `Hero.tsx` -- the Vite import and srcSet logic are already correct.

## Summary

| File | Line | Change |
|------|------|--------|
| `index.html` | 50 | Remove preload of old `/images/hero-mobile.jpg` |
| `index.html` | 64 | Replace old image URL in skeleton CSS with gradient |

After these changes, the browser will only load the new Vite-processed mobile image through the `srcSet` in Hero.tsx.
