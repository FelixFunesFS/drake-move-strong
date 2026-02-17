
# Fix "View Schedule" CTA Hover Contrast

## Problem

The secondary CTA button in the Hero uses `hover:bg-white/10` on a transparent background. Over a dark hero image, this 10% white tint is nearly invisible, failing WCAG contrast requirements.

## Fix

**`src/components/Hero.tsx`** (lines 146 and 150) -- update both secondary CTA button instances:

Change:
```
bg-transparent border-2 border-white text-white hover:bg-white/10
```

To:
```
bg-white/10 border-2 border-white text-white hover:bg-white hover:text-drake-dark
```

This gives the button:
- **Default state**: subtle frosted appearance (`bg-white/10`) with white text/border -- already more visible than fully transparent
- **Hover state**: solid white background with dark text (`hover:text-drake-dark`) -- strong, unmistakable contrast shift

## Result

- Clear visual feedback on hover for both mouse and keyboard focus
- Meets WCAG AA contrast ratio (dark text on white background)
- Complements the gold primary CTA without competing with it

## Files changed

| File | Change |
|---|---|
| `src/components/Hero.tsx` | Update hover classes on both secondary CTA button instances (lines 146 and 150) |
