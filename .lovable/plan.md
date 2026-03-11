

## Implement: Steeper Diagonals + Content Deduplication + Collage Badge

Three combined changes to `src/pages/admin/SocialGraphics.tsx`:

### 1. Steeper Diagonal Splits
- **Split-left** photo clip-path: `65%/55%` → `68%/50%` (bolder ~18% differential)
- **Split-right** photo clip-path: `40%/50%` → `32%/50%` (matching energy)
- Update thumbnail clip-paths to match

### 2. Eliminate Redundant Content (Context → Hook → Action)
**Teal panels** (brand identity zone only — lines 297-314 and 486-507):
- Keep: logo, eyebrow, programLine, gold divider
- Remove: headline, detailLine, CTA button, badge, secondary photo inset

**FrostedCard** (sole conversion focal point — lines 317-323 and 510-516):
- Now receives: headline, detailLine, ctaText, showBadge=true
- Becomes the only element with the hook + action
- Update FrostedCard component to also accept/render an eyebrow for context

### 3. Collage Badge → Top-Right Corner
- Add `FreeBadge` at `position: absolute, top: 20, right: 20` on the collage canvas (line ~445)
- Remove badge from the bottom info strip (line ~471)

### Files
- **Edit**: `src/pages/admin/SocialGraphics.tsx` — all changes in single file

