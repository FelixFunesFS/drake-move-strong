

# Hero Section Updates

## Changes

### 1. `src/pages/Home.tsx` -- Fix title structure and gold color

Update the `title` prop so "Live" and "Stronger." are both gold, and each phrase is on its own line:

```tsx
title={
  <>
    Move Better.<br />
    <span className="text-accent">Live Stronger.</span><br />
    Stay Pain-Free.
  </>
}
```

This wraps both "Live" and "Stronger." in the gold accent span, and uses `<br />` to force three distinct lines.

### 2. `src/components/Hero.tsx` -- Shift mobile image 10% higher

On line 91, change the mobile `object-position` from `center_30%` to `center_20%` to crop higher and hide the building lights:

```
// Before:
object-[center_30%] md:object-[center_40%]

// After:
object-[center_20%] md:object-[center_40%]
```

### 3. Schedule page loading -- No issue found

The Schedule page is correctly lazy-loaded via `React.lazy()`. The `TodayClassesBanner` on the home page dynamically imports the database client to avoid blocking the initial render. This is expected behavior -- no fix needed.

## Summary

| File | Change |
|------|--------|
| `src/pages/Home.tsx` | Wrap "Live Stronger." in gold accent span, ensure 3 separate `<br />` lines |
| `src/components/Hero.tsx` | Change mobile object-position from 30% to 20% to crop higher |

