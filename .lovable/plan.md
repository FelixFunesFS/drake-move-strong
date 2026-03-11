

## Hide Announcement Banner on Schedule Page

**Rationale**: The schedule page is a task-focused interface where users arrive to find and book classes. A promotional banner adds friction by pushing the schedule grid down and distracting from the primary action.

### Change

**File:** `src/components/AnnouncementBanner.tsx` — `shouldShowOnPage` callback (~line 31)

Update the page exclusion logic to also hide the banner on `/schedule` (alongside the existing `/` exclusion):

- Current: excludes only `/` when target is `'all'`
- New: excludes both `/` and `/schedule` when target is `'all'`

This is a one-line change in the existing conditional. No structural changes needed.

