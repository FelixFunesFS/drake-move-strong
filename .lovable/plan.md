
# Plan: Domain Standardization + Welcome Page SEO — COMPLETED

## What Was Done

Standardized all URLs from `https://drake.fitness` → `https://www.drake.fitness` across 31 files, added noindex to Welcome page, and updated robots.txt.

### Files Updated

| Category | Files | Change |
|----------|-------|--------|
| **SEO Core** | `SEO.tsx`, `StructuredData.tsx` | Default canonical, ogImage, toAbsoluteUrl(), business schema |
| **Sitemap & Robots** | `sitemap.xml`, `robots.txt` | All URLs → www; added `Disallow: /welcome` |
| **Welcome Page** | `Welcome.tsx` | Added `noindex, nofollow` meta tag + www canonical |
| **Public Pages** | Home, Pricing, Schedule, Contact, About, Coaching, FAQ, Insights, SuccessStories, Ruckathon, NewYearChallenge, ResetWeekAlt | canonical → www |
| **Service Pages** | ResetWeekCharleston, StrengthTraining, LowImpact, WestAshley | canonical → www |
| **Blog** | InsightPost.tsx | canonical, articleSchema URL, social share URLs |
| **Auth/Member** | Auth, Dashboard, Profile, MyBookings | canonical → www |
| **Chatbot** | ChatMessage.tsx, chat-assistant edge function | Friendly link labels + system prompt URLs |
| **Email** | emailTemplates.ts, send-nurture-previews | CTA button URLs |
| **OG Redirect** | og-redirect edge function | SITE_URL constant |

### Google Search Console Checklist (Post-Deploy)

1. Verify `www.drake.fitness` property in Search Console
2. Submit updated sitemap: `https://www.drake.fitness/sitemap.xml`
3. Use URL Inspection on top 5 pages to request re-indexing
4. Update Google Business Profile website URL to `https://www.drake.fitness`
5. Confirm non-www redirects to www via 301 in Lovable domain settings
