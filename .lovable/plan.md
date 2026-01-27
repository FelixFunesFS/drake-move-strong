
# Fix Schedule Page Layout: Remove Redundant Banner & Improve Hero Visibility

## Current Issue

On the Schedule page (especially mobile/tablet), there's a confusing visual hierarchy:
1. **Announcement Banner** (Reset Week promo) - ~48px
2. **Navigation** - ~64px  
3. **TodayClassesBanner** (showing today's classes) - ~160px on mobile
4. **Hero** ("BOOK YOUR CLASS") - pushed far down

This creates **420+ pixels** of content before users see the main hero, and the TodayClassesBanner is redundant since the Schedule page already displays the full class schedule below the hero.

## Solution Overview

### Option A: Remove TodayClassesBanner from Schedule Page (Recommended)
Since the Schedule page already has a comprehensive class display with `NativeWeeklySchedule`, the TodayClassesBanner is redundant. Remove it from the Schedule page only.

**User Experience Improvement:**
- Hero appears immediately after navigation
- Clean, focused entry point
- Schedule content is immediately visible after scrolling past hero
- No redundant class listings

### Option B: Hero-First with Scroll Reveal
Make the hero pull up behind the header (similar to VideoHero on About page) and slide into view on page load.

## Technical Implementation (Option A)

**File:** `src/App.tsx`

Update the TodayClassesBanner conditional to also exclude the Schedule page:

```typescript
// Current (Line 142):
{!hideNavFooter && location.pathname !== '/' && location.pathname !== '/about' && <TodayClassesBanner />}

// Updated:
{!hideNavFooter && 
 location.pathname !== '/' && 
 location.pathname !== '/about' && 
 location.pathname !== '/schedule' && 
 <TodayClassesBanner />
}
```

**Reasoning:**
- Home (`/`) has its own marquee + TodayClassesBanner placement
- About (`/about`) has VideoHero with edge-to-edge design
- Schedule (`/schedule`) already shows the full schedule - TodayClassesBanner is redundant

## Additional Mobile Optimization

**File:** `src/pages/Schedule.tsx`

Update the Hero height to be more compact on mobile to quickly reveal the schedule:

```typescript
// Current (Line 130-136):
<Hero
  eyebrow="CLASSES & SCHEDULE"
  title="Book Your Class"
  subtitle="All classes are coach-led, mobility-first, and beginner-friendly. Click any class to book your spot."
  backgroundImage={scheduleCommunityImage}
  className="h-[400px] md:h-[500px] lg:h-[600px]"
/>

// Updated - Shorter hero on mobile:
<Hero
  eyebrow="CLASSES & SCHEDULE"
  title="Book Your Class"
  subtitle="All classes are coach-led, mobility-first, and beginner-friendly. Click any class to book your spot."
  backgroundImage={scheduleCommunityImage}
  className="h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px]"
/>
```

This reduces the hero height on mobile by 100px, allowing users to see the schedule faster when scrolling.

## Visual Comparison

| Device | Before | After |
|--------|--------|-------|
| Mobile | Banner→Nav→TodayClasses→Hero→Schedule (~420px before hero) | Banner→Nav→Hero→Schedule (~112px before hero) |
| Tablet | Same stacking issue | Clean hero immediately after nav |
| Desktop | Less impactful but still redundant | Streamlined experience |

## Summary of Changes

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/schedule` to TodayClassesBanner exclusion list |
| `src/pages/Schedule.tsx` | Reduce hero height on mobile for faster schedule reveal |

## Result

- **Mobile:** Hero immediately after navigation, scroll to see schedule
- **Tablet:** Same improved experience
- **Desktop:** Cleaner hero area without redundant class preview
- **Consistency:** TodayClassesBanner appears on pages where it adds value (Pricing, Contact, Coaching, etc.) but not where the schedule is already the main content
