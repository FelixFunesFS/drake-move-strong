
# Remove the Mobility Fitness Avondale Page

## What Changes

### 1. Delete the page file
- **Delete**: `src/pages/services/MobilityFitnessAvondale.tsx`

### 2. Remove route and import from App.tsx
- Remove the lazy import for `MobilityFitnessAvondale` (line 57)
- Remove the `<Route>` for `/mobility-fitness-avondale` (line 175)
- Add a redirect so any existing links or Google-indexed URLs go to a relevant page instead of a 404:
  ```
  /mobility-fitness-avondale --> /classes (or /west-ashley-fitness)
  ```

### 3. Update internal links (7 locations)
All links pointing to `/mobility-fitness-avondale` need to be redirected to a suitable alternative (likely `/classes` or `/west-ashley-fitness`):

| File | What to change |
|---|---|
| `src/components/Footer.tsx` (line 43) | Change "Mobility Training" link target or remove the list item |
| `src/pages/About.tsx` (line 285) | Update the "mobility" link in the coach description |
| `src/pages/Coaching.tsx` (line 267) | Update the "Mobility Training" link |
| `src/pages/Pricing.tsx` (line 528) | Update the "Mobility Training" link |
| `src/components/CommunityReasonsSection.tsx` (line 33) | Update the "Mobility before intensity" card link |
| `src/components/insights/BlogContentComponents.tsx` (line 550) | Update the "Avondale studio" link |

### 4. Remove from sitemap
- **`public/sitemap.xml`**: Remove the `<url>` block for `https://drake.fitness/mobility-fitness-avondale` (lines ~121-125)

## Redirect Strategy
A `<Navigate to="/classes" replace />` route will catch any bookmarked or Google-indexed traffic and send it to the Classes page, preventing 404 errors while Google de-indexes the old URL.

## Technical Details
- **Files deleted**: 1 (`MobilityFitnessAvondale.tsx`)
- **Files edited**: 7 (App.tsx, Footer.tsx, About.tsx, Coaching.tsx, Pricing.tsx, CommunityReasonsSection.tsx, BlogContentComponents.tsx, sitemap.xml)
- No database changes needed
- No edge function changes needed
