

# Homepage Coach Cards — Bio + Image Fix

## Changes (1 file: `src/pages/Home.tsx`)

### 1. Increase image height by ~10% with responsiveness
- Current: `h-96` (384px) fixed on both mobile and desktop
- New: `h-80 md:h-[422px]` — slightly smaller on mobile for better proportions, 10% taller on desktop

### 2. Fix Misty's head cropping
- Add `objectPosition="center 20%"` to Misty's `OptimizedImage` so the focal point shifts upward and her head isn't cut off

### 3. Add a 1-sentence bio for Misty
- Current copy is 2 dry sentences. Replace with a warmer single sentence:
  > "A certified yoga instructor, Misty leads her own yoga classes at Drake Fitness — Drake members receive a discount."

This keeps the partner framing clear while giving her a real credential in one line.

