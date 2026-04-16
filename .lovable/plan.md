

## Update win-back email CTAs to /try-free-charleston

### Audit results
All 4 win-back emails have a single primary CTA button leading to `/welcome-back?...`. Per memory `mem://strategy/google-business-profile-link` and `mem://strategy/funnel-traffic-mapping`, **`/try-free-charleston`** is the canonical 3-Class Intro landing page for high-intent traffic. The win-back offer ("3 free classes + 50% off") is exactly that intent — so all 4 buttons should route there.

There are no "View Schedule" buttons in the win-back sequence (only conversational references like "reply with your schedule"), so no schedule-link swaps are needed.

### Files to update
Both files contain duplicate template HTML — both must be changed:

**1. `src/lib/emailTemplates.ts`** (powers admin preview + payload sent to Resend)
**2. `supabase/functions/send-nurture-previews/index.ts`** (powers preview emails)

### Change — swap base URL on all 4 win-back CTAs
Keep all UTM params intact, only swap the path:

| Email | Old | New |
|---|---|---|
| Day 0 | `/welcome-back?...&utm_content=day0-saved-spot` | `/try-free-charleston?...&utm_content=day0-saved-spot` |
| Day 4 | `/welcome-back?...&utm_content=day4-easy-comeback` | `/try-free-charleston?...&utm_content=day4-easy-comeback` |
| Day 7 | `/welcome-back?...&utm_content=day7-social-proof` | `/try-free-charleston?...&utm_content=day7-social-proof` |
| Day 12 | `/welcome-back?...&utm_content=day12-last-call` | `/try-free-charleston?...&utm_content=day12-last-call` |

UTM stays: `utm_source=resend&utm_medium=email&utm_campaign=winback-2026&utm_content=...`

### Deploy
Redeploy `send-nurture-previews` so future previews reflect the fix. Next time you click "Push Winback to Resend" in `/admin/email-sequences`, the updated template HTML (from `emailTemplates.ts`) will overwrite the 4 Resend broadcast drafts with the corrected CTAs.

### Result
All 4 win-back broadcast CTAs land on `/try-free-charleston` — the proven high-intent intro landing page — with attribution preserved.

