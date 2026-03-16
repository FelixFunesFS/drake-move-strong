

## Three Changes to Schedule Grid & Carousel

### 1. Cap Row Height on Sparse Days
**Problem**: When only 1-2 classes exist, `rowH` becomes excessively tall (all available space divided by few rows).

**Fix** in `TemplatePreview.tsx` (~line 649): Add a `Math.min` cap on `rowH` so rows never exceed a maximum height, leaving unused space at the bottom rather than stretching rows absurdly tall:

```typescript
const maxRowH = 60 * s; // reasonable max row height
const rowH = totalRows > 0 ? Math.min(maxRowH, availH / totalRows) : 40 * s;
```

This keeps sparse days compact and visually consistent with busy days.

### 2. Add Class Descriptions to Carousel Slides
**Problem**: The weekly-schedule carousel slides (`applyCarouselSequence` in `SocialGraphics.tsx`) show class names and times but no descriptions.

**Approach**: The `class_types` table has a `description` column. When building carousel slides, join `punchpass_schedule.class_name` against `class_types.name` to pull descriptions. Then pass them into the slide's `programLine` or `detailLine` field so they render on the graphic.

**Fix** in `SocialGraphics.tsx` (~line 233-280):
- After fetching `punchpass_schedule`, also fetch `class_types` (name + description).
- Build a lookup map: `className → description`.
- In the per-day slide generation, set `detailLine` to a short description of the day's unique class types (e.g., "Kettlebell strength & conditioning · Mobility & recovery").

### 3. Alternate Schedule/Non-Schedule Slides ("Every Other")
**Problem**: The carousel is currently: cover → day1 → day2 → … → CTA. All middle slides look identical (schedule-grid). This is visually monotonous.

**Approach**: Interleave schedule-grid slides with class-highlight slides. For each day, show the schedule grid, then follow it with a class-highlight slide featuring one standout class from that day (with its description from `class_types`).

**Fix** in `SocialGraphics.tsx` `applyCarouselSequence('weekly-schedule')`:
- Instead of `days.map(day => scheduleSlide)`, use `days.flatMap(day => [scheduleSlide, highlightSlide])`.
- The highlight slide uses `template: 'class-highlight'`, featuring the first class of that day with its description as `programLine`.
- Cap at 10 slides total (carousel max), so trim days if needed.

### Files Changed

| File | Change |
|------|--------|
| `src/components/admin/social/TemplatePreview.tsx` | Line ~649: Add `Math.min(maxRowH, ...)` cap on `rowH` |
| `src/pages/admin/SocialGraphics.tsx` | Lines ~233-285: Fetch `class_types` descriptions, interleave schedule-grid + class-highlight slides, include descriptions in slide content |

