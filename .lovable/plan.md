

# Reset Week Landing Page Improvements

## Overview
Three changes to the /reset landing page: swap the nav logo to the full branded logo linking home, move the philosophy quote below the "Why Different" section as a centered visual bridge, and add a trust bar with the specific badges requested.

## Changes

### 1. Full Logo in Nav Bar (lines 155-161)
Replace the favicon.png with the full Drake Fitness kettlebell logo (`drake-fitness-logo-kettlebell.png`) already used in the main Navigation. The Link already points to "/" (home), so no routing change needed -- just swap the image source and sizing.

### 2. Move Philosophy Quote After "Why Different" Section
Currently the PhilosophyQuote sits at line 299 between "Who It's For" and "What Happens During Reset Week." Move it to after the "Why Drake Fitness Is Different" section (after line 383) so it acts as a reinforcing statement after the differentiation pitch. Change to `variant="hero"` for a full-width centered display that visually complements the dark/light section rhythm.

### 3. Add Trust Badge Bar After the Quote
Insert a MicroTrustBadges row with the four specific badges: `['local', 'reviews', 'safe', 'coaching']` -- mapping to "Charleston-Based," "Verified Google Reviews," "Safe & Personal," and "Proven Coaching." This sits directly below the centered quote as a compact trust reinforcement before the "After Reset Week" section.

## Landing Page Strategy Note
For a conversion-focused landing page like /reset, the key principle is: **remove navigation options, reinforce a single action.** The current page already does this well -- minimal header with one CTA button, no full nav menu, sticky mobile CTA. Adding the full logo linking to the homepage gives visitors an escape route if they want to explore (good for trust), while keeping the page itself focused on the Reset Week offer. The quote + trust badges after "Why Different" creates a natural persuasion flow: differentiation claims followed by credibility proof followed by "what's next."

## Files Changed
- `src/pages/ResetWeekAlt.tsx` -- logo import, swap image in header, move PhilosophyQuote block, add MicroTrustBadges placement

