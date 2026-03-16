

## Social Graphics Generator — Full Upgrade Plan

### Current State
- 877-line single file, fixed 1200x630 output only
- 20 hardcoded asset photos, no custom uploads
- 6 templates (full-bleed, split-left/right, centered, editorial, collage)
- 4 static content presets, no schedule integration
- No multi-size support, no carousel mode, no AI package generation

### What We'll Build

**1. Multi-Size Output System**

Add a size selector that changes canvas dimensions. All template elements scale proportionally.

| Size | Dimensions | Platform |
|------|-----------|----------|
| Landscape | 1200x630 | Facebook, LinkedIn, OG |
| Square | 1080x1080 | Instagram Feed |
| Story | 1080x1920 | IG/FB Stories, Reels |
| Portrait | 1080x1350 | IG Portrait |

`TemplatePreview` receives `canvasSize: {width, height}` prop. All hardcoded pixel values become proportional: `fontSize: 54 * (canvasSize.width / 1200)`. Layout logic adapts per aspect ratio (e.g., split templates stack vertically in Story mode). The preview scale factor and export dimensions update dynamically.

**2. Custom Image Upload**

Add a drag-and-drop zone above the photo grid with `<input type="file" accept="image/*" multiple>`. Uploaded files convert to data URLs via `FileReader` and prepend to the photos array in local state with a "Custom" label. No storage needed — ephemeral for the session.

**3. Schedule-Driven Smart Presets (Live from PunchPass)**

New "Schedule Presets" section that fetches from `punchpass_schedule` table and auto-populates content:

- **Today's Classes** — Queries today's date, renders class names + times + instructors as the graphic text content. User can filter/select which classes to include via checkboxes before applying.
- **Today's Crew** — Instructor spotlight: shows who's coaching today with their class lineup.
- **This Week's Schedule** — Fetches next 7 days, formats as a branded schedule grid showing day, class name, time, and instructor.
- **Single Class Spotlight** — Dropdown to pick any specific class from the schedule; populates headline with class name, detail with time/instructor, and CTA with the PunchPass booking URL.

Each preset opens a small config panel where the admin can:
- Toggle individual classes on/off (checkbox per class)
- Choose grouping (by day vs. by class type)
- Pick date range (today, this week, custom)

The schedule data drives new schedule-specific template layouts that render the class info as a formatted list/grid within the branded design.

**4. Schedule-Specific Templates (New)**

Two new template types optimized for schedule content:

- **Schedule Grid** — Clean branded table layout: day columns with class rows, instructor color-coded (David=Amber, Misty=Rose, Nick=Blue), times formatted. Works across all 4 sizes.
- **Class Highlight** — Single class hero graphic: large class name, instructor name, time, day, "Book Now" CTA. Great for individual class promotion.

**5. Carousel / Multi-Slide Mode**

Toggle between "Single" and "Carousel" mode. Carousel supports up to 10 slides:

- Slide navigator bar (numbered tabs) to switch between slides
- Each slide has independent template, photo, and text content
- "Add Slide" / "Remove Slide" controls
- Predefined carousel sequences:
  - **Weekly Schedule Carousel**: Slide 1 = hook headline, Slides 2-6 = one day per slide with that day's classes, Slide 7 = CTA
  - **Class Spotlight Series**: Each slide highlights a different class type
  - **Custom**: Build from scratch
- "Download All" exports each slide as a separate numbered PNG
- All slides respect the selected output size

**6. AI Content Package Generator**

New "Generate Package" tab (using Tabs component) alongside the editor:

- Pick campaign goal: Conversion, Brand Awareness, Education, Community, Retention
- Pick package size: 10, 20, or 30 posts
- New edge function `generate-content-package` calls Lovable AI (gemini-2.5-flash) with Drake Fitness brand context + campaign strategy
- Returns structured JSON: array of posts with caption (per platform: IG, FB, LinkedIn), suggested template, content preset values, hashtags
- UI renders as scrollable card list
- "Open in Editor" loads that post's content into the graphic editor
- "Copy Caption" copies platform-specific caption to clipboard

### File Changes

| File | Change |
|------|--------|
| `src/pages/admin/SocialGraphics.tsx` | Major refactor: add size selector, upload zone, schedule presets with class filtering, carousel mode, schedule templates, package tab |
| `supabase/functions/generate-content-package/index.ts` | New edge function for AI batch content generation |
| `supabase/config.toml` | Register `generate-content-package` with `verify_jwt = false` |

### Implementation Order

1. Add output size selector + refactor `TemplatePreview` for proportional scaling across all 6 existing templates
2. Add custom image upload (drag-drop + file input)
3. Add schedule data fetching from `punchpass_schedule` + smart preset UI with class filter/selection controls
4. Add 2 new schedule-specific template layouts (Schedule Grid, Class Highlight)
5. Add carousel/multi-slide mode with slide navigator, predefined sequences, and batch download
6. Create `generate-content-package` edge function + package generator UI tab

