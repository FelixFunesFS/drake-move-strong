

## Fix: Schedule Rows Overflowing Container

### Problem
The `ScheduleGridTemplate` has a layout math bug: the `availH` calculation doesn't account for the **gaps between rows**. With `totalRows` items and `(totalRows - 1)` gaps, the cumulative gap space pushes rows beyond the container, and `overflow: hidden` clips the last classes.

Additionally, rows use `minHeight: rowH` which prevents flex from shrinking them if the math is slightly off.

### Root Cause (line 646 of TemplatePreview.tsx)
```
availH / totalRows → gives rowH
```
But the actual space consumed is `totalRows * rowH + (totalRows - 1) * rowGap`, which exceeds `availH` by `(totalRows - 1) * rowGap`.

### Fix — `src/components/admin/social/TemplatePreview.tsx`

**Lines 643-656**: Subtract total gap space from `availH` before computing `rowH`, and change `minHeight` to `height` with `flexShrink: 1` so rows can compress if needed:

```typescript
const totalRows = days.length + totalClassRows;
const gapCount = Math.max(0, totalRows - 1);
const rowGap = Math.max(2 * s, 4 * s);          // fixed gap, not row-dependent
const totalGapSpace = gapCount * rowGap;
const availH = H - padTop - padBottom - headerH - footerH - totalGapSpace;
const rowH = totalRows > 0 ? availH / totalRows : 40 * s;
```

Then on row elements, change `minHeight: rowH` to `height: rowH, flexShrink: 1` so content can compress gracefully on days with 6+ classes.

### File
| File | Change |
|------|--------|
| `src/components/admin/social/TemplatePreview.tsx` | Lines 643-695: Fix availH gap math, switch minHeight to flexible height |

