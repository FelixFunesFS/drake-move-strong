

## Safe Zone Padding & Font Sizing for Schedule Graphics

### Platform Safe Zones — The Right Mental Model

Each social platform overlays UI elements on graphics. The safe zones (where content won't be obscured) differ by format:

```text
LANDSCAPE (1200×630) — Facebook/LinkedIn/Twitter feed
┌─────────────────────────────────────┐
│  5% padding all sides               │
│  Minimal platform UI overlap         │
└─────────────────────────────────────┘

SQUARE (1080×1080) — Instagram feed / Facebook
┌─────────────────────────────────────┐
│  5% padding all sides               │
│  Instagram: username overlay at top  │
└─────────────────────────────────────┘

STORY (1080×1920) — Instagram/Facebook Stories, Reels, TikTok
┌─────────────────────────────────────┐
│  ████████████████████████████████   │ ← 14% top (profile, close button)
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│  ░░░░░░░░  SAFE ZONE  ░░░░░░░░░   │ ← 72% middle
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│  ████████████████████████████████   │ ← 14% bottom (CTA, swipe, reactions)
│  6% left/right for reaction buttons  │
└─────────────────────────────────────┘

PORTRAIT (1080×1350) — Instagram feed post
┌─────────────────────────────────────┐
│  6% top/bottom, 5% left/right       │
│  Less overlay than Story             │
└─────────────────────────────────────┘
```

### Changes — `src/components/admin/social/TemplatePreview.tsx`

**Replace the current padding logic (line 624, 638) with percentage-based safe zones:**

| Canvas | Top | Bottom | Left | Right |
|--------|-----|--------|------|-------|
| Landscape (1200×630) | 5% H = 32px | 5% H = 32px | 5% W = 60px | 5% W = 60px |
| Square (1080×1080) | 6% H = 65px | 5% H = 54px | 5% W = 54px | 5% W = 54px |
| Story (1080×1920) | 14% H = 269px | 14% H = 269px | 6% W = 65px | 6% W = 65px |
| Portrait (1080×1350) | 6% H = 81px | 6% H = 81px | 5% W = 54px | 5% W = 54px |

Implementation: Calculate padding from canvas dimensions directly:
```
const isStory = H / W > 1.5;
const isPortrait = H > W && !isStory;
const padTop = H * (isStory ? 0.14 : isPortrait ? 0.06 : 0.05);
const padBottom = H * (isStory ? 0.14 : isPortrait ? 0.06 : 0.05);
const padX = W * (isStory ? 0.06 : 0.05);
```

**Update outer container (line 624):** Replace fixed padding with `padding: ${padTop}px ${padX}px ${padBottom}px`

**Update availH calculation (line 640):** `availH = H - padTop - padBottom - headerH - footerH` (where headerH and footerH are estimated at `50 * s` each)

**Reduce font multipliers further** to be conservative inside the safe zone:

| Element | Current | New |
|---------|---------|-----|
| Header headline | `isVertical ? 32*s : 26*s` | `Math.min(isVertical ? 28*s : 22*s, H * 0.03)` |
| Day header | `rowH * 0.28` | `rowH * 0.24` |
| Class name | `rowH * 0.28` | `rowH * 0.24` |
| Time | `rowH * 0.22` | `rowH * 0.18` |
| Instructor | `rowH * 0.20` | `rowH * 0.16` |
| Eyebrow | `11 * s` | `10 * s` |
| Footer | `12 * s` | `10 * s` |

### File
| File | Change |
|------|--------|
| `src/components/admin/social/TemplatePreview.tsx` | Lines 620-702: Replace padding with percentage-based safe zones per platform; reduce all font multipliers |

