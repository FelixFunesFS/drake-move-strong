

## Upgrade Social Graphics — Premium Visual Design

### The Problem

The current templates are functional but visually flat. Straight splits, basic gradients, and plain teal panels don't match the cinematic brand identity of the rest of the site. From a marketing perspective, Facebook event images compete for attention in a crowded feed — they need depth, texture, and visual sophistication to stop the scroll.

### What Changes

**Template Visual Upgrades (all 5 templates):**

1. **Full Bleed** — Add a cinematic dual-gradient (bottom-up dark + left-side teal tint), a thin gold accent line above the headline, and a subtle dark vignette around edges
2. **Split Left** — Replace the straight vertical split with an angled diagonal cut (photo bleeds into the teal panel via a CSS clip-path). Add a faint geometric pattern/texture on the teal panel using an inline SVG background
3. **Centered Card** — Add a frosted inner card with a subtle border, gold corner accents (small L-shaped marks in corners), and a radial gradient overlay instead of flat teal
4. **Editorial Strip** — Add a gold accent stripe between the header bar and photo, and a diagonal gold slash element in the footer bar next to the CTA
5. **Split Right** — Angled diagonal cut matching Split Left (mirrored), add a decorative gold bracket/frame element around the headline text

**New Design Elements Across Templates:**
- Thin gold horizontal rules and accent lines for visual hierarchy
- Subtle inner shadow/vignette on photo areas for depth
- "WEST ASHLEY · CHARLESTON" as a small eyebrow text option above headlines
- Location dot separator styling (· character) in gold

**Admin Page UX Improvements:**
- Replace text-only template tabs with small visual thumbnail previews of each layout (rendered as simple CSS shapes showing the layout structure)
- Add preset headline options as quick-select chips: "Try 3 Classes Free", "Limited Spots This Week", "New Member Special", "Strength & Mobility"
- Better preview scaling that fills available width dynamically

### Files

- **Edit**: `src/pages/admin/SocialGraphics.tsx` — all template rendering upgrades + admin UI improvements

No new dependencies. No database changes. Pure visual/CSS improvements using inline styles (required for `html-to-image` export fidelity).

