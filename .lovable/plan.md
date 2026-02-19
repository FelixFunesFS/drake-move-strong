

# Right-Align Home Page Hero Section on Mobile

## Overview

Shift the hero text content (title, subtitle, CTAs) to right-aligned on mobile screens only, while keeping the current left-alignment on desktop.

## Changes

### File: `src/components/Hero.tsx`

**Line 103 -- Content container:**
Add `justify-end` on mobile to push content to the right, keeping default on desktop:
```
// Before:
<div className="container mx-auto px-4 pb-20 md:pb-0 relative z-10">

// After:
<div className="container mx-auto px-4 pb-20 md:pb-0 relative z-10 flex justify-end md:justify-start">
```

**Line 104 -- Text wrapper:**
Add `text-right md:text-left` so text aligns right on mobile, left on desktop:
```
// Before:
<div className={cn("max-w-2xl text-white", centered ? "text-center mx-auto" : "text-left")}>

// After:
<div className={cn("max-w-2xl text-white", centered ? "text-center mx-auto" : "text-right md:text-left")}>
```

**Line 131 -- CTA buttons container:**
Align buttons to the right on mobile:
```
// Before:
"items-start"

// After:
"items-end md:items-start"
```

These are mobile-only changes (below the `md:` breakpoint). Desktop layout remains unchanged.
