

# Optimize Remaining Unoptimized Images

## Problem
PageSpeed still flags large unoptimized assets from two files not covered by the previous optimization pass:

| File | Asset | Size |
|------|-------|------|
| `LongevityBlock.tsx` | `drake-logo-new.png` | 64 KiB |
| `Schedule.tsx` | 10 gallery JPGs + 2 community JPGs + 3 class JPGs | 215+ KiB each |

## Changes

### 1. `src/components/LongevityBlock.tsx`
Convert the logo import to WebP:
```
- import drakeLogo from "@/assets/drake-logo-new.png";
+ import drakeLogo from "@/assets/drake-logo-new.png?format=webp&w=176";
```

### 2. `src/pages/Schedule.tsx`
Convert all 15 raw JPG imports to WebP with 768px width:
```
- import membersOverheadLungeNaturalLight from "@/assets/members-overhead-lunge-natural-light.jpg";
+ import membersOverheadLungeNaturalLight from "@/assets/members-overhead-lunge-natural-light.jpg?format=webp&w=768";
```
Same pattern for all other imports on lines 26-42:
- `membersDoubleKettlebellRack`
- `groupPlankRowsKettlebells`
- `classesGallery1` through `classesGallery10`
- `communityGroupPhotoLarge`
- `groupOverheadPressClass`

### 3. Publish reminder
After these changes, you will need to **publish** the site for both this batch and the previous Home.tsx/Navigation.tsx optimizations to take effect on the live `drake.fitness` domain. The PageSpeed results currently reflect the old published build.

### 4. Cloudflare cache headers (no code change)
The "Cache TTL: None" warnings require a Cloudflare Page Rule:
- `/assets/*`: `Cache-Control: public, max-age=31536000, immutable`
- This is configured in your Cloudflare dashboard, not in the codebase.

