

# Add Community Photo to "Your First Step" CTA Card + Responsiveness Review

## 1. Add the uploaded image to the project

Copy the uploaded community group photo to `src/assets/community-group-class.jpg` for use in the CTA card.

## 2. Split the "Your First Step" CTA card into text + image

Currently, the full-width CTA card (`md:col-span-3`) is text-only. Change it to a two-column layout:

- **Mobile**: Image stacks above text (image with rounded top corners, ~200px height)
- **Desktop**: Text left (60%), image right (40%), image fills the right side of the rounded card

Layout approach:
```
Desktop:  [ Text content  |  Community photo ]
Mobile:   [ Community photo (shorter)  ]
          [ Text content               ]
```

The card keeps `bg-primary rounded-xl` and the image uses `object-cover` to fill its half with overflow hidden and matching border radius on the right (desktop) / top (mobile).

## 3. Responsiveness strategy for text over images (the 3 reason cards)

The existing overlay cards use a solid approach:
- `aspect-[4/3]` with `min-h-[240px]` ensures cards never get too short
- Gradient `from-black/80` gives strong contrast for text

Two small refinements to bulletproof across all viewports:
- **Clamp title text**: Change from `text-lg md:text-xl` to `text-base sm:text-lg md:text-xl` so on 320px screens the title doesn't crowd
- **Clamp description text**: Change from `text-sm md:text-base` to `text-xs sm:text-sm md:text-base` for the tightest screens

These are minor safeguards -- the current design already works well.

## Technical details

### File: `src/components/CommunityReasonsSection.tsx`

**CTA card (lines 72-110)** -- replace the single `div` with a grid layout:

```tsx
<div className="bg-primary rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-5 min-h-[220px]">
  {/* Text - takes 3 of 5 cols on desktop */}
  <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center order-2 md:order-1">
    {/* ...existing text + buttons... */}
  </div>
  {/* Image - takes 2 of 5 cols on desktop */}
  <div className="md:col-span-2 h-48 md:h-auto order-1 md:order-2">
    <OptimizedImage
      src={communityGroupImage}
      alt="Drake Fitness community group photo after class"
      className="w-full h-full"
      aspectRatio="auto"
    />
  </div>
</div>
```

- Mobile: image shows first (order-1) at 192px height, text below (order-2)
- Desktop: text left (order-1, 60%), image right (order-2, 40%), image fills height naturally

**Overlay card text (lines 147, 151)** -- slightly smaller base sizes:
- Title: `text-base sm:text-lg md:text-xl`
- Description: `text-xs sm:text-sm md:text-base`

**Import** -- add the new image import at the top of the file (passed via props from Home.tsx) or import directly.

### File: `src/pages/Home.tsx`

Import the new image and pass it to `CommunityReasonsSection` via the `images` prop (add a `communityGroup` key).

### Files changed

| File | Change |
|---|---|
| `src/components/CommunityReasonsSection.tsx` | Split CTA card into text+image grid, refine overlay text sizes |
| `src/pages/Home.tsx` | Import new community photo, pass to section |
| `src/assets/community-group-class.jpg` | New file (copied from upload) |

