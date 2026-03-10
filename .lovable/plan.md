

## Change Try Free Charleston Hero Overlay

Replace the current teal gradient overlay on the `/try-free-charleston` hero with the same dark overlay pattern used on the home page hero.

### Current → New

**Current** (line 89 of `ResetWeekCharleston.tsx`):
```
bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80
```

**New** (matches `Hero.tsx`):
```
bg-gradient-to-t from-black/75 via-black/45 to-black/20 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent
```

This uses a bottom-to-top dark gradient on mobile (preserving image visibility at top) and a left-to-right dark gradient on desktop (dark left for text readability, transparent right to show the image). One line change.

