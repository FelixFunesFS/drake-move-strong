

## Email Nurture Sequences — Admin Playbook Page

### Key Changes from Previous Plan

1. **Nick removed** — all coach references are David Drake only.
2. **"Prep Guide" email eliminated** — replaced with a "You're All Set — Just Show Up" email that reinforces zero-friction. Telling people to prepare contradicts the brand promise. Instead, this email *removes* anxiety by confirming nothing is needed.

### Revised Nurture Strategy

**Track 1: New Lead (Try 3 Free Classes)**

| Day | Subject Line | Psychology |
|-----|-------------|------------|
| 0 (instant) | "You're in — here's what happens next" | Confirmation bias. Validate their decision immediately. |
| 1 | "You're all set — just show up" | Friction removal. No prep, no gear list. Reinforce "sign up and show up." |
| 5 | "Meet David — 25 years of keeping people moving" | Authority + warmth. One coach, one story. |
| 10 | "How [Member Name] went from back pain to deadlifts" | Social proof from someone like them. |
| 18 | "How's it going? (reply to this email)" | Personal touch. Plain-text feel. Opens dialogue. |
| 24 | "Ready to keep going? Members-only offer inside" | Conversion. Only after value is proven. |
| 30 | "Your free pass wraps up this week" | Urgency without pressure. Recap benefits. |

Why this order works:
- Days 0-1: **Reduce buyer's remorse + remove friction** (highest drop-off window)
- Day 5: **Build trust** before they've used all classes
- Day 10: **Social proof** at the "should I actually go?" moment
- Day 18: **Check-in** feels personal, not automated
- Days 24-30: **Convert** only after relationship is established

**Track 2: Win-Back (Lapsed Members)**

| Day | Subject Line | Psychology |
|-----|-------------|------------|
| 0 | "Hey — David here. We miss seeing you." | Personal from-line, warm, no pitch. |
| 5 | "What's new at the studio" | Curiosity. New classes, schedule changes. |
| 12 | "[Member]'s comeback story" | Social proof for re-engagement. |
| 21 | "Come back for a week — on us" | Low-commitment return offer. |
| 35 | "The door's always open" | Soft close. No guilt. Plant the seed. |

### Page Implementation

**Create `src/pages/admin/EmailSequences.tsx`**

Visual playbook page with:
- Two tabs: "New Lead Nurture" / "Win-Back Sequence"
- Vertical timeline with connected cards for each email
- Each card shows: day number, subject line, goal, key copy elements, and the psychology behind it
- Color-coded: teal for relationship emails, gold for conversion emails
- Email provider compatibility tips section (Gmail clipping at 102KB, Outlook image blocking, Apple Mail dark mode)
- "Copy to clipboard" for subject lines
- Responsive: stacked cards on mobile, timeline on desktop

**Edit `src/components/admin/AdminLayout.tsx`** — add "Email Sequences" nav item

**Edit `src/App.tsx`** — add route `/admin/email-sequences`

No database changes. Static reference page.

