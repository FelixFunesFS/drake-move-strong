

# Fix Desktop Hero Content Spacing Below Navbar

## Problem
On desktop, the hero section's eyebrow text sits too close to the navigation bar. The current content positioning uses `md:pt-[5vh]` (approximately 54px on a 1080p screen), which doesn't provide enough breathing room between the nav and the first hero element.

## Root Cause
In `src/components/Hero.tsx` (line 65), the `fullViewport` content positioning is set to `md:items-start md:pt-[5vh]`. Combined with the `-mt-[20px]` on the h1, the content cluster feels cramped against the navbar on desktop.

## Fix
Increase the desktop top padding from `md:pt-[5vh]` to `md:pt-[8vh]` (~86px on 1080p). This provides proper visual separation without affecting mobile, which remains at `pt-[15vh]`.

## Technical Details

### File: `src/components/Hero.tsx`

**Line 65** - Update desktop padding only:
- From: `"items-start pt-[15vh] md:items-start md:pt-[5vh]"`
- To: `"items-start pt-[15vh] md:items-start md:pt-[8vh]"`

Mobile view (`pt-[15vh]`) remains completely unchanged.

