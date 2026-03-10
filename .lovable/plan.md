

# Full Marketing Copy & Consistency Audit

## Findings

### 1. "This Is For You If..." section on `/try-free-charleston` — UX issue
Current: 5 bullets in a `sm:grid-cols-2` grid → 4 items pair up, 5th sits alone in a half-width column on the left. Visually unbalanced.

**Best approach: Add a 6th bullet to fill the grid.** This is better than spanning the 5th full-width (which draws disproportionate attention to one item) or switching to single-column (which increases scroll). The 6th bullet should address the experienced/returning athlete — the gap in the current list:

Current bullets:
1. New to strength training
2. Restarting after time off
3. Over 30 and need smarter training
4. Tired of being sore for days
5. Looking for guidance, not a generic workout app

**Add:** "Experienced but want coaching that matches your level"

This directly supports the "all levels" positioning and fills the grid.

### 2. Remaining "beginner" language (missed in last round)

| File | Line | Current | Proposed |
|------|------|---------|----------|
| `StrengthTrainingCharleston.tsx` | 186 | "85% of our members are over 30 and **starting from scratch**" | "85% of our members are over 30 — **and training smarter than ever**" |
| `StrengthTrainingCharleston.tsx` | 272 | "beginner-friendly introduction" | "low-pressure introduction — **scaled to your level**" |
| `WestAshleyFitness.tsx` | 45 | FAQ: "We specialize in helping **beginners** and people returning" | "We specialize in helping people at **every level** — whether you're starting fresh or returning" |

### 3. Inconsistent CTA URLs
`StrengthTrainingCharleston.tsx` hardcodes the PunchPass URL on lines 121 and 295 instead of using `INTRO_URL` from `data/pricing.ts`. Should use the centralized constant for maintainability.

### 4. Consistency gaps across pages

| Element | ResetWeek | StrengthTraining | WestAshley | LowImpact |
|---------|-----------|-----------------|------------|-----------|
| "All levels" messaging | Yes | Partial (hero badge updated, but body still says "beginner") | Partial (FAQ still says "beginners") | N/A (different intent) |
| Uses `INTRO_URL` constant | Yes | No (hardcoded) | Yes | Hardcoded |
| "Scaled to your level" | Yes | No | No | No |

## Implementation Plan — 4 files, ~8 edits

### A. `ResetWeekCharleston.tsx`
1. Add 6th bullet to `whoItsFor` array: `"Experienced but want coaching that matches your level"`

### B. `StrengthTrainingCharleston.tsx`
2. Line 186: "starting from scratch" → "and training smarter than ever"
3. Line 272: "beginner-friendly" → "low-pressure introduction to Drake Fitness — scaled to your level. Try 3 classes free over 30 days."
4. Lines 121, 295: Replace hardcoded PunchPass URL with `INTRO_URL` import (already imported? Will verify)
5. Add import for `INTRO_URL` if missing

### C. `WestAshleyFitness.tsx`
6. Line 45 FAQ answer: "helping beginners and people returning to fitness" → "helping people at every level — whether you're starting fresh or returning to fitness"

### D. `LowImpactFitnessCharleston.tsx`
7. Line 91: Replace hardcoded PunchPass URL with `INTRO_URL` import
8. Add `INTRO_URL` import if missing

