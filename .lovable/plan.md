

## Fix: Google Fonts Not Rendering on Published Site (First Visit)

### Root Cause

In `index.html` line 22, fonts load with two compounding delays:
1. `media="print"` defers loading until `onload` switches it to `all`
2. `display=optional` tells browsers to skip the font entirely if it's not cached by render time

Combined, first-time visitors on the published site see system fallback fonts (wider, different letter-spacing). The Lovable preview doesn't show this because its environment pre-caches fonts.

### Fix

Change `display=optional` to `display=swap` in the Google Fonts URL on line 22. This tells browsers: "Show fallback text immediately, then swap in the real font once loaded." There's a brief flash (~100-200ms) but the correct font always appears.

Also update line 22's loading pattern from the deferred `media="print"` trick to a direct `rel="stylesheet"` since we're already preloading the font files on lines 20-21 (which eliminates the latency that `display=optional` was trying to avoid).

**Changes — `index.html` only:**

| Line | Current | New |
|------|---------|-----|
| 22 | `<link href="...display=optional" rel="stylesheet" media="print" onload="this.media='all'">` | `<link href="...display=swap" rel="stylesheet">` |
| 23 | `<noscript>` fallback with `display=optional` | `Remove` (no longer needed) |
| 47 (inline CSS) | `font-family:Oswald,Impact,...` | Keep as-is (already correct fallback stack) |

One file, two line changes. The preloaded woff2 files on lines 20-21 ensure fonts load fast even with `display=swap`.

