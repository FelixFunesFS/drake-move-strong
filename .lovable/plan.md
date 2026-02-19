
# Hero Section Mobile Contrast Fix

## The Problem

The hero overlay gradient goes left-to-right (`bg-gradient-to-r from-black/80 via-black/50 to-transparent`). On desktop this works because text is left-aligned against the darkest edge. On mobile, the text spans nearly the full narrow width and reaches into the lighter/transparent zone, causing poor contrast -- especially for the subtitle.

The "Your First Step" CTA card avoids this entirely by using a solid background with the image separated into its own area. We can't do that for the hero (it's a full-bleed image by design), but we can make the overlay smarter.

## The Solution

Two changes to `src/components/Hero.tsx`:

### 1. Responsive gradient overlay (line 96)

Replace the single gradient with a mobile-optimized version that covers more area on small screens:

```
// Current (line 96)
<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

// Updated
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/30 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent" />
```

- **Mobile**: bottom-to-top gradient with stronger coverage across the full image (black/80 at bottom where CTAs are, black/30 at top). This mirrors the pattern used by the reason cards.
- **Desktop**: keeps the existing left-to-right gradient unchanged.

### 2. Boost subtitle contrast (line 123)

```
// Current
"text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"

// Updated
"text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
```

- Full white opacity (from 90%) for better WCAG contrast ratio
- Stronger drop shadow for text separation against any background

## Why This Works

The "Your First Step" card succeeds because text and image occupy separate visual zones. On mobile hero, we can't separate them, but a bottom-to-top gradient creates a similar effect -- a dark "floor" where all the text and buttons sit, fading upward to let the image show through at the top. This is the same proven pattern used by the reason image cards (`from-black/80 via-black/30 to-transparent` bottom-up).

## Files Changed

| File | Change |
|------|--------|
| `src/components/Hero.tsx` line 96 | Responsive gradient: bottom-up on mobile, left-right on desktop |
| `src/components/Hero.tsx` line 123 | Subtitle: full white + stronger drop shadow |
