

## Upgrade Social Graphics — Overlapping Cards, Multi-Image Compositions

### What Changes

**1. Overlapping "Info Card" on Split Templates**

For split-left and split-right, add a floating frosted card that overlaps the diagonal seam between photo and teal panel. This card holds the headline + CTA and sits on top of both sides, creating a layered depth effect. The card has a subtle border, drop shadow, and semi-transparent dark background with backdrop blur.

```text
┌─────────────────────────────┐
│  PHOTO        ╔═══════╗TEAL│
│    (diagonal) ║ CARD  ║    │
│               ║ w/CTA ║    │
│               ╚═══════╝    │
└─────────────────────────────┘
```

**2. Secondary Photo Inset**

Add a `secondPhoto` state (optional second photo selection). When set, render a smaller bordered photo (rounded rect or circle) overlaid in a corner or alongside the main content. This works across all templates:

- **Full Bleed**: Small rounded-rect inset photo in the top-left corner with a gold border and slight rotation
- **Split layouts**: Circular photo inset on the teal panel, near the CTA
- **Centered**: Two small photos flanking the headline, rotated slightly in opposite directions
- **Editorial**: Small photo strip in the header bar

**3. New "Collage" Template**

A sixth template with a 2-3 photo mosaic layout:
- Large primary photo (left 60%), two stacked secondary photos (right 40%)
- Thin gold divider lines between photos
- Dark overlay strip at bottom with headline + CTA
- All three photo slots pull from the photo picker (primary + secondary + tertiary)

```text
┌────────────┬──────────┐
│            │  PHOTO 2 │
│  PHOTO 1   ├──────────┤
│  (large)   │  PHOTO 3 │
├────────────┴──────────┤
│ ▓▓ HEADLINE    [CTA]  │
└───────────────────────┘
```

**4. Overlapping Photo Frame Effect**

For the "Centered Card" template, layer two slightly rotated photo frames behind the main content card — one tilted -3deg, one +3deg — showing glimpses of the selected photo with heavy dark overlays. Creates a stacked-prints editorial look.

**5. Admin Controls**

- Add a second photo picker row: "Secondary Photo (optional)" with a clear button
- Add a third photo picker for the Collage template
- When secondary photo is not set, templates render without the inset (backward compatible)

### Files

- **Edit**: `src/pages/admin/SocialGraphics.tsx`
  - Add `secondPhoto` and `thirdPhoto` state
  - Add new "Collage" template to `TEMPLATES` array and `TemplateThumbnail`
  - Update split-left/split-right with overlapping frosted card
  - Add secondary photo inset rendering to all existing templates
  - Add Collage template rendering
  - Add secondary/tertiary photo picker UI below the primary picker

No new dependencies. No database changes. All rendering uses inline CSS styles for html-to-image export compatibility.

