

## AI Graphics Constraints, Schedule Readability & Multi-Image Expansion

### 1. No People in AI-Generated Images

**Files**: `supabase/functions/generate-ad-image/index.ts`, `supabase/functions/generate-content-package/index.ts`

Update the `generate-ad-image` brand style guide to explicitly forbid people:
```
CRITICAL: Do NOT include people, faces, or human figures. 
Focus on: kettlebells, dumbbells, barbells, maces, sandbags, 
resistance bands, gym equipment close-ups, abstract fitness icons, 
geometric patterns, textured backgrounds, Charleston scenery 
(without people), studio interiors (empty), bold graphic elements, 
frames, and branded color overlays.
```

Update `generate-content-package` system prompt's image_prompt instruction similarly — tell the AI to describe equipment, icons, graphics, and abstract compositions only.

### 2. Schedule Graphics Readability Overhaul

**File**: `src/components/admin/social/TemplatePreview.tsx`

**Schedule Grid** (lines 552-626) — current issues: tiny fonts (8-13px scaled), low contrast instructor text, cramped day columns. Changes:
- Increase class name font to `14 * s` (from `11 * s`), time to `11 * s` (from `9 * s`)
- Add solid card backgrounds (`rgba(255,255,255,0.12)`) with stronger left border (`4px`)
- Increase day header size to `15 * s` with gold underline divider
- Add date number below day name (e.g. "MON" + "15")
- Increase padding and gap between class cards
- For vertical (Story) layouts: use 2-column grid instead of single column for better space usage
- Add row alternating subtle backgrounds for visual grouping
- Ensure minimum contrast ratio: white text on dark cards with `text-shadow` for legibility

**Class Highlight** (lines 628-665) — current issues: instructor badge is small, time/day text lacks hierarchy. Changes:
- Increase class name to `72 * s`, add stronger text shadow
- Make day/time block a distinct card element with gold border and solid dark background
- Increase instructor badge font to `18 * s`

### 3. Expand to 5 Image Slots

**File**: `src/components/admin/social/types.ts`
- Add `fourthPhoto` and `fifthPhoto` (both `number | null`) to `SlideContent`

**File**: `src/pages/admin/SocialGraphics.tsx`
- Add `'fourth' | 'fifth'` to `pickingFor` state
- Add 4th and 5th photo slot buttons in the Photos section
- Pass `fourthPhoto` and `fifthPhoto` to `TemplatePreview`
- Update `MULTI_IMAGE_TEMPLATES` set to include templates that use 4-5 images
- Update `DEFAULT_SLIDE` with `fourthPhoto: null, fifthPhoto: null`

**File**: `src/components/admin/social/TemplatePreview.tsx`
- Add `fourthPhoto?: string` and `fifthPhoto?: string` to props
- Update `photo-strip` to support 4-5 strips when extra photos are provided
- Update `collage` to use 4-5 images in a richer grid layout
- Update `overlap-cards` to stack up to 4 cards in a fan arrangement

### 4. Schedule-First Focus

When `schedule-grid` or `class-highlight` is the active template, the schedule data should be the dominant visual element:
- **Schedule Grid**: Reduce photo background opacity further (`brightness(0.12)`), increase the schedule card area to take 85% of the canvas height, bold gold day headers
- **Class Highlight**: Darken overlay more aggressively, increase class name to fill width, make time/instructor block a large centered card element

### File Changes Summary

| File | Change |
|------|--------|
| `supabase/functions/generate-ad-image/index.ts` | Add "no people" constraint to brand style guide and all style modifiers |
| `supabase/functions/generate-content-package/index.ts` | Update image_prompt instructions to specify equipment/icons/graphics only |
| `src/components/admin/social/types.ts` | Add `fourthPhoto`, `fifthPhoto` to `SlideContent` |
| `src/components/admin/social/TemplatePreview.tsx` | Overhaul schedule-grid readability (larger fonts, better contrast, card backgrounds, day+date headers); overhaul class-highlight (larger text, prominent time card); add 4th/5th photo props; update multi-image templates for 4-5 images |
| `src/pages/admin/SocialGraphics.tsx` | Add 4th/5th photo slot selectors, pass new props, update defaults |

