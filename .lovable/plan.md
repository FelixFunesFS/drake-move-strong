
# Add Delayed Title Reveal on Mobile Hero

## What This Does

On mobile only, the hero title will fade in after a brief delay (~0.8s), giving users a moment to see the background image before the text appears. On desktop, the title renders instantly as it does now.

## Change

### File: `src/components/Hero.tsx` (lines 115-118)

Replace the static `h1` with an `m.h1` (framer-motion) that animates on mobile only. A CSS media query approach via Tailwind won't work for animation delay, so we'll use a simple CSS animation with a delay applied only below `sm` breakpoint.

The cleanest approach: wrap the h1 in a motion element with a fade-in animation, but use CSS to control the delay so it's mobile-only without needing the `useIsMobile` hook (avoids hydration flash).

```
// Before (line 116-118):
<h1 className="font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-3 md:mb-5 leading-[0.95] tracking-tighter uppercase -mt-[20px]">
  {title}
</h1>

// After:
<m.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-3 md:mb-5 leading-[0.95] tracking-tighter uppercase -mt-[20px] max-sm:[--motion-delay:0.8s] sm:!opacity-100 sm:!transform-none"
  style={{ willChange: "opacity, transform" }}
>
  {title}
</m.h1>
```

Actually, the simpler and more reliable approach: use framer-motion's `m.h1` with a media query check inline. Since the component already uses `LazyMotion` and `m`, we apply the animation universally but with a very short duration/no delay on desktop:

```
// After:
<m.h1
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.5,
    delay: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.8 : 0,
  }}
  className="font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-3 md:mb-5 leading-[0.95] tracking-tighter uppercase -mt-[20px]"
>
  {title}
</m.h1>
```

However, accessing `window` directly in render isn't ideal. The best approach is a pure CSS solution using Tailwind's animation utilities:

**Final approach**: Use `m.h1` with the animation always applied (subtle fade-in is fine for desktop too), but set a longer delay on mobile only via a state check using the existing pattern in the codebase.

Simplified final plan:
- Change `h1` to `m.h1` with `initial={{ opacity: 0, y: 15 }}` and `animate={{ opacity: 1, y: 0 }}`
- Use `duration: 0.5` and `delay: 0.8` for a gentle mobile reveal
- Wrap the delay in a media query check so desktop gets `delay: 0` (instant) while mobile gets `delay: 0.8`
- Use a small `useState` + `useEffect` at the top of the Hero component to detect mobile, defaulting to `false` so SSR/desktop renders immediately

### Additional: Add mobile detection to Hero component

At the top of the Hero component function, add:

```tsx
const [isMobileView, setIsMobileView] = useState(false);
useEffect(() => {
  setIsMobileView(window.innerWidth < 768);
}, []);
```

Then use `isMobileView ? 0.8 : 0` for the transition delay.

## Summary

- Mobile: title fades in after 0.8s delay so the hero image is seen first
- Desktop: title appears instantly (no delay)
- Subtle fade+slide animation on both for polish
