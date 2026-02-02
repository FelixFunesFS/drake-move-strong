

# Reduce Schedule Section Spacing by Additional 10px

## Overview
Further reduce the top padding on the Schedule section by approximately 10px on both mobile and desktop breakpoints.

## Current State
- Mobile: `pt-16` (64px)
- Desktop: `md:pt-20` (80px)

## Proposed Change

### File: `src/pages/Schedule.tsx` (line 129)

**Current:**
```tsx
<section className="pt-16 pb-8 md:pt-20 md:pb-12 bg-background">
```

**Updated:**
```tsx
<section className="pt-14 pb-8 md:pt-[70px] md:pb-12 bg-background">
```

## Technical Details
- **Mobile**: Reduce from `pt-16` (64px) to `pt-14` (56px) - saves 8px (closest Tailwind value)
- **Desktop**: Reduce from `md:pt-20` (80px) to `md:pt-[70px]` (70px) - saves exactly 10px
- Note: `pt-14` is 56px (8px reduction) since Tailwind doesn't have a 54px preset

## Caution
The navigation bar is approximately 56-64px tall. With `pt-14` (56px) on mobile, content will be right at the edge of the nav. If any content gets hidden behind the nav, we may need to adjust back up slightly.

