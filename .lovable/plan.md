
# Reduce Spacing Between Navigation and Schedule

## Overview
Reduce the top padding on the Schedule section to bring it closer to the navigation bar while still ensuring content clears the fixed nav.

## Current State
The schedule section uses `pt-24` (96px) on mobile and `md:pt-28` (112px) on desktop. This creates generous spacing that may feel excessive.

## Proposed Change

### File: `src/pages/Schedule.tsx` (line 129)

**Current:**
```tsx
<section className="pt-24 pb-8 md:pt-28 md:pb-12 bg-background">
```

**Updated:**
```tsx
<section className="pt-20 pb-8 md:pt-24 md:pb-12 bg-background">
```

## Technical Details
- **Mobile**: Reduce from `pt-24` (96px) to `pt-20` (80px)
- **Desktop**: Reduce from `md:pt-28` (112px) to `md:pt-24` (96px)
- Navigation height is ~56px, so these values still provide adequate clearance
- This brings the schedule ~16px closer to the nav on both breakpoints

## Visual Impact
The schedule title and grid will appear tighter to the navigation, creating a more compact, action-focused layout.
