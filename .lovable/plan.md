

## Remove Nick References (Keep Images)

All images stay — only text references to Nick get removed or neutralized.

### Changes (8 files)

| File | Change |
|------|--------|
| `src/components/admin/ImageSelector.tsx` | Rename labels: "Coach Nick New" → "Studio Coaching", "Coach Nick Portrait" → "Studio Portrait", "Coach Nick" → "Studio Coach", "Nick Holistic Coaching" → "Holistic Coaching", "Nick Sandbag Lunge" → "Sandbag Lunge", "Nick & David Together" → "Studio Team". Change category comment from "Coaches - Nick" to "Studio" |
| `src/components/admin/social/types.ts` | Remove `'Nick'` from `INSTRUCTOR_COLORS` |
| `src/components/schedule/WeekDayColumn.tsx` | Remove `case 'nick'` color mapping |
| `src/pages/Coaching.tsx` | Alt text: "David and Nick coaching" → "David coaching at Drake Fitness" |
| `src/pages/About.tsx` | Alt text: "David Drake and coaching team" (already neutral-ish, but line 414 says "coaching team" — keep as is) |
| `supabase/functions/generate-content-package/index.ts` | Remove Nick from coaches in AI prompt: "Coaches: David Drake (owner, kettlebells, strength), Misty (yoga, flexibility)" |
| `supabase/functions/generate-social-content/index.ts` | Remove "Nick Poppa" line from coaches section |
| `supabase/functions/sync-punchpass-schedule/index.ts` | Change `'kettlebell flow': 'Nick'` → `'kettlebell flow': 'David'` |

