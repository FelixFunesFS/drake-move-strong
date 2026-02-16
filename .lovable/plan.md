
# Remove "Learn more" Link from Mobility Card

## Change

In `src/components/CommunityReasonsSection.tsx`, remove the `link: "/schedule"` property from the first reason card ("Mobility before intensity") at line 33.

This will remove the "Learn more" text and arrow from the card overlay, and the card will render as a plain `div` instead of a clickable `Link`.

## Technical Detail

- **File:** `src/components/CommunityReasonsSection.tsx`
- **Line 33:** Delete `link: "/schedule",`
- 1 file, 1 line change
