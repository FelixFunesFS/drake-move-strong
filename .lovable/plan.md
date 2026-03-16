

## Social Graphics — Creative Templates & Multi-Image Composition Upgrade

### Current State (What's Built)
- 8 templates: full-bleed, split-left/right, centered, editorial, collage, schedule-grid, class-highlight
- Multi-size output (Landscape, Square, Story, Portrait) with proportional scaling
- Up to 3 photos per graphic (Primary, Secondary, Tertiary)
- Custom image upload via FileReader
- Schedule presets from PunchPass data
- Carousel mode with up to 10 slides

### What's Missing (What the User Wants)
The current templates don't include **multi-image composition techniques** that are trending on social media — faded blends, cutout masks, layered photo strips, gradient transitions between images, circular/geometric masks, and overlapping photo grids. The plan from before listed 6 new templates but they were never implemented.

### New Templates to Add (8 total)

| Template | Visual Concept | Multi-Image? |
|----------|---------------|-------------|
| **diagonal-strip** | Bold gold diagonal stripe across photo with headline on stripe | Single photo, geometric overlay |
| **fade-blend** | Two photos fade/blend into each other horizontally with gradient mask; text over the transition zone | Yes — 2 photos with CSS mask gradient |
| **circle-cutout** | Primary photo as large circle mask, secondary photo as teal background bleeding through | Yes — circular `clip-path` on primary, secondary behind |
| **photo-strip** | 3 vertical strips of different photos side by side with thin gold dividers, text bar at bottom | Yes — 3 photos in strips |
| **overlap-cards** | Two tilted photo "polaroid" cards overlapping on a teal background with text below | Yes — 2 photos as rotated inset cards |
| **marquee-banner** | Full-bleed photo with a thick horizontal gold banner strip across center containing headline text | Single photo, bold overlay element |
| **stacked-bars** | Cinematic letterbox: teal top bar (logo + eyebrow), full photo middle, dark bottom bar (headline + CTA) | Single photo, 3-section layout |
| **frame-inset** | Thick branded teal border around inset photo with gold inner border; headline in the border margin | Single photo, frame composition |

### Multi-Image Composition Techniques (Key Design Patterns)

```text
FADE-BLEND                    CIRCLE-CUTOUT
┌─────────────────────┐       ┌─────────────────────┐
│ Photo A  ░░ Photo B │       │  teal bg / Photo B  │
│         ░░░         │       │    ┌─────────┐      │
│        ░░░░░        │       │   (  Photo A  )     │
│       ░░░░░░░       │       │    └─────────┘      │
│  ← gradient fade →  │       │   [Headline]        │
│    [Headline]       │       │   [CTA Button]      │
└─────────────────────┘       └─────────────────────┘

PHOTO-STRIP                   OVERLAP-CARDS
┌──────┬──────┬──────┐       ┌─────────────────────┐
│      │      │      │       │   ┌────┐            │
│  P1  │  P2  │  P3  │       │   │ P1 │ ┌────┐    │
│      │      │      │       │   └────┘ │ P2 │    │
│      │      │      │       │     teal └────┘    │
├──────┴──────┴──────┤       │   [Headline]        │
│  Headline  [CTA]   │       │   [CTA]             │
└────────────────────┘       └─────────────────────┘
```

- **Fade-blend**: Uses CSS `mask-image: linear-gradient(to right, black 30%, transparent 70%)` on the first photo div, second photo behind it
- **Circle-cutout**: `clip-path: circle(40% at 50% 45%)` on primary photo, secondary/teal fills the background
- **Photo-strip**: 3 flex columns with `flex: 1`, 4px gold dividers, bottom bar overlay
- **Overlap-cards**: Two `PhotoInsetRect` elements with `rotation` and `box-shadow`, positioned with transforms on teal background

### UX Improvement: Split-Pane Layout

Restructure from vertical scroll to two-column editor:

- **Left column (sticky)**: Live preview + carousel slide nav + size tabs + download buttons
- **Right column (scrollable)**: Template grid (now 16 thumbnails in a 4×4 grid), content inputs, content presets, photo picker with upload zone, schedule presets (collapsible)

This keeps the preview always visible while editing controls.

### File Changes

| File | Change |
|------|--------|
| `src/components/admin/social/types.ts` | Add 8 new template IDs to `TemplateId` union and `TEMPLATES` array |
| `src/components/admin/social/TemplatePreview.tsx` | Add 8 new template render functions with multi-image composition |
| `src/components/admin/social/TemplateThumbnails.tsx` | Add 8 new mini-preview thumbnails |
| `src/pages/admin/SocialGraphics.tsx` | Restructure to split-pane layout with sticky preview left, scrollable controls right |

### Implementation Order

1. Add 8 new template IDs to types.ts
2. Implement 8 new template renderers in TemplatePreview.tsx (with multi-image composition: fade-blend, circle-cutout, photo-strip, overlap-cards)
3. Add 8 matching thumbnails in TemplateThumbnails.tsx
4. Restructure SocialGraphics.tsx to split-pane two-column layout with sticky preview

