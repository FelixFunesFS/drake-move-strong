

## Mobile Readability Audit: Raise All Text Floors Across Templates

### The Problem
These graphics are exported at 1080px but viewed on phones at ~350px — a **3.1x reduction**. Any source text under ~34px becomes unreadable (<11px on screen). Currently:

- **Eyebrows** (`14 * s` = 12.6px source → 4px on phone) — invisible
- **Detail/program lines** (`17-20 * s` = 15-18px → 5-6px) — barely visible  
- **FrostedCard eyebrow** (`11 * s` = 10px → 3px) — completely invisible
- **BrandPanel eyebrow** (`12 * s` = 11px → 3.5px) — invisible
- **BrandPanel programLine** (`19 * s` = 17px → 5.5px) — barely visible
- **Small logos** (`28 * s` in frame-inset) — too small to identify
- **Footer text** (`13 * s`) — unreadable

### Solution: `Math.max(floor, scaled)` Pattern
Use absolute pixel floors that guarantee readability at mobile viewing size, while still allowing proportional scaling on larger canvases. The floor values:

| Element | Current | New Floor | Mobile Result |
|---------|---------|-----------|---------------|
| Eyebrow | 11-16 * s | Math.max(34, N * s) | ~11px ✓ |
| Detail line | 17 * s | Math.max(36, N * s) | ~11.7px ✓ |
| Program line | 18-22 * s | Math.max(38, N * s) | ~12.3px ✓ |
| Logo height | 28-44 * s | Math.max(44, N * s) | recognizable ✓ |
| Footer text | 13 * s | Math.max(30, N * s) | ~10px ✓ |

### Changes by File

**`TemplateElements.tsx`** — 4 elements:
- `FrostedCard` eyebrow: `11 * s` → `Math.max(34, 14 * s)`
- `FrostedCard` detailLine: `14 * s` → `Math.max(36, 17 * s)`
- `FrostedCard` CTA inner: `14 * s` → `Math.max(34, 16 * s)`
- `BrandPanel` eyebrow: `12 * s` → `Math.max(34, 14 * s)`
- `BrandPanel` programLine: `19 * s` → `Math.max(38, 22 * s)`
- `BrandPanel` logo: `50 * s` → `Math.max(50, 50 * s)` (already OK, just enforce)

**`TemplatePreview.tsx`** — systematic sweep of all 16 templates:
- Every `eyebrow` fontSize → `Math.max(34, current)`
- Every `programLine` fontSize → `Math.max(38, current)`
- Every `detailLine` fontSize → `Math.max(36, current)`
- Every small logo height → `Math.max(44, current)`
- Schedule grid footer → `Math.max(30, 13 * s)`
- Class-highlight eyebrow → `Math.max(34, 15 * s)`

Specific templates with unique elements:
- `editorial` header bar text (programLine/eyebrow): `14 * s` → `Math.max(34, 16 * s)`
- `stacked-bars` top bar programLine: `18 * s` → `Math.max(38, 20 * s)`
- `diagonal-strip` eyebrow on gold: `16 * s` → `Math.max(34, 18 * s)`
- `marquee-banner` eyebrow on gold: `14 * s` → `Math.max(34, 16 * s)`
- `frame-inset` logo: `28 * s` → `Math.max(44, 36 * s)`

### What This Does NOT Change
- Headlines — already 32-72 * s, well above the floor
- CTA buttons — already have `Math.max(20, 18 * s)` floors (adequate)
- FreeBadge — already has floors
- Layout compositions, colors, spacing — unchanged
- Output dimensions — unchanged

### Files Changed

| File | Scope |
|------|-------|
| `src/components/admin/social/TemplateElements.tsx` | FrostedCard + BrandPanel font floors |
| `src/components/admin/social/TemplatePreview.tsx` | All 16 templates: eyebrow, programLine, detailLine, logo floors |

