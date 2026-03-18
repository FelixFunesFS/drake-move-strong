

## Generate Punchpass-Ready Email Templates

### What needs to happen
Export all 13 nurture email templates as standalone HTML files with production-ready URLs, optimized for maximum email client compatibility when pasted into Punchpass.

### Key fixes for Punchpass compatibility
1. **Hardcode production URLs** — Replace `window.location.origin` with `https://www.drake.fitness` so images work everywhere
2. **Remove `@import` for Google Fonts** — Gmail strips it. Replace with a `<link>` tag (works in most clients; degrades gracefully to Arial/sans-serif in Gmail)
3. **Add MSO conditionals** — Wrap the 600px container in `<!--[if mso]>` fixed-width table for Outlook desktop
4. **Bulletproof CTA button** — Add VML fallback so the gold button renders with rounded corners in Outlook

### Deliverables
13 individual HTML files saved to `/mnt/documents/`, named clearly for easy identification:

**New Lead sequence (8 files):**
- `new-lead-instant.html`
- `new-lead-day-1.html`
- `new-lead-day-3.html`
- `new-lead-day-5.html`
- `new-lead-day-10.html`
- `new-lead-day-18.html`
- `new-lead-day-24.html`
- `new-lead-day-30.html`

**Win-Back sequence (5 files):**
- `win-back-day-0.html`
- `win-back-day-5.html`
- `win-back-day-12.html`
- `win-back-day-21.html`
- `win-back-day-35.html`

### How to use in Punchpass
Open each HTML file, select all, copy, and paste into Punchpass's HTML email editor. Each file is a complete, self-contained document — no external dependencies except the image URLs hosted on drake.fitness.

### No codebase changes
This task generates downloadable files only. The existing `emailTemplates.ts` and admin preview system remain untouched.

