
# Remove Hero Section from Schedule Page

## Overview
Replace the large hero image section with a compact, task-focused header that puts the weekly schedule immediately in view.

## Rationale
- Users visiting `/schedule` have clear intent: book a class
- Removes scroll barrier to the primary action
- Better mobile experience with schedule visible on load
- Matches UX patterns of booking-focused pages

## Changes Required

### File: `src/pages/Schedule.tsx`

**1. Remove Hero component and related import**

Remove the import:
```tsx
import Hero from "@/components/Hero";
import scheduleCommunityImage from "@/assets/schedule-community-group.jpg";
```

**2. Replace Hero section with compact header**

Remove:
```tsx
<Hero
  eyebrow="CLASSES & SCHEDULE"
  title="Book Your Class"
  subtitle="All classes are coach-led, mobility-first, and beginner-friendly. Click any class to book your spot."
  backgroundImage={scheduleCommunityImage}
  className="h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px]"
/>
```

Replace with a compact, styled header section:
```tsx
<section className="pt-24 pb-8 md:pt-28 md:pb-12 bg-drake-dark text-white">
  <div className="container mx-auto px-4 text-center">
    <p className="section-eyebrow text-drake-gold mb-2">CLASSES & SCHEDULE</p>
    <h1 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-4">
      Book Your <span className="text-drake-gold">Class</span>
    </h1>
    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
      All classes are coach-led, mobility-first, and beginner-friendly. Click any class to book your spot.
    </p>
  </div>
</section>
```

**3. Adjust Weekly Schedule section spacing**

Update the Weekly Schedule section to flow naturally from the new header:
```tsx
<section className="py-8 md:py-12 bg-background">
```
This remains the same, as it already has appropriate spacing.

## Visual Result

### Before (Current)
```
┌─────────────────────────────┐
│                             │
│      HERO IMAGE             │
│      (300-550px tall)       │
│                             │
│      "Book Your Class"      │
│                             │
├─────────────────────────────┤
│                             │
│    WEEKLY SCHEDULE          │
│    (below the fold)         │
└─────────────────────────────┘
```

### After (Proposed)
```
┌─────────────────────────────┐
│  CLASSES & SCHEDULE         │
│  Book Your Class            │
│  (Compact ~100px header)    │
├─────────────────────────────┤
│                             │
│    WEEKLY SCHEDULE          │
│    (immediately visible)    │
│                             │
└─────────────────────────────┘
```

## Mobile Optimization
- Header takes minimal vertical space (~120px with nav)
- Schedule grid visible immediately on page load
- Faster time-to-action for users wanting to book

## SEO Considerations
- H1 tag preserved with "Book Your Class" text
- Page title and meta description unchanged
- Structured data and FAQ schema remain intact
