
# Reduce Negative Margin on About Page Hero

## Current State
The About page hero section uses `-mt-[112px]` to pull the VideoHero up under the navigation header for the edge-to-edge cinematic effect.

## Proposed Change

| Property | Current | Proposed |
|----------|---------|----------|
| Negative margin | `-mt-[112px]` | `-mt-[80px]` |

This reduces the negative pull by 32px, which will show more of the header spacer area and position the hero lower on the page.

## File to Modify
`src/pages/About.tsx` (line 59)

## Implementation
```tsx
// BEFORE
<div className="-mt-[112px]">

// AFTER  
<div className="-mt-[80px]">
```

## Alternative Options
If `-80px` doesn't feel right, other common values to consider:
- `-mt-[64px]` — Even less overlap
- `-mt-[96px]` — Slight reduction from current

## Result
The hero video will sit slightly lower, reducing the overlap with the navigation area while still maintaining a clean visual connection.
