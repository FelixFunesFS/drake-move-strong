

## Plan: Replace Hero Image + Convert Gold Accents to Teal

### 1. Replace Hero Image
Copy the uploaded image (`IMG_2452_1.JPG`) to `src/assets/community-class-kettlebell-group.jpg`, then update the import on line 24 to use it. Update the alt text to match the new image content (group kettlebell cleans).

### 2. Convert Gold (`text-drake-gold`) to Teal (`text-drake-primary`) — Outside Hero Only

The hero section (lines 103-164) keeps its gold accents untouched. Every other `text-drake-gold` instance on the page gets changed to teal:

| Line | Section | Current | New |
|------|---------|---------|-----|
| 186 | Event Detail Strip icons | `text-drake-gold` | `text-white` (icons on teal bg look better white) |
| 187 | Event Detail Strip labels | `text-drake-gold` | `text-white/80` |
| 214 | "What to Expect" eyebrow | `text-drake-gold` | `text-drake-primary` |
| 295 | Star icons fill | `text-drake-gold fill-drake-gold` | `text-drake-gold fill-drake-gold` (keep — Google stars should stay gold) |
| 308 | Testimonial author | `text-drake-gold` | `text-drake-primary` (won't work on dark bg) → use `text-white` instead |
| 322 | "Your Guide" eyebrow | `text-drake-gold` | `text-drake-primary` |
| 377 | "How It Works" eyebrow | `text-drake-gold` | `text-drake-primary` |
| 444 | Final CTA "Reserve It Now" | `text-drake-gold` | `text-drake-primary` won't show on dark → keep gold or use white. Keep gold for CTA emphasis. |
| 468, 475 | Footer contact hovers | `hover:text-drake-gold` | `hover:text-drake-primary` won't show on dark → keep as-is |
| 496, 505, 514 | Social icon hovers | `hover:text-drake-gold` | keep as-is (on dark bg) |

**Refined approach** — change gold to teal only where it's on a light background:
- Line 214: eyebrow → `text-drake-primary`
- Line 322: eyebrow → `text-drake-primary`  
- Line 377: eyebrow → `text-drake-primary`
- Line 186: event strip icons → `text-white` (already on teal bg)
- Line 187: event strip labels → `text-white/80`
- Lines on dark backgrounds (social proof, final CTA, footer) stay gold for visibility

### Files Changed

| File | Change |
|------|--------|
| `src/assets/community-class-kettlebell-group.jpg` | New file — copied from upload |
| `src/pages/CommunityClass.tsx` | Update hero import, swap 3 eyebrows from gold→teal, update event strip icon/label colors |

