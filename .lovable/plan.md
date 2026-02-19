
# Widen Primary CTA Button & Match Heights on Desktop

## Changes

### File: `src/components/Hero.tsx`

**1. Make primary button wider on desktop** -- increase desktop horizontal padding from `md:px-8` to `md:px-12` on both primary CTA instances (lines 135 and 139).

**2. Ensure both buttons have matching rendered heights** -- both buttons already have `border-2` and `min-h-[52px] md:min-h-[40px]`, so heights are aligned. No height changes needed.

#### Lines 135 and 139 (primary CTA):
```
// Before:
px-6 sm:px-8 md:px-8

// After:
px-6 sm:px-8 md:px-12
```

This widens the primary "Start Your Reset / Week for $50" button on desktop while keeping mobile sizing unchanged. The secondary "View Schedule" button stays at `md:px-8`, creating a clear visual hierarchy where the primary CTA is more prominent.
