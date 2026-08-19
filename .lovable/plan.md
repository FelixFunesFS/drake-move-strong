# Intake form brand color & copy cleanup

## Goal
Align the `/intake` wizard with the Drake Fitness teal/turquoise brand identity and remove redundant step copy.

## Changes
1. **Progress bar color**
   - File: `src/pages/Intake.tsx`
   - Change the progress fill from `bg-accent` (gold) to `bg-primary` (teal/turquoise).

2. **Masthead title color**
   - File: `src/pages/Intake.tsx`
   - Change the "Drake Fitness" eyebrow text from `text-accent` (gold) to `text-primary` (teal/turquoise).

3. **Remove redundant contact sub-copy**
   - File: `src/components/intake/schema.ts`
   - Remove the `sub: 'So David can reach you and keep your file straight.'` line from the "Contact information" step. The step title already communicates the purpose, and the intro screen already says answers go directly to David Drake.

## Verification
- Open `/intake` in the preview.
- Confirm the progress bar and "Drake Fitness" masthead render in teal/turquoise.
- Confirm the "Contact information" step no longer shows the redundant subtitle.
- Confirm no layout or accessibility regressions on mobile and desktop.
