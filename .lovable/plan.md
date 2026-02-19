
# Fix Hero Button Height Mismatch

## Problem

The "View Schedule" outline button has `border-2` (2px top + 2px bottom = 4px extra height) making it visually taller than the primary button.

## Fix

### File: `src/components/Hero.tsx`

On **lines 146 and 150** (both secondary CTA button instances), reduce `min-h` values by 4px to compensate for the border:

```
// Before:
min-h-[56px] md:min-h-[44px]

// After:
min-h-[52px] md:min-h-[40px]
```

No other changes needed -- the `py-4` padding is already handled by `min-h`, so adjusting the min-height alone aligns both buttons.
