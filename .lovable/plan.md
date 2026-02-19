

# Match "View Schedule" Button Height to Primary CTA

## Problem
The secondary "View Schedule" button appears shorter than the primary "Start Your Reset" button because the primary button has two lines of text (due to the `<br>` tag), making it taller. Both buttons share the same `min-h` and `py` values, but the primary button's two-line text pushes it beyond the minimum height.

## Solution

### File: `src/components/Hero.tsx`

Increase the desktop minimum height on the secondary (outline) button instances (lines 145 and 150) to match the rendered height of the two-line primary button:

```
// Before (secondary CTA, both instances):
min-h-[52px] md:min-h-[40px]

// After:
min-h-[52px] md:min-h-[56px]
```

The primary button renders taller on desktop because its text wraps to two lines. Setting `md:min-h-[56px]` on the secondary button ensures it stretches to match, including the 2px border on each side. Mobile sizing remains unchanged since both buttons already match at `min-h-[52px]`.

