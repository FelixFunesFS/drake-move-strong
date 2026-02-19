
# Fix Primary Button Height to Match Secondary Button

## Problem

The primary "Start Your Reset Week for $50" button has `min-h-[56px] md:min-h-[44px]` but no border, while the secondary "View Schedule" button was reduced to `min-h-[52px] md:min-h-[40px]` with `border-2`. The previous fix only adjusted one side -- now the primary button looks shorter because it lacks the 4px of border height the outline button has.

## Fix

### File: `src/components/Hero.tsx`

On **lines 135 and 139** (both primary CTA button instances), reduce `min-h` by 4px to match the secondary button's visual height, and add a transparent border so both buttons render identically:

```
// Before:
min-h-[56px] md:min-h-[44px]

// After:
min-h-[52px] md:min-h-[40px] border-2 border-transparent
```

Adding `border-2 border-transparent` gives the primary button the same 4px of border as the outline button, making both buttons exactly the same rendered height. The border is invisible so the visual style stays unchanged.
