

## Fix: Weekly Carousel Only Showing One Day

### Problem
The "Weekly" carousel button uses `scheduleClasses` state, which only contains whatever the last SchedulePreset button loaded. If "Today's Classes" was clicked, it only has one day. The carousel generation code itself is correct — the data feeding it is wrong.

### Solution
Make `applyCarouselSequence('weekly-schedule')` fetch a full week of schedule data directly from the database instead of relying on the `scheduleClasses` state.

### Changes — `src/pages/admin/SocialGraphics.tsx`

1. **Make `applyCarouselSequence` async** and add a direct database fetch when `type === 'weekly-schedule'`:
   - Query `punchpass_schedule` for today through +7 days
   - Use the fetched data (not `scheduleClasses` state) to build the carousel slides
   - Show a loading toast while fetching

2. **Keep existing slide generation logic** (cover slide → day slides → CTA slide) but feed it the freshly fetched data instead of stale state.

```text
Before:  Weekly button → uses scheduleClasses state (possibly stale/partial)
After:   Weekly button → fetches full week from DB → builds all day slides
```

### File
| File | Change |
|------|--------|
| `src/pages/admin/SocialGraphics.tsx` | Lines 232-264: Make weekly-schedule branch async, fetch fresh week data from `punchpass_schedule` before building slides |

