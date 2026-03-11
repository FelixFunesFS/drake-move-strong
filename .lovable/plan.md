

## Add UTM Attribution Tracking to All PunchPass Links

### Approach

Create a centralized UTM link builder in `src/data/pricing.ts` and replace all raw `INTRO_URL` / `PUNCHPASS_URLS` references with tagged versions. This gives you full visibility into which page and CTA drove each PunchPass signup.

### Changes

**1. Add UTM helper to `src/data/pricing.ts`**

Add a `buildPunchPassUrl` function:

```typescript
export function buildPunchPassUrl(
  baseUrl: string,
  content: string,  // which CTA: 'hero-cta', 'nav-button', 'pricing-card', etc.
  campaign = 'intro-offer',
  source = 'website',
  medium = 'organic'
): string {
  const url = new URL(baseUrl);
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', campaign);
  url.searchParams.set('utm_content', content);
  return url.toString();
}
```

**2. Update every file that uses `INTRO_URL` or `PUNCHPASS_URLS`** (~13 files)

Each link gets a unique `utm_content` tag identifying the exact CTA. Examples:

| File | CTA | `utm_content` value |
|------|-----|---------------------|
| `Navigation.tsx` | "Try Free" nav button | `nav-try-free` |
| `Hero.tsx` | Hero CTA | `hero-cta` |
| `Pricing.tsx` | "Claim 3 Free Classes" | `pricing-intro-card` |
| `Pricing.tsx` | Foundation membership | `pricing-foundation` |
| `Pricing.tsx` | Unlimited membership | `pricing-unlimited` |
| `ResetWeekAlt.tsx` (intro page) | Main CTA | `intro-landing-cta` |
| `WestAshleyFitness.tsx` | Hero + bottom CTA | `west-ashley-hero` / `west-ashley-bottom` |
| `StrengthTrainingCharleston.tsx` | Hero + bottom CTA | `strength-hero` / `strength-bottom` |
| `CTASection.tsx` | Shared CTA component | Pass `utm_content` via prop |
| `ChatBot.tsx` / lead capture | Chatbot signup | `chatbot-cta` |
| `Home.tsx` CTA sections | Bottom CTAs | `home-cta-bottom` |

**3. For Facebook/Google ads** (external, not in code)

Document a UTM convention for ad platforms. These are set in the ad platform itself, not in the codebase:
- Facebook Ads: `?utm_source=facebook&utm_medium=cpc&utm_campaign=intro-offer&utm_content=ad-spring-2026`
- Google Business Profile: `?utm_source=google&utm_medium=organic&utm_content=gbp-website-link`

### What This Gives You

PunchPass shows the full URL when someone signs up, so you can see exactly which `utm_content` tag they came through. No database changes needed — PunchPass captures this automatically in their referral/source data.

### Scope

- ~13 files updated (one-line changes per link)
- 1 new utility function in `src/data/pricing.ts`
- Possibly add an optional `utmContent` prop to `CTASection.tsx`
- No backend or database changes

