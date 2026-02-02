
# Add Complementary Accessible Colors to Stat Numbers

## Current State

All 4 stat numbers currently use `text-white` against the teal gradient background:
- 10,000+ (Sessions)
- 500+ (Charlestonians)
- 25+ (Experience)
- 5 (Rating)

## Proposed Color Palette

Each stat will get a unique, accessible color that complements the dark teal background while maintaining brand consistency:

| Stat | Color | Tailwind Class | Reasoning |
|------|-------|----------------|-----------|
| **Sessions** | Brand Gold | `text-drake-gold` | Primary brand accent, high impact |
| **Charlestonians** | Soft Cyan/Light Teal | `text-cyan-300` | Analogous to teal, community warmth |
| **Experience** | Emerald/Light Green | `text-emerald-300` | Growth, longevity, freshness |
| **Rating** | Amber/Warm Yellow | `text-amber-300` | Matches star rating theme |

All colors have been chosen for:
- High contrast against dark teal (WCAG AA compliant)
- Visual harmony with brand palette
- Distinct differentiation between each stat

## Technical Implementation

**File:** `src/components/TrustStatsBar.tsx`

### Step 1: Add color mapping for stat numbers

```typescript
// Add after STAT_COLORS constant (around line 35)
const STAT_NUMBER_COLORS: Record<StatKey, string> = {
  sessions: "text-drake-gold",
  charlestonians: "text-cyan-300",
  experience: "text-emerald-300",
  retention: "text-rose-300",
  rating: "text-amber-300",
  reviews: "text-sky-300",
  classSize: "text-violet-300",
};
```

### Step 2: Apply colors in horizontal variant

Update the number display (around line 264) to use the color mapping:

```tsx
// Before
<div className="font-bold text-2xl md:text-3xl text-white font-heading">

// After
<div className={cn(
  "font-bold text-2xl md:text-3xl font-heading",
  STAT_NUMBER_COLORS[statKey]
)}>
```

## Visual Result

```text
┌─────────────────────────────────────────────────────────────┐
│ ═══════════════ gold top border ══════════════════════════ │
│                                                             │
│   ████████  TEAL GRADIENT BACKGROUND  ████████████████████  │
│                                                             │
│      🏋️            👥            📅            ⭐          │
│   10,000+        500+          25+           5.0           │
│    (gold)       (cyan)      (emerald)      (amber)         │
│   Sessions   Charlestonians  Years Exp   Google Rating     │
│    (white)      (white)       (white)       (white)        │
│                                                             │
│ ═══════════════ gold bottom border ═══════════════════════ │
└─────────────────────────────────────────────────────────────┘
```

## Accessibility Notes

- All chosen colors (300 shade) provide excellent contrast against dark teal
- Colors are distinct enough for colorblind users
- Labels remain white for consistency and hierarchy
- Numbers become the visual focal point with color differentiation
