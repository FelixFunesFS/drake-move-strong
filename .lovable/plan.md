

# Fix Hero Hash Link, Image Card Responsiveness, and Accessibility

## 3 Changes across 2 files

### 1. Hero CTA: Use native `<a>` for hash links (`src/components/Hero.tsx`, ~line 133-136)

The primary CTA currently renders `<Link to="#reset-week">` via React Router. Hash anchors should use a native `<a href>` for reliable smooth scrolling.

Add hash/external link detection to match how `secondaryCTA` already works:

- If `primaryCTA.link` starts with `#` or `http` --> render `<a href>`
- Otherwise --> render `<Link to>`

### 2. Image card text responsiveness (`src/components/CommunityReasonsSection.tsx`, ~line 127-128)

On 320px screens, the `aspect-[4/3]` cards are only ~240px tall, and the gradient overlay text (title + description) can crowd the bottom edge.

Fix: Add `min-h-[240px]` to the card wrapper so on very narrow screens the card grows taller to accommodate the text overlay. On wider screens, the aspect ratio still governs.

Change:
```
className: "relative overflow-hidden rounded-xl group aspect-[4/3]"
```
to:
```
className: "relative overflow-hidden rounded-xl group aspect-[4/3] min-h-[240px]"
```

Apply to both the link and div variants (lines 127-128).

### 3. Icon accessibility (`src/components/CommunityReasonsSection.tsx`, ~line 144)

Add `aria-hidden="true"` to the icon `<span>` since the adjacent `<h3>` already communicates the content to screen readers. This prevents redundant announcements.

Change:
```
<span className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center text-white flex-shrink-0">
```
to:
```
<span aria-hidden="true" className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center text-white flex-shrink-0">
```

## Files

| File | Changes |
|---|---|
| `src/components/Hero.tsx` | Smart link detection for primaryCTA (hash/external use `<a>`, internal use `<Link>`) |
| `src/components/CommunityReasonsSection.tsx` | `min-h-[240px]` on image cards, `aria-hidden="true"` on icon spans |

## What stays the same

- All text content, images, layout structure, and grid breakpoints
- The `#reset-week` anchor target on Home
- The Reset Week CTA card at the bottom of the section
- All other responsive behavior

