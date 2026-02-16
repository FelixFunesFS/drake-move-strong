

# Add Reset Week Purchase Card with Smooth Scroll on Home Page

## Strategy

Instead of duplicating pricing info across multiple sections, convert the hero CTA into a smooth scroll that lands on an enhanced "START HERE" section. This keeps visitors on-site longer, gives them the "what's included" context, and then sends them to PunchPass with confidence.

## Changes (1 file: `src/pages/Home.tsx`)

### 1. Hero CTA becomes a smooth scroll anchor

Change the hero `primaryCTA` from linking directly to PunchPass to scrolling down to `#reset-week`. This keeps the visitor on the page and builds intent before the external checkout.

The hero subtitle already says "7-Day Mobility Reset Week: Unlimited Classes for $50" so visitors know the price before scrolling.

### 2. Add `id="reset-week"` to the START HERE section

Add the anchor target to the existing START HERE section container so the smooth scroll lands there.

### 3. Replace the simple "Start Reset Week -- $50" button with a Reset Week purchase card

Inside the START HERE section, after the bullet list and "No experience needed" text, replace the single button with a compact purchase card containing:

- **Price callout**: "$50" large, "for 7 days" beside it
- **What's included** (compact list, reusing the details from Pricing page):
  - 7 days of unlimited classes
  - All class types: Foundation Flow, KB Strong, Mobility Reset, and more
  - Expert, joint-friendly coaching
  - No commitment required
- **Purchase button**: "Start Your Reset Week" linking to PunchPass (external)

This card sits naturally inside the existing START HERE layout -- no new sections, no extra scroll depth.

### 4. Add smooth scroll CSS

Add `scroll-behavior: smooth` to the html element (via index.css) and a small scroll-margin-top on the target section to account for the fixed nav.

## What stays the same

- The Method step 1 still says "Try 7 days of unlimited classes for just $50" (reinforcement, not redundancy -- it's in a different visual context)
- The final CTA at the bottom still links directly to PunchPass (for visitors who scroll all the way down and are ready)
- The START HERE bullet list and image remain unchanged

## Technical Details

| Area | Detail |
|---|---|
| Hero CTA link | Changes from PunchPass URL to `#reset-week` |
| Hero CTA behavior | Uses an `<a href="#reset-week">` with native smooth scroll |
| START HERE section | Gets `id="reset-week"` and `scroll-mt-20` for nav offset |
| New purchase card | Compact card inside existing grid, no new section |
| CSS | `scroll-behavior: smooth` added to `html` in `index.css` |
| Files changed | `src/pages/Home.tsx`, `src/index.css` |

