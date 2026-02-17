

# VideoHero Mobile Centering + Home Page Mobile Review

## Part 1: VideoHero Mobile Layout Fix

### Content Centering on Mobile
The content container (line 231) currently uses `container mx-auto px-4` which left-aligns within the viewport but doesn't vertically center relative to the mobile viewport. The section already has `items-center` (from the previous change), so vertical centering is handled. No additional changes needed for vertical centering.

### CTA Buttons Side by Side on Mobile
Currently (line 270), the CTA wrapper uses `flex-col sm:flex-row`, which stacks buttons vertically on mobile. Change to `flex-row` so they sit side by side at all sizes. Adjust button sizing so both fit comfortably.

### File: `src/components/VideoHero.tsx`

**Line 270** - Change CTA layout from stacking to inline:
```
// From:
className="flex flex-col sm:flex-row gap-3 md:gap-4 items-start max-w-xl"

// To:
className="flex flex-row gap-3 md:gap-4 items-center max-w-xl"
```

**Line 276** - Remove `w-full` from primary CTA button so it doesn't stretch on mobile:
```
// From:
className="... w-full sm:w-auto"

// To:
className="... w-auto"
```

## Part 2: Home Page Mobile Assessment

After reviewing every section of the Home page, the honest answer is: **nothing on the Home page would benefit from accordions or collapsing.**

Here's why:

- **Reset Week section**: This is the primary conversion block. Hiding any of its bullet points behind a tap would reduce conversion. It's already compact.
- **"What Makes Us Different" (3 reason cards)**: These are image-overlay cards that stack cleanly in a single column on mobile. They're visual and scannable -- an accordion would strip out the images and kill the impact.
- **Meet the Team (2 coach cards)**: Only two cards. Collapsing them would add friction for no space savings.
- **Longevity Block**: A single focused block -- nothing to collapse.
- **Local Trust Block**: Already a compact row with two buttons.

The Home page is already lean and conversion-focused. The existing vertical stacking pattern on mobile is the right call -- it keeps all selling points visible without requiring extra taps, which aligns with the site's conversion-first strategy.

### Technical Summary

Only one file changes: `src/components/VideoHero.tsx` (lines 270 and 276) to make CTA buttons display side by side on mobile and remove forced full-width sizing.

