

## Social Graphic Generator — Internal Admin Tool

### The Idea

Build a private admin page (`/admin/social-graphics`) that renders a gallery of branded social-ready images using your real class photos, the Drake Fitness logo, and your brand system. This is a **visual preview tool** — you browse layouts, pick a photo, and download the exact 1200x630 image ready for Facebook events, ads, or Stories.

Since it lives under `/admin/`, it's already excluded from robots.txt and the sitemap. No changes needed there.

### Why This Beats Canva

- Uses your actual brand fonts (Oswald), colors (teal/gold), and logo
- Photos are pre-loaded from your existing asset library
- One-click download at the exact social dimensions
- No context-switching to another tool

### Layout Templates (5 styles)

```text
┌─────────────────────────────────┐
│  FULL BLEED                     │
│  Photo fills entire 1200x630   │
│  "DRAKE FITNESS" bottom-left   │
│  Dark gradient overlay          │
└─────────────────────────────────┘

┌────────────┬────────────────────┐
│            │                    │
│  PHOTO     │  TEAL PANEL        │
│  (60%)     │  Logo + headline   │
│            │  Gold accent bar   │
└────────────┴────────────────────┘

┌─────────────────────────────────┐
│  CENTERED CARD                  │
│  Photo bg with heavy overlay    │
│  Logo centered top              │
│  "Try 3 Classes Free" large     │
│  Gold divider line              │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  EDITORIAL STRIP                │
│  Teal top bar with logo         │
│  Full-width photo middle        │
│  Gold bottom bar with text      │
└─────────────────────────────────┘

┌────────────────────┬────────────┐
│                    │  PHOTO     │
│  TEAL PANEL        │  (40%)     │
│  Logo + text       │            │
│  Gold CTA button   │            │
└────────────────────┴────────────┘
```

### How It Works

1. Admin visits `/admin/social-graphics`
2. Picks a template style from tabs (Full Bleed, Split Left, Centered, etc.)
3. Picks a source photo from the asset grid (your existing class/community photos)
4. Optionally edits the headline text (defaults to "Try 3 Classes Free")
5. Sees a live 1200x630 preview rendered with HTML/CSS
6. Clicks **Download** — uses `html2canvas` or Canvas API to export as PNG
7. Uses that image in Facebook Events, ads, Instagram, etc.

### Technical Approach

- **New page**: `src/pages/admin/SocialGraphics.tsx` — registered under `/admin/social-graphics`
- **Rendering**: Pure HTML/CSS within a fixed 1200x630 container, styled with your brand tokens. No AI needed for this — it's deterministic layout.
- **Export**: Canvas API (`html-to-image` or `html2canvas` library) converts the preview div to a downloadable PNG
- **Photos**: Import from `src/assets/` (the 20+ group/community photos already in the project)
- **Logo**: Uses `drake-fitness-logo-kettlebell.png` or `drake-logo-new.png`
- **Route**: Added to admin routes in `App.tsx`, linked from `AdminLayout` sidebar
- **No database changes** — this is a purely client-side tool

### Files

- **Create**: `src/pages/admin/SocialGraphics.tsx` — template gallery, photo picker, live preview, download
- **Edit**: `src/App.tsx` — add route `/admin/social-graphics`
- **Edit**: `src/components/admin/AdminLayout.tsx` — add sidebar link
- **Install**: `html-to-image` package for PNG export

