

## Remove Promotion Banner from Home Page

### Finding
Both active promotions display **"🎉 Try 3 Classes Free — No Commitment"** with a "Claim Free Classes" CTA — identical messaging to the Hero section's "Try 3 Classes Free" button. This creates redundant CTAs stacked on top of each other on the home page.

### Fix
Update `AnnouncementBanner.tsx`'s `shouldShowOnPage` function to exclude the home page (`/`) when `target_pages` includes `all`. This is a code-level exclusion rather than a database change, since the banner should still show on all other pages.

**File**: `src/components/AnnouncementBanner.tsx` (lines 29-33)

Change the logic from:
```typescript
if (promotion.target_pages.includes('all')) return true;
```
To:
```typescript
if (promotion.target_pages.includes('all')) return location.pathname !== '/';
```

This single line change hides the banner on the home page while preserving it site-wide elsewhere. No database migration needed.

