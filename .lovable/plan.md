
# Fix Grey Gap Below About Page Hero

## Problem Identified
There is a visible grey strip (approximately half inch) appearing between the bottom of the VideoHero section and the "Our Mobility-First Training Philosophy" section on the About page.

## Root Cause
The VideoHero uses `h-screen` (100vh), and the next section has no overlap with it. The gap appears because:
1. The VideoHero's dark gradient overlay doesn't extend seamlessly into the next section
2. The next section starts with normal positioning, creating a small visual gap where the page background shows through

## Solution
Add a negative top margin to the first content section after the hero, pulling it up slightly to overlap with the bottom of the hero section and eliminate the visual gap.

## File to Modify
`src/pages/About.tsx` (line 73-74)

## Implementation

```tsx
// BEFORE (lines 73-74)
<AnimatedSection animation="fadeInUp">
  <section className="py-16 md:py-24 bg-background">

// AFTER
<AnimatedSection animation="fadeInUp" className="-mt-1">
  <section className="py-16 md:py-24 bg-background">
```

This adds a 4px negative margin (`-mt-1`) to pull the next section up slightly, eliminating the visible gap while maintaining the visual flow.

## Alternative Approach
If the AnimatedSection component doesn't accept a className prop, we can wrap the section differently:

```tsx
// Wrap the section to add negative margin
<div className="-mt-1">
  <AnimatedSection animation="fadeInUp">
    <section className="py-16 md:py-24 bg-background">
      ...
    </section>
  </AnimatedSection>
</div>
```

## Result
The grey gap will be eliminated, creating a seamless transition from the video hero to the philosophy section.
