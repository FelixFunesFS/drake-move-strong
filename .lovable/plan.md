

# Refine Purchase Reset Week Button Sizing on Mobile

## Current State
The "PURCHASE RESET WEEK" button text wraps to two lines on mobile (390px), creating an oversized button. This is caused by:
- `size="lg"` applies `px-8 py-6 text-base` (32px horizontal padding, 24px vertical padding)
- The uppercase text + generous padding makes the button taller than needed when text wraps

## Changes

### File: `src/pages/Home.tsx` (line 110)

**Reduce horizontal padding on mobile** so the text fits on one line, and slightly reduce vertical padding for a more balanced button:

- Add responsive padding overrides: `px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-base`
- This keeps the desktop button unchanged while making mobile more compact and single-line

Current:
```tsx
<Button asChild size="lg" className="w-full">
```

Proposed:
```tsx
<Button asChild size="lg" className="w-full px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-base min-h-[48px]">
```

This ensures:
- On mobile: tighter horizontal padding allows "PURCHASE RESET WEEK" to fit on one line, 12px vertical padding keeps a comfortable touch target (48px min-height), smaller text (14px)
- On desktop (sm+): original sizing preserved (32px horizontal, 24px vertical, 16px text)
- The `min-h-[48px]` guarantees the touch target meets accessibility standards

