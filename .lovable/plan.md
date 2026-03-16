

## Update Weekly Schedule Carousel

### Changes — `src/pages/admin/SocialGraphics.tsx`

**Lines 239-256** — Remove the `.slice(0, 5)` cap and improve date formatting:

1. **Remove 5-day limit**: Change `Object.keys(byDay).sort().slice(0, 5)` to `Object.keys(byDay).sort()` so all days with classes are included (carousel already supports up to 10 slides).

2. **Improved date labels**: Change headline from just `"Monday"` to `"Monday, Mar 16"` format using:
   ```typescript
   const dayLabel = new Date(day + 'T12:00:00').toLocaleDateString('en-US', { 
     weekday: 'long', month: 'short', day: 'numeric' 
   });
   ```

3. **Guard 10-slide max**: Since carousel max is 10, and we need a cover + CTA slide, cap days at 8 with a note if truncated.

### Resulting slide structure
```text
Slide 1: Cover — "This Week at Drake Fitness"
Slide 2-N: One per day with classes — "Monday, Mar 16", "Tuesday, Mar 17", etc.
Slide N+1: CTA — "Book Your Spot"
```

### File
| File | Change |
|------|--------|
| `src/pages/admin/SocialGraphics.tsx` | Lines 239-256: remove `.slice(0,5)`, format date as weekday + month + day, cap at 8 days |

