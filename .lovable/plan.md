
# Center Hero Content Vertically on Desktop

## What Changes

The home page hero content (headline, subtitle, CTAs) currently sits near the top of the viewport on desktop due to `md:items-start md:pt-[8vh]`. This will be changed to vertically center the content on desktop while keeping the mobile position unchanged.

## Technical Detail

**File: `src/components/Hero.tsx`** (around line 71)

Update the `contentPositionClass` for the `fullViewport` case:

```
// Current
"items-start pt-[15vh] md:items-start md:pt-[8vh]"

// Updated
"items-start pt-[15vh] md:items-center md:pt-0"
```

This centers the content block vertically on md+ screens while preserving the existing mobile positioning.
