

# Hide Reset Week Image on Mobile

## Rationale

The outdoor sandbag training image (right column of the Reset Week section) stacks **below** the purchase card on mobile. By that point the visitor has already:
1. Read the headline and bullet points
2. Seen the $50 price and feature list
3. Passed the "Purchase Reset Week" button

A 400px image after the CTA adds scroll depth without adding conversion value. On desktop/tablet it sits side-by-side and provides visual balance -- worth keeping.

## Change

**File: `src/pages/Home.tsx`** (line 115)

Add `hidden md:block` to the image wrapper so it only renders on md+ screens:

```
// Current
<AnimatedSection animation="slideInRight" delay={0.1} className="relative h-full min-h-[400px] md:min-h-[500px]">

// Updated
<AnimatedSection animation="slideInRight" delay={0.1} className="relative h-full min-h-[400px] md:min-h-[500px] hidden md:block">
```

This is a single class addition -- no content removed, no layout changes on desktop.

