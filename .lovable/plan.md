
# Center VideoHero Content Vertically, Left-Aligned

## Change

Update the section's flex alignment from `items-start pt-[160px] md:pt-[180px]` to `items-center` so the content block (eyebrow, heading, subtitle, CTAs) is vertically centered within the hero viewport while remaining left-aligned horizontally (which it already is via `text-left` on the content div).

## Technical Details

### File: `src/components/VideoHero.tsx` (line 190)

- From: `"relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-start pt-[160px] md:pt-[180px] overflow-hidden"`
- To: `"relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden"`

Removing the fixed top padding and switching to `items-center` vertically centers the text block. The horizontal left alignment is already handled by the existing `text-left` class on the content container -- no changes needed there.
