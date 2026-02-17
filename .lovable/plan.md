

# Fix VideoHero Content Spacing Below Nav

## Root Cause

The current `pt-[20vh] md:pt-[18vh]` uses viewport-relative padding, but the nav is a fixed 112px. On shorter viewports the math breaks down:

- Mobile (672px tall): 20vh = 134px, only 22px gap below nav
- Tablet (768px tall): 20vh = 154px, only 42px gap below nav
- Short desktop (900px): 18vh = 162px, only 50px gap below nav

The Home page Hero avoids this by using `pt-[15vh]` combined with a different height system (`h-[calc(100vh-Xpx)]`) that already accounts for the nav offset. The VideoHero uses `-mt-[112px]` with `h-screen`, so content padding must independently clear the full 112px nav height plus breathing room.

## Solution

Replace the viewport-relative padding with a fixed value that guarantees consistent spacing below the nav on all screen sizes. The nav is 112px, so we need 112px + ~40-48px breathing room = ~152-160px.

Using Tailwind's fixed spacing ensures the gap never shrinks on short viewports.

## Technical Details

### File: `src/components/VideoHero.tsx` (line 190)

**Change**: Replace viewport-relative padding with fixed padding:
- From: `pt-[20vh] md:pt-[18vh]`
- To: `pt-[160px] md:pt-[180px]`

This gives:
- Mobile: 160px total, minus 112px nav = 48px visible gap (comfortable)
- Desktop: 180px total, minus 112px nav = 68px visible gap (matches Home hero feel)

These values are stable regardless of viewport height -- whether on a 600px phone or a 1440px monitor, the content always sits with proper breathing room below the nav.

No other files need changes.

