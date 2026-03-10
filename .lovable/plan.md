

## Hero Section Accessibility & Responsiveness Review

### Issues Found

**1. Critical: Text contrast fails WCAG AA**
With only `bg-black/20` overlay, all hero text risks poor contrast against the background image — especially the gold accent line and the `text-primary-foreground/60` helper text below the CTA. The home hero uses a much heavier gradient (`from-black/75`) plus drop shadows on text.

**2. No drop shadows on text**
The home hero applies `drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]` on the subtitle and `drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]` on the gold accent span (per project standards). This page has none.

**3. Font sizes are undersized vs home hero**
- Current: `text-3xl / sm:text-4xl / md:text-5xl / lg:text-6xl`
- Home standard: `text-5xl / sm:text-6xl / md:text-7xl / lg:text-8xl`

**4. Helper text too faint**
`text-primary-foreground/60` at `text-sm` below the CTA is nearly invisible over a light image with 20% overlay.

---

### Proposed Fixes (all in `ResetWeekCharleston.tsx` hero section)

| # | What | Change |
|---|------|--------|
| 1 | H1 font sizes | Scale up to `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` |
| 2 | Gold accent span | Add `drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]` |
| 3 | Subtitle (`p`) | Add `drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]` |
| 4 | H1 white text | Add `drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]` to h1 class |
| 5 | Helper text below CTA | Change from `text-primary-foreground/60` to `text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]` |

These changes keep the light `bg-black/20` overlay the user chose while ensuring all text meets contrast standards through drop shadows — matching the approach documented in project design standards.

