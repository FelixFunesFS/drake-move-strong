
# Shift Hero Content Down 15%

## What changes

In `src/components/Hero.tsx`, update the content positioning for the `fullViewport` variant (used on the home page) to push text and CTAs lower.

### Current (line 65)
```
items-start pt-20 md:items-center md:pt-0
```

### Proposed
```
items-start pt-[25vh] md:items-start md:pt-[15vh]
```

**Why `pt-[25vh]` / `pt-[15vh]`?**
- Using viewport-relative units (`vh`) ensures the 15% offset scales proportionally across all screen sizes
- Mobile gets `25vh` (slightly more than 15% to account for the taller aspect ratio and smaller text block)
- Desktop gets `15vh` which is literally 15% of the viewport height
- Switching desktop from `items-center` to `items-start` with explicit top padding gives precise control over vertical placement

## File changed

| File | Change |
|---|---|
| `src/components/Hero.tsx` | Line 65: update `contentPositionClass` padding values |
