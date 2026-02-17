
# Add CTA Buttons to About Page VideoHero

## Change

Add `primaryCTA` and `secondaryCTA` props to the `VideoHero` on the About page so visitors have immediate next steps after reading the purpose statement.

## Technical Details

### File: `src/pages/About.tsx` (lines 60-70)

Add two props to the existing `VideoHero` component:

- `primaryCTA`: "View Schedule" linking to `/schedule`
- `secondaryCTA`: "See Pricing" linking to `/pricing`

```tsx
<VideoHero 
  videoId="cHcFBxvLNaQ" 
  startTime={24}
  endTime={43}
  fallbackImage={kbCollection} 
  eyebrow="OUR PURPOSE" 
  title={<>Why We <span className="text-primary">Exist</span></>} 
  subtitle="To help adults move better and build strong, mobile, pain-free bodies that support their everyday lives." 
  accentedSubtitle={true}
  className="h-screen"
  primaryCTA={{ text: "View Schedule", link: "/schedule" }}
  secondaryCTA={{ text: "See Pricing", link: "/pricing" }}
/>
```

No other files need changes.
