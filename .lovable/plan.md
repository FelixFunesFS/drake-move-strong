

# Update Hero Image — `/try-free-charleston`

## Conversion Logic

The current hero uses `hero-kettlebell-training.jpg` — a solo/equipment-focused shot. For a "Try 3 Classes Free" landing page, the hero image should show **people in a class** to create social proof and reduce the fear of walking in alone. The visitor should see themselves in the image.

## Best Candidate

**`studio-group-goblet-squats.jpg`** — Shows a coached group class doing a foundational movement (goblet squats) inside the studio. This is the strongest conversion signal:
- Multiple people training together (social proof)
- Coach-led environment (matches "guided" messaging)
- Indoor studio setting (matches the actual experience)
- Functional movement (matches "strength training" headline)

Alternative options if you prefer a different feel:
- `group-overhead-press-class.jpg` — group pressing overhead
- `community-plank-rows-kettlebells-new.jpg` — group floor work
- `studio-large-group.jpg` — wider community shot

## Change — 1 file

### `src/pages/services/ResetWeekCharleston.tsx`
- **Line 10**: Change the hero image import from `hero-kettlebell-training` to `studio-group-goblet-squats`
- **Line 87** (approx): Update the `alt` text to "Group strength training class at Drake Fitness in Charleston"

No layout or structural changes.

