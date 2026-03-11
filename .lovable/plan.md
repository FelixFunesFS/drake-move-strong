

## Optimal Approach: Full-Width Offer Card Below the Split

Moving the offer card outside the 2-column split is the better choice. Here's why:

### Why Full-Width Wins

- **The split layout currently forces all conversion content into one narrow column** — headline, 4 qualifiers, How It Works (3 steps), Intro Card (4 MORE bullets + CTA + upsell). That's why it scrolls forever.
- **The photo column is `hidden md:block`** — on mobile, the photo disappears entirely and the left column becomes a single massive stack with no visual break.
- A full-width offer card below the split gives the CTA breathing room, creates a natural visual rhythm (context → action), and dramatically reduces the left column height.

### Plan

**File:** `src/pages/Home.tsx` — lines 78-146

**Left column of split (lines 80-141) — keeps only Context + Qualifier:**
- Eyebrow ("TRY US FREE")
- Headline ("Whether You're Starting Over or Leveling Up")
- "We coach every level:" + 4 qualifier bullets
- "How It Works" 3-step box (compact, stays here — it's instructional context)
- Phone number line
- **Remove**: the entire 3-Class Intro Card (lines 115-140)

**New full-width card below the split grid (after line 145):**
- Still inside the `max-w-6xl` white container
- Full-width bottom strip with `bg-muted` border-top
- Horizontal layout on desktop: `FREE · 3 classes / 30 days` on the left, CTA button on the right, upsell line underneath
- On mobile: stacks vertically, still compact
- Remove the 4 redundant bullets entirely — they repeat the qualifier list
- Keep: FREE header, CTA button, upsell line, "No commitment" as subtext

### Net Result
- Left column loses ~25 lines of height (the entire intro card)
- Offer card becomes a focused, high-contrast conversion strip
- Mobile scroll depth reduced ~30%
- Desktop gets a cleaner split with the CTA anchored at full width below

