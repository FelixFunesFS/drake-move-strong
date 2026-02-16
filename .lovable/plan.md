
# Pricing Page Cleanup and Reset Week Enhancement

## Changes (all in `src/pages/Pricing.tsx` unless noted)

### 1. Keep Google Reviews badge above Reset Week -- remove only the arrow icon
Above the Reset Week card (lines 61-63), keep the `GoogleReviewsBadge` but switch from `variant="compact"` (which includes an `ExternalLink` arrow) to `variant="micro"`. The micro variant shows the star rating and "Google-rated in Charleston" text without the arrow icon.

**Alternative (if micro isn't the right look):** Replace the badge with inline stars + text directly, giving full control over what appears -- 5 gold stars, "5.0 on Google", no arrow, still a clickable link.

### 2. Remove Google Reviews badge, "Real people" text, and "Still unsure?" text below comparison table (lines 448-482)
Delete these three elements after the testimonial quotes:
- The `GoogleReviewsBadge` compact variant (line 450)
- "Real people. Real results. No gimmicks." (lines 451-453)
- "Still unsure? Start with the Reset Week..." paragraph (lines 480-482)

### 3. Enhance the Movement Reset Week card with additional "What's Included" details
Expand the existing 3-item benefit list (lines 79-91) to clearly show what's included:
- 7 days of unlimited classes (already there)
- All class types: Foundation Flow, KB Strong, Mobility Reset, and more
- Movement-first, joint-friendly coaching (already there)
- Go at your own pace -- no pressure to keep up (already there, slightly expanded)
- No commitment required

### 4. Update Reassurance Block text (lines 489-491)
Change the text to include the offer detail:
> "Not sure which option fits you? Try 7 days of unlimited classes for $50 -- we'll help you decide which membership is right for your goals after your first week."

### 5. Clean up unused imports
If `GoogleReviewsBadge` is only used once (above Reset Week) after removing the second instance, keep the import. If fully removed, delete the import.

## Summary
- **File:** `src/pages/Pricing.tsx` (1 file)
- **File:** `src/components/GoogleReviewsBadge.tsx` -- no changes needed; the `micro` variant already omits the arrow
- **Net effect:** Cleaner page, stronger Reset Week card, star rating kept above Reset Week without the distracting arrow icon
