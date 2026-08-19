# Intake form brand color & copy cleanup

## Goal
Align the `/intake` wizard with the Drake Fitness teal/turquoise brand identity and remove redundant step-level copy that duplicates the progress bar.

## Changes
1. **Progress bar color**
   - File: `src/pages/Intake.tsx`
   - Change the progress fill from `bg-accent` (gold) to `bg-primary` (teal/turquoise).

2. **Masthead title color**
   - File: `src/pages/Intake.tsx`
   - Change the "Drake Fitness" eyebrow text from `text-accent` (gold) to `text-primary` (teal/turquoise).

3. **Remove redundant contact step header**
   - File: `src/components/intake/schema.ts`
   - The progress bar already shows the current step name ("Contact"), and the intro masthead already explains that answers go directly to David Drake.
   - Remove both the `title: 'Contact information'` and `sub: 'So David can reach you and keep your file straight.'` from the first step so the form card opens cleanly with the fields.

## Verification
- Open `/intake` in the preview.
- Confirm the progress bar and "Drake Fitness" masthead render in teal/turquoise.
- Confirm the first step card no longer repeats a "Contact information" heading or subtitle.
- Confirm no layout or accessibility regressions on mobile and desktop.

