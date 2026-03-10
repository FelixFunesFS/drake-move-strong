

# "How It Works" Steps — UX & Responsiveness Review

## Current Issues

1. **Inconsistent alignment**: On mobile, steps use `flex items-start` with `text-center` — the number circle sits top-left but text is centered, creating visual tension.
2. **On desktop (md+)**, steps switch to `flex-col items-center` which centers everything — but the transition between layouts feels abrupt.
3. **No visual connector**: Three disconnected blocks. No line, arrow, or visual cue links step 1 → 2 → 3. The "process" feeling is lost.
4. **Step numbers are small**: 12x12 (48px) circles with text-xl numbers. On a landing page, these should command more attention — they're the visual anchor.
5. **Description font too small**: `text-sm` on descriptions makes them hard to scan, especially on tablet where the 3-column grid gives each card ~280px width.
6. **No section heading**: The steps appear without context. A brief "How It Works" label above grounds the visitor.

## Recommendation

Redesign as a **horizontal stepper** on desktop and a **vertical timeline** on mobile. Center-aligned throughout, with a connecting line between step circles.

**Desktop (md+):** 3 columns, each centered. A thin horizontal line connects the circles behind them.

**Mobile:** Vertical stack, each step left-aligned with circle + content, a vertical line connecting them.

**Typography fixes:**
- Step circles: `w-14 h-14` with `text-2xl` numbers
- Titles: `text-lg md:text-xl font-bold`
- Descriptions: `text-sm md:text-base` (bump from `text-sm`)
- Add eyebrow: "HOW IT WORKS" above in `text-xs uppercase tracking-wider`

## Changes — `src/pages/services/ResetWeekCharleston.tsx`

### Lines 112-133 — Replace the "How It Works" section

1. **Add eyebrow heading** "HOW IT WORKS" centered above the steps
2. **Desktop layout (md+):** Keep `grid-cols-3` but center all content within each cell. Add a pseudo-element horizontal connector line behind the circles using a relative container with a centered `border-t` spanning between circles.
3. **Mobile layout:** Stack vertically with `flex-col` per step, all center-aligned for consistency. Use `gap-8` for breathing room.
4. **Increase circle size:** `w-14 h-14` with `text-2xl font-bold`
5. **Bump description text:** `text-sm md:text-base`
6. **Center everything consistently:** Remove the mixed `text-center md:text-left md:flex-col md:items-center` — use `text-center items-center flex-col` at all breakpoints for clean vertical stacking within each step.
7. **Add connecting line on desktop:** A `hidden md:block absolute` border element spanning between circles, positioned behind them with `z-0` (circles get `z-10 relative`).

One file, one section replaced. No structural or routing changes.

