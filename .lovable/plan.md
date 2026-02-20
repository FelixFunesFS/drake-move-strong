

# Fix: Force Mobile Hero Image with `<picture>` Element

## Problem

The current `srcSet` approach uses width descriptors (`768w`, `1920w`), but browsers pick the image based on **device pixel ratio x viewport width**. A typical phone (390px CSS width, 3x DPR) calculates 1170 effective pixels, which is closer to 1920w -- so the browser always picks the desktop image.

## Solution

Replace the `<img>` with a `<picture>` element that uses a `<source media="(max-width: 767px)">` query. This forces the mobile image on small screens regardless of pixel density.

## File: `src/components/Hero.tsx` (lines 88-100)

```
Before:
  <img 
    src={img} 
    srcSet={mobileImages[index] ? `${mobileImages[index]} 768w, ${img} 1920w` : undefined}
    alt="" 
    fetchPriority={index === 0 ? "high" : undefined}
    loading={index === 0 ? "eager" : "lazy"}
    decoding={index === 0 ? "sync" : "async"}
    sizes="100vw"
    style={{ objectPosition: imagePositionMobile ?? "center 30%" }}
    className="absolute inset-0 w-full h-full object-cover md:!object-[center_40%] animate-ken-burns"
    aria-hidden="true"
  />

After:
  <picture>
    {mobileImages[index] && (
      <source media="(max-width: 767px)" srcSet={mobileImages[index]} />
    )}
    <img 
      src={img} 
      alt="" 
      fetchPriority={index === 0 ? "high" : undefined}
      loading={index === 0 ? "eager" : "lazy"}
      decoding={index === 0 ? "sync" : "async"}
      style={{ objectPosition: imagePositionMobile ?? "center 30%" }}
      className="absolute inset-0 w-full h-full object-cover md:!object-[center_40%] animate-ken-burns"
      aria-hidden="true"
    />
  </picture>
```

The `<source media="(max-width: 767px)">` tells the browser: "on screens 767px wide or less, use this image" -- no DPR math involved.

## Impact

| Screen | Before | After |
|---|---|---|
| Mobile (under 768px) | Desktop image (DPR issue) | New kettlebell press photo |
| Desktop (768px+) | Turkish getup group photo | Turkish getup group photo (unchanged) |

**File modified:** `src/components/Hero.tsx` only (1 section, lines 88-100)

