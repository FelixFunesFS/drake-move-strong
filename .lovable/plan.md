

## Plan: Mobile Responsiveness Polish + Future-Proof Coach Copy

### 1. Mobile Responsiveness Fixes

The page is already mostly responsive, but a few areas need tightening:

- **Hero section**: On small screens the `min-h-[90vh]` + `pt-16` can push content awkwardly. Add `px-5` for slightly more breathing room on small phones and reduce hero min-height on mobile.
- **Hero H1**: `text-5xl` on very small screens (320px) can overflow. Scale down to `text-4xl` base, then `sm:text-5xl`.
- **Hero CTA buttons**: On narrow screens both buttons can wrap oddly. Make them `flex-col sm:flex-row` so they stack cleanly on mobile with `w-full sm:w-auto`.
- **Event Detail Strip**: Already `grid-cols-2 md:grid-cols-4` — good. Add slightly more vertical gap on mobile (`gap-y-6`).
- **Coach section image**: On mobile the `aspect-[3/4] max-h-[500px]` is fine but add `max-h-[400px] md:max-h-[500px]` so it doesn't dominate the viewport.
- **Credentials badges**: Already `flex-wrap` — good as-is.
- **Footer**: Already `flex-col sm:flex-row` — good.

### 2. Future-Proof Coach Copy

The line "Every community class is led personally by David — no assistants, no guesswork." will break when another trainer joins. Two options:

**Recommended approach**: Change the copy to be team-inclusive while still featuring David as founder/lead:

> "Every community class is coached by a Drake Fitness instructor — hands-on, expert-led, no guesswork."

The section heading stays "Coach David Drake" and the bio stays David-focused (he's the founder), but the closing line no longer promises it's *only* him.

### Files Changed

| File | Change |
|------|--------|
| `src/pages/CommunityClass.tsx` | Mobile responsive tweaks (hero sizing, CTA stacking, image constraints) + update coach paragraph copy |

