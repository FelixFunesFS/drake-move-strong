

# Hide Hero Eyebrow on Mobile

## Change

**`src/components/Hero.tsx`** (line ~101): Add `hidden sm:block` to the eyebrow `<m.p>` wrapper so it's hidden on mobile and visible from `sm` (640px) up.

Current:
```tsx
<m.p className="section-eyebrow text-drake-gold mb-2 md:mb-4">
```

Updated:
```tsx
<m.p className="hidden sm:block section-eyebrow text-drake-gold mb-2 md:mb-4">
```

## Result

- Mobile: eyebrow hidden, ~30-40px reclaimed for H1 and CTA visibility
- Tablet/desktop: eyebrow remains visible
- Location info still appears in Local Trust Block and footer

## No other files affected

