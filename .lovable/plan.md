

# Remove "New or Unsure Where to Start" Note

## Overview
Remove the informational alert banner that appears below the hero section on the Classes & Schedule page.

## Current State

The banner displays the message: **"New or unsure where to start? We recommend beginning with Foundation Flow™ or Mobility Reset™"**

This section is located at lines 138-147 in `src/pages/Schedule.tsx`.

## Changes Required

### File: `src/pages/Schedule.tsx`

**Remove the entire section (lines 138-147):**
```tsx
<section className="py-6 md:py-8 bg-primary text-white">
  <div className="container mx-auto px-4">
    <Alert className="max-w-3xl mx-auto bg-drake-gold/20 border-drake-gold text-white">
      <Info className="h-5 w-5" />
      <AlertDescription className="text-base">
        <strong>New or unsure where to start?</strong> We recommend beginning with <strong>Foundation Flow™</strong> or <strong>Mobility Reset™</strong>
      </AlertDescription>
    </Alert>
  </div>
</section>
```

**Clean up unused imports:**
- Remove `Info` from lucide-react imports (if no longer used elsewhere)
- Remove `Alert` and `AlertDescription` from UI component imports (if no longer used elsewhere)

## Result
The Schedule page will flow directly from the Hero section to the Weekly Schedule section without the intermediate info banner.

