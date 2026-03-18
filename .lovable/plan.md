

## Updated Plan: Punchpass Email Templates v2

### Why drake.fitness Can't Host Email Images
I just tested both `https://www.drake.fitness/images/email/studio-david-dog.jpg` and the lovable.app equivalent — both return a blank page. The SPA router intercepts all requests and serves the React app's `index.html` instead of the raw JPG. This is a fundamental limitation of how single-page apps work — static files in `/public` aren't guaranteed to be served as direct downloads when a client-side router catches all routes.

### The Solution: Storage Bucket
Upload all 13 images to a public storage bucket called `email-assets`. This gives each image a permanent, direct URL that serves the raw file — guaranteed to work in every email client.

```
https://ktktwcbvambkcrpfflxi.supabase.co/storage/v1/object/public/email-assets/studio-david-dog.jpg
```

### Full Scope

1. **Create `email-assets` public storage bucket** and upload all 12 existing images + 1 new square-cropped avatar (96x96 `david-avatar-96.jpg`)
2. **Fix circular profile image** — pre-cropped square source, `<td>` with `border-radius: 50%; overflow: hidden`, VML `<v:oval>` for Outlook
3. **Lock font sizes** — `-webkit-text-size-adjust: 100%` on body/td, explicit `px` font-size on every `<td>`, `mso-line-height-rule: exactly` on all text
4. **Add mobile `@media` query** — padding and width overrides for screens under 600px
5. **Text wrapping** — float images left on 5 editorial templates with MSO two-column fallback
6. **Regenerate all 13 HTML files** to `/mnt/documents/` as `_v2` versions using storage bucket URLs

### Deliverables
- 1 new storage bucket with 13 uploaded images
- 13 regenerated HTML files in `/mnt/documents/`
- No changes to `emailTemplates.ts` or admin preview system

