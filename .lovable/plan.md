

## Changes

### 1. Fix Google review rating: 4.9 → 5.0
**File:** `src/pages/CommunityClass.tsx`, line 394
- Change `4.9 stars from 40+ reviews` → `5-star rating from 40+ reviews`

### 2. Hide "View Schedule" on community class page, keep "Text Us"
**File:** `src/components/MobileContactBar.tsx`
- The MobileContactBar is a global component rendered in `App.tsx` with two buttons: "View Schedule" and "Text Us"
- On the `/community-class` route, hide the "View Schedule" button and show only "Text Us" (full width)
- Use `useLocation()` (already imported) to detect the path and conditionally render

### Technical detail
- In `MobileContactBar.tsx`, check if `location.pathname === '/community-class'`
- If true, render only the "Text Us" button at full width (no divider)
- If false, render both buttons as before

