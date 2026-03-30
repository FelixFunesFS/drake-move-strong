

## Root Cause

The event detail strip uses `bg-drake-primary` (line 167), but **there is no `drake-primary` color in tailwind.config.ts**. The defined colors are `drake-teal`, `drake-teal-light`, `drake-gold`, etc. — no `drake-primary`.

Since `bg-drake-primary` doesn't resolve, the section gets **no background color** (defaults to white), and the text is `text-white` — hence white text on white background.

This same issue affects the eyebrow text elsewhere on the page that uses `text-drake-primary`.

## Fix (single file: `src/pages/CommunityClass.tsx`)

Replace every `drake-primary` reference with `drake-teal` (the actual Tailwind token):

| Line | Current | Fixed |
|------|---------|-------|
| 167 | `bg-drake-primary` | `bg-drake-teal` |
| 186 | `text-white` (icons) | `text-white` (keep — now visible on teal bg) |
| 214 | `text-drake-primary` | `text-drake-teal` |
| 236, 237 | `bg-drake-primary/15`, `text-drake-primary` | `bg-drake-teal/15`, `text-drake-teal` |
| 254, 255 | same pattern | `bg-drake-teal/15`, `text-drake-teal` |
| 278 | `text-drake-primary` | `text-drake-teal` |
| 322 | `text-drake-primary` | `text-drake-teal` |
| 362 | `text-drake-primary bg-drake-primary/10` | `text-drake-teal bg-drake-teal/10` |
| 377 | `text-drake-primary` | `text-drake-teal` |
| 405 | `bg-drake-primary` | `bg-drake-teal` |

**No other files changed.** This is a find-and-replace of `drake-primary` → `drake-teal` scoped to this one file.

