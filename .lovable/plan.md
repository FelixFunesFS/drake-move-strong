

# Chat Reset Week Button: Overview First, Then Purchase Link

## The Question

When a user clicks the "Reset Week" quick action in chat, should it:
- **A) Go directly to checkout** (current behavior)
- **B) Send a chat message that triggers an AI response with overview + purchase link**

## Recommendation: Option B (Overview + Masked Link)

For a $50 fitness intro offer, users benefit from a brief explanation before purchasing. The AI should provide:
1. What Reset Week is
2. What's included
3. Who it's perfect for
4. A clear, friendly-labeled purchase link

This builds trust and answers potential objections, while still making the purchase path clear.

---

## Changes Required

### 1. Update ChatBot.tsx Quick Action

**Current behavior (line 170-172):**
```tsx
case 'reset-week':
  window.open("https://drakefitness.punchpass.com/...", "_blank");
  break;
```

**New behavior:**
```tsx
case 'reset-week':
  sendMessage("Tell me about Reset Week - what is it and how do I get started?");
  break;
```

This triggers the AI to respond with the Reset Week overview from its knowledge base, including the purchase link with a friendly label.

### 2. Verify Edge Function System Prompt

The system prompt already has excellent Reset Week guidance:

```
RESET WEEK (PRIMARY OFFER - Always Lead With This):
- Reset Week: 7 days of unlimited classes for $50
- When someone asks "how do I get started?"... ALWAYS mention Reset Week first!
```

The AI will respond with something like:

> Reset Week is the perfect way to get started! For just $50, you get 7 days of unlimited classes - try everything we offer and see what fits your goals.
>
> It includes:
> - All class types (kettlebell, mobility, strength)
> - Coach-led sessions with David or Nick
> - No pressure, no commitment
>
> [🎁 Start Reset Week — $50](https://drakefitness.punchpass.com/...)
>
> Want me to tell you more about what to expect in your first class?

### 3. ChatMessage Already Handles Link Display

The `friendlyLabels` map already converts the raw PunchPass URL into a user-friendly label:

```tsx
'https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219': '🎁 Start Reset Week — $50',
```

---

## Why This Is Better for Conversion

| Factor | Direct Checkout | Chat First + Link |
|--------|----------------|-------------------|
| Trust Building | ❌ None | ✅ AI explains value |
| Objection Handling | ❌ None | ✅ AI can answer questions |
| Context | ❌ User may not know what they're buying | ✅ User understands the offer |
| Friction | ✅ Lowest | ⚠️ One extra step |
| Qualified Leads | ⚠️ May bounce at checkout | ✅ More likely to complete purchase |

**Key insight:** The mobile contact bar already provides instant-action (Call/Text). The chat is for users who want to learn before committing - let them learn.

---

## Visual Flow

```text
User clicks "🎁 Reset Week" button
        ↓
Chat sends: "Tell me about Reset Week..."
        ↓
AI responds with overview + purchase link
        ↓
User clicks "🎁 Start Reset Week — $50" link
        ↓
Opens PunchPass checkout in new tab
```

---

## File Changes

| File | Change |
|------|--------|
| `src/components/chat/ChatBot.tsx` | Change reset-week action from `window.open()` to `sendMessage()` |

---

## Optional Enhancement

Update the quick action button label to set expectations:

**Current:**
```tsx
🎁 Reset Week
```

**Enhanced:**
```tsx
🎁 What's Reset Week?
```

This makes it clear clicking will start a conversation, not open a new page.

