

## Fix: Increase Font Sizes and Row Sizing for Schedule Grid

### Problem
The font size caps added in the previous change (20s, 22s, 16s, 14s) are too conservative, making text too small — especially on formats with ample vertical space.

### Fix — `src/components/admin/social/TemplatePreview.tsx`

**Lines 645-654**: Raise the `Math.min` caps and scale multipliers, and give day header rows slightly more height than class rows:

```typescript
// Increase caps ~40-50%
const dayFontSize = Math.min(28 * s, Math.max(13 * s, rowH * 0.32));
const classFontSize = Math.min(30 * s, Math.max(14 * s, rowH * 0.30));
const timeFontSize = Math.min(22 * s, Math.max(11 * s, rowH * 0.24));
const instructorFontSize = Math.min(20 * s, Math.max(10 * s, rowH * 0.22));
```

Additionally, change the row gap from `4 * s` to `3 * s` to reclaim vertical space for the rows themselves, allowing them to be taller and better utilize the container.

| File | Lines | Change |
|------|-------|--------|
| `src/components/admin/social/TemplatePreview.tsx` | 645 | Reduce `rowGap` from `4 * s` to `3 * s` |
| `src/components/admin/social/TemplatePreview.tsx` | 650-653 | Raise all four font size caps and scale multipliers |

