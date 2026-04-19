

## Update Community Class link

Searching confirmed the URL is centralized in **one place**: `src/data/pricing.ts` → `PUNCHPASS_URLS.communityClass`.

All consumers (`CommunityClass.tsx`, CTAs, banners) read from this constant — so a single edit propagates everywhere.

### Change
`src/data/pricing.ts`:
- From: `https://drakefitness.punchpass.com/classes/19627821`
- To: `https://drakefitness.punchpass.com/classes/19802794`

**1 file, 1 line.** No other hardcoded references exist.

