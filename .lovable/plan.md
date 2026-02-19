
# Backdrop Blur on "View Schedule" + Hide Scroll Button on Mobile

## 1. Add Backdrop Blur to Secondary CTA

The "View Schedule" button in the hero uses `bg-white/10` (semi-transparent) but no blur, making it hard to read over busy background images on mobile.

**File: `src/components/Hero.tsx`** (lines 146 and 150)

Add `backdrop-blur-md` to both secondary CTA button variants:

```
// Current
"bg-white/10 border-2 border-white text-white ..."

// Updated
"bg-white/10 backdrop-blur-md border-2 border-white text-white ..."
```

This creates a frosted glass effect. On hover (desktop), the button goes fully white so the blur is invisible -- no regression.

## 2. Hide Scroll-to-Top Button on Mobile

**File: `src/components/ScrollToTopButton.tsx`** (line 37)

Update the button className:

```
// Current
"fixed bottom-[72px] md:bottom-6 right-6 z-50 w-12 h-12 bg-primary ... flex items-center justify-center ... md:w-14 md:h-14"

// Updated
"fixed bottom-6 right-6 z-50 hidden md:flex w-14 h-14 bg-primary ... items-center justify-center ..."
```

Changes:
- `hidden md:flex` -- only shows on desktop
- Remove `bottom-[72px]` mobile offset (no longer needed)
- Simplify to single `w-14 h-14` size (desktop only now)

## Summary

| File | Change |
|------|--------|
| `src/components/Hero.tsx` | Add `backdrop-blur-md` to secondary CTA buttons (lines 146, 150) |
| `src/components/ScrollToTopButton.tsx` | Hide on mobile with `hidden md:flex`, simplify positioning |
