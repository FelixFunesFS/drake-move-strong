

# "How It Works" + "Who It's For" — Conversion Copy Review

## 1. Schedule Link in Step 2

Step 2 says "KB Strong: Mon/Wed/Fri 8am & 11am, Thu 6pm" but doesn't link anywhere. Adding a "View Schedule" text link underneath the description keeps the step scannable while giving visitors who want confirmation a path — without replacing the CTA as the primary action. A simple inline `Link` to `/schedule` styled as `text-accent underline text-sm`.

## 2. Coach Mention — Trust vs. Browsing

Adding a coach name or photo to the "How It Works" stepper **would** invite browsing (who is this person? let me check their bio). That pulls attention away from the CTA. However, Step 3's description already says "coaching, form, and encouragement" which is the right level — it signals *coached environment* without naming anyone. No change needed here.

## 3. "Want coaching, not a gym membership" — Copy Problem

This line works *against* the funnel. The end goal is to convert intro users into **members**. Saying "not a gym membership" plants a negative association with the very thing you're selling next. It also overlaps with "Complete beginners" and "Not sure where to start" — all three say "I'm new and lost."

**Recommendation:** Replace with something that positions the visitor's *desire* without poisoning the membership concept:

**"Looking for guidance, not a generic workout app"**

This reframes the contrast away from "membership" and toward impersonal digital alternatives — which is the actual competitor for this audience.

## 4. Redundancy Audit — "Who It's For" List

Current 6 items:
1. "Complete beginners" — **keep**, core audience
2. "Restarting after time off" — **keep**, distinct segment
3. "Over 30 and need smarter training" — **keep**, strong local differentiator
4. "Tired of being sore for days" — **keep**, pain-point driven
5. "Not sure where to start" — **redundant** with #1 and #2. Being a beginner or restarting already implies not knowing where to start.
6. "Want coaching, not a gym membership" — **replace** per above

**Revised list (5 items, tighter):**
1. "Complete beginners"
2. "Restarting after time off"
3. "Over 30 and need smarter training"
4. "Tired of being sore for days"
5. "Looking for guidance, not a generic workout app"

5 items also fits a `sm:grid-cols-2` layout better (2+2+1 vs 3+3).

## Changes — 1 File

### `src/pages/services/ResetWeekCharleston.tsx`

**A. `whoItsFor` array (lines 49-56):** Replace 6 items with the 5 revised items above. Remove "Not sure where to start" and replace "Want coaching, not a gym membership" with "Looking for guidance, not a generic workout app".

**B. Step 2 description (lines 125 and 148):** After the schedule text, add a small `Link` to `/schedule`: `<Link to="/schedule" className="text-accent underline text-sm block mt-1">View full schedule</Link>`. This requires converting the `desc` field from a string to a JSX element, or rendering the link separately after the description text.

