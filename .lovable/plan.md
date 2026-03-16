

## Schedule Grid: Vertical List Layout (60% of canvas)

### Problem
The schedule grid currently renders as horizontal day columns (landscape) or stacked day sections (vertical). The user wants a **single vertical list** of all classes that occupies **60%** of the graphic area.

### Changes — 1 file

**`src/components/admin/social/TemplatePreview.tsx`** (ScheduleGridTemplate, lines 634-666)

Replace the current day-column grid with a **vertical scrollable list** layout:

- **Layout**: Flatten all classes into a single chronological list (sorted by date, then time)
- **List area**: Takes exactly `60%` of the canvas height (between header and footer)
- **Each row**: Horizontal card showing `DAY` | `TIME` | `CLASS NAME` | `INSTRUCTOR` — left-aligned, easy to scan
- **Day grouping**: Use a subtle day-header row (gold text, e.g. "MONDAY · MAR 17") as a separator between days
- **Card style**: Keep the existing card background (`rgba(255,255,255,0.12)`) with instructor-colored left border
- **Font sizes**: Class name `14 * s`, time `12 * s`, day header `13 * s` — all with text-shadow for contrast
- **Remaining 40%**: Header/headline area (~25%) and footer/CTA (~15%) stay as-is

```text
┌────────────────────────────────────┐
│ [Logo]  WEST ASHLEY · CHARLESTON  │  ~15%
│         THIS WEEK'S SCHEDULE      │
│ ─────────── gold line ──────────  │
├────────────────────────────────────┤
│ MONDAY · MAR 17                   │
│ ┃ 8:00 AM   KB Strong    David   │  60%
│ ┃ 11:00 AM  Mobility     Misty   │  (vertical list)
│ TUESDAY · MAR 18                  │
│ ┃ 8:00 AM   KB Flow      David   │
│ ┃ 5:30 PM   Strength     David   │
│ ...                               │
├────────────────────────────────────┤
│ drake.fitness        [Book Now →] │  ~15%
└────────────────────────────────────┘
```

