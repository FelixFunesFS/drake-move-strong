

## Add Branded Photography to All 12 Nurture Emails

### Image Assignments

Each email gets one hero-style image matched to its content. Mix of David personal shots and class/community action shots.

| Email | Image | Rationale |
|---|---|---|
| **new-lead-Instant** | `studio-david-dog.jpg` | Personal welcome — David with his dog sets a warm, approachable tone |
| **new-lead-Day 1** | `studio-kettlebells.jpg` | "Just show up" — clean equipment shot, no intimidation |
| **new-lead-Day 5** | `david-coaching-form.jpg` | "Why I Coach" — David actually coaching someone |
| **new-lead-Day 10** | `community-group-photo-new.jpg` | Member stories — community group shot reinforces belonging |
| **new-lead-Day 18** | `david-outside.jpg` | Casual check-in — relaxed David portrait |
| **new-lead-Day 24** | `group-kettlebell-training.jpg` | Momentum/offer — action shot of a class in progress |
| **new-lead-Day 30** | `studio-full-view.jpg` | Pass expiring — show what they'd miss, the full studio |
| **win-back-Day 0** | `studio-david-storefront.jpg` | Personal "hey" — David at the studio entrance |
| **win-back-Day 5** | `studio-group-overhead.jpg` | "What's new" — energetic group training |
| **win-back-Day 12** | `community-kettlebell-rack-pair.jpg` | Comeback story — members training together |
| **win-back-Day 21** | `members-overhead-press-group.jpg` | Free week offer — class energy |
| **win-back-Day 35** | `studio-nick-david-together.jpg` | Final goodbye — the team, door's always open |

### Implementation

1. **Copy 12 images** from `src/assets/` to `public/images/email/` for public hosting
2. **Add `emailImage()` helper** — generates email-safe `<img>` with `width="540"`, `border-radius:8px`, `display:block`, alt text, and max-width:100% for mobile
3. **Insert image** at the top of each email body (below heading, before first paragraph) using the helper — except for the short plain-text-style emails (Day 18, win-back Day 0, Day 35) where it goes above the sign-off
4. **Dynamic URL** — `window.location.origin` in `emailTemplates.ts`, hardcoded production URL in edge function

### Files Changed

| File | Change |
|---|---|
| `public/images/email/*.jpg` (12 files) | Copy assets for public hosting |
| `src/lib/emailTemplates.ts` | Add `emailImage()` helper + insert into all 12 templates |
| `supabase/functions/send-nurture-previews/index.ts` | Mirror same image additions |

