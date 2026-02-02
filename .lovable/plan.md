
# Enlarge Navigation Logo Without Changing Nav Bar Height

## Current State

| Element | Mobile | Desktop |
|---------|--------|---------|
| Nav bar height | 64px (h-16) | 64px (h-16) |
| Logo height (default) | 40px (h-10) | 48px (h-12) |
| Logo height (scrolled) | 32px (h-8) | 36px (h-9) |

The logo currently uses only ~63% of the available nav bar height on mobile.

## Proposed Changes

Increase logo size to fill more of the nav bar while maintaining proper padding:

| Element | Mobile | Desktop |
|---------|--------|---------|
| Nav bar height | 64px (unchanged) | 64px (unchanged) |
| Logo height (default) | 52px (h-13) | 56px (h-14) |
| Logo height (scrolled) | 40px (h-10) | 44px (h-11) |

This gives the logo ~81% of the nav height on mobile - significantly larger while still having breathing room.

## Technical Details

**File:** `src/components/Navigation.tsx`

Update line 49 to increase logo heights:

```typescript
// Current:
className={cn("w-auto transition-all duration-300", isScrolled ? "h-8 md:h-9" : "h-10 md:h-12")}

// Updated:
className={cn("w-auto transition-all duration-300", isScrolled ? "h-10 md:h-11" : "h-13 md:h-14")}
```

Since Tailwind doesn't have `h-13` by default, I'll use the closest available values:
- `h-[52px]` for mobile default (custom value)
- `h-14` (56px) for desktop default

Final implementation:
```typescript
className={cn("w-auto transition-all duration-300", isScrolled ? "h-10 md:h-11" : "h-[52px] md:h-14")}
```

Also update the width/height attributes and aspect ratio to match the new logo's dimensions for proper sizing.

## Result

- Logo appears significantly larger, especially on mobile
- Nav bar height remains unchanged at 64px/56px
- Smooth transition maintained when scrolling
- Proper visual balance with navigation links
