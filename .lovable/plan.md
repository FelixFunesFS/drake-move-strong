

# Condense `/try-free-charleston` — Reduce Scroll Depth for High-Intent Local Traffic

## Marketing Analysis

This page targets people searching "free fitness charleston" or clicking from Google Business Profile. They already have intent — they don't need a 4-card "Problem" section explaining why gyms fail, followed by a 4-card "Solution" section restating the same ideas. That's ~8 cards of education before the user even sees what they'll experience.

**Current page depth**: Hero → 3-Step → Problem (4 cards + quote) → Solution (4 cards) → Experience (4 items + image) → Perfect For (6 cards + testimonial) → CTA → Trust = **~8 scroll depths on mobile**

The Problem and Solution sections overlap heavily with "Perfect For" — all three address fear, confusion, past failures. The redundancy kills conversion velocity.

## Recommendation: Remove Problem + Solution, Keep "Perfect For"

**Why not condense?** Even a condensed Problem/Solution section is redundant. The "Perfect For" section already handles every objection:
- Fear of injury → "You're Tired of Being Sore"
- Past gym failures → "You're Restarting"  
- Confusion → "You Feel Lost"
- Overwhelm → "You Want Support"

**What to cut** (2 full sections, ~70 lines of JSX):
1. **"THE PROBLEM" section** (lines 143-184) — 4 red X cards + italic quote
2. **"THE SOLUTION" section** (lines 186-216) — 4 blue icon cards

**New page flow**:
```
Hero (CTA) → 3-Step How It Works → Experience + Image → Perfect For + Testimonial → CTA + What's Included → Local Trust
```

This cuts ~2 full mobile scroll depths and gets users to the CTA faster. The "How It Works" strip already establishes simplicity, "Experience" builds confidence, and "Perfect For" handles objections — the Problem/Solution sections are just restating what those sections already cover.

## Files to Change (1 file)

### `src/pages/services/ResetWeekCharleston.tsx`
- Remove the `problems` and `whatIntroSolves` data arrays (lines 37-49)
- Remove the Problem section JSX (lines 143-184)
- Remove the Solution section JSX (lines 186-216)
- Remove unused imports (`X`, `Shield`, `RotateCcw`, `Compass`, `Brain`)

