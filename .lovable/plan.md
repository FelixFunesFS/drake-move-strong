
# Rename "Classes & Schedule" to "Schedule"

## Changes

Two files need a simple text update:

### 1. `src/components/Navigation.tsx` (line 23)
- From: `"Classes & Schedule"`
- To: `"Schedule"`

### 2. `src/components/Footer.tsx` (line 34)
- From: `Classes & Schedule`
- To: `Schedule`

No other files reference this label. Routes, links, and all other references already point to `/schedule`.
