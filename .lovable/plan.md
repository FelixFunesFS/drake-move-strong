# Remove View Schedule / Text Us from Intake Form Views

## Current state
The global `<MobileContactBar />` is rendered unconditionally in `App.tsx` and appears on every page, including `/intake`. It contains the two CTAs the user wants removed: "View Schedule" and "Text Us". The intake page itself does not render these CTAs directly.

## Goal
Suppress the "View Schedule" and "Text Us" mobile sticky bar specifically on the intake form, while keeping the intake wizard's own Back/Continue sticky navigation fully functional on all viewport sizes.

## Plan
1. Update `src/components/MobileContactBar.tsx`
   - Add `/intake` to the existing `HIDDEN_PATHS` array alongside `/try-free-charleston` and `/intro`.
   - This hides the entire mobile contact bar on `/intake` (and only `/intake`), removing both unwanted CTAs in one change.
2. Verify viewport safety
   - The intake page already has its own sticky bottom nav (`fixed inset-x-0 bottom-0 z-30`) for Back/Continue.
   - Removing the overlapping `MobileContactBar` actually frees up bottom-screen real estate and avoids button collisions on small screens.
   - Confirm the intake page's `pb-32` bottom padding and `pb-[env(safe-area-inset-bottom)]` safe-area handling remain sufficient.
3. No changes needed to
   - `src/pages/Intake.tsx`
   - `src/components/intake/*`
   - Back/continue logic or validation

## Expected result
On `/intake`, mobile users see only the form and its native Back/Continue sticky footer. The "View Schedule" and "Text Us" mobile bar is gone.
