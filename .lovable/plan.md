

# Plan: Fix Timezone Bug in TodayClassesBanner

## Problem

The banner uses `toISOString()` which converts to UTC, causing the date to shift forward late at night in US timezones. At 9:55 PM EST on March 8th, UTC time is already March 9th ~3 AM, so the code thinks "today" is March 9th and falls back to showing March 10th as "tomorrow."

## Fix

Replace UTC-based date calculation with local timezone-aware logic:

```typescript
// Before (buggy)
const today = now.toISOString().split('T')[0];

// After (correct)
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
```

Same fix for the "tomorrow" date calculation.

## Files Changed

- `src/components/schedule/TodayClassesBanner.tsx` — fix lines 39 and 65 to use local date formatting instead of `toISOString()`

