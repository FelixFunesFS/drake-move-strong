

## Community Class Landing Page — Updated Plan

All changes in `src/pages/CommunityClass.tsx` only.

### 1. White navbar
- Line 83: `bg-drake-teal/95 backdrop-blur-sm` → `bg-white shadow-sm`

### 2. Remove hero eyebrow
- Lines 122-125: Delete the `<span>` with MapPin + "AVONDALE · WEST ASHLEY · CHARLESTON"

### 3. Swipeable testimonials (mobile-first)
- Add a 3rd testimonial for stronger social proof
- Replace the static `grid md:grid-cols-2` (lines 302-313) with an embla `Carousel`
- Mobile: single card per slide, swipeable with dot indicators
- Desktop: show 2 cards side-by-side via `md:basis-1/2`
- Style per brand memory: gold left-border accent on quote cards, `bg-drake-teal/10` tint

### 4. Conversion/UX improvements (expert review additions)

**A. Show the actual next class date (high impact)**
- Compute the next 1st-Saturday dynamically using a helper function
- Display it prominently in the event strip, e.g. "Next Class: Saturday, May 3"
- Also surface it in the hero subtext to remove calendar guesswork

**B. Add urgency/scarcity to hero CTA area**
- Add a small line below the primary CTA: "Only 12 spots per class — reserve yours before they fill"
- Creates urgency without being pushy

**C. Gold community block — add a CTA (dead zone fix)**
- The gold section (lines 421-435) has emotional copy but no action
- Add a "RESERVE YOUR FREE SPOT" button at the bottom of this section

**D. Demote secondary hero button**
- Change "SEE WHAT TO EXPECT" from a full outlined button to a subtle text link with down-arrow
- Reduces decision fatigue; keeps the gold CTA as the clear primary action

**E. Add a mini FAQ section (objection handling)**
- Insert a 3-4 item accordion before the final CTA:
  - "Do I need any experience?" — No, all levels welcome
  - "What should I bring?" — Just comfortable clothes, we provide everything
  - "Is parking available?" — Yes, free street parking on Avondale Ave
  - "Can I bring a friend?" — Absolutely, just have them reserve a spot too
- Uses the existing `Accordion` component from `@/components/ui/accordion`

**F. Add Google review count to social proof header**
- Change "Google Reviews" to "4.9 stars from 40+ reviews" for stronger proof

---

### Technical details

- Carousel: import `Carousel, CarouselContent, CarouselItem` from `@/components/ui/carousel`; use `useCarousel` API for dot indicators
- Next-date helper: simple function that computes the next 1st Saturday from `new Date()`
- Accordion: import from `@/components/ui/accordion`
- No new dependencies needed — all components already exist in the project

