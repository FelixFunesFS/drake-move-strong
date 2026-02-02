
# Comprehensive Pricing & Link Update Plan

## Overview
Update all membership pricing and purchase links across the entire site to reflect new pricing and direct PunchPass checkout URLs.

## New Values to Apply

| Item | Old Price | New Price | New PunchPass URL |
|------|-----------|-----------|-------------------|
| **Foundation Membership** | $180 | **$209** | `https://drakefitness.punchpass.com/catalogs/purchase/membership/219877?check=1735866784` |
| **Unlimited Membership** | $225 | **$239** | `https://drakefitness.punchpass.com/catalogs/purchase/membership/219881?check=1735867211` |
| **Remote Support** | N/A | N/A | `https://drakefitness.punchpass.com/catalogs/purchase/membership/233268?check=1750796776` |
| **Reset Week** | $50 (old URL) | $50 | `https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219` |

---

## Files Requiring Updates (8 Total)

### 1. `src/data/pricing.ts` — Centralized Data (Source of Truth)
| Line | Current | New |
|------|---------|-----|
| 15 | `price: 180` | `price: 209` |
| 22 | `price: 225` | `price: 239` |
| 52 | `resetWeek: "https://app.punchpass.com/org/9942/buy?passes=1023628"` | New Reset Week URL |
| New | — | Add `foundation`, `unlimited`, `remoteSupport` URLs |

### 2. `src/pages/Pricing.tsx` — Main Pricing Page
| Line | Element | Change |
|------|---------|--------|
| 35 | SEO description | Update "$180" → "$209", "$225" → "$239" |
| 100 | Reset Week button URL | Update to new Reset Week URL |
| 139 | Foundation price display | "$180" → "$209" |
| 161-163 | Foundation button | Change from `/contact` Link to external `<a>` with Foundation URL |
| 190 | Unlimited price display | "$225" → "$239" |
| 217 | Unlimited button URL | Update to new Unlimited URL |
| 324-330 | Remote Support button | Change from `/contact` Link to external `<a>` with Remote Support URL |
| 489 | Bottom Reset Week button | Update to new Reset Week URL |

### 3. `src/pages/FAQ.tsx` — FAQ Content
| Line | Current | New |
|------|---------|-----|
| 62 | "Foundation Membership (8 classes/month, $180)...Longevity Unlimited ($225/month)" | Update to "$209" and "$239" |

### 4. `src/pages/ResetWeekAlt.tsx` — Reset Week Landing Page
| Line | Current | New |
|------|---------|-----|
| 30 | `RESET_WEEK_URL = "https://app.punchpass.com/org/9942/buy?passes=1023628"` | New Reset Week URL |

### 5. `src/pages/services/ResetWeekCharleston.tsx` — SEO Landing Page
All Reset Week CTAs currently point to `/reset-week` internal route. These should be updated to the new direct purchase URL for better conversion.

| Location | Current | New |
|----------|---------|-----|
| Hero CTA (line ~85) | `<Link to="/reset-week">` | External `<a>` with new Reset Week URL |
| Bottom CTA (line ~226) | `<Link to="/reset-week">` | External `<a>` with new Reset Week URL |

### 6. `src/components/chat/ChatMessage.tsx` — Chatbot Link Labels
| Line | Current | New |
|------|---------|-----|
| 20 | Old intro week URL mapping | Add new Reset Week URL to `friendlyLabels` |

### 7. `supabase/functions/chat-assistant/index.ts` — AI Assistant System Prompt
| Lines | Current | New |
|-------|---------|-----|
| 162 | `https://drake.fitness/reset-week` | Update to direct PunchPass purchase URL |
| 169 | "Purchase Reset Week: https://drake.fitness/reset-week" | Update to new PunchPass URL |

### 8. `src/pages/Home.tsx` — Hero CTA (Optional)
| Line | Current | New |
|------|---------|-----|
| 66 | `link: "/reset-week"` | Can change to new direct PunchPass URL (external) |

---

## Technical Notes

### Converting Internal Links to External
When changing from internal `Link` to external purchase URLs:

```tsx
// BEFORE (internal route)
<Button asChild>
  <Link to="/reset-week">Start Reset Week</Link>
</Button>

// AFTER (direct checkout)
<Button asChild>
  <a 
    href="https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2"
  >
    Start Reset Week
    <ExternalLink className="h-4 w-4" />
  </a>
</Button>
```

### Chatbot Label Mapping Update
```typescript
// Add to friendlyLabels in ChatMessage.tsx
'https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219': '🎁 Get Intro Week Special',
```

---

## Decision Point: Internal vs External Reset Week Links

The site currently has two patterns for Reset Week CTAs:

1. **Internal route** (`/reset-week` or `/reset-week-charleston`) — Takes users to a landing page first
2. **Direct external** — Goes straight to PunchPass checkout

**Recommendation**: Update primary CTAs on conversion-focused pages (Pricing, ResetWeekCharleston hero, etc.) to direct checkout, but keep the landing pages accessible for SEO and users who want more information.

---

## Summary: All Locations

| File | Updates |
|------|---------|
| `src/data/pricing.ts` | Foundation price, Unlimited price, all new PunchPass URLs |
| `src/pages/Pricing.tsx` | 6 updates (prices, SEO, buttons) |
| `src/pages/FAQ.tsx` | 1 text update |
| `src/pages/ResetWeekAlt.tsx` | 1 URL constant |
| `src/pages/services/ResetWeekCharleston.tsx` | 2 CTAs |
| `src/components/chat/ChatMessage.tsx` | 1 label mapping |
| `supabase/functions/chat-assistant/index.ts` | 2 URL references |
| `src/pages/Home.tsx` | 1 hero CTA (optional) |

**Total: 8 files, ~15 individual changes**
