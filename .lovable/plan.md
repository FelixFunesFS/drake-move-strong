

## Plan: Add Descriptive Step Names to Email Sequence Templates

### Problem
The current labels ("Instant", "Day 1", "Day 3", etc.) don't communicate what each email does. You have to read the subject line and goal to understand the step's purpose.

### Solution
Add a `stepName` field to each `EmailStep` and display it prominently on each card. The step names will clearly communicate the purpose at a glance.

### New Step Names

**New Lead Sequence (8 emails):**
| Current Label | New Step Name |
|---|---|
| Instant | 1. Welcome & What to Expect |
| Day 1 | 2. Just Show Up |
| Day 3 | 3. Recovery & Reassurance |
| Day 5 | 4. Meet Your Coach |
| Day 10 | 5. Member Success Stories |
| Day 18 | 6. Personal Check-In |
| Day 24 | 7. Membership Offer |
| Day 30 | 8. Final Reminder |

**Win-Back Sequence (5 emails):**
| Current Label | New Step Name |
|---|---|
| Day 0 | 1. We Miss You |
| Day 5 | 2. What's New |
| Day 12 | 3. Comeback Story |
| Day 21 | 4. Free Week Offer |
| Day 35 | 5. Door's Always Open |

### Changes — `src/pages/admin/EmailSequences.tsx`

1. Add `stepName: string` to the `EmailStep` interface
2. Add `stepName` values to all 13 entries in `newLeadSequence` and `winBackSequence`
3. Display `stepName` as the primary label on each `EmailCard` — rendered bold above the subject line, replacing the generic `dayLabel` badge with something like **"Step 3: Recovery & Reassurance · Day 3"**

Single file change. No template content or `emailTemplates.ts` changes needed.

