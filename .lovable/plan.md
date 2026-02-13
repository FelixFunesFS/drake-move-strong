

# Add Linked Google Reviews Badge After Testimonial Quotes

## What Changes
Add the existing `GoogleReviewsBadge` component (compact variant) directly below the two testimonial cards in the "Who It's For" section. It will link to the Google Reviews page so visitors can verify the reviews themselves -- a strong trust signal for conversion.

## Technical Details

### `src/pages/ResetWeekAlt.tsx`
1. Import `GoogleReviewsBadge` from `@/components/GoogleReviewsBadge`
2. After the testimonial grid's closing `AnimatedSection` (around line 303), add a centered `GoogleReviewsBadge` with the `compact` variant, wrapped in an `AnimatedSection` for consistent entrance animation

The badge already links to the Google Reviews URL internally, so no additional wiring is needed.

## Files Changed
- `src/pages/ResetWeekAlt.tsx` -- add import + badge placement (2 small edits)

