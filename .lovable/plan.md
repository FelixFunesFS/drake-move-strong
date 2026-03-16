

## Fix: Cap Font Sizes on Low-Class Days

### Problem
When a day has only 1-2 classes, `rowH` becomes very large (because total rows is small), causing `rowH * 0.24` to produce oversized fonts. The `Math.max()` only sets a floor — there's no ceiling.

### Fix — `src/components/admin/social/TemplatePreview.tsx`

**Lines 650-653**: Add `Math.min()` caps to all font size calculations so they never exceed a reasonable maximum regardless of how few classes exist:

```typescript
const dayFontSize = Math.min(20 * s, Math.max(11 * s, rowH * 0.24));
const classFontSize = Math.min(22 * s, Math.max(12 * s, rowH * 0.24));
const timeFontSize = Math.min(16 * s, Math.max(10 * s, rowH * 0.18));
const instructorFontSize = Math.min(14 * s, Math.max(9 * s, rowH * 0.16));
```

This keeps fonts readable but prevents them from ballooning on sparse days. The max caps (20, 22, 16, 14 scaled) match what looks correct on busy days.

| File | Lines | Change |
|------|-------|--------|
| `src/components/admin/social/TemplatePreview.tsx` | 650-653 | Wrap each font calc in `Math.min()` to cap maximums |

