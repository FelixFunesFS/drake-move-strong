

# Gallery Section Between "Who It's For" and CTA — Conversion Analysis

## The Case For It

A gallery at this point in the page serves as **visual social proof** — the visitor has just read "This Is For You If..." and now needs to *believe* it before hitting the CTA. Showing real members training builds that belief faster than any copy can.

## The Case Against a Full Gallery

A traditional expand/collapse gallery (like the About page) invites browsing. Browsing kills conversion. On a landing page, every element must push toward the CTA, not away from it.

## Recommendation: A Compact "Proof Strip" — Not a Gallery

3-4 images in a single horizontal row. No lightbox. No expand button. No captions. Just a tight visual strip that says "real people train here" and keeps the scroll moving toward "Ready to Start?"

**Format:**
- Full-bleed row, 3 images on mobile (cropped square), 4 on desktop
- Slight rounded corners, no gaps or minimal 2px gaps
- No interaction — purely atmospheric
- Uses existing studio/community photos showing diverse members in class

**Best images from existing assets (coached group settings, diverse members):**
1. `community-plank-rows-kettlebells-new.jpg` — group floor work
2. `members-overhead-press-group.jpg` — group pressing
3. `studio-large-group.jpg` — wide community shot
4. `members-kettlebell-rack-hold.jpg` — members with kettlebells

## Technical Plan — 1 File

### `src/pages/services/ResetWeekCharleston.tsx`

1. **Add imports** for 4 community photos
2. **Insert a new section** between "Who It's For" and the final CTA section:
   - `bg-background` with minimal vertical padding (`py-8 md:py-12`)
   - No heading — the images speak for themselves
   - 4-column grid (`grid-cols-2 md:grid-cols-4`) with `gap-2`
   - Each image uses `OptimizedImage` with `aspectRatio="square"` and `rounded-lg`
   - Wrapped in a single `AnimatedSection` with `fadeInUp`
3. **No lightbox, no expand, no interaction** — this is a conversion page, not a gallery page

This adds roughly 1 scroll height on mobile (2 rows of 2 squares) and half a scroll on desktop (1 row of 4). Minimal cost, strong visual payoff right before the final CTA.

