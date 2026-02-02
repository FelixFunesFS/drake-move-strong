
# Update All Primary Reset Week CTAs to Direct PunchPass Checkout

## Overview
Following the **Key First Click (KFC) methodology**, all primary conversion CTAs for Reset Week will be updated to link directly to the PunchPass checkout URL, bypassing internal landing pages to reduce friction and maximize conversions.

## Strategy

**Direct to Checkout (Primary CTAs)**: Any button or CTA where the user's intent is to purchase or start the program should link directly to PunchPass.

**Keep as Internal (Informational Links)**: Contextual "learn more" links within text, footer navigation, and blog posts will continue pointing to internal pages for SEO and user education.

---

## Files to Update

### High Priority: CTASection Components (7 pages)

These pages use `CTASection` with `ctaLink="/reset-week"`. Each will be updated to use the centralized URL.

| File | Current Link | New Link |
|------|--------------|----------|
| `src/pages/Home.tsx` | `/reset-week` | `PUNCHPASS_URLS.resetWeek` |
| `src/pages/About.tsx` | `/reset-week` | `PUNCHPASS_URLS.resetWeek` |
| `src/pages/Pricing.tsx` | `/reset-week` | `PUNCHPASS_URLS.resetWeek` |
| `src/pages/FAQ.tsx` | `/reset-week` | `PUNCHPASS_URLS.resetWeek` |
| `src/pages/Schedule.tsx` | `/reset-week` | `PUNCHPASS_URLS.resetWeek` |
| `src/pages/SuccessStories.tsx` | `/reset-week` | `PUNCHPASS_URLS.resetWeek` |
| `src/pages/Insights.tsx` | `/reset-week` | `PUNCHPASS_URLS.resetWeek` |

### High Priority: Primary Conversion Buttons (12+ instances)

These are standalone buttons where the user clicks with intent to purchase.

| File | Location | Change |
|------|----------|--------|
| `src/pages/Home.tsx` | Hero button (line ~65) | Direct to PunchPass |
| `src/pages/Home.tsx` | "You're in the Right Place" button (line ~230) | Direct to PunchPass |
| `src/pages/Schedule.tsx` | Comparison section button (line ~324) | Direct to PunchPass |
| `src/pages/Pricing.tsx` | "Still unsure?" inline link (line ~481) | Direct to PunchPass |
| `src/pages/services/LowImpactFitnessCharleston.tsx` | Hero + CTA buttons | Direct to PunchPass |
| `src/pages/services/MobilityFitnessAvondale.tsx` | Hero + CTA buttons | Direct to PunchPass |
| `src/pages/services/StrengthTrainingCharleston.tsx` | Hero + CTA buttons | Direct to PunchPass |
| `src/pages/services/WestAshleyFitness.tsx` | Hero + CTA buttons | Direct to PunchPass |
| `src/components/chat/ChatBot.tsx` | Quick action button | Direct to PunchPass |

### No Changes Required (Informational Links)

These will remain as internal links for SEO and education purposes:

- `src/components/Footer.tsx` - Footer navigation links to `/reset-week-charleston`
- `src/pages/About.tsx` - Inline text mentions ("Experience our approach through Reset Week")
- `src/components/insights/BlogContentComponents.tsx` - Blog post contextual links
- `src/pages/InsightPost.tsx` - Post footer links

---

## Implementation Pattern

### Step 1: Import Centralized URL

Add to each file being updated:
```tsx
import { PUNCHPASS_URLS } from "@/data/pricing";
```

### Step 2: Update CTASection Components

**Before:**
```tsx
<CTASection
  title="Ready to Start?"
  ctaText="Start Reset Week — $50"
  ctaLink="/reset-week"
/>
```

**After:**
```tsx
<CTASection
  title="Ready to Start?"
  ctaText="Start Reset Week — $50"
  ctaLink={PUNCHPASS_URLS.resetWeek}
/>
```

The `CTASection` component (already updated) will automatically detect the external URL and render an `<a>` tag with `target="_blank"`.

### Step 3: Update Standalone Button Links

**Before:**
```tsx
<Button asChild>
  <Link to="/reset-week">Start Reset Week — $50</Link>
</Button>
```

**After:**
```tsx
<Button asChild>
  <a href={PUNCHPASS_URLS.resetWeek} target="_blank" rel="noopener noreferrer">
    Start Reset Week — $50
  </a>
</Button>
```

### Step 4: Update ChatBot Quick Action

**Before:**
```tsx
{ label: "Reset Week", path: "/reset-week-charleston" }
```

**After:**
```tsx
{ label: "Reset Week", path: PUNCHPASS_URLS.resetWeek, external: true }
```

---

## Summary of Changes

| Category | Files | Instances |
|----------|-------|-----------|
| CTASection updates | 7 pages | 7 |
| Primary button updates | 8 pages | ~15 |
| ChatBot quick action | 1 component | 1 |
| **Total** | **10 unique files** | **~23 instances** |

---

## Benefits

1. **Reduced friction**: Users go directly to checkout without extra clicks
2. **Centralized management**: All URLs in one file (`src/data/pricing.ts`)
3. **Consistent experience**: All primary CTAs behave the same way
4. **SEO preserved**: Internal pages remain linked from footer and informational contexts
5. **Follows KFC methodology**: Single, high-intent primary action across the site
