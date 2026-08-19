# Fix: Date of Birth field overflows right margin on iOS

## What's happening
On iOS Safari, `<input type="date">` is rendered by the system with its own native styling. Even with `w-full` and `min-w-0`, iOS keeps an intrinsic native control width plus internal padding, so the field pushes past the card's right edge on narrow iPhone screens. The desktop/Android fix already applied (`min-w-0`) doesn't cover this because the overflow comes from the native control's default appearance, not grid sizing.

## Fix
Add a small global CSS rule (in the project's index.css) targeting date/time inputs:

- Reset native appearance (`-webkit-appearance: none; appearance: none;`)
- Force `width: 100%; max-width: 100%; min-width: 0; box-sizing: border-box`
- Keep the value left-aligned and the calendar indicator inside the box (`::-webkit-date-and-time-value { text-align: left; }`, `::-webkit-calendar-picker-indicator { margin-left: auto; }`)

This keeps the native iOS date wheel picker working while forcing the control to respect the container width.

## Verification
- Playwright run at iPhone-sized viewports (320px, 375px, 390px) with a WebKit browser to confirm the field's right edge stays inside the card padding.
- Confirm the field still opens the native picker and that other inputs (text, email, tel) are unchanged.

## Files
- `src/index.css` — add the date input normalization rules.
