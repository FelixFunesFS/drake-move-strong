

## Fix: Schedule List Should Dominate the Graphic

### Problem
The schedule list has `height: H * 0.6` but the outer flex container's padding (`24*s` top + bottom = `48*s` total) eats into the available space. Combined with the header and footer, the list ends up compressed into the top ~25%.

### Fix — `src/components/admin/social/TemplatePreview.tsx`

**Line 624**: Reduce outer padding from `24*s` to `16*s` vertically.

**Line 635**: Replace the fixed `height: H * 0.6` with `flex: 1` so the list fills all remaining space between the compact header and footer. Also add `minHeight: 0` (required for flex overflow children).

**Line 626 (header)**: Reduce `marginBottom` from `12*s` to `8*s`.

**Line 633 (gold line)**: Reduce `marginBottom` from `12*s` to `6*s`.

**Line 682 (footer)**: Change `marginTop: 12*s` to `marginTop: 'auto'` with small top padding, so footer pins to bottom.

Net effect: header ~10%, schedule list ~80%, footer ~10%.

### File
| File | Change |
|------|--------|
| `src/components/admin/social/TemplatePreview.tsx` | Lines 624-686: Adjust padding, use `flex:1` for list, compress header/footer |

