

# Update Mobile Contact Bar Colors

## Overview
Change the sticky mobile footer bar ("View Schedule" and "Text Us") from white background with teal text to a teal background with white text for better visibility and brand consistency.

## Changes

### File: `src/components/MobileContactBar.tsx`

- Change the outer container background from `bg-white border-t border-border` to `bg-primary border-t border-primary/80`
- Change the divider from `bg-border` to `bg-white/20`
- Update both link/button text colors from `text-primary` to `text-white`
- Update hover/active states from `hover:bg-gray-50 active:bg-gray-100` to `hover:bg-primary/80 active:bg-primary/70`

This ensures white text on teal background (WCAG AAA contrast ratio of ~9.5:1 for #FFFFFF on #0B4A52).

