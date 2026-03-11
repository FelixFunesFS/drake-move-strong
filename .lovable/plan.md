

## Marketing Review: Local SEO Meta Descriptions

### The Core Problem You Raised

Google is showing the same description snippet across multiple sitelinks. The approved plan to remove hardcoded `index.html` tags is the correct technical fix. But the deeper marketing question is: **are the per-page descriptions themselves optimized for click-through and local intent?**

### Current Descriptions Audit

| Page | Current Description | Verdict |
|------|-------------------|---------|
| **Home** | "Charleston's coach-led gym for functional strength, mobility, and group fitness classes. Small groups, 25+ years experience. Try 3 classes free." | Good — has CTA, location, differentiator |
| **Schedule** | "Book group fitness and workout classes in Charleston. Morning & evening sessions: Foundation Flow, Functional Strength, KB Strong..." | Too operational — class names mean nothing to a cold searcher |
| **Coaching** | "Top-rated personal trainer in Charleston, SC. Custom programs for mobility, strength, and injury recovery with 25+ years experience. Book your consultation." | Strong — intent match, CTA |
| **Contact** | "Get in touch with Drake Fitness in Charleston, SC. Located at 2 Avondale Ave..." | Weak — wastes characters on address Google already shows |
| **Pricing** | "Simple, transparent membership options. Try 3 classes free. Foundation $200/mo, Longevity Unlimited $225/mo..." | Good — price transparency builds trust |
| **About** | "Meet the expert coaches behind Drake Fitness in Charleston, SC. 25+ years of experience in mobility-first functional training..." | Decent but passive — no reason to click |
| **FAQ** | "Find answers to common questions about our training, memberships, and approach..." | Generic — could be any gym |
| **Low-Impact** | "A joint-friendly fitness program for adults who want results without aggravating pain..." | Strong — pain-point driven |
| **Strength Training** | "Train smarter, move better, and get strong without pain. Charleston's premier mobility and strength training studio." | Good — benefit-first |
| **West Ashley** | "Located in Avondale, West Ashley — try 3 free classes at Drake Fitness. Safe, coach-led strength & mobility training..." | Decent but long, schedule details waste characters |
| **Try Free (ResetWeekAlt)** | "Move better, feel stronger, stay pain-free. 3 free classes over 30 days..." | Good — clear offer |
| **Success Stories** | "Read real transformation stories from Drake Fitness members in Charleston..." | Weak — "read stories" is passive |

### Marketing Framework: What Great Local SEO Descriptions Do

Every description should answer three questions in 155 characters:

1. **What's in it for me?** (benefit, not feature)
2. **Why this place?** (differentiator + location signal)
3. **What do I do next?** (CTA or urgency)

### Recommended Rewrites

The pages that need the most work:

**Schedule** — Searchers want to know *when* they can come, not class brand names:
> "Morning & evening classes, Mon–Sat. Small groups, expert coaching. Book your spot at Drake Fitness in Charleston — try 3 classes free."

**Contact** — Don't waste on address; use the space to sell:
> "Questions about getting started? Reach Drake Fitness in West Ashley — call, text, or drop in. 3 free classes, no commitment."

**About** — Give a reason to care about the coaches:
> "David Drake: 25+ years coaching real people through pain, injury, and plateaus. Meet the team behind Charleston's most trusted small gym."

**FAQ** — Target the actual search intent:
> "New to Drake Fitness? Answers about what to wear, how classes work, pricing, and why we're different from big-box gyms in Charleston."

**Success Stories** — Social proof is a conversion tool:
> "5-star Google reviews and real results from Charleston members. See why adults 30–65 trust Drake Fitness to move better and stay pain-free."

**West Ashley** — Cut the schedule clutter:
> "West Ashley's coach-led gym in Avondale. Strength & mobility training for adults — small groups, real coaching. Try 3 classes free."

### Plan: Update Meta Descriptions

**Files to edit** (one line each — the `description` prop on `<SEO>`):

1. `src/pages/Schedule.tsx` — rewrite description
2. `src/pages/Contact.tsx` — rewrite description
3. `src/pages/About.tsx` — rewrite description
4. `src/pages/FAQ.tsx` — rewrite description
5. `src/pages/SuccessStories.tsx` — rewrite description
6. `src/pages/services/WestAshleyFitness.tsx` — trim schedule details from description

**Also** (from the previously approved plan): Remove hardcoded tags from `index.html` (lines 7 and 72-80) so Google picks up these unique per-page descriptions instead of the homepage fallback.

No database or structural changes. Pure copy edits on the `description` string props.

