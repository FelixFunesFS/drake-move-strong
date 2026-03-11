

## Middle-Align Misty's Content to Her Image

**Change:** One class swap in `src/pages/About.tsx`, line 236.

Replace `items-start` with `items-center` on the grid container so the left content column vertically centers against the right image column on desktop.

```
// Before
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

// After
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
```

Single-line change. No other files affected.

