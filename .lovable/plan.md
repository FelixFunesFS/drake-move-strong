

## Google Search Profile Issue + Low-Impact Page Redesign

### Google Search Descriptions

First — the reason all your Google search results show the same description ("Move better, live stronger, and stay pain-free at Drake Fitness in...") is likely because Google is ignoring the React Helmet meta tags and falling back to the `index.html` default. This is a known issue with client-side rendered SPAs. Each page *does* have unique SEO metadata via React Helmet, but Google's crawler may not be executing the JavaScript. This is a separate issue from the page redesign — the fix involves the `og-redirect` edge function you already have. Worth investigating after this redesign.

### Low-Impact Page Problems (vs. other money pages)

Comparing `/low-impact-fitness-charleston` against `/strength-training-charleston` and `/west-ashley-fitness`:

| Element | Strength/West Ashley Pages | Low-Impact Page |
|---|---|---|
| Hero height | 80vh, larger text (3xl-6xl) | 70vh, smaller text (2xl-5xl) |
| Hero trust badges | Check marks below CTA | None |
| Secondary CTA | "View Location & Hours" | None |
| Who It's For section | Icon grid with pain points | Missing entirely |
| Intro offer explanation | Dedicated section with image | Missing |
| FAQ section | Present on other pages | Missing |
| Imagery | Authentic kettlebell/group photos | Yoga/Misty photo (off-brand) |
| Testimonial volume | 2-3 full testimonials | Same (good) |
| Overall depth | 500-550 lines, 8-10 sections | 365 lines, 7 sections |

### Plan: Elevate to Match Money Page Standards

**1. Hero upgrade** — Match 80vh height, larger typography (3xl-6xl), add trust badges below CTA (Serving Avondale & West Ashley, All Levels Welcome, Coach-Led), add secondary CTA to `/schedule`. Replace `studioFloorExercise` hero with `studio-mobility-training.jpg` (authentic mobility training photo, already used on other pages).

**2. Replace yoga image** — Swap `coach-misty-lister.png` in the "Our Approach" section with `david-coaching-form.jpg` (David coaching a member on form — directly relevant to joint-friendly training and on-brand).

**3. Add "Who This Is For" section** — Icon grid (matching Strength Training page pattern) with 4 pain-point cards targeting the low-impact audience:
- "Your joints ache after traditional workouts"
- "You've been told to 'just stretch more'"
- "Physical therapy ended but you're not confident training alone"
- "You want to get stronger without making things worse"

**4. Add 3-Class Intro offer section** — Two-column layout (image + details) explaining the intro experience, matching the pattern from StrengthTrainingCharleston. Uses `david-goblet-squat-kb-rack.jpg`.

**5. Add FAQ accordion** — Reuse the accordion pattern from the Schedule page. Joint-pain-specific questions:
- "Is this safe for people with chronic joint pain?"
- "What if I can't do certain exercises?"
- "How is this different from physical therapy?"
- "Do I need a doctor's clearance?"

**6. Use centralized INTRO_URL** — The final CTA currently hardcodes a PunchPass URL. Switch to `INTRO_URL` for consistency.

### Files Changed
- `src/pages/services/LowImpactFitnessCharleston.tsx` — Full redesign (single file, ~500 lines)

No database or backend changes needed.

