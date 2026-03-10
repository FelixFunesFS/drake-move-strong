

## Funnel Audit: Build On-Site or Let Facebook Handle It?

### Recommendation: Let Facebook handle the funnel. Your site already has the right structure.

Here's why, and what to tighten.

---

### Current State — Your Pages Already Map to a Clean Funnel

```text
FACEBOOK AD (awareness + targeting)
  │
  ▼
LANDING PAGE (single conversion action)
  ├── /try-free-charleston  ← cold traffic, local SEO
  ├── /intro                ← warm/retarget traffic, standalone
  └── /                     ← organic/brand traffic, scroll to #intro-experience
  │
  ▼
PUNCHPASS CHECKOUT (external — handles payment/pass creation)
  │
  ▼
/welcome (post-purchase onboarding — book first class)
```

This is already a best-practice structure for a local service business. Each landing page has ONE action (claim free pass), and PunchPass handles the transaction. Adding an on-site multi-step funnel (email capture → nurture → checkout) would add friction to what is already a zero-cost, zero-commitment offer.

**Building a funnel on-site makes sense when**: the offer requires education or trust-building before conversion (e.g., $500+ coaching packages). For a free 3-class pass, the fewer clicks the better.

---

### What Should Be Tightened (No New Funnel Needed)

#### 1. Nav CTA is missing
The main navigation has no visible CTA button. Every page visit should have a persistent "Try Free" button in the top nav. Currently the nav links are: Home, About, Schedule, Pricing, 1:1 Coaching, Insights, Contact — all text links, no standout action.

**Fix**: Add a primary-colored "Try Free" button to the right side of the nav bar (desktop) and as a prominent item in the mobile menu. Link to `INTRO_URL` (direct to PunchPass).

#### 2. `/intro` and `/try-free-charleston` serve overlapping audiences
- `/intro` is a standalone page (no nav/footer) — good for Facebook ads
- `/try-free-charleston` has full nav/footer — good for organic/SEO

Both are valid. No consolidation needed, but ensure Facebook ad campaigns point to `/intro` (distraction-free) and Google/organic traffic goes to `/try-free-charleston`.

#### 3. Facebook Pixel placement
Confirm the Meta Pixel is installed and firing on:
- `/intro` (ad landing)
- `/try-free-charleston` (organic landing)
- `/welcome` (conversion confirmation — this is your "Purchase" event)

Without seeing a pixel in the codebase, this may need to be added via Google Tag Manager or directly in `index.html`.

#### 4. UTM-aware `/welcome` page
The `/welcome` page should be the Facebook "thank you" / conversion event page. If PunchPass redirects back to your site after purchase, `/welcome` is the right target. If not, consider adding a Meta Pixel "Purchase" event to the PunchPass thank-you page (if PunchPass supports custom scripts).

---

### Summary: What to Build

| Task | Why |
|------|-----|
| Add "Try Free" CTA button to Navigation | Every page becomes a conversion opportunity |
| Verify/add Meta Pixel to `index.html` | Facebook can optimize ad delivery |
| Fire conversion event on `/welcome` load | Closes the attribution loop |
| Keep `/intro` for ads, `/try-free-charleston` for organic | Right page for right traffic source |

No multi-step funnel, no email capture gate, no quiz. The offer is free — remove friction, not add it.

