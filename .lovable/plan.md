

## Meta Pixel: Outbound PunchPass Click Tracking + Strategic Overview

### What You Already Have (Well Covered)

Your current pixel setup handles the on-site funnel well:
- **PageView** — every route change
- **ViewContent** — pricing, classes, schedule, coaching pages
- **Lead** — contact form, chat lead capture
- **Schedule** — booking modal
- **CompleteRegistration** — auth signup
- **Contact** — phone/email clicks
- **FindLocation** — map interaction
- **UTM attribution** — 33+ tagged PunchPass links for PunchPass-side reporting

### What's Missing: The Critical Handoff

The biggest gap is the **moment someone clicks a PunchPass checkout link** — the last trackable action before they leave your domain. This is high-value because:
1. **Retargeting**: Build audiences of people who clicked "Claim 3 Free Classes" but never showed up
2. **Lookalike audiences**: Find more people similar to those who clicked checkout links
3. **Ad optimization**: Tell Meta which ads drive the most purchase-intent clicks

### Implementation Plan

**Single change point**: Add an `onClick` handler via a wrapper function in `useMetaPixel.ts` that fires `InitiateCheckout` (a standard Meta event — better than a custom event because Meta's algorithm already understands it and can optimize ad delivery against it).

Why `InitiateCheckout` over a custom event: Meta's ad system natively optimizes for standard events. `InitiateCheckout` maps perfectly to "clicked to start a purchase on an external platform."

**Create one helper function** in `src/hooks/useMetaPixel.ts`:

```typescript
export function trackPunchPassClick(utmContent: string) {
  trackMetaEvent('InitiateCheckout', {
    content_name: utmContent,
    content_category: 'PunchPass Checkout',
  });
}
```

**Then add `onClick` calls** to every PunchPass `<a>` tag across these files:

| File | # of links |
|---|---|
| `src/components/Navigation.tsx` | 2 |
| `src/components/CTASection.tsx` | 1 (when external) |
| `src/pages/Pricing.tsx` | ~7 |
| `src/pages/Schedule.tsx` | ~2 |
| `src/pages/Home.tsx` | ~2 |
| `src/pages/Welcome.tsx` | 1 |
| `src/pages/services/*.tsx` | ~10 across 4 files |
| `src/pages/ResetWeekAlt.tsx` | ~3 |
| `src/pages/NewYearChallenge.tsx` | ~1 |
| `src/components/schedule/TodayClassesBanner.tsx` | 1 |
| `src/components/CommunityReasonsSection.tsx` | 1 |

Each call reuses the existing `utm_content` string so reporting aligns between Meta Pixel and PunchPass UTM data.

### What About the Conversions API?

Meta recommends pairing the pixel with the **Conversions API** (server-side events) for better attribution accuracy — especially with iOS privacy changes reducing pixel reliability. This would require:
- A backend function that sends events to Meta's API
- Deduplication between pixel and server events

This is a future enhancement — the pixel-only approach works well as a starting point and gives you immediate retargeting capability.

### Summary

This is one new helper function + adding `onClick` handlers to ~30 existing links. No new components, no architectural changes.

