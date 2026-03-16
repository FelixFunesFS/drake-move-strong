

## Add Small David Portrait to Email Signatures

### What's Changing
Every email written from David's personal voice will get a small circular headshot (48px) inline next to the signature text — like a personal email avatar. This replaces the plain text sign-offs with a warmer, more personal feel.

### Implementation

**File**: `src/lib/emailTemplates.ts`

1. **Add a `signatureBlock` helper function** that renders a small circular David image (48px) floated left next to the signature text. Uses `david-outside.jpg` as the headshot — it's already in the public email assets and shows David in a natural, approachable pose.

```
┌──────────────────────────────┐
│ [48px circle]  See you...    │
│  David photo   David Drake   │
│               Head Coach     │
└──────────────────────────────┘
```

2. **Replace 10 plain-text signatures** across both sequences with the new `signatureBlock()` call:

| Email | Current Signature | Change |
|-------|------------------|--------|
| new-lead-Instant | "See you on the floor, David Drake, Head Coach" | → `signatureBlock(...)` |
| new-lead-Day 1 | "You've got this, David @ Drake Fitness" | → `signatureBlock(...)` |
| new-lead-Day 3 | "Recover well, David Drake, Head Coach" | → `signatureBlock(...)` |
| new-lead-Day 5 | "— David Drake, Head Coach" | → `signatureBlock(...)` |
| new-lead-Day 18 | "— David" + P.S. line | → `signatureBlock(...)` + P.S. |
| new-lead-Day 24 | "— David Drake" | → `signatureBlock(...)` |
| new-lead-Day 30 | "— David & the Drake Fitness crew" | → `signatureBlock(...)` |
| win-back-Day 0 | "— David Drake, Drake Fitness, phone" | → `signatureBlock(...)` |
| win-back-Day 21 | "— David Drake" | → `signatureBlock(...)` |
| win-back-Day 35 | "— David Drake, address, phone" | → `signatureBlock(...)` |

The helper will use an HTML table layout (not CSS float) for email client compatibility — a 48px circular image cell on the left, signature text on the right. Each call passes the specific sign-off text for that email.

### What This Does NOT Change
- The large hero/body images in each email stay as-is
- Email layout, content, CTA buttons — unchanged
- Only the signature area at the bottom of each email gets the small portrait added

