

## Fix: Social Graphics Preview Cropping

### The Problem

The preview container on line 354 applies `transform: scale(0.5)` to shrink the 1200x630 canvas, but CSS `transform` does not change the element's layout box. The outer `div` doesn't know the visual height is 315px — it still reserves 630px of space (or none at all if overflow clips it). The `overflow-hidden` on the parent at line 351 then crops the bottom, hiding the editorial footer bar and bottom elements in both display and export.

### The Fix

Set an explicit height on the wrapper div that matches the scaled output, so nothing gets clipped:

**Edit `src/pages/admin/SocialGraphics.tsx`** — lines 353-363:

Replace the current preview wrapper with a container that has an explicit height of `315px` (630 × 0.5) to match the scaled canvas:

```tsx
<div className="w-full" style={{ height: 315, position: 'relative' }}>
  <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: 1200, height: 630, position: 'absolute', top: 0, left: 0 }}>
    <TemplatePreview ... />
  </div>
</div>
```

This ensures:
- The parent reserves exactly 315px of vertical space (the scaled height)
- The 1200x630 canvas is positioned absolutely so the scale transform doesn't cause layout overflow
- The editorial footer bar and all bottom elements are fully visible
- Downloads remain unaffected since `toPng` targets the `previewRef` (the full 1200x630 div) directly

Additionally, the pending plan to add marketing content fields (structured headline, program line, detail line, CTA, gold badge) will be incorporated into the same edit — updating all 5 templates and replacing the text controls with the proposed content presets.

### Files
- **Edit**: `src/pages/admin/SocialGraphics.tsx` — fix preview container height + add marketing content fields from the approved plan

