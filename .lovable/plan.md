

## Add Day 3 "Recovery & Next Steps" Email

### Marketing Strategy

The best approach here is **value-first nurturing** — give them something genuinely useful (recovery advice) that simultaneously:

1. **Normalizes soreness** — prevents the "I'm not fit enough" dropout
2. **Positions David as their coach**, not a salesperson — he's helping them recover before asking for anything
3. **Plants seeds of Drake's philosophy** without a sales pitch — a single line about Original Strength resets or tai chi-inspired mobility frames these as part of the coaching toolkit, not a product push
4. **Creates a natural bridge to class 2** — "your body is ready by Thursday"

The key marketing principle: **don't overwhelm, tease.** One brief mention of Original Strength resets or a breathing drill gives them a taste of the depth behind the coaching without turning the email into a lecture. Think of it as a "trailer" — enough to intrigue, not enough to satisfy. They need to come back to class to get the full experience.

### Content Approach

- Subject: "Feeling sore? Good — here's what to do next"
- Tone: Coach texting an athlete after practice
- Image: `david-coaching-form.jpg` (David coaching = continuity of care)
- Body structure:
  - Normalize soreness (2 sentences)
  - 4 recovery tips as a clean visual list with icons/bold labels: Hydrate, Eat whole foods, Walk 15 min, Sleep
  - **One "coach's tip" callout box** (gold border, like the offer boxes): a single Original Strength reset or breathing technique — "Try this before bed: 2 minutes of diaphragmatic breathing. It's how we start every class." This teases the methodology without explaining it
  - Reassurance: "Class 2 is always easier than class 1"
  - Soft CTA: View Schedule (not "Book Now")
- Sign-off: Personal from David

### Why NOT to include video or tai chi deep-dives

- Video links in emails have low click rates and add cognitive load
- Tai chi / Original Strength as topics require explanation that would make this email too long
- A single "try this one thing" is more actionable and memorable than a curriculum overview
- Save the methodology depth for the Day 5 "Why I Coach" email or in-class experience

### Files Changed

| File | Change |
|---|---|
| `src/pages/admin/EmailSequences.tsx` | Insert Day 3 step into `newLeadSequence` array (between Day 1 and Day 5) |
| `src/lib/emailTemplates.ts` | Add `new-lead-Day 3` template with recovery tips + coach's tip callout |
| `supabase/functions/send-nurture-previews/index.ts` | Add matching Day 3 email definition |

No new images needed — reuses existing `david-coaching-form.jpg`.

