
# Right-Align Hero Content on Mobile

## Change

In `src/components/Hero.tsx`, update the content wrapper (line 104) to right-align text on mobile and revert to left-align on desktop.

### Current (line 104)
```
"max-w-2xl text-white", centered ? "text-center mx-auto" : "text-left"
```

### Proposed
```
"max-w-2xl text-white", centered ? "text-center mx-auto" : "text-right md:text-left ml-auto md:ml-0"
```

- `text-right` -- right-aligns all text on mobile
- `md:text-left` -- restores left-alignment on desktop
- `ml-auto` -- pushes the content block to the right on mobile
- `md:ml-0` -- resets to default positioning on desktop

The CTA button container (line 131) also needs updating to align buttons to the right on mobile:

### Current (line 131)
```
"items-start"
```

### Proposed
```
"items-end md:items-start"
```

## File changed

| File | Change |
|---|---|
| `src/components/Hero.tsx` | Lines 104, 131: add mobile right-alignment classes |
