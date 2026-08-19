# Match intake wording to the original form

The uploaded HTML opens with a masthead the current `/intake` page is missing:

```text
DRAKE FITNESS
Client History & Agreement
Takes about 8–10 minutes. Your answers go directly to David Drake.
```

Today the wizard jumps straight into the step title ("Your details", etc.) with no form name, no time estimate, and no "goes directly to David Drake" reassurance.

## What changes

1. **Add a masthead above the wizard** (visible on every step, or step 1 only — see note):
   - Small uppercase eyebrow: `Drake Fitness` (gold accent, Montserrat, letter-spaced)
   - Page name: `Client History & Agreement` (Oswald, uppercase)
   - Subline: `Takes about 8–10 minutes. Your answers go directly to David Drake.`
2. **Demote the step title** from `h1` to `h2` so the page keeps a single H1 (`Client History & Agreement`). Focus-on-step-change and the screen-reader step announcement stay on the step heading, so navigation behavior is unchanged.
3. **Update page metadata** to `Client History & Agreement` (title) with a description echoing the 8–10 minute framing. Page stays `noindex`.
4. **Confirmation screen** keeps its existing copy; only the form name is aligned if it references "intake form".

## Note on placement

Repeating the masthead on all 7 steps costs vertical space on mobile. Recommended: show the full masthead on step 1, and on later steps show just the compact form name line so the H1 persists without pushing the questions below the fold. Say the word if you'd rather it show fully on every step.

## Technical

- File: `src/pages/Intake.tsx` — the `<header className="mb-6">` block inside the wizard return, plus the two `<SEO>` blocks.
- Uses existing tokens only (`font-hero`, `font-heading`, `text-accent`, `text-muted-foreground`) — no new colors or fonts.
- The en dash in "8–10" is kept as-is.
