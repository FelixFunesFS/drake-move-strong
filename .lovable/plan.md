
# Replace Philosophy Quote with Higher-Converting Quote

## Problem
The current quote ("Strength is a skill. Mobility is the foundation...") is abstract and brand-philosophical. On a conversion-focused landing page like /reset, the quote should reinforce the outcome the visitor wants and reduce hesitation.

## Solution
Add a new quote key `resetPromise` to `BRAND_QUOTES` in `src/data/trustStats.ts` and reference it from `ResetWeekAlt.tsx`. The new quote speaks directly to the Reset Week audience -- people restarting fitness who are worried about injury, intimidation, or failure.

**New quote:**
> "You don't need to be in shape to start. You just need to show up. We'll handle the rest."
> -- David Drake, Drake Fitness

This works better for conversion because:
- It removes the #1 objection ("I'm not fit enough to start")
- It lowers the barrier ("just show up")
- It builds trust ("we'll handle the rest")
- It's personal and warm, not abstract

## Changes

### 1. `src/data/trustStats.ts`
Add a new entry to `BRAND_QUOTES`:
```ts
resetPromise: {
  text: "You don't need to be in shape to start. You just need to show up. We'll handle the rest.",
  attribution: "David Drake, Drake Fitness"
}
```

### 2. `src/pages/ResetWeekAlt.tsx`
Change the PhilosophyQuote `quote` prop from `"philosophy"` to `"resetPromise"`.

### 3. `src/components/PhilosophyQuote.tsx`
No changes needed -- the `QuoteKey` type is derived dynamically from `BRAND_QUOTES` keys, so the new key will be picked up automatically.

## Files Changed
- `src/data/trustStats.ts` (add 4 lines)
- `src/pages/ResetWeekAlt.tsx` (change 1 prop value)
