

# Rewrite Hero Section for `/try-free-charleston`

## Conversion Rationale

The hero has one job: get the click. Every word must earn its place above the fold.

**Proposed copy:**

- **H1**: `Try 3 Classes Free` (lead with the offer — it's the strongest hook)
- **H1 line 2** (accent color): `Charleston Strength Training`  (location signal for SEO + local trust)
- **Subtitle**: `No experience needed. No card required. Just show up.` (three risk-reversals in one line — addresses every hesitation a first-timer has)
- **CTA button**: `Claim Your Free Classes` (unchanged, works well)
- **Sub-CTA text**: `Beginners & restarters welcome · West Ashley` (audience + hyper-local signal, displayed as small muted text below the button)

## Why This Converts Better

| Current | Proposed | Why |
|---------|----------|-----|
| "A Smarter Way to Start" | "Try 3 Classes Free" | Offer-first beats method-first |
| "Most people don't need..." | "No experience needed. No card required. Just show up." | Removes friction vs. philosophizing |
| No sub-CTA context | "Beginners & restarters welcome · West Ashley" | Names the audience + neighborhood |

## File Change (1 file)

### `src/pages/services/ResetWeekCharleston.tsx` (lines 88-101)

Update the hero content block:
- H1 line 1: "Try 3 Classes Free"
- H1 line 2 (accent span): "Charleston Strength Training"
- Subtitle: "No experience needed. No card required. Just show up."
- Add a `<p>` below the Button: "Beginners & restarters welcome · West Ashley" in `text-primary-foreground/60 text-sm`

No structural or layout changes — same hero wrapper, same image, same gradient.

