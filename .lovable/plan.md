

# Move Hero Background Image Position Higher by 10%

## Change

In `src/components/Hero.tsx`, adjust the background `<img>` element's vertical object position so the image itself is cropped higher (showing more of the top of the photo).

### Current (line 91)
```
className="absolute inset-0 w-full h-full object-cover object-right md:object-center animate-ken-burns"
```

### Proposed
```
className="absolute inset-0 w-full h-full object-cover object-right-top md:object-[center_40%] animate-ken-burns"
```

This uses:
- `object-right-top` on mobile: keeps the right alignment but shifts the crop toward the top of the image
- `md:object-[center_40%]` on desktop: centers horizontally but crops at 40% from the top (instead of the default 50%), effectively shifting the visible area up by 10%

## File changed

| File | Change |
|---|---|
| `src/components/Hero.tsx` | Line 91: update object-position classes to shift image crop upward |

