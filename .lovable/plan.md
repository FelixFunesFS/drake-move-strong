
# Hide Chat Button Until Past Hero + Fix Subtitle Contrast

## Changes

### 1. Make ChatBot scroll-aware (`src/components/chat/ChatBot.tsx`)

The chat toggle button is fixed-position and always visible, overlapping the Hero CTAs. Add scroll detection (same pattern as MobileContactBar) so it only appears after scrolling ~400px past the hero.

- Add `useState` + `useEffect` scroll listener with 400px threshold
- Hide both the toggle button and chat window when at the top
- Smooth transition: use `opacity-0 translate-y-4` (hidden) to `opacity-100 translate-y-0` (visible)
- When chat is already open and user scrolls back up, it stays hidden until they scroll down again

### 2. Improve subtitle contrast (`src/components/Hero.tsx`)

The subtitle paragraph currently uses `text-gray-200` which can lack contrast against busy hero images. Update to `text-white/90` with a subtle text shadow for guaranteed readability.

**Line 123** -- change:
```
text-gray-200
```
To:
```
text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]
```

This ensures the subtitle text remains legible over any hero background image while maintaining a softer visual weight than the H1.

## Files changed

| File | Change |
|---|---|
| `src/components/chat/ChatBot.tsx` | Add scroll threshold (400px) to hide toggle button and chat window while hero is in view |
| `src/components/Hero.tsx` | Update subtitle from `text-gray-200` to `text-white/90` with drop shadow for better contrast |
