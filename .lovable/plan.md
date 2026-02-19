

# Change Trust Stats Numbers to Oswald (font-hero)

## Change

### File: `src/components/TrustStatsBar.tsx` (line 274)

Update the stat number font class from `font-heading` (Montserrat) to `font-hero` (Oswald) to match the site's typography standard for bold, impactful numbers.

```
// Before:
font-bold text-xl md:text-2xl font-heading

// After:
font-bold text-xl md:text-2xl font-hero
```

This only affects the horizontal (default) variant of the trust stats bar -- the 4-column teal bar shown on the homepage.

