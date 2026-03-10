

# Condense "Perfect For" — 6 Cards → 3 Tight Lines

## The Problem

Six cards with icons, titles, and descriptions is a lot of real estate for a single idea: "this is for you." On mobile, that's 6 full card heights before the user reaches the CTA. Each card says essentially the same thing in different words: "you're not sure, and that's okay."

## The Insight

These 6 items reduce to 3 audience archetypes:
1. **New to training** (Beginner + Feel Lost)
2. **Coming back** (Restarting + Over 30)
3. **Fed up with bad fitness** (Tired of Being Sore + Want Support)

## Recommendation: Replace 6 Cards with a Single Compact Block

Instead of 6 icon cards in a 2-column grid, use a tight inline list — no icons, no descriptions. The titles alone do all the work. The descriptions are just restating what the title already implies.

**Proposed format** — a single centered block with a heading and 6 short phrases as check-marked items in a 2-column list (similar to the "What's Included" section below it):

```
WHO IT'S FOR

✓ Complete beginners          ✓ Restarting after time off
✓ Over 30 and need smarter    ✓ Tired of being sore for days
  training
✓ Not sure where to start     ✓ Want coaching, not a gym
                                 membership
```

This cuts the section from ~6 scroll heights on mobile to ~2, while keeping every audience signal intact.

## Changes — `src/pages/services/ResetWeekCharleston.tsx`

1. **Remove** the `perfectFor` array (lines 45-52) and its 6-card grid JSX
2. **Replace** the entire "Perfect For" section with a compact checklist layout:
   - Keep the section wrapper and dark `bg-primary` background
   - Eyebrow: "WHO IT'S FOR"
   - Heading: "This Is For You If..."
   - 2-column grid of 6 check-marked single-line items (no icons, no descriptions — just the audience label)
   - Keep the testimonial quote block unchanged below
3. **Remove** unused icon imports: `Sprout`, `RefreshCw`, `Calendar`, `Frown`, `HelpCircle`, `HeartHandshake`

One file changed. No structural or routing changes.

