

# Remove Tagline from Reset Week Card

## Change

Remove the line "No experience needed. No pressure. Just expert coaching, ego-free community." from the Reset Week section on the Home page.

## Technical Detail

**File: `src/pages/Home.tsx`** -- Delete the `<p>` tag around line 120 that contains this text:

```
No experience needed. No pressure. Just expert coaching, ego-free community.
```

This sits between the bullet list and the Reset Week purchase card. Removing it tightens the section without losing any conversion-critical information (the bullet points above already communicate accessibility and the card below handles the CTA).

