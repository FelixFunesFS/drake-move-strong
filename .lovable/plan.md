
# Update Start Here Card CTA Text and Reduce Trust Stats Size

## Changes (2 files)

### 1. Update CTA text in the Start Here purchase card (`src/pages/Home.tsx`, line 107)

Change the button text from "Start Your Reset Week" to **"Purchase Reset Week"** -- clearer purchase intent language that tells visitors exactly what clicking does.

### 2. Also update the eyebrow label (line 72)

Change "START HERE" to **"PURCHASE YOUR RESET WEEK"** so the section header matches the action-oriented language.

### 3. Reduce Trust Stats Bar size (`src/components/TrustStatsBar.tsx`)

For the horizontal variant (the one used on Home), make these sizing reductions:

- **Padding**: Reduce from `py-8 md:py-12` to `py-5 md:py-8` (less vertical space)
- **Icon circles**: Reduce from `w-12 h-12 md:w-14 md:h-14` to `w-10 h-10 md:w-12 md:h-12`
- **Icon size**: Reduce from `size={24}` to `size={20}`
- **Number text**: Reduce from `text-2xl md:text-3xl` to `text-xl md:text-2xl`
- **Label text**: Keep at `text-sm` (already compact)
- **Gap**: Reduce from `gap-6 md:gap-8` to `gap-4 md:gap-6`

This makes the trust stats feel like a supporting accent band rather than a full section, keeping the page focused on conversion without losing credibility signals.

### Conversion thinking

The page flow becomes: Hero (price visible) --> smooth scroll --> "PURCHASE YOUR RESET WEEK" card with benefits + price + purchase button --> trust stats (compact, reinforcing) --> testimonials. Every element either builds intent or enables purchase -- no wasted scroll depth.

## Files
- `src/pages/Home.tsx` -- CTA text and eyebrow update
- `src/components/TrustStatsBar.tsx` -- horizontal variant sizing reduction
