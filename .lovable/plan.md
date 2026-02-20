
# Replace Home Hero Image on Mobile Only

## What's Changing

The uploaded photo (kettlebell overhead press group class) will replace the current hero background image on mobile screens only. Desktop continues showing the existing Turkish getup group image.

## How It Works

The Hero component already supports a `backgroundImagesMobile` prop that generates a `srcSet` with the mobile image at 768w and the desktop image at 1920w. The browser automatically picks the right one based on screen width.

### Steps

1. **Copy the uploaded image** into `src/assets/hero-mobile-kb-press.jpg`

2. **`src/pages/Home.tsx`** -- Import the new mobile image and pass it via `backgroundImagesMobile`:

```tsx
import heroMobileImage from "@/assets/hero-mobile-kb-press.jpg?format=webp&w=768";

<Hero
  backgroundImages={[heroImage1Desktop]}
  backgroundImagesMobile={[heroMobileImage]}
  imagePositionMobile="center 40%"
  // ... all other props unchanged
/>
```

The `imagePositionMobile` value changes from `"center 56%"` to `"center 40%"` since this new photo has a better composition -- the subjects are more centered, so less aggressive cropping is needed.

3. **No changes to `Hero.tsx`** -- the `srcSet` logic (line 91) already handles this:
```tsx
srcSet={mobileImages[index] ? `${mobileImages[index]} 768w, ${img} 1920w` : undefined}
```

## Impact

| Screen | Image Shown |
|---|---|
| Mobile (under 768px) | New kettlebell overhead press group photo |
| Desktop (768px+) | Current Turkish getup group photo (unchanged) |

**Files modified:** `src/pages/Home.tsx` (import + prop addition)
**Files added:** `src/assets/hero-mobile-kb-press.jpg` (copied from upload)
