
# Contact Page Restructure and Zoom Class Filtering

## Changes Overview

Three changes across two files:

---

## 1. Filter Zoom Classes from TodayClassesBanner (Home Page)

**File:** `src/components/schedule/TodayClassesBanner.tsx`

The `TodayClassesBanner` component (the dark bar showing today's/tomorrow's classes) currently displays all classes including Zoom classes. Add a filter to exclude classes where `is_online` is `true`.

**How:** Add `.eq('is_online', false)` to both Supabase queries (today's classes at ~line 47, and the tomorrow fallback at ~line 68). This filters at the database level so we don't waste query slots on classes we won't show.

---

## 2. Contact Page: Replace Full Hero with Condensed Header

**File:** `src/pages/Contact.tsx`

Remove the full `<Hero>` component (lines 83-88) and replace it with a compact, responsive page header -- a dark strip with the eyebrow, title, and subtitle text. This eliminates the large hero image on the contact page, saving load time and getting visitors to the form/map faster.

The condensed header will be:
- A `bg-drake-dark` section with responsive vertical padding (`py-16 md:py-20`)
- Same text content (eyebrow, title, subtitle) styled consistently with the Hero component
- Fully responsive -- stacks naturally on mobile
- No background image, no import needed for `contactHeroClass`

---

## 3. Contact Page: Swap "Find Us" and "Send a Message" Sections

**File:** `src/pages/Contact.tsx`

Move the "Send a Message" form section (currently lines 186-308) above the "Find Us" map section (currently lines 90-184). The new order will be:

1. Condensed header (new)
2. Send a Message (contact form with David portrait)
3. Find Us (map + contact details)
4. FAQ section (unchanged)

This puts the primary action (sending a message) first, which is better for conversion.

---

## Responsiveness Considerations

- The condensed header uses tiered text sizing (`text-3xl` to `text-5xl`) and responsive padding
- Both the form and map sections already use `grid lg:grid-cols-2` with single-column stacking on mobile -- no changes needed
- The David portrait is already `hidden lg:block` so it only shows on desktop
- No layout shifts or fixed heights to worry about

## Technical Summary

| File | Change |
|---|---|
| `TodayClassesBanner.tsx` | Add `.eq('is_online', false)` to both queries |
| `Contact.tsx` | Replace Hero with condensed header, swap form and map section order, remove unused hero image import |
