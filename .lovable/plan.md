
# Fix Tablet View: Purchase Your Reset Week Card

## Problem
On tablet (768-1023px), the Reset Week purchase card is excessively tall because:
- The left text column contains a large headline, 4 "who we help" bullets, reassurance text, AND the full $50 purchase box -- all stacked vertically
- The image column stretches to match, creating a ~1100px tall card
- This requires excessive scrolling and dilutes the conversion impact

## Solution: Tighten Spacing on Tablet

Rather than restructuring the layout (which works well conceptually), we reduce spacing and sizing in the text column specifically at the `md` breakpoint to make the card more compact on tablet.

### File: `src/pages/Home.tsx`

**Change 1** - Reduce text column padding on tablet (line 78):
- From: `p-8 md:p-12`
- To: `p-8 md:p-8 lg:p-12`

Keeps generous padding for desktop but tightens it on tablet.

**Change 2** - Reduce heading size on tablet (line 80):
- From: `text-3xl md:text-4xl`
- To: `text-3xl md:text-3xl lg:text-4xl`

Prevents the headline from consuming too much vertical space at 768-1023px.

**Change 3** - Tighten bullet list spacing on tablet (line 82):
- From: `space-y-3 mb-8`
- To: `space-y-2 md:space-y-2 mb-6 md:mb-6 lg:mb-8`

**Change 4** - Compact the purchase box padding on tablet (line 92):
- From: `p-6`
- To: `p-4 md:p-4 lg:p-6`

**Change 5** - Reduce image minimum height on tablet (line 118):
- From: `min-h-[400px] md:min-h-[600px]`
- To: `min-h-[400px] md:min-h-[500px]`

The image no longer needs to stretch as tall since the text column is more compact.

### Expected Result
- The card will be approximately 150-200px shorter on tablet
- All content remains visible and readable
- The conversion flow (problem identification -> offer -> purchase button) stays intact
- Mobile and desktop layouts are unaffected
