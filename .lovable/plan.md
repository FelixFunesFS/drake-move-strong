

# Add "View Schedule" to Hero + Scroll-Aware Mobile Contact Bar

## Strategy

Two audiences need immediate paths from the hero:

- **New leads**: "Start Your Reset Week" (primary gold CTA -- already exists)
- **Current members**: "View Schedule" (secondary outline CTA -- to be added)

The fixed MobileContactBar currently overlaps with the hero CTAs, creating visual redundancy. Making it appear only after scrolling past the hero eliminates that conflict and adds persistent utility deeper in the page.

## Changes

### 1. Add secondary CTA to the Hero (Home page only)

**`src/pages/Home.tsx`** -- add `secondaryCTA` prop to the Hero component:

```tsx
secondaryCTA={{
  text: "View Schedule",
  link: "/schedule"
}}
```

The Hero component already supports `secondaryCTA` with an outline button style, so no changes needed there.

### 2. Make MobileContactBar scroll-aware

**`src/components/MobileContactBar.tsx`** -- add scroll detection so the bar is hidden while the hero is in view and appears after scrolling past it:

- Use a simple `useState` + `useEffect` with a scroll listener
- Threshold: show after scrolling ~400px (roughly past the mobile hero)
- Add a slide-up transition for smooth appearance (`translate-y-full` to `translate-y-0`)

```
Viewport state:
  At top (hero visible)    -> MobileContactBar hidden
  Scrolled past hero       -> MobileContactBar slides up into view
```

### 3. Account for bottom bar spacing

The MobileContactBar covers the bottom of the viewport. The site already has `pb-safe` on mobile layouts. No additional padding changes are needed since the bar only appears when scrolling, well past any hero content.

## Technical details

| File | Change |
|---|---|
| `src/pages/Home.tsx` | Add `secondaryCTA` prop to Hero |
| `src/components/MobileContactBar.tsx` | Add scroll threshold (~400px) to toggle visibility with CSS transition |

## No other files affected

