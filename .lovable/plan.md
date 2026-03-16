

## Updated Plan: Safe Padding for All Graphics + Smaller Schedule Fonts

### What's Changing

The previous plan only applied safe-zone padding for Stories/Reels. The correct approach is to add proportional safe padding to **all** canvas sizes, with extra padding for vertical (Story/Portrait) formats.

### Changes — `src/components/admin/social/TemplatePreview.tsx`

**Line 624** — Replace the fixed padding with dynamic values based on canvas aspect ratio:

```
isVertical (H > W * 1.2):  padding: 60*s top/bottom, 36*s left/right
landscape/square:           padding: 24*s top/bottom, 36*s left/right
```

This ensures all formats get breathing room, while vertical formats get extra top/bottom clearance for platform UI (profile overlays, swipe indicators, reaction bars).

**Lines 641-644** — Reduce font scaling multipliers:

| Element | Current | New |
|---------|---------|-----|
| Day header | `Math.max(13*s, rowH*0.35)` | `Math.max(11*s, rowH*0.28)` |
| Class name | `Math.max(14*s, rowH*0.35)` | `Math.max(12*s, rowH*0.28)` |
| Time | `Math.max(12*s, rowH*0.28)` | `Math.max(10*s, rowH*0.22)` |
| Instructor | `Math.max(11*s, rowH*0.25)` | `Math.max(9*s, rowH*0.20)` |

**Line 638** — Adjust `availH` to account for the increased padding: reduce from `H * 0.82` to subtract actual padding values so row sizing remains accurate.

### Single file
`src/components/admin/social/TemplatePreview.tsx` — lines 624-698

