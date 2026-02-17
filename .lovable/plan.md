

# Remove "The Method" Section

## What's being removed

The 3-step "The Method" section (lines ~115-170 in `src/pages/Home.tsx`) -- the "Start Reset Week / Train / Progress" steps with the gym interior background, dark overlay, and numbered circles.

## Change

**`src/pages/Home.tsx`**: Delete the entire Method section block (the `<section>` with the background image, dark overlay, 3-step grid, and connecting line). This is roughly lines 115-170.

## Result

The page flow becomes:

Purchase Card --> Trust Stats --> Testimonials --> Why Us --> Meet the Team --> Longevity --> Local Trust --> Final CTA

This removes ~400px of scroll depth and gets social proof (testimonials) directly after the trust stats, tightening the conversion funnel.

## No other files affected

The Method section is self-contained markup within Home.tsx -- no shared components or data files to clean up. The gym interior image import (`gymInteriorWide`) can also be removed since it's no longer used.

