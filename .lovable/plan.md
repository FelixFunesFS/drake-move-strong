
# Link & URL Audit: Findings and Remediation Plan

## Executive Summary

I've conducted a comprehensive review of all links, buttons, and CTAs across the Drake Fitness website. The most critical issue is that **the `/reset-week` route does not exist**, yet it's referenced in **20+ locations** across the site. This means visitors clicking these CTAs land on a 404 error page.

---

## Critical Issues Found

### 1. Broken Route: `/reset-week` Does Not Exist

**Impact**: High - Users clicking primary CTAs get a 404 error

**Current Valid Routes**:
- `/reset` - Landing page (ResetWeekAlt.tsx) - standalone page with its own header
- `/reset-week-charleston` - SEO service page with full site navigation

**Files with Broken `/reset-week` Links**:

| File | Line(s) | Context |
|------|---------|---------|
| `src/pages/Home.tsx` | 230, 474, 483 | "Start Reset Week" buttons and CTASection |
| `src/pages/Pricing.tsx` | 481, 550 | Text link and CTASection |
| `src/pages/FAQ.tsx` | 182 | CTASection |
| `src/pages/About.tsx` | ~575 | CTASection (estimated) |
| `src/pages/Schedule.tsx` | 324, 397 | CTA buttons |
| `src/pages/SuccessStories.tsx` | ~211 | CTASection |
| `src/pages/Insights.tsx` | ~260 | CTASection |
| `src/pages/services/LowImpactFitnessCharleston.tsx` | 353 | Primary CTA button |
| `src/pages/services/MobilityFitnessAvondale.tsx` | Similar pattern |
| `src/pages/services/StrengthTrainingCharleston.tsx` | Similar pattern |
| `src/pages/services/WestAshleyFitness.tsx` | Similar pattern |
| `src/components/CTASection.tsx` | 48 | Uses `<Link>` which breaks for external URLs |

---

### 2. CTASection Component Cannot Handle External URLs

**Issue**: The `CTASection` component uses React Router's `<Link>` for all CTAs:
```tsx
<Link to={ctaLink}>{ctaText}</Link>
```

This breaks if you want to send users directly to PunchPass (external URL). The component needs to detect external links and use `<a>` tags instead.

---

### 3. Inconsistent Link Strategy

The codebase has **two competing patterns**:

| Pattern | Example | Where Used |
|---------|---------|------------|
| Internal Route | `<Link to="/reset-week">` | Most pages |
| Direct PunchPass | `<a href="https://drakefitness.punchpass.com/...">` | ResetWeekAlt.tsx, Pricing.tsx (some) |

**Per the project memory (Key First Click methodology)**: Primary CTAs should link **directly to PunchPass checkout** to reduce friction.

---

### 4. Centralized URLs Not Being Used

`src/data/pricing.ts` defines a `PUNCHPASS_URLS` constant that **is not imported anywhere**:

```ts
export const PUNCHPASS_URLS = {
  resetWeek: "https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219",
  foundation: "...",
  unlimited: "...",
  // etc.
}
```

Currently, each file hardcodes its own URLs, making updates error-prone.

---

### 5. Missing URL in Centralized Data

The **10-Class Flex Pack** URL is used in `Pricing.tsx` (line 374) but missing from `PUNCHPASS_URLS`:
```
https://drakefitness.punchpass.com/org/5950/catalogs/purchase/pass/219932
```

---

## Correct Links Reference

| Destination | Correct URL |
|------------|-------------|
| Reset Week Checkout | `https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219` |
| Foundation Membership | `https://drakefitness.punchpass.com/catalogs/purchase/membership/219877?check=1735866784` |
| Unlimited Membership | `https://drakefitness.punchpass.com/catalogs/purchase/membership/219881?check=1735867211` |
| Remote Support | `https://drakefitness.punchpass.com/catalogs/purchase/membership/233268?check=1750796776` |
| 10-Class Pack | `https://drakefitness.punchpass.com/org/5950/catalogs/purchase/pass/219932` |
| Schedule | `https://drakefitness.punchpass.com/classes` |

---

## Recommended Fix Strategy

### Option A: Add Redirect (Quick Fix)
Add a route in `App.tsx` that redirects `/reset-week` to either:
- `/reset` (landing page without main nav)
- `/reset-week-charleston` (SEO page with full nav)
- Direct to PunchPass (requires different approach)

### Option B: Direct-to-Checkout (Best for Conversions)
Per the "Key First Click" methodology in project memory:
1. Update `CTASection` to support external URLs
2. Change all primary "Reset Week" CTAs to link directly to PunchPass checkout
3. Keep `/reset-week-charleston` for SEO and informational purposes

### Option C: Hybrid Approach (Recommended)
1. Add `/reset-week` as a redirect to `/reset` in `App.tsx`
2. Update `CTASection.tsx` to detect external URLs
3. Gradually migrate high-intent CTAs to direct PunchPass links
4. Import `PUNCHPASS_URLS` from centralized data file

---

## Implementation Steps

1. **Add redirect route** in `App.tsx`:
   ```tsx
   import { Navigate } from "react-router-dom";
   // Add route:
   <Route path="/reset-week" element={<Navigate to="/reset" replace />} />
   ```

2. **Update CTASection.tsx** to handle external URLs:
   ```tsx
   const isExternal = ctaLink.startsWith('http');
   {isExternal ? (
     <a href={ctaLink} target="_blank" rel="noopener noreferrer">
       {ctaText}
     </a>
   ) : (
     <Link to={ctaLink}>{ctaText}</Link>
   )}
   ```

3. **Add missing URL** to `PUNCHPASS_URLS` in `src/data/pricing.ts`:
   ```ts
   flexPack: "https://drakefitness.punchpass.com/org/5950/catalogs/purchase/pass/219932",
   ```

4. **Update ChatMessage.tsx** to include the internal route mapping:
   ```ts
   'https://drake.fitness/reset-week-charleston': '🎁 Reset Week Info',
   ```

---

## Files Requiring Updates

| Priority | File | Change |
|----------|------|--------|
| Critical | `src/App.tsx` | Add `/reset-week` redirect |
| High | `src/components/CTASection.tsx` | Support external URLs |
| High | `src/data/pricing.ts` | Add flexPack URL |
| Medium | All 10+ pages with `/reset-week` links | Consider updating to direct PunchPass |

---

## Footer & Navigation Links (Verified Working)

The Footer correctly links to:
- `/reset-week-charleston` (valid route)
- All other internal routes are valid
- External social links are correct

---

## Best Practice for Future Links

1. **Primary conversion CTAs** (e.g., "Start Reset Week"): Link directly to PunchPass checkout
2. **Informational links** (e.g., "Learn about Reset Week"): Link to internal pages
3. **Always import** from `PUNCHPASS_URLS` for external checkout links
4. **Use the CTASection** component consistently for major CTAs (after updating it)
