
# Increase Hero Title Font Size — Mobile AND Desktop

## Changes

### 1. Hero title font sizes — `src/components/Hero.tsx` (line 116)

Bump sizes across all breakpoints:

```
Before: text-4xl  sm:text-5xl  md:text-6xl  lg:text-7xl
After:  text-5xl  sm:text-6xl  md:text-7xl  lg:text-8xl
```

| Breakpoint | Before | After |
|---|---|---|
| Mobile (<640px) | text-4xl (36px) | text-5xl (48px) |
| sm (640px+) | text-5xl (48px) | text-6xl (60px) |
| md (768px+) | text-6xl (60px) | text-7xl (72px) |
| lg (1024px+) | text-7xl (72px) | text-8xl (96px) |

Every size steps up one notch, giving a bigger, more commanding title on both mobile and desktop.

### 2. Gold accent text contrast — `src/pages/Home.tsx` (line ~49)

Add a dark drop shadow to the gold "Live Stronger." span:

```
Before: <span className="text-accent">Live Stronger.</span>
After:  <span className="text-accent drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Live Stronger.</span>
```

Improves legibility of the gold text against the background image on all screen sizes.
