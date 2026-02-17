

# Fix Tablet Reason Cards, Text Update, and Desktop Hero Review

## Issues Found

### 1. Tablet View (834px): Reason Card Text Cutoff
On tablet, the grid uses `md:grid-cols-3` which kicks in at 768px. At 834px, each card is only ~260px wide, causing titles like "MOBILITY BEFORE INTEN..." and descriptions like "We improve how your joints m..." to be truncated/clipped.

**Fix**: Use a 2-column layout at `md` (tablet) and only switch to 3-column at `lg` (1024px+). This gives each card ~400px on tablet -- plenty of room for text. On mobile, cards remain single-column stacked.

### 2. Text Fix: "This isn't a gym" -> "This isn't just a gym"
Simple copy change in the subtitle text of the CommunityReasonsSection header.

### 3. Desktop Hero Review
After reviewing at 1920x1080, the desktop hero is well-positioned:
- Headline, subtitle, and dual CTA buttons are all visible and properly sized
- Content sits in the upper-left third with good visual hierarchy
- Background image loads correctly with proper gradient overlay
- No changes needed -- the current layout follows best practices for conversion-focused hero sections

## Technical Changes

### File: `src/components/CommunityReasonsSection.tsx`

**Change 1 (line 62)**: Update subtitle text
- From: `This isn't a gym.`
- To: `This isn't just a gym.`

**Change 2 (line 67)**: Update grid breakpoints for tablet
- From: `grid grid-cols-1 md:grid-cols-3`
- To: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

This ensures:
- Mobile (below 768px): single column, full-width cards
- Tablet (768px-1023px): 2 columns, cards are ~380px wide with room for all text
- Desktop (1024px+): 3 columns as currently designed

**Change 3 (line 73)**: Update the CTA card span to match new breakpoints
- From: `md:col-span-3`
- To: `md:col-span-2 lg:col-span-3`

This keeps the Reset Week CTA card full-width across all breakpoints.

