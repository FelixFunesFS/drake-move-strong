

# Replace Ruckathon Hero Image

## Changes

### 1. Copy uploaded image to project assets
- Copy `user-uploads://486869350_1218845086916214_6564217854346550761_n-2.jpg` to `src/assets/ruckathon-hero-group.jpg`

### 2. Update `src/pages/Ruckathon.tsx`
- Change the hero image import from `outdoor-sandbag-training.jpg` to the new `ruckathon-hero-group.jpg`
- Update the `alt` text to reflect the new group photo (e.g., "Drake Fitness ruckathon group photo outdoors")
- The hero section already handles responsive sizing and overlay gradients, so no layout changes needed

## Files Changed
- `src/assets/ruckathon-hero-group.jpg` (new asset)
- `src/pages/Ruckathon.tsx` (1 import change + 1 alt text update)

