# Intake Form: Scroll Reset + Responsive Navigation

## Current state

- Step changes call `topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })` on the outer wrapper. Because that wrapper is also the element holding the sticky progress bar, and the scroll is animated/async while React re-renders the new step, the page frequently stays mid-scroll — so the new step opens partway down instead of at its heading.
- The Back/Continue bar is `fixed inset-x-0 bottom-0` at all breakpoints, so desktop users get a full-width floating footer plus 8rem of dead bottom padding (`pb-32`), even when the whole step fits on screen.

## Plan

### 1. Reliable scroll-to-top on every step change

- Replace the ref-based `scrollIntoView` in `goTo()` with a deterministic `window.scrollTo({ top: 0 })` (instant, not smooth) fired after the step state commits, so the new step always renders from the top.
- Respect `prefers-reduced-motion` — instant scroll is already the safe default.
- Move focus to the new step's `<h1>` (add `tabIndex={-1}`), which resets scroll position for keyboard/screen-reader users too and announces the new step.
- Keep the existing smooth `scrollIntoView` for validation errors — that one should stay gentle and centered.

### 2. Footer navigation: mobile sticky, desktop inline

- Below `md`: keep the fixed bottom bar (thumb-reachable, safe-area padded) — this is correct mobile UX for a long wizard.
- At `md` and up: render the same Back/Continue buttons inline at the end of the form card, right-aligned, in normal document flow. No floating bar, no backdrop blur.
- Implement as a single set of buttons in a container that switches from `fixed` to `static` at the `md` breakpoint (one component, two layouts) so there is no duplicated logic or duplicate tab stops.
- Make bottom padding responsive: `pb-32 md:pb-16` so desktop loses the dead space.

### 3. Progress bar

- Stays sticky on all sizes (useful orientation), but the scroll reset now lands the heading just under it rather than behind it.

## Technical notes

- Files touched: `src/pages/Intake.tsx` only.
- No changes to `src/components/intake/schema.ts`, `IntakeField.tsx`, validation, PDF generation, or the `send-intake-form` edge function.
- Verified after the change at 375px, 768px, and 1280px widths: heading visible on step change, Back/Continue reachable, no overlap with the progress bar or the signature pad.
