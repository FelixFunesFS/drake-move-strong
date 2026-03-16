

## Mobile Responsiveness & Phone Image Upload for Social Graphics

### Problems

1. **Layout breaks on mobile**: The editor uses a fixed `flex` side-by-side layout with `w-[580px]` preview + `flex-1` controls (line 327-329). On mobile screens this overflows horizontally.
2. **Preview scaling is hardcoded**: `maxPreviewWidth = 560` (line 283) doesn't adapt to smaller screens.
3. **Upload works but UX is poor on mobile**: The `<input type="file" accept="image/*">` already exists (line 520) but the drop zone is tiny and there's no camera capture option.
4. **Template grid too dense**: 4-column grid (line 423) is cramped on small screens.
5. **Photo grid**: 4-column grid (line 610) needs fewer columns on mobile.

### Changes — `src/pages/admin/SocialGraphics.tsx`

**1. Stack layout on mobile (line 327)**
- Change `<div className="flex gap-6 items-start">` to `flex flex-col lg:flex-row`
- Remove `w-[580px]` from preview column → `w-full lg:w-[580px]`
- Remove `sticky top-4` on mobile → `lg:sticky lg:top-4`

**2. Dynamic preview scaling (line 283-284)**
- Use `useIsMobile()` hook to detect mobile
- On mobile: scale preview to fit `window.innerWidth - 32px` (16px padding each side)
- On desktop: keep current `maxPreviewWidth = 560`

**3. Enhance upload for mobile (line 508-520)**
- Add `capture="environment"` option: a separate camera button that opens the phone camera directly
- Make the drop zone taller on mobile with clearer tap target
- Add explicit "Take Photo" and "Choose from Library" buttons on mobile

**4. Responsive grids**
- Template grid: `grid-cols-3 sm:grid-cols-4` (line 423)
- Photo grid: `grid-cols-3 sm:grid-cols-4` (line 610)
- Content inputs: `grid-cols-1 sm:grid-cols-2` (line 463)

**5. Header actions (line 297-314)**
- Stack download buttons below title on mobile
- Size tabs: horizontal scroll on mobile

**6. Canvas size tabs (line 331-344)**
- Add `overflow-x-auto` for horizontal scroll on narrow screens

### File
| File | Change |
|------|--------|
| `src/pages/admin/SocialGraphics.tsx` | Responsive layout (stack on mobile), dynamic preview scaling, camera capture button, responsive grids throughout |

