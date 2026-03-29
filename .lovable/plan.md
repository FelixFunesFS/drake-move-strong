

## Plan: Add Teal Accents + Fix Hero Button Contrast

### 1. Fix "See What to Expect" Button Contrast

The current outline button uses `border-white/40 text-white hover:bg-white/10` — the 40% white border is too faint against the dark hero overlay, and the hover state barely changes.

**Fix:** Change to a solid white outline with better hover:
- `border-white text-white hover:bg-white hover:text-drake-dark`
- Add drop shadow for extra visibility: `shadow-[0_0_0_1px_rgba(255,255,255,0.3)]`

### 2. Add Teal (#0B4A52) as Complementary Color

Currently the page is all dark/gold/white. Introduce the brand teal in these spots:

| Section | Current | New |
|---------|---------|-----|
| **Event Detail Strip** bg | `bg-drake-dark` | `bg-drake-primary` (teal) — differentiates it from the dark hero above |
| **"What to Expect" feature cards** icon circle bg | `bg-drake-gold/15` | `bg-drake-primary/15` with teal icons (`text-drake-primary`) — creates variety vs. gold-only |
| **"Who this is for" check icons** | `text-drake-gold` | `text-drake-primary` — teal checks complement the gold accents above |
| **"How It Works" step circles** | `bg-drake-gold text-drake-dark` | `bg-drake-primary text-white` — teal numbered circles |
| **Coach credentials badges** | `bg-muted text-muted-foreground` | `bg-drake-primary/10 text-drake-primary` — subtle teal badges |
| **Minimal header** bg | `bg-drake-dark/90` | `bg-drake-primary/95` — teal header |

### 3. Accessibility Notes

- All teal-on-white and white-on-teal combinations pass WCAG AA (teal #0B4A52 is dark enough for white text, 7.5:1 ratio)
- The hero button fix brings border contrast from ~2:1 to full white = clear visibility
- Gold CTA button remains unchanged (already high contrast)

### Files Changed

| File | Change |
|------|--------|
| `src/pages/CommunityClass.tsx` | Update button classes, swap bg colors / icon colors in ~6 sections |

