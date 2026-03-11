

## Font Consistency Fix: Inline Stats Grid on Local SEO Pages

### The Issue

The inline stats grid (500+ / 5★ / 25+ / 100%) on `WestAshleyFitness.tsx` and `ResetWeekCharleston.tsx` uses `font-heading` (Montserrat) for the stat numbers:

```
<div className="text-4xl font-heading font-bold text-primary mb-2">
```

Per your established typography standard, **all large statistical numbers should use `font-hero` (Oswald)** — this is what the `TrustStatsBar` component uses across Home, Pricing, and Reset Week. Montserrat is for mixed-case headings; Oswald is for bold numerical data and uppercase headings.

The `LowImpactFitnessCharleston.tsx` page also has the same issue on the "85%" stat card (line 206): `font-heading` instead of `font-hero`.

### Fix

One-line change on each page — swap `font-heading` to `font-hero` on the stat numbers:

**`src/pages/services/WestAshleyFitness.tsx`** (lines 353, 357, 361, 365)
- Change `text-4xl font-heading font-bold` → `text-4xl font-hero font-bold`

**`src/pages/services/ResetWeekCharleston.tsx`** (lines 354, 358, 362, 366)
- Same change on 4 stat number lines

**`src/pages/services/LowImpactFitnessCharleston.tsx`** (line 206)
- Change `font-heading` → `font-hero` on the "85%" stat card

Three files, 9 total line changes. No structural or layout changes needed — purely a typeface swap for consistency with the established design system.

