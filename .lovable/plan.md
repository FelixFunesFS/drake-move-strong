

# Mobile Hero Crop + Zoom-Out Title + Schedule Banner + FAQ CTA

## Overview

Four changes across three files:

1. Crop top 12% of hero image on mobile (Home page only)
2. Zoom-out title reveal animation on mobile
3. Schedule banner on Home page: mobile only (desktop and other pages unchanged)
4. Add a "Start Reset Week" CTA button to the Contact page FAQ

---

## Changes

### 1. Schedule Banner: Mobile-Only on Home Page

**Current behavior:** The `TodayClassesBanner` shows on the Home page at all screen sizes, and on most other pages at all sizes via `App.tsx`.

**New behavior:** On the Home page, only show it on mobile. Everything else stays exactly the same -- other pages (Pricing, Classes, Coaching, etc.) continue showing the banner on desktop as they do now.

**File: `src/pages/Home.tsx` (line 68)**

```
Before: <TodayClassesBanner />
After:  <div className="md:hidden"><TodayClassesBanner /></div>
```

**`src/App.tsx` -- NO changes.** The global banner for other pages remains untouched.

---

### 2. Hero Image: Crop Top 12% on Mobile (Home Only)

**File: `src/components/Hero.tsx`**
- Add a new optional prop: `imagePositionMobile?: string` (defaults to `"center 30%"`)
- On the `<img>` element, apply the mobile position via inline `style` and keep the desktop override via `md:!object-[center_40%]`

**File: `src/pages/Home.tsx`**
- Pass `imagePositionMobile="center 56%"` to the Hero component

All other pages using Hero are unaffected.

---

### 3. Zoom-Out Title Animation on Mobile

**File: `src/components/Hero.tsx`**
Update the `m.h1` animation so on mobile the title scales down from 115% to 100% while fading in after a 0.8s delay. Desktop keeps its current slide-up behavior unchanged.

---

### 4. Reset Week CTA in Contact FAQ

**File: `src/pages/Contact.tsx`**

In the third FAQ answer ("How do I get started at Drake Fitness?"), add a "Start Reset Week -- $50" button linking directly to the PunchPass checkout URL.

Current answer text:
> "Start with Reset Week -- 7 days of unlimited classes for $50. It's the best way to experience our training style and find the right class for you."

After: Same text, plus a gold CTA button below it linking to `https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219`.

This applies to both the visible FAQ cards and the structured data FAQ schema (structured data stays text-only, no button needed there).

---

## Technical Details

### Hero.tsx -- New prop and image positioning

Add to `HeroProps` interface:
```
imagePositionMobile?: string;
```

On the img element (line ~95):
```
Before:
  className="... object-[center_30%] md:object-[center_40%] animate-ken-burns"

After:
  style={{ objectPosition: imagePositionMobile ?? "center 30%" }}
  className="... md:!object-[center_40%] animate-ken-burns"
```

### Hero.tsx -- Title animation (line ~116)

```
Before:
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: isMobileView ? 0.8 : 0 }}

After:
  initial={{ opacity: 0, scale: isMobileView ? 1.15 : 1, y: isMobileView ? 0 : 15 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{
    duration: isMobileView ? 0.8 : 0.5,
    delay: isMobileView ? 0.8 : 0,
    ease: [0.25, 0.46, 0.45, 0.94]
  }}
```

### Home.tsx -- Wrap schedule banner + pass hero prop

```tsx
<Hero
  imagePositionMobile="center 56%"
  // ... all other existing props unchanged
/>

<div className="md:hidden">
  <TodayClassesBanner />
</div>
```

### Contact.tsx -- FAQ CTA button (line ~276, third FAQ card)

Import `PUNCHPASS_URLS` from `@/data/pricing` and add a button after the answer text:

```tsx
<p className="text-muted-foreground">{faq.a}</p>
{faq.cta && (
  <Button asChild size="sm" className="mt-3 bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold">
    <a href={faq.cta.url} target="_blank" rel="noopener noreferrer">{faq.cta.label}</a>
  </Button>
)}
```

The FAQ data array gets an optional `cta` field on the third item:
```tsx
{
  q: "How do I get started at Drake Fitness?",
  a: "Start with Reset Week — 7 days of unlimited classes for $50. ...",
  cta: { label: "Start Reset Week — $50", url: PUNCHPASS_URLS.resetWeek }
}
```

---

## Impact Summary

| Change | Scope | Mobile | Desktop |
|---|---|---|---|
| Schedule banner | Home page | Visible | Hidden |
| Schedule banner | Other pages | Visible (unchanged) | Visible (unchanged) |
| Hero image crop | Home only | Top 12% cropped | Unchanged |
| Hero image crop | Other pages | Default (center 30%) | Unchanged |
| Title animation | All pages with Hero | Zoom-out reveal | Slide-up (unchanged) |
| FAQ Reset Week CTA | Contact page | Gold button added | Gold button added |
| Text contrast | All | WCAG AA compliant | WCAG AA compliant |

**Files modified:** `src/components/Hero.tsx`, `src/pages/Home.tsx`, `src/pages/Contact.tsx`
