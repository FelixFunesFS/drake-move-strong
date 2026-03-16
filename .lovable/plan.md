

## Fix: Schedule List Must Fill the Graphic

### Root Cause

The `flex: 1` container correctly reserves all available space, but the **content inside** (class rows) doesn't stretch to fill it. Each row is only `~30px` tall at scale, and with 5-10 classes the content clusters at the top of an 80% container, visually appearing as ~20% of the graphic.

### Best Approach: Scale Rows to Fill Available Space

Rather than relying on content height alone, **dynamically calculate row sizes** based on the available space and number of items. This ensures the schedule always fills the container regardless of how many classes exist.

### Changes — `src/components/admin/social/TemplatePreview.tsx`

**Calculate available height and distribute it across rows:**

1. Compute total available height: `availH = H - headerHeight - footerHeight - padding` (roughly `H * 0.82`)
2. Count total items: `totalRows = number of day headers + number of class rows`
3. Derive `rowH = availH / totalRows` — each row (both day headers and class cards) gets equal vertical space
4. Apply `rowH` as `minHeight` on each day-header and class-row `div`, with content vertically centered
5. Scale font sizes proportionally: class name `fontSize = Math.max(14 * s, rowH * 0.35)`, time `fontSize = Math.max(12 * s, rowH * 0.28)`
6. Scale padding/gap to `rowH * 0.08` instead of fixed `6 * s`

**Net effect:** Whether there are 5 classes or 20, the rows expand or compress to always fill the list container. With few classes, rows become larger and more prominent. With many, they stay readable but compact.

### Visual Result

```text
┌──────────────────────────────────┐
│ [Logo]  THIS WEEK'S SCHEDULE     │  ~10%
│ ════════════════════════════════  │
│                                  │
│ MONDAY · MAR 17                  │
│ ┃ 8:00 AM    KB Strong   David  │
│ ┃ 11:00 AM   Mobility    Misty  │  ~82%
│                                  │  (rows stretch
│ TUESDAY · MAR 18                 │   to fill)
│ ┃ 8:00 AM    KB Flow     David  │
│ ┃ 5:30 PM    Strength    David  │
│                                  │
│ WEDNESDAY · MAR 19               │
│ ┃ 8:00 AM    KB Strong   David  │
│                                  │
├──────────────────────────────────┤
│ drake.fitness       [Book Now →] │  ~8%
└──────────────────────────────────┘
```

### File
| File | Change |
|------|--------|
| `src/components/admin/social/TemplatePreview.tsx` | Lines 620-686: Calculate dynamic row heights based on available space and total row count; apply as `minHeight` on day headers and class cards; scale fonts proportionally to row height |

