

# Fix Pricing Consistency Across All Pages, Components, and Database

## Overview
Correct all pricing values so they match across the centralized data file, UI pages, and database.

## Correct Pricing (Source of Truth)

| Plan | Correct Price |
|---|---|
| Reset Week | $50 (7 days unlimited) |
| Foundation Membership | $209/month (8 classes) |
| Longevity Unlimited | $239/month |
| Drop-In | $40/session |
| 10-Class Flex Pack | $350 one-time |

## Current Inconsistencies

| Location | Drop-In | 10-Class Pack | Foundation | Unlimited |
|---|---|---|---|---|
| `pricing.ts` | **$30** (wrong) | **$300** (wrong) | $209 (ok) | $239 (ok) |
| `Pricing.tsx` (hardcoded) | n/a | **$200** (wrong) | $209 (ok) | $239 (ok) |
| `FAQ.tsx` (hardcoded) | **$30** (wrong) | **$300** (wrong) | -- | -- |
| Database `membership_plans` | $40 (ok) | **missing** | **$199** (wrong) | **$249** (wrong) |
| Chatbot edge function | pulls from DB | pulls from DB | pulls from DB | pulls from DB |

## Changes

### 1. `src/data/pricing.ts`
- Line 31: Change `price: 30` to `price: 40` (Drop-In)
- Line 36: Change `price: 300` to `price: 350` (Flex Pack)

### 2. `src/pages/Pricing.tsx`
- Line 353: Change hardcoded `$200` to `$350` for the 10-Class Pack card

### 3. `src/pages/FAQ.tsx`
- Line 70: Change `"Drop-in classes are $30 per session"` to `"$40 per session"` and `"10-Pack Flex Pass ($300)"` to `"10-Pack Flex Pass ($350)"`

### 4. Database: `membership_plans` table
Update rows to match correct pricing:
- "8 Classes" row: price $199 -> $209, rename to "Foundation Membership"
- "Unlimited" row: price $249 -> $239, rename to "Longevity Unlimited"
- Insert new row for "10-Class Flex Pack" at $350, billing_interval "one_time", class_credits 10

The Drop-In row is already correct at $40 in the database.

### 5. No changes needed to `chat-assistant/index.ts`
The chatbot dynamically pulls pricing from the database, so fixing the database rows will automatically fix chatbot responses.

## Impact
After these changes, all pricing will be consistent across the Pricing page, FAQ page, centralized data file, database, and AI chatbot.

