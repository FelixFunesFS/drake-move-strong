
# Remove Header, Integrate Title into Schedule Section

## Overview
Eliminate the separate header section entirely and merge the page title into the Weekly Schedule section, making the schedule grid the immediate first content after navigation.

## Rationale
- Users visiting `/schedule` want to book immediately
- Removes all barriers between navigation and schedule
- Maintains SEO with inline H1
- Creates a focused, task-driven experience

## Changes Required

### File: `src/pages/Schedule.tsx`

**1. Remove the compact header section (lines 128-139)**

Delete this entire section:
```tsx
{/* Compact Header */}
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

**2. Update Weekly Schedule section to be the first section**

Modify the Weekly Schedule section (lines 141-151) to:
- Add top padding to account for fixed navigation (`pt-24`)
- Include an inline H1 title for SEO
- Add helper text below the title

```tsx
{/* Weekly Schedule - Primary Focus */}
<section className="pt-24 pb-8 md:pt-28 md:pb-12 bg-background">
  <div className="container mx-auto px-4">
    <div className="mb-6">
      <h1 className="font-hero text-xl md:text-2xl font-bold uppercase">
        Weekly <span className="text-primary">Schedule</span>
      </h1>
      <p className="text-sm text-muted-foreground">Click any class to book your spot</p>
    </div>
    <NativeWeeklySchedule />
  </div>
</section>
```

## Visual Result

### Before (Current)
```
┌─────────────────────────────┐
│  [Navigation]               │
├─────────────────────────────┤
│  CLASSES & SCHEDULE         │
│  Book Your Class            │  ← Separate header (~120px)
│  (compact header section)   │
├─────────────────────────────┤
│  Weekly Schedule            │
│  ┌───────────────────────┐  │
│  │  Calendar Grid        │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### After (Proposed)
```
┌─────────────────────────────┐
│  [Navigation]               │
├─────────────────────────────┤
│  Weekly Schedule            │  ← Inline title (minimal height)
│  Click any class to book    │
│  ┌───────────────────────┐  │
│  │  Calendar Grid        │  │  ← Immediately visible
│  └───────────────────────┘  │
└─────────────────────────────┘
```

## Technical Details

- **Navigation clearance**: `pt-24` ensures content clears the fixed nav
- **SEO**: H1 tag preserved with "Weekly Schedule" text
- **Responsive**: Compact title scales appropriately on mobile/desktop
- **Visual hierarchy**: Primary color accent on "Schedule" maintains brand styling

## Files to Edit
- `src/pages/Schedule.tsx` - Remove header section, update schedule section

## Mobile Optimization
- Schedule grid visible immediately on page load
- Title takes ~40px vertical space vs ~120px before
- Faster time-to-action for booking
