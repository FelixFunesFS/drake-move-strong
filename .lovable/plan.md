
# Fix PunchPass Schedule Parser - Content Parsing Issues

## Problem Identified

The sync ran successfully and Tavily returned the full schedule content (9132 characters), but the parser found 0 classes. Examining the logs reveals the actual content structure differs from what the parser expects:

### Current Content Format (from logs):
```
January 26  
Monday TODAY

8:00 am

[KB STrong Group Fitness](/classes/18023313)   <-- RELATIVE URL, not absolute

1 hour
Drake Fitness In Studio
David

8:00 amGMT-05:00

[ZOOM KB STrong](/classes/18023288) 

ONLINE

1 hour
KB Strong Zoom Online
David
```

### Parser Issues:
1. **Date format**: `January 26  ` has trailing whitespace - regex `^...$/` fails
2. **Day/Today text**: "Monday TODAY" line appears between date and time
3. **Relative URLs**: Links are `/classes/18023313` not `https://...`
4. **Time format**: Still working for `8:00 amGMT-05:00` based on our earlier fix

## Solution

Update the parser in `supabase/functions/sync-punchpass-schedule/index.ts`:

### Fix 1: Date Regex - Handle Trailing Whitespace
```typescript
// Before
/^(January|...)\s+(\d{1,2})$/i

// After - add \s* at end for trailing whitespace
/^(January|...)\s+(\d{1,2})\s*$/i
```

### Fix 2: Handle Relative URLs
```typescript
// Before - only matches absolute URLs
/\[([^\]]+)\]\((https:\/\/drakefitness\.punchpass\.com\/classes\/\d+)\)/

// After - handle relative OR absolute URLs
/\[([^\]]+)\]\(((?:https:\/\/drakefitness\.punchpass\.com)?\/classes\/\d+)\)/

// Then normalize to absolute:
if (punchpassUrl && punchpassUrl.startsWith('/')) {
  punchpassUrl = 'https://drakefitness.punchpass.com' + punchpassUrl;
}
```

### Fix 3: Skip Day/Today Lines
The lookahead already skips empty lines, but we need to also skip lines like "Monday TODAY":
```typescript
// Skip day indicators like "Monday TODAY", "Tuesday", etc.
if (nextLine.match(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i)) {
  continue;
}
```

## Changes Summary

**File:** `supabase/functions/sync-punchpass-schedule/index.ts`

| Location | Change |
|----------|--------|
| Line 60 | Update date regex to allow trailing whitespace |
| Line 103 | Update class URL regex to handle relative URLs |
| Line 105-108 | Normalize relative URLs to absolute |
| After line 100 | Add skip for day-of-week lines |

## Expected Outcome

After these changes:
- All classes will be parsed (including ZOOM with GMT suffix)
- Instructor names will be captured (David, Nick)
- Both in-person and ZOOM versions stored separately
- URLs will be properly normalized to absolute format

## Testing

After deployment, re-trigger the sync to verify classes are captured with instructor names and proper ZOOM detection.
