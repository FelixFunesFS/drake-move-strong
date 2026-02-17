

# Relocate "25+ Years" Credibility Line for Better Conversion

## The Problem

The line "25+ years helping real people achieve sustainable results. All ages and levels welcome." currently sits above the purchase card as muted body text. At that position it reads as filler — the user has already scrolled past the headline and bullet points, and this line delays them from reaching the price and CTA button.

## Conversion Thinking

Credibility statements work best at the **moment of decision**, not during the persuasion phase. The ideal placement is directly beneath the purchase button as a small trust reinforcement — the user sees the price, reads the CTA, and right before (or after) clicking, gets a final confidence nudge. This is the same pattern used by SaaS checkout pages ("Trusted by 10,000+ teams" below the Buy button).

## Changes

### 1. Remove the line from its current position
Delete the `<p>` element containing "25+ years helping real people achieve sustainable results..." from above the purchase card in the Reset Week section.

### 2. Add it as a micro-trust line below the Purchase button
Inside the purchase card (the `bg-muted border` box), add a centered, small muted-text line beneath the "Purchase Reset Week" button:

```
25+ years of expert coaching. All ages & levels welcome.
```

This keeps the card focused: price, benefits, button, then a final trust nudge.

## Technical Details

| File | Change |
|---|---|
| `src/pages/Home.tsx` | Remove lines ~107-109 (the `<p>` with "25+ years..." text) |
| `src/pages/Home.tsx` | Add a `<p className="text-xs text-center text-muted-foreground mt-3">` line after the Purchase button inside the card (after the closing `</Button>` around line 123) |

### Before (simplified)
```
"No experience needed..."
"25+ years helping..."     <-- remove from here
[$50 Purchase Card]
  - benefits
  - [Purchase Button]
```

### After
```
"No experience needed..."
[$50 Purchase Card]
  - benefits
  - [Purchase Button]
  - "25+ years of expert coaching. All ages & levels welcome."  <-- trust nudge at decision point
```

