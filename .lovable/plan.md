

# Fix: Hero Title Wrapping to 5 Lines on Laptop

## Problem

The H1 title in the hero is defined as three phrases separated by `<br />` tags:
- "Move Better."
- "Live Stronger." (gold accent)
- "Stay Pain-Free."

At the `lg` breakpoint (1024px+), the font size jumps to `text-8xl` (96px). Combined with the `max-w-2xl` (672px) container constraint, the longer phrases "LIVE STRONGER." and "STAY PAIN-FREE." each wrap onto two lines, producing 5 visual rows instead of 3.

## Solution

Increase the content container width from `max-w-2xl` (672px) to `max-w-3xl` (768px). This gives the large title text enough room to stay on 3 lines at all desktop breakpoints while keeping the layout left-aligned and not overly wide.

## File: `src/components/Hero.tsx` (line ~111)

```
Before:
  <div className={cn("max-w-2xl text-white", centered ? "text-center mx-auto" : "text-left")}>

After:
  <div className={cn("max-w-3xl text-white", centered ? "text-center mx-auto" : "text-left")}>
```

## Why This Approach

- `max-w-3xl` (768px) accommodates "STAY PAIN-FREE." at `text-8xl` without wrapping
- Minimal change -- only 1 class name updated
- Does not affect mobile sizing (mobile text is `text-5xl` which fits easily)
- Other pages using `Hero` with shorter titles are unaffected by the wider max-width
- The subtitle and CTA buttons already have their own `max-w-xl` constraint, so they stay contained

## Impact

| Viewport | Before | After |
|---|---|---|
| Desktop (1024px+) | 5 lines (wrapping) | 3 lines (as designed) |
| Tablet (768-1023px) | 3 lines | 3 lines (unchanged) |
| Mobile (under 768px) | 3 lines | 3 lines (unchanged) |

**File modified:** `src/components/Hero.tsx` -- 1 line change
