

## Make Hero Overlay Consistent (Non-Gradient)

Replace the gradient overlay on line 89 with a single uniform dark overlay.

**Change**: Line 89 of `src/pages/services/ResetWeekCharleston.tsx`

**Current**:
```
bg-gradient-to-t from-black/75 via-black/45 to-black/20 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent
```

**New**:
```
bg-black/60
```

A flat `black/60` overlay provides even text contrast across the entire hero without directional variation. One line change.

