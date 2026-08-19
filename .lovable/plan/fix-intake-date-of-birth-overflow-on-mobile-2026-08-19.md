# Fix intake date-of-birth overflow on mobile

## Current state
The `/intake` wizard renders the Date of birth field with a native `<input type="date">` inside a single-column grid on mobile. The `Input` component already sets `w-full`, but the grid item has the default `min-width: auto`, so the input's intrinsic width (placeholder text + calendar icon) can force the field wider than the card's content box on narrow viewports.

## Goal
Prevent the date input from overflowing the right margin on mobile while keeping the existing desktop two-column layout intact.

## Proposed changes
1. **Allow the input to shrink below its intrinsic min-width**  
   In `src/components/intake/IntakeField.tsx`, add `min-w-0` to the `className` of the default text/tel/email/date `Input` so it respects the parent container width.

2. **Prevent grid-item min-width expansion**  
   In `src/pages/Intake.tsx`, add `min-w-0` to each field wrapper div inside the `grid` so the column cannot grow beyond the card padding.

3. **Verify visually on mobile**  
   Use Playwright at a narrow viewport (375 px) to confirm the DOB input, placeholder, and calendar icon stay inside the card's right edge both empty and with a value entered.

## Files to modify
- `src/components/intake/IntakeField.tsx` — add `min-w-0` to the default input class.
- `src/pages/Intake.tsx` — add `min-w-0` to the field wrapper divs in the grid.

## Verification
- Open `/intake` in a mobile viewport.
- Confirm the Date of birth field does not extend past the right edge of the card.
- Enter a date and confirm the value + calendar icon remain within the card bounds.
- Confirm desktop two-column layout still works as before.
