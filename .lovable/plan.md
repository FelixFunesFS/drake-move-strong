# Intake form spacing fix

## Current state
The intake wizard places the privacy line (`"Your answers are sent directly to David..."`) immediately above the Back/Continue button bar. On desktop the button bar uses `md:pt-0`, so the gap between the privacy text and the buttons is only the `mt-6` on the paragraph plus the paragraph's line height. Visually this feels cramped and the two elements blend together.

## Goal
Create clear vertical separation between the form content/privacy notice and the primary navigation actions, following the project's existing spacing scale and responsive behavior.

## Proposed changes
1. **Increase space above the privacy line**  
   Change the paragraph's top margin from `mt-6` to `mt-8` and add a subtle top border (`border-t border-border/40 pt-6`) so it reads as a footer note rather than floating text.

2. **Add desktop padding to the nav bar**  
   Update the nav container from `md:pt-0` to `md:pt-8 md:pb-16` so the buttons have breathing room on larger screens while remaining a compact sticky footer on mobile.

3. **Preserve mobile safe-area behavior**  
   Keep `pb-[env(safe-area-inset-bottom)]`, the fixed positioning, and the `pb-32` on `<main>` so the footer still does not overlap content on phones.

4. **Verify responsiveness**  
   Check the intake page on mobile, tablet, and desktop viewports to confirm the privacy text is not touching the buttons and the sticky footer still clears form fields.

## Files to modify
- `src/pages/Intake.tsx` — spacing classes for the privacy paragraph and the nav container.

## Verification
- Open `/intake` in the preview.
- Scroll through each step and confirm the privacy line and Back/Continue buttons are visually separated.
- Confirm no overlap on a small mobile viewport.
