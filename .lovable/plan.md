

# Pre-Launch Checklist Review: What's Done vs. What Needs Work

After a thorough review of the codebase, here is the status of every item on your checklist.

---

## ALREADY DONE (Can be marked complete)

| # | Task | Status | Evidence |
|---|---|---|---|
| 1 | **Create XML Sitemap** | DONE | `public/sitemap.xml` exists with all public pages, blog posts, and local SEO pages |
| 2 | **Configure robots.txt** | DONE | `public/robots.txt` properly blocks `/member/`, `/admin/`, `/coach/`, `/auth` and includes sitemap link |
| 3 | **Meta Titles & Descriptions** | DONE | Every page uses the `<SEO>` component with unique titles and descriptions. `index.html` also has base meta tags. |
| 4 | **Canonical URLs** | DONE | The `<SEO>` component sets `<link rel="canonical">` on every page, and `index.html` has a base canonical |
| 5 | **Open Graph Tags** | DONE | `<SEO>` component outputs `og:title`, `og:description`, `og:image`, `og:type`, `og:url` on every page. `index.html` also has base OG tags |
| 6 | **Image Optimization** | DONE | Images use `vite-imagetools` with `?format=webp&w=768` (or similar) throughout. Gallery, hero, coach images all converted. |
| 7 | **Lazy Loading** | DONE | Non-critical routes use `React.lazy()`. Images use `loading="lazy"` (except hero LCP image which is `eager`). `OptimizedImage` component handles this. |
| 8 | **Add Favicon & App Icons** | DONE | `index.html` references `/favicon.png` and `/apple-touch-icon.png`, both exist in `/public/` |
| 9 | **Privacy Policy** | DONE | `/privacy` route exists, linked in footer |
| 10 | **Terms of Service** | DONE | `/terms` route exists, linked in footer |
| 11 | **Create 404 Error Page** | DONE | `NotFound.tsx` exists with a catch-all `*` route, includes link back to home |
| 12 | **Structured Data (Schema)** | DONE | `StructuredData.tsx` includes LocalBusiness (HealthClub), FAQ, and Article schemas with proper JSON-LD |
| 13 | **Minify CSS/JS** | DONE | Vite production builds automatically minify all assets |
| 14 | **External Links Target** | DONE | All external links (social, PunchPass, Google Maps) consistently use `target="_blank" rel="noopener noreferrer"` |
| 15 | **Form Success Messages** | DONE (just fixed) | Contact form now shows a clear toast confirmation after submission |
| 16 | **ARIA Labels** | MOSTLY DONE | Social links, navigation toggle, chat buttons, lightbox, scroll-to-top all have aria-labels. A few minor gaps remain (see below). |

---

## NEEDS ATTENTION (Remaining work)

### High Priority

| # | Task | What's Needed | Estimate |
|---|---|---|---|
| 1 | **Broken Link Check** | Cannot be verified from code alone. Recommend running a crawler tool (like Screaming Frog or `broken-link-checker`) against the live published site. This is an external task. | External |
| 2 | **Alt Text for Images** | Hero background images use `alt=""` (correct for decorative), but the admin Videos page has an `alt=""` on video thumbnails that should have descriptive text. Most other images have good alt text. **Minor fix needed.** | 15 min |
| 3 | **Form Validation** | Contact form has basic required fields but no email format validation feedback, no phone format validation. The `required` attribute handles empty fields but custom error messages are missing. | 30 min |
| 4 | **Cross-Browser & Device Testing** | Cannot be done from code -- this is a manual QA task. The codebase uses standard Tailwind responsive classes and appears well-structured for responsiveness. | External |
| 5 | **Core Web Vitals Check** | Cannot be done from code -- requires running PageSpeed Insights against the published URL. The codebase has good performance foundations (preloading, lazy loading, WebP, font optimization). | External |
| 6 | **Google Search Console** | External task -- submit `https://drake.fitness/sitemap.xml` to Google Search Console. Cannot be done from code. | External |
| 7 | **Google Analytics Setup** | **No GA4 tracking code found anywhere in the codebase.** This needs to be added. Requires the GA4 measurement ID (e.g., `G-XXXXXXXXXX`). | 30 min |
| 8 | **Keyboard Navigation** | Manual testing required. The codebase uses semantic HTML and standard button/link elements which should work, but the mobile menu and lightbox should be verified. | External |

### Medium Priority

| # | Task | What's Needed | Estimate |
|---|---|---|---|
| 9 | **Color Contrast Check** | Manual/external task -- run the published site through a WCAG contrast checker. | External |
| 10 | **Screen Reader Testing** | Manual/external task. | External |
| 11 | **Spelling & Grammar** | Manual content review across all pages. | External |
| 12 | **Spam Protection** | **No honeypot field or reCAPTCHA on the contact form.** The form submits directly to the edge function with no bot protection. Adding a simple honeypot field would be a quick win. | 20 min |
| 13 | **Conversion Tracking** | Depends on GA4 being set up first. Once GA4 is installed, event tracking for key actions (Reset Week purchase clicks, contact form submissions, phone calls) can be added. | 1 hr |
| 14 | **Backup Strategy** | Documentation task -- not a code change. Database backups are handled automatically by the backend infrastructure. | External |

---

## Summary

**15 of 29 items are already complete** in the codebase. The remaining items fall into two categories:

**Items I can implement (code changes):**
1. Google Analytics (GA4) setup -- needs your measurement ID
2. Honeypot spam protection on the contact form
3. Minor alt text fix on admin video thumbnails
4. Enhanced form validation with user-friendly error messages

**Items that require external tools/manual testing:**
- Broken link check (use a crawler tool)
- Core Web Vitals (run PageSpeed Insights)
- Google Search Console submission
- Cross-browser/device testing
- Keyboard navigation testing
- Color contrast check
- Screen reader testing
- Spelling & grammar review
- Conversion tracking (after GA4)
- Backup documentation

---

## Recommended Implementation Plan

If you'd like me to tackle the code-level items, I would:

1. **Add a honeypot field** to the contact form (hidden field that bots fill but humans don't)
2. **Add GA4 tracking** once you provide the measurement ID
3. **Fix the admin video thumbnail alt text** (minor)
4. **Add form validation** with friendly inline error messages for email format and phone format

This would close out all actionable code items from the checklist.
