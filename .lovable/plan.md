

# Revert Mobile Hero Image, Left-Align Text, and Restructure Title

## Changes

### 1. `src/pages/Home.tsx` -- Title restructure and remove mobile image

**Remove the mobile image import** (line 13):
```
// Remove:
import heroImage1Mobile from "@/assets/hero-mobile-new.jpg?format=webp&w=768";
```

**Update the Hero title prop** to break across 3 lines:
- Line 1: Move Better.
- Line 2: Live Stronger.
- Line 3: Stay Pain-Free.

```tsx
title={<>Move Better.<br />Live <span className="text-accent">Stronger.</span> Stay<br />Pain-Free.</>}
```

**Remove `backgroundImagesMobile` prop** from the Hero component so it falls back to the desktop image on all screen sizes.

### 2. `src/components/Hero.tsx` -- Revert to left-align on mobile

Undo the right-alignment changes from the last edit:

- **Line 103**: Remove `flex justify-end md:justify-start`, revert to original:
  ```
  <div className="container mx-auto px-4 pb-20 md:pb-0 relative z-10">
  ```

- **Line 104**: Change `text-right md:text-left` back to `text-left`:
  ```
  <div className={cn("max-w-2xl text-white", centered ? "text-center mx-auto" : "text-left")}>
  ```

- **Line 131**: Change `items-end md:items-start` back to `items-start`:
  ```
  className={cn("... ", centered ? "..." : "items-start")}
  ```

## Summary

| File | Change |
|------|--------|
| `src/pages/Home.tsx` | Remove mobile image import, remove `backgroundImagesMobile` prop, restructure title to 3 lines |
| `src/components/Hero.tsx` | Revert text alignment to left on all screen sizes |

