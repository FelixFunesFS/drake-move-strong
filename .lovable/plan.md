

# Update the Default OG Image to Match Current Hero

## Problem

The `public/og-image.png` file is an old, outdated image. When any main page is shared on social media, this old image appears instead of something representing the current site (the Turkish getup group class hero shown in your screenshot).

## Fix

1. **Copy the uploaded hero screenshot to replace the OG image**
   - Copy `user-uploads://Home_Hero.png` to `public/og-image.png`, replacing the outdated file
   - This image is already landscape (1.91:1 compatible) and shows the current hero section with the group training class, which is exactly what should appear in social previews

2. **Cache busting note**
   - After deployment, Facebook and LinkedIn cache OG images aggressively. You will need to paste your URL into the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and click "Scrape Again" to force it to fetch the new image. Same for LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/).

No code changes needed — just replacing the single image file.

