
# Adjust Spacing on "See It In Action" Video Section

## Problem
The "See It In Action" section on the Schedule page has insufficient top padding and too much bottom spacing below the videos.

## Changes

### File: `src/pages/Schedule.tsx`

**1. Increase top padding on the section**
- Line 131: Change `py-12 md:py-16 lg:py-24` to `pt-16 pb-8 md:pt-24 pb-8 lg:pt-28 lg:pb-12` -- this adds more space above the "SEE IT IN ACTION" eyebrow while reducing the bottom padding

**2. Reduce bottom margin on the inner wrapper**
- Line 133: Change `mb-8 md:mb-12` to `mb-0` on the inner `max-w-7xl` div -- this removes the extra gap between the videos and the section bottom edge

### Summary of spacing changes
- Top padding: increased from `py-12` (48px) to `pt-16` (64px) on mobile, and proportionally on larger screens
- Bottom padding: reduced from matching top to `pb-8` (32px) on mobile, `pb-12` (48px) on desktop
- Inner bottom margin: removed entirely (`mb-0`)
