

# Left-Align Hero Background Image

## Change

In `src/components/Hero.tsx`, update the hero background `<img>` element's CSS to position the image from the left side instead of center-cropping.

### Current (line 90)
```
className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
```

### Proposed
```
className="absolute inset-0 w-full h-full object-cover object-left md:object-center animate-ken-burns"
```

- `object-left` -- positions the image's focal point to the left on mobile, so the left side of the photo is always visible
- `md:object-center` -- restores default center-cropping on desktop where the full image fits better

## File changed

| File | Change |
|---|---|
| `src/components/Hero.tsx` | Line 90: add `object-left md:object-center` to background image |

