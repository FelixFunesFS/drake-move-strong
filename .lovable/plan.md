
# Refocus Hero Section for Conversion + Move Google Reviews

## Overview

Restructure the Hero to be a dedicated conversion section with a clear offer headline, and relocate the Google Reviews badge from the Hero eyebrow into the Testimonial Quote section.

## Changes

### 1. Hero Section Refocus (`src/pages/Home.tsx`)

**Current Hero eyebrow**: Location badge + Google Reviews badge
**New Hero eyebrow**: Location badge only (Google Reviews moves to quote section)

**Current Hero CTA**: Single button "START RESET WEEK"
**New Hero**: Two-part structure:
- Main headline stays: "Move Better. Live Stronger. Stay Pain-Free."
- Subtitle stays as-is (mobility-first functional strength...)
- Add a secondary offer block below the subtitle -- a short line: "7-Day Mobility Reset Week -- Unlimited Classes for $50"
- Add supporting micro-copy: "Start feeling the difference in just one week with small-group, mobility-first training at Drake Fitness in Avondale."
- Primary CTA: "Start Your Reset Week for $50" (replaces "START RESET WEEK")

Specifically in the Hero props:
- Remove `GoogleReviewsBadge` from the eyebrow (keep only the location badge)
- Update `subtitle` to the Reset Week offer copy
- Update `primaryCTA.text` to "Start Your Reset Week for $50"

### 2. Move Google Reviews to Testimonial Quote Section (`src/components/TestimonialCard.tsx`)

Add the `GoogleReviewsBadge` (compact variant) below the stars/author area in the testimonial card. This positions social proof alongside an actual customer quote, which is a stronger trust signal pairing.

- Import `GoogleReviewsBadge` into `TestimonialCard.tsx`
- Add it below the stars row, centered, with subtle styling

## Technical Details

### File: `src/pages/Home.tsx`

**Hero props changes (lines 51-65)**:
- Remove `GoogleReviewsBadge` from eyebrow -- eyebrow becomes just the location pill
- Change `subtitle` to: "7-Day Mobility Reset Week -- Unlimited Classes for $50. Start feeling the difference in just one week with small-group, mobility-first training at Drake Fitness in Avondale."
- Change `primaryCTA.text` to: "Start Your Reset Week for $50"
- Remove the `GoogleReviewsBadge` import if no longer used elsewhere on the page (it is still used -- the import stays since `GOOGLE_REVIEWS` data may be referenced)

### File: `src/components/TestimonialCard.tsx`

- Import `GoogleReviewsBadge` from `@/components/GoogleReviewsBadge`
- After the stars div (line 67), add the badge:
  ```tsx
  <div className="mt-6 flex justify-center">
    <GoogleReviewsBadge variant="hero" />
  </div>
  ```
  This renders the compact star row + "Google Reviews" text link, visually anchored to the testimonial.

### File: `src/components/Hero.tsx`

No changes needed -- the Hero component already supports all the props being used.

## Section Flow After Changes

1. **Hero**: Conversion-focused with Reset Week offer + single CTA button
2. Marquee
3. Today's Classes
4. START HERE
5. THE METHOD
6. Trust Stats
7. **Testimonial Quote** (now includes Google Reviews badge)
8. Community + 5 Reasons
9. WHO WE ARE
10. MEET THE TEAM
11. (rest unchanged)
