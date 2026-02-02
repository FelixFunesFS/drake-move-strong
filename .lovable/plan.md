
# Remove Staleness Banner and Increase Sync Frequency

## Overview
This plan removes the "schedule may be outdated" notification from the Schedule page and increases the PunchPass sync frequency from once daily to 4 times per day (every 6 hours).

## Current State

| Setting | Current Value |
|---------|---------------|
| Staleness Banner | Shown when schedule is >24h old |
| Sync Frequency | Once daily at 5:00 AM UTC |
| Cron Schedule | `0 5 * * *` |

## Proposed Changes

| Setting | New Value |
|---------|-----------|
| Staleness Banner | Removed from UI |
| Sync Frequency | Every 6 hours (4 times daily) |
| Cron Schedule | `0 5,11,17,23 * * *` |

## Technical Implementation

### Step 1: Remove Staleness Banner from NativeWeeklySchedule
Remove the staleness check and banner display from both mobile and desktop views.

**Changes:**
- Remove the `useScheduleStaleness` hook import and usage
- Remove the `ScheduleFallbackBanner` import
- Remove the banner conditional rendering on lines 134 and 276

### Step 2: Update Cron Job Frequency
Update the database cron job to run 4 times per day instead of once:

**New Schedule**: `0 5,11,17,23 * * *`
- 5:00 AM UTC (12:00 AM EST)
- 11:00 AM UTC (6:00 AM EST)
- 5:00 PM UTC (12:00 PM EST)  
- 11:00 PM UTC (6:00 PM EST)

This ensures the schedule is refreshed every 6 hours.

## Files to Modify

| File | Change |
|------|--------|
| `src/components/schedule/NativeWeeklySchedule.tsx` | Remove staleness banner and related imports |

## Database Changes
Update the existing cron job schedule from `0 5 * * *` to `0 5,11,17,23 * * *` using a SQL command.

## Result
- Users will no longer see "schedule may be outdated" warnings
- Schedule data will be refreshed 4 times daily, ensuring more current class information
- The direct PunchPass link remains available in the UI for users who want to book directly
