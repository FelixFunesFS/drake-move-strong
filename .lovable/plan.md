

## Fix Meta Pixel Build Error + Add Missing Events

### Build Error Fix
Move the `<noscript><img>` fallback from `<head>` to `<body>` in `index.html`. Vite's parser rejects `<img>` inside `<noscript>` when it's in the document head.

### Missing Events to Add

| Event | File | Trigger |
|---|---|---|
| `CompleteRegistration` | `src/pages/Auth.tsx` | After successful signup (before success toast) |
| `Contact` | `src/components/Footer.tsx` | onClick for `mailto:` and `tel:` links |
| `FindLocation` | `src/components/GoogleMapEmbed.tsx` | onClick when user interacts with map iframe wrapper |

### Files Changed

| File | Change |
|---|---|
| `index.html` | Remove `<noscript>` line from head (line 15), add it to `<body>` after opening tag |
| `src/pages/Auth.tsx` | Import `trackMetaEvent`, fire `CompleteRegistration` on successful signup |
| `src/components/Footer.tsx` | Import `trackMetaEvent`, add onClick handlers to email/phone links |
| `src/components/GoogleMapEmbed.tsx` | Import `trackMetaEvent`, fire `FindLocation` on map click |

