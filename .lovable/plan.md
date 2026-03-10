

## Mobile-First Audit: /try-free-charleston

### The Problem: Too Much Chrome, Diluted Conversion Focus

On a 390px mobile viewport, users currently see **4 persistent UI layers** before reaching the hero:

```text
┌─────────────────────────┐
│ AnnouncementBanner  ~48px│  ← promotion (DB-driven)
│ Navigation          ~56px│  ← includes "Try Free" CTA
│ TodayClassesBanner  ~80px│  ← schedule marquee
├─────────────────────────┤
│                         │
│   HERO (what's left)    │  ← ~660px remaining of 844px
│                         │
├─────────────────────────┤
│ MobileContactBar   ~56px│  ← fixed bottom bar
└─────────────────────────┘
```

That is ~240px of chrome on a page whose only job is to get one click: "Claim Your Free Classes." Every extra element competes with that action.

### What to Fix

#### 1. Hide TodayClassesBanner on `/try-free-charleston`

This banner is useful on informational pages (Pricing, Contact, About) where users might wonder "what's happening today?" On a conversion landing page, it is a distraction. The schedule info is already in Step 2 of "How It Works."

**Change**: In `src/App.tsx` (line 153), add `/try-free-charleston` to the exclusion list alongside `/`, `/about`, and `/schedule`.

#### 2. Hide MobileContactBar on `/try-free-charleston`

The sticky bottom bar ("View Schedule" / "Text Us") competes with the page's own CTA buttons. This page already has two prominent "Claim Free Classes" buttons and a contact link at the bottom.

**Change**: In `src/components/MobileContactBar.tsx`, check `location.pathname` and return `null` for `/try-free-charleston` and `/intro`.

#### 3. Keep AnnouncementBanner (conditionally)

The promotion banner is fine IF the promotion is relevant to the intro offer (e.g., urgency messaging). It already supports `target_pages` filtering in the DB, so you can control this per-promotion without code changes. No code change needed.

#### 4. Keep Navigation + "Try Free" CTA

The nav CTA reinforces the page goal. No change needed.

---

### Summary

Two small changes — hide the schedule marquee and mobile contact bar on conversion landing pages. This reclaims ~136px of mobile viewport and removes two competing click targets, keeping the user focused on the single conversion action.

No layout, content, or styling changes to the page itself — the page structure (Hero → How It Works → Experience → Who It's For → Proof → CTA → Trust) is already a clean conversion sequence.

