

## Fix: Schedule Grid Not Filling Viewport

### Root Cause
The `maxRowH = 60 * s` cap introduced last round prevents rows from expanding to fill available canvas height. On sparse schedules (e.g., 3 days × 1 class = 6 rows), `availH / 6` might be 80-100px, but the cap clamps it to 60. The rows then only occupy ~60% of the canvas, leaving dead space at the bottom.

### Solution: Remove Row Height Cap, Keep Font Caps

The right mental model: **rows should always fill 100% of available vertical space** (that's a layout concern), but **fonts should cap at readable maximums** (that's a typography concern). These are independent.

**`src/components/admin/social/TemplatePreview.tsx` (~lines 649-655)**

Remove `maxRowH` so rows stretch to fill canvas. Keep existing `Math.min` font caps so text stays proportional:

```typescript
// REMOVE: const maxRowH = 60 * s;
const rowH = totalRows > 0 ? availH / totalRows : 40 * s;

// Font caps stay — they prevent oversized text independent of row height
const dayFontSize = Math.min(28 * s, Math.max(13 * s, rowH * 0.32));
const classFontSize = Math.min(30 * s, Math.max(14 * s, rowH * 0.30));
const timeFontSize = Math.min(22 * s, Math.max(11 * s, rowH * 0.24));
const instructorFontSize = Math.min(20 * s, Math.max(10 * s, rowH * 0.22));
```

This way:
- **Busy days** (many rows): `rowH` is small, fonts hit the `Math.max` floor — compact and readable.
- **Sparse days** (few rows): `rowH` is large, rows fill the canvas, but fonts hit the `Math.min` ceiling — no giant text.
- **The canvas is always fully utilized** — no dead space.

| File | Line | Change |
|------|------|--------|
| `src/components/admin/social/TemplatePreview.tsx` | 649 | Remove `maxRowH` cap, revert `rowH` to uncapped `availH / totalRows` |

