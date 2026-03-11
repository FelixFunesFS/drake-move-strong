

## Add "Sign Up & Show Up" with Support Line

Reduce friction at the critical Step 3 by turning passive "show up" into an actionable "sign up and show up" with a direct support phone number. This applies to **4 key pages** where "How It Works" steps appear.

### Changes

**1. `src/pages/Home.tsx`** (line 101)
- Step 3 text: `"Show up — we handle the rest"` →
- `"Sign up and show up — we handle the rest"`
- Make "Sign up" a link to `INTRO_URL`
- Add a support line below the 3 steps: `"Questions? Call or text (843) 817-5420"`

**2. `src/pages/services/ResetWeekCharleston.tsx`** (lines 127, 155)
- Both "How It Works" step arrays: `"Show Up"` title → `"Sign Up & Show Up"`
- Description: add `"Questions? Call or text (843) 817-5420"` 
- Step 3 links to `INTRO_URL`

**3. `src/pages/Welcome.tsx`** (line 62)
- Title: `"Show Up & We'll Guide You"` → `"Sign Up, Show Up & We'll Guide You"`

**4. `src/components/insights/BlogContentComponents.tsx`** (line 692)
- `"Show up."` → `"Sign up and show up."` with link to INTRO_URL
- Add support number below

### Implementation Detail

For the Home page step 3 specifically, since items are currently plain text strings, the step data structure needs a small update to support a rich element (link inside text). The step will render "Sign up" as an `<a>` tag linking to `INTRO_URL`, followed by plain text. A small helper line appears after all 3 steps:

```text
① Claim your free pass below
② Pick a Strength & Mobility class...
③ Sign up and show up — we handle the rest
   Questions? Call or text (843) 817-5420
```

