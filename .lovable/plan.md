

## Add Drake Fitness Logo to Email Headers

### Problem
The email header currently uses text-only "DRAKE FITNESS" in Oswald font. The user wants the actual brand logo (`drake-fitness-logo2.png`) displayed in the header, compatible with all email clients.

### Approach

**1. Host logo at a public URL**
Copy `src/assets/drake-fitness-logo2.png` to `public/images/drake-fitness-logo2.png` so it's served at `https://drake-move-strong.lovable.app/images/drake-fitness-logo2.png` — a stable, publicly accessible URL that email clients can fetch.

**2. Update header in both template files**
Replace the text-only `<h1>DRAKE FITNESS</h1>` header with an `<img>` tag using email-safe best practices:
- Absolute URL (not relative)
- Explicit `width` and `height` attributes (prevents layout shift)
- `alt="Drake Fitness"` fallback text for clients that block images
- `style="display:block;"` to prevent gaps in Outlook
- Keep the text "MOVE. GET STRONG." tagline below the logo

### Email Client Compatibility
- **Gmail/Apple Mail/Yahoo**: Renders `<img>` natively
- **Outlook**: Explicit width/height + `display:block` prevents broken layout
- **Image-blocking clients**: `alt` text displays "Drake Fitness" in white on teal background as fallback

### Files Changed

| File | Change |
|---|---|
| `public/images/drake-fitness-logo2.png` | Copy of brand logo for public hosting |
| `src/lib/emailTemplates.ts` | Replace text header with logo `<img>` tag |
| `supabase/functions/send-nurture-previews/index.ts` | Mirror same header change |

