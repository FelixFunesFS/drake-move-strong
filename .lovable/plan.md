

# Split Reset Week Button Text to Two Lines (Desktop Only)

## Change

### File: `src/pages/Home.tsx`

Update the primary CTA text so "Week for $50" wraps to a second line only on desktop (md+), staying single-line on mobile:

```tsx
// Before:
text: "Start Your Reset Week for $50"

// After:
text: <>Start Your Reset<br className="hidden md:block" /> Week for $50</>
```

The `hidden md:block` class hides the line break on mobile/tablet and only shows it at the `md` breakpoint and above.

