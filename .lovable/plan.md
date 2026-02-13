

# Replace Single Testimonial with Two Higher-Converting Reviews

## Conversion Strategy

The current single D. Ramos quote sits after the "Who It's For" cards. For maximum conversion, customer proof should do two things:

1. **Match the audience segment above it** -- the "Who It's For" cards target beginners, adults 30-65, and consistency seekers
2. **Show a specific result**, not just a feeling -- results-based testimonials convert 2-3x better than sentiment-only quotes

The best two reviews from the existing data for this placement:

- **Caitlin P.** -- "I have had 3 lower back surgeries... they helped me get back to working out consistently." Has a concrete result ("Back to training after 3 surgeries") and directly addresses the fear of injury that the audience cards describe.
- **Turner W.** -- "Even in the group classes, if you're a beginner, he will make sure you are comfortable and learn proper form." Directly speaks to beginners and group class comfort -- matching two of the three audience cards.

These two together cover the full emotional range: safety after injury (Caitlin) and beginner welcome (Turner).

## Layout Change

Replace the single centered card (lines 278-290) with a side-by-side 2-column grid of testimonial cards. Each card gets: 5-star rating, quote text, author name, and a result/theme tagline. On mobile, they stack vertically.

## Changes

### `src/pages/ResetWeekAlt.tsx` (lines 278-290)
Replace the single hardcoded D. Ramos testimonial block with a 2-column grid using data from `RESET_WEEK_REVIEWS`:

```tsx
<AnimatedSection delay={0.3} className="mt-12">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
    {/* Caitlin P. - Post-Surgery Safety */}
    <div className="bg-card p-8 rounded-2xl border border-primary/20 shadow-lg">
      <div className="flex gap-1 mb-4">★★★★★</div>
      <p className="italic">"I have had 3 lower back surgeries... they helped me get back to working out consistently."</p>
      <p className="font-semibold">— Caitlin P.</p>
      <p className="text-sm text-primary">Back to training after 3 surgeries</p>
    </div>
    {/* Turner W. - Group Class Comfort */}
    <div className="bg-card p-8 rounded-2xl border border-primary/20 shadow-lg">
      ...same structure with Turner's quote...
    </div>
  </div>
</AnimatedSection>
```

## Files Changed
- `src/pages/ResetWeekAlt.tsx` -- replace single testimonial with 2-card grid (lines 278-290)

