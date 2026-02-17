

# Right-Align Hero Background Image on Home Page

## Change

In `src/components/Hero.tsx`, update the background image positioning from `object-left` to `object-right` on mobile, keeping `md:object-center` on desktop.

### Current (line 91)
```
className="absolute inset-0 w-full h-full object-cover object-left md:object-center animate-ken-burns"
```

### Proposed
```
className="absolute inset-0 w-full h-full object-cover object-right md:object-center animate-ken-burns"
```

## File changed

| File | Change |
|---|---|
| `src/components/Hero.tsx` | Line 91: change `object-left` to `object-right` |

