
# Align About Page VideoHero with Site-Wide Hero Standards

## Problems Found

1. **Content positioning mismatch**: VideoHero uses `flex items-center` (vertical center) while the standard Hero uses `items-start` with explicit `pt-[15vh] md:pt-[8vh]`. This places About hero content in the dead center of the screen rather than the upper-third like every other page.

2. **No nav overlap compensation**: The About page wrapper uses `-mt-[112px]` to pull the hero under the nav, but VideoHero has no padding-top to push content below the navbar. On shorter viewports, content can sit behind or very close to the nav.

3. **Typography inconsistencies between VideoHero and Hero**:
   - Eyebrow: VideoHero uses `text-sm`, Hero uses `section-eyebrow` class (`text-xs md:text-sm`)
   - Subtitle: VideoHero uses `text-sm sm:text-base md:text-lg`, Hero uses `text-base sm:text-lg md:text-xl`

4. **Excessive empty space on mobile**: `h-screen` with centered content leaves large dark gaps above and below the text block on mobile.

## Solution

Update `VideoHero.tsx` to match the standard Hero component's content positioning pattern -- content starts from the top with explicit padding, accounting for the nav overlap.

## Technical Details

### File: `src/components/VideoHero.tsx`

**Change 1 -- Content positioning (line 190)**:
Replace `flex items-center` with `flex items-start` and add responsive top padding that accounts for the 112px nav overlap:
- From: `"relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden"`
- To: `"relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-start pt-[20vh] md:pt-[18vh] overflow-hidden"`

This mirrors the Home Hero pattern: content sits in the upper-third, with enough padding to clear the navbar (112px + breathing room).

**Change 2 -- Eyebrow styling (line 238)**:
- From: `"text-drake-gold font-semibold text-sm uppercase tracking-wide mb-4"`
- To: `"section-eyebrow text-drake-gold mb-2 md:mb-4"`

Uses the shared `section-eyebrow` utility class for consistency with the standard Hero.

**Change 3 -- Subtitle sizing (line 257-259)**:
- From: `"text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-gray-200 leading-relaxed max-w-xl"`
- To: `"text-base sm:text-lg md:text-xl mb-5 md:mb-6 text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] leading-relaxed max-w-xl"`

Matches the Hero component's subtitle sizing and text styling.

### No changes to mobile layout
Mobile benefits from the same fix -- `pt-[20vh]` on small screens (~168px) provides proper clearance below the banner + nav, and keeps content in the upper portion rather than dead center.

### Expected Result
- Content positioned consistently with the Home page hero (upper-third, not vertically centered)
- Proper visual breathing room below the navbar on all viewports
- Eyebrow and subtitle typography match the site-wide Hero pattern
- Less wasted dark space below the content block on mobile
