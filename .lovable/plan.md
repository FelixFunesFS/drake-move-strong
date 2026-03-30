

## Generate Drake Fitness Brand Style Guide (PDF)

A professionally designed PDF document showcasing all brand design tokens, typography, color palette, component standards, and usage guidelines — extracted from the live homepage and codebase.

### Contents (Pages)

1. **Cover** — Drake Fitness logo area, "Brand Style Guide", tagline, date
2. **Color Palette** — All brand colors with hex/HSL values, usage notes:
   - Primary Teal #0B4A52, Soft Teal #10757E, Accent Gold #F2B544
   - Dark #1A1A1A, Light #F4F4F4, Cool Gray #DDE1E4, Slate Gray #6A6A6A, White
   - Gradient definitions (hero, CTA)
3. **Typography** — Font families and usage rules:
   - Oswald (font-hero): uppercase headings, hero titles
   - Montserrat (font-heading): mixed-case headings
   - Inter (font-body): body text, UI
   - Size scale from hero (5xl–8xl) down to body (base)
4. **Button & CTA Styles** — Primary (gold), default (teal), outline, ghost variants with border-radius 10px, uppercase tracking
5. **Card & Component Standards** — White bg, rounded-xl, shadow-card, icon boxes in Cool Gray with teal icons
6. **Spacing & Layout** — Container max-width 1240px, section padding, slanted dividers, mobile-first grid patterns
7. **Photography & Imagery** — Ken Burns animation, dark overlays (75–85%), object positioning rules, WebP format
8. **Brand Voice & Messaging** — Key phrases (Move Better, Live Stronger, Stay Pain-Free), eyebrow style, CTA copy patterns

### Technical approach
- Use Python `reportlab` to generate a multi-page PDF
- Render color swatches as drawn rectangles with hex labels
- Use system-safe fonts (Helvetica Bold for headings, Helvetica for body) since brand fonts aren't available in reportlab
- Output to `/mnt/documents/drake-fitness-style-guide.pdf`
- QA: convert to images and inspect each page

