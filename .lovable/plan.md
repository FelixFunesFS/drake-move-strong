

# More Aggressive Mobile Hero Image Crop

## Current State
The hero image in `src/components/Hero.tsx` (line 91) uses:
- Mobile: `object-[center_15%]` (recently changed from 20%)
- Desktop: `md:object-[center_40%]` (unchanged)

The desktop class (`md:object-[center_40%]`) overrides on screens 768px+, so it will NOT be affected.

## Change

### File: `src/components/Hero.tsx` (line 91)

Update the mobile-only object-position from `center_15%` to `center_5%` for a much more noticeable shift that hides the ceiling lights:

```
// Before:
object-[center_15%] md:object-[center_40%]

// After:
object-[center_5%] md:object-[center_40%]
```

Desktop stays at `center_40%` -- completely untouched. If 5% crops too aggressively on mobile, we can adjust back up to 8% or 10%.

