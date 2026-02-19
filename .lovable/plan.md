

# Widen Primary CTA Button Further on Desktop

## Change

### File: `src/components/Hero.tsx`

Increase desktop horizontal padding on both primary CTA button instances (lines 135 and 139) from `md:px-12` to `md:px-16`:

```
// Before:
px-6 sm:px-8 md:px-12

// After:
px-6 sm:px-8 md:px-16
```

This makes the "Start Your Reset / Week for $50" button noticeably wider on desktop while keeping mobile sizing unchanged.

