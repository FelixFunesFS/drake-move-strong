

# Adjust Mobile Hero Image Position to Hide Top Lights

## Current State
The hero background image uses `object-[center_20%]` on mobile, meaning the vertical focal point is at 20% from the top. This shows some ceiling lights at the top of the image.

## Change

### File: `src/components/Hero.tsx` (line ~99)

Update the mobile object-position from `center_20%` to `center_15%` to shift the crop upward slightly, hiding more of the lights at the top while keeping the subjects well-framed.

```
// Before:
object-[center_20%] md:object-[center_40%]

// After:
object-[center_15%] md:object-[center_40%]
```

Only mobile is affected -- desktop remains at `center_40%`. If 15% still shows too many lights, it can be further reduced to 10%.

