

# Fix Longevity Unlimited "Best Value" Badge Cropping and Card Sizing

## Problem

The "Best Value" badge on the Longevity Unlimited card is cropped because:
- The badge is positioned with `absolute -top-4` (16px above the card edge)
- The card itself shifts up with `md:-translate-y-2` (8px)
- The parent grid container has no extra space (overflow or padding) to accommodate this

Additionally, the `-translate-y-2` on the right card makes the two cards visually uneven in height.

## Fix (1 file: `src/pages/Pricing.tsx`)

### 1. Add overflow-visible and top padding to the grid container (line 135)
Change the grid wrapper from:
```
grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto
```
to:
```
grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto pt-6 overflow-visible
```

The `pt-6` gives the badge room to render above the card. The `overflow-visible` ensures nothing clips it.

### 2. Remove the upward shift from the Longevity card (line 186)
Remove `md:-translate-y-2` from the card's className. This was making the right card sit higher than the left card and contributing to the badge being cropped. Both cards will now align at the same top edge, and `h-full` on both cards already ensures they match height within the grid.

### 3. Ensure the AnimatedSection wrapper allows overflow (line 185)
Add `overflow-visible` to the AnimatedSection wrapping the Longevity card so the badge isn't clipped by the animation container.

## Result
- Badge fully visible above the card
- Both cards aligned and equal height
- Fully responsive -- `pt-6` scales well on all screens

