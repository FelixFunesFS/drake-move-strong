

# Update Reset Week Copy

## Change

**`src/pages/Home.tsx`** -- two edits in the Reset Week section:

1. **Remove two bullet points** from the "We specialize in helping" list:
   - "Busy parents who need flexibility & results"
   - "Former athletes seeking longevity"

2. **Replace the paragraph** below the list:
   - Old: `No experience needed. No pressure. Just expert guidance.`
   - New: `No experience needed. No pressure. Just expert coaching, ego-free community.` followed by a new line: `25+ years helping real people achieve sustainable results. All ages and levels welcome.`

## Technical Detail

Lines ~85-87: Remove the two `<li>` items from the `.map()` array.

Lines ~92-94: Replace the single `<p>` tag text with updated copy split across two sentences (or two `<p>` tags for visual separation).

## No other files affected

