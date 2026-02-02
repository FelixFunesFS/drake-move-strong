

# Reduce Schedule Section Spacing by Half

## Overview
Further reduce the top padding on the Schedule section to bring content even closer to the navigation bar.

## Current State
The schedule section currently uses:
- Mobile: `pt-20` (80px)
- Desktop: `md:pt-24` (96px)

## Proposed Change

### File: `src/pages/Schedule.tsx` (line 129)

**Current:**
```tsx
<section className="pt-20 pb-8 md:pt-24 md:pb-12 bg-background">
```

**Updated:**
```tsx
<section className="pt-16 pb-8 md:pt-20 md:pb-12 bg-background">
```

## Technical Details
- **Mobile**: Reduce from `pt-20` (80px) to `pt-16` (64px) - saves 16px
- **Desktop**: Reduce from `md:pt-24` (96px) to `md:pt-20` (80px) - saves 16px
- Navigation height is ~56-64px, so `pt-16` (64px) is the minimum safe clearance
- This cuts the visible gap between nav and content roughly in half

## Note
Going below `pt-16` on mobile would risk content being hidden behind the fixed navigation bar. If it still feels too spacious after this change, we can explore reducing the nav height or adjusting the title margin instead.

