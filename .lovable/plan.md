

# Schedule: Rolling 7-Day View Starting From Today

## The Problem

The schedule currently displays a fixed Monday-Sunday calendar week. This means:
- On a Sunday, 6 of 7 days are already in the past (empty or irrelevant)
- Users see a mostly blank grid and have to click "next week" to find classes
- This hurts the booking-first design goal

## The Solution

Change from a fixed calendar week to a **rolling 7-day window that always starts from today**. Users always see the next 7 days of upcoming classes with no blank past days.

```text
BEFORE (Fixed Mon-Sun):
Mon 3 | Tue 4 | Wed 5 | Thu 6 | Fri 7 | Sat 8 | Sun 9
(past)  (past)  (past)  (past)  (past)  (today)  (tmrw)

AFTER (Rolling 7 days from today):
Sun 8 | Mon 9 | Tue 10 | Wed 11 | Thu 12 | Fri 13 | Sat 14
(today) (tmrw)  ...classes visible across all 7 days...
```

## Navigation Behavior

- **Forward/Back arrows**: Shift the window by 7 days (so you can still browse future weeks)
- **"Today" button**: Resets the start back to today's date
- **Mobile day selector**: Same rolling 7-day pills starting from today

## File Changes

### `src/components/schedule/NativeWeeklySchedule.tsx`

1. **Change initial state** (line 45-47): Replace `startOfWeek(new Date(), { weekStartsOn: 1 })` with just `new Date()` (start of today). Remove the `startOfWeek` import usage for the initial value.

2. **Update navigation** (lines ~230, ~260): Change `subWeeks`/`addWeeks` to subtract/add 7 days using `addDays(weekStart, -7)` and `addDays(weekStart, 7)`.

3. **Update "Today" button** (line ~270): Reset to `new Date()` instead of `startOfWeek(new Date(), { weekStartsOn: 1 })`.

4. **Update header label**: The date range display already works generically (`MMM d - MMM d`), so no change needed there.

5. **Mobile day selector**: Already uses `weekDays` array, which derives from `weekStart` -- no changes needed, it will automatically show the correct 7 days.

## What Stays the Same

- 7-column desktop grid layout
- Mobile horizontal day selector pills
- Filters (location, time)
- Booking modal
- Class card styling and instructor badges
- Data fetching logic (already queries by date range)

## Technical Details

The key change is approximately 3 lines:

```tsx
// Line 45-47: Initial state
const [weekStart, setWeekStart] = useState(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
});

// Navigation handlers: use addDays(..., 7) / addDays(..., -7) instead of addWeeks/subWeeks

// Today button: reset to new Date() with hours zeroed
```

Everything else (the 7-day array, date range query, column rendering) already works generically off `weekStart` and will adapt automatically.
