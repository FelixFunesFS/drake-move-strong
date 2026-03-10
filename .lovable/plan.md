

## Pricing Update Plan

### Summary of all locations with pricing references

| File | What needs changing |
|------|-------------------|
| `src/data/pricing.ts` | Foundation 209→200, Unlimited 239→225 |
| `src/pages/Pricing.tsx` | Hardcoded $209→$200, $239→$225, SEO meta description, **hide Foundation Plus card** |
| `src/pages/FAQ.tsx` | Hardcoded "$209" and "$239" in FAQ answer |
| `supabase/functions/chat-assistant/index.ts` | Hardcoded "$209/mo" and "$239/mo" in AI prompt |
| `src/pages/Home.tsx` | Uses `INTRO_URL` from pricing.ts — no hardcoded prices, but upsell text says "$110 (50% off)" |
| `src/pages/Welcome.tsx` | Upsell text: "$110 (50% off $225)" |
| `src/pages/ResetWeekAlt.tsx` | "$110 (normally $225)" |
| `src/pages/services/ResetWeekCharleston.tsx` | "$110 instead of $225" |

### Upsell question
The upsell currently says **$110 = 50% off $225**. With Unlimited now at $225, that math checks out. With Foundation now at $200, 50% off would be $100. The upsell references "first month" without specifying which plan — is **$110** still the correct upsell price, or should it change?

### Changes

1. **`src/data/pricing.ts`** — Update Foundation to 200, Unlimited to 225
2. **`src/pages/Pricing.tsx`** — Update hardcoded prices, update SEO description, wrap Foundation Plus card in a conditional that hides it (commented out or `false &&` so it's easy to restore)
3. **`src/pages/FAQ.tsx`** — Update price references
4. **`supabase/functions/chat-assistant/index.ts`** — Update AI assistant pricing knowledge
5. **All upsell references** — Confirm or adjust the $110 figure across Home, Welcome, ResetWeekAlt, ResetWeekCharleston, and Pricing pages

### Best approach going forward
The `src/data/pricing.ts` file is already the single source of truth, but several pages hardcode prices instead of importing from it. After this update, I recommend refactoring the remaining hardcoded values to reference `PRICING.foundation.price` and `PRICING.unlimited.price` so future changes only require editing one file.

