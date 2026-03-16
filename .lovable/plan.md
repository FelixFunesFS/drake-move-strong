

## Comprehensive Readability Audit: All Templates for Mobile/Social Viewing

### The Core Problem

These graphics are created at 1080-1200px wide but **viewed on phones at ~350px wide** — a 3x reduction. A `14 * s` font (≈12.6px source) becomes ~4px on screen — unreadable. Every text element across all 16 templates needs to survive this reduction.

### Mental Model

The key metric is **effective mobile viewing size**: `sourceFontSize × (350 / sourceWidth)`. Text must be ≥11px at mobile viewing size to be readable on social platforms. That means source fonts need minimum floors:
- **Headlines**: ≥36px source (≈12px on mobile) — currently some templates go as low as `28 * s` = 25px
- **Body/detail**: ≥18px source (≈6px on mobile) — currently some go as low as `11 * s` = 10px  
- **Eyebrow/labels**: ≥14px source (≈5px on mobile) — currently `10-12 * s`
- **CTA buttons**: ≥20px source — currently `18 * s` which is borderline

### Changes — 3 Areas

#### 1. Schedule Grid: Adaptive Layout for Sparse Days (2-4 rows)
**File**: `TemplatePreview.tsx` lines 636-702

When `totalRows ≤ 6` (e.g., 2 days × 1-2 classes), the current approach stretches rows to fill the canvas but caps fonts — leaving oversized rows with small text. Instead:

- Add a **density tier**: `sparse` (≤6 rows), `normal` (7-12), `dense` (13+)
- For **sparse**: increase font multipliers (0.38, 0.36, 0.30, 0.28) and raise caps significantly (e.g., `dayFontSize` cap to `44 * s`). Also add vertical centering padding so content sits in the middle third rather than stretching top-to-bottom.
- For **dense**: keep current caps but raise the floor minimums slightly

```typescript
const density = totalRows <= 6 ? 'sparse' : totalRows <= 12 ? 'normal' : 'dense';

// Sparse: center content instead of stretching
const contentPadTop = density === 'sparse' ? availH * 0.1 : 0;
const effectiveAvailH = density === 'sparse' ? availH * 0.8 : availH;
const rowH = totalRows > 0 ? effectiveAvailH / totalRows : 40 * s;

const dayFontSize = density === 'sparse'
  ? Math.min(44 * s, Math.max(18 * s, rowH * 0.38))
  : Math.min(28 * s, Math.max(13 * s, rowH * 0.32));
// ... similar for class, time, instructor
```

#### 2. Global Font Size Floors Across All Templates
**File**: `TemplatePreview.tsx` — all template blocks + `TemplateElements.tsx`

Audit every `fontSize` value and enforce social-media-readable minimums. Key changes:

| Element | Current min | New min | Templates affected |
|---------|------------|---------|-------------------|
| Eyebrow | `10 * s` (9px) | `14 * s` (12.6px) | schedule-grid header, editorial, collage, photo-strip, frame-inset, stacked-bars |
| Detail line | `14 * s` (12.6px) | `17 * s` (15.3px) | all templates with `detailLine` |
| Program line | `16-18 * s` | `20 * s` (18px) | fade-blend, circle-cutout, overlap-cards |
| Footer text | `10 * s` (9px) | `13 * s` (11.7px) | schedule-grid footer |
| CTA button | `18 * s` (16.2px) | `20 * s` (18px) | `TemplateElements.tsx` CTAButton |
| FreeBadge sub | `14 * s` | `16 * s` | `TemplateElements.tsx` FreeBadge |

#### 3. Schedule Grid: Increase Structural Element Sizes
**File**: `TemplatePreview.tsx` lines 620-710

- **Header logo**: `36 * s` → `44 * s`
- **Header headline**: cap at `H * 0.035` → `H * 0.04`
- **Gold divider**: `3 * s` → `4 * s`
- **Row border-left accent**: `4 * s` → `5 * s`  
- **Row border-radius**: `6 * s` → `8 * s`
- **Time column min-width**: `70 * s` → `80 * s`
- **Footer CTA scale**: `s * 0.8` → `s * 0.9`
- **Footer site label**: `10 * s` → `13 * s`

### Files Changed

| File | Scope |
|------|-------|
| `src/components/admin/social/TemplatePreview.tsx` | Schedule grid density tiers, font floor increases across all 16 templates |
| `src/components/admin/social/TemplateElements.tsx` | CTAButton and FreeBadge minimum font sizes |

### What This Does NOT Change
- Output pixel dimensions (1080×1080, etc.) stay the same
- The `s = W / 1200` scaling system stays — we're only raising floors and adding density-aware scaling
- Template layouts and compositions stay identical

