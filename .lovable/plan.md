

# Center Hero Image on Mobile + Minor Spacing Refinements

## What changes

### 1. Center the background image on mobile
Change `object-right-top` to `object-[center_30%]` on mobile. This centers the image horizontally and crops slightly toward the top (30%) so you see the people training rather than the ceiling or floor.

### 2. Keep current button sizing (already optimal)
Your buttons are already well-sized:
- 56px min-height on mobile (exceeds the 44-48px touch target standard)
- Full-width on mobile, auto-width on desktop
- 14px font on mobile, 16px on desktop
- 12px gap between buttons

No changes needed here.

### 3. Minor spacing tightening
Reduce subtitle bottom margin from `mb-4` to `mb-5` on mobile to give slightly more breathing room before the CTA zone, creating a clearer visual break between "reading" and "acting."

## Technical details

| File | Line | Current | Proposed |
|---|---|---|---|
| `src/components/Hero.tsx` | 91 | `object-right-top md:object-[center_40%]` | `object-[center_30%] md:object-[center_40%]` |
| `src/components/Hero.tsx` | 123 | `mb-4 md:mb-6` | `mb-5 md:mb-6` |

### Why `object-[center_30%]` instead of plain `object-center`
Plain `object-center` crops at 50% vertically, which often shows too much floor in gym photos. Using 30% biases the crop upward, keeping heads and movement in frame while staying horizontally centered.

