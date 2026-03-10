

# Plan: Replace "Reset Week" with "3-Class Intro Experience" Site-Wide

## New Offer Details
- **Price**: Free (3 classes)
- **Duration**: 30 days to use all 3 classes
- **Available classes**: KB Strong — Mon/Wed/Fri at 8am & 11am, **Thu at 6pm**
- **PunchPass URL**: `https://drakefitness.punchpass.com/catalogs/purchase/pass/254246?check=1773100034`
- **Upsell**: First month unlimited for $110 (50% off $225) if they join within 7 days of 3rd class

## CTA Strategy

| Context | CTA Type | Button Text | Destination |
|---------|----------|------------|-------------|
| Home Hero | Learn More | "Try 3 Classes Free" | Scroll to `#intro-experience` |
| Home Start Here section | Direct | "Claim Your 3 Free Classes" | PunchPass URL |
| Pricing page | Direct | "Claim 3 Free Classes" | PunchPass URL |
| Schedule page | Direct | "Try 3 Classes Free" | PunchPass URL |
| Local SEO pages (hero) | Direct | "Claim 3 Free Classes" | PunchPass URL |
| Local SEO pages (bottom) | Direct | "Claim 3 Free Classes" | PunchPass URL |
| About, FAQ, Insights, Success Stories, Contact | Direct | "Try 3 Classes Free" | PunchPass URL |
| Promo Banner | Direct | "Claim Free Classes" | PunchPass URL |
| Chatbot | Direct | PunchPass URL | PunchPass URL |
| Footer | Internal link | "3-Class Intro (Free)" | `/reset-week-charleston` |

## Post-Purchase: Welcome Page
- New `/welcome` route with confirmation, next steps, and class schedule
- Shows available KB Strong classes (Mon/Wed/Fri 8am & 11am, Thu 6pm)
- "How It Works" 3-step guide embedded in Home and ResetWeekCharleston before the CTA

---

## Files to Change (20 total)

### 1. `src/data/pricing.ts`
- Replace `resetWeek` with `introExperience` (price: 0, 3 classes, 30 days)
- Update `PUNCHPASS_URLS.resetWeek` → `introExperience` with new URL

### 2. `src/pages/Home.tsx`
- SEO meta: replace "$50 Reset Week" with "3 Free Classes"
- Hero subtitle & CTA: "Try 3 Classes Free" → scroll to `#intro-experience`
- Section `#reset-week` → `#intro-experience`: rewrite purchase card with free offer, "How It Works" steps, upsell note
- Bottom CTASection: update copy and link

### 3. `src/pages/Pricing.tsx`
- SEO meta update
- "Movement Reset Week" card → "3-Class Intro Experience" (Free)
- Comparison table row update
- Bottom CTA update
- All hardcoded 46002 URLs → new URL

### 4. `src/pages/Schedule.tsx`
- "OUR PROGRAMS" section CTA button
- Bottom CTASection copy and link
- FAQ answer for "How do I get started?"

### 5. `src/pages/About.tsx`
- Bottom CTASection copy and link

### 6. `src/pages/FAQ.tsx`
- Bottom CTASection copy and link

### 7. `src/pages/Insights.tsx`
- Bottom CTASection copy and link

### 8. `src/pages/SuccessStories.tsx`
- Bottom CTASection copy and link

### 9. `src/pages/Contact.tsx`
- Form dropdown: "Reset Week ($50)" → "3-Class Intro (Free)"
- FAQ answer text and CTA button
- Structured data FAQ text

### 10. `src/pages/Coaching.tsx`
- No Reset Week references, but add secondary CTA mentioning the free intro alongside the 1:1 consultation

### 11. `src/pages/ResetWeekAlt.tsx` (standalone landing page at `/reset`)
- Full rewrite: "Reset Week $50" → "3-Class Intro Experience (Free)"
- Update all copy, CTAs, URL constant, SEO meta
- Add Thu 6pm to schedule references

### 12. `src/pages/services/ResetWeekCharleston.tsx` (SEO landing page)
- Full rewrite: hero, "What It Solves," "Who It's For," purchase card
- Add "How It Works" steps before CTA
- Update structured data schema
- Add Thu 6pm class time

### 13. `src/pages/services/StrengthTrainingCharleston.tsx`
- Hero CTA and bottom CTA: update text and URL

### 14. `src/pages/services/LowImpactFitnessCharleston.tsx`
- Hero CTA and bottom CTA: update text and URL

### 15. `src/pages/services/WestAshleyFitness.tsx`
- `whyResetWeek` data → reframe for intro experience
- All CTAs and FAQ answers update

### 16. `src/components/CommunityReasonsSection.tsx`
- CTA card: "Reset Week — $50" → "3-Class Intro — Free"
- Button text and link update

### 17. `src/components/Footer.tsx`
- "Reset Week ($50)" → "3-Class Intro (Free)"
- "Reset Week Charleston" link text update

### 18. `src/components/chat/ChatMessage.tsx`
- Link label mappings: update Reset Week labels to Intro Experience labels

### 19. `src/components/insights/BlogContentComponents.tsx`
- Update inline Reset Week references in blog content components

### 20. `supabase/functions/chat-assistant/index.ts`
- Replace entire "RESET WEEK" section in system prompt with 3-Class Intro Experience details
- Include: free, 3 classes, 30 days, KB Strong Mon/Wed/Fri 8am & 11am + Thu 6pm
- Include upsell path: $110 first month (50% off) within 7 days
- Update all PunchPass URLs

### 21. New: `src/pages/Welcome.tsx`
- Post-purchase confirmation page
- Shows next available KB Strong classes (Mon/Wed/Fri 8am & 11am, Thu 6pm)
- "What to expect" guidance (arrive 10 min early, wear comfortable clothes)
- Upsell reminder: "After your 3rd class, get 50% off your first month"

### 22. `src/App.tsx`
- Add `/welcome` route

### 23. Database: `promotions` table
- Update active banner record with new offer copy and PunchPass URL

