

## AI-Powered Graphics in Content Packages

### Current State
- **Content Package Tab** generates captions, headlines, templates, and hashtags via AI — but no images
- **"Open in Editor"** loads text fields into the graphic editor, but the user must manually pick a photo
- **`generate-ad-image`** edge function already exists for AI image generation using `google/gemini-2.5-flash-image`

### What We're Building
Each AI-generated post in a package will also come with a **graphic recommendation** — either matched from the existing photo library or AI-generated. The user can then edit everything in the editor.

### Architecture

```text
┌──────────────────────────────────────────────────────┐
│  AI Package Generation Flow                          │
│                                                      │
│  1. User picks goal + size → generate-content-package│
│     ↓                                                │
│  2. AI returns posts WITH image_prompt + photo_tag   │
│     ↓                                                │
│  3. Frontend renders posts with:                     │
│     [Generate AI Graphic] or [Use Suggested Photo]   │
│     ↓                                                │
│  4. AI graphic → generate-ad-image → base64 → editor │
│     OR matched photo → editor                        │
│     ↓                                                │
│  5. Full post loads into editor (text + graphic)     │
│     fully editable                                   │
└──────────────────────────────────────────────────────┘
```

### Changes

**1. Edge Function: `generate-content-package/index.ts`**
- Add two new fields to each post in the tool schema:
  - `image_prompt`: AI-generated prompt describing the ideal graphic (e.g. "Close-up of hands gripping a kettlebell handle, teal-lit studio background, dramatic side lighting")
  - `suggested_photo_tags`: Array of keywords to match existing photos (e.g. `["kettlebell", "group", "outdoor"]`)
- Update the system prompt to instruct the AI to think like a creative director — each post should have a visual concept

**2. Types: `src/components/admin/social/types.ts`**
- Add `image_prompt` and `suggested_photo_tags` to `PackagePost` interface
- Add optional `generatedImageUrl` for storing AI-generated base64

**3. Component: `ContentPackageTab.tsx`** — Major upgrade
- For each generated post, show:
  - **Suggested Photo**: Auto-match from `DEFAULT_PHOTOS` using tag matching (label keywords). Show the matched photo thumbnail with "Use This" button
  - **"Generate AI Graphic"** button: Calls `generate-ad-image` with the post's `image_prompt`. Shows loading spinner, then the generated image inline
  - **Generated image preview**: Thumbnail of the AI graphic with "Edit in Editor" button
- **"Open in Editor"** now loads both the text content AND the selected/generated image into the editor
- **Batch generate** option: "Generate All Graphics" button that processes posts sequentially with rate-limit-aware delays

**4. `SocialGraphics.tsx` — `handleLoadPost` update**
- Accept an optional `imageUrl` parameter
- When an AI-generated or matched photo is provided, add it to the `photos` array as a custom upload and set it as the active slide's primary photo

### Post Card UI (in ContentPackageTab)

```text
┌─────────────────────────────────────────┐
│ Post #1                    fade-blend   │
│ ┌──────────┐                            │
│ │ Headline │  "Strength Starts Here"    │
│ │ Detail   │  "All levels welcome"      │
│ └──────────┘                            │
│                                         │
│ 📸 Graphic                              │
│ ┌──────────────────────────────────────┐│
│ │ [Matched Photo]  [Generate AI ✨]   ││
│ │  KB Swing Pair    "Create a custom   ││
│ │  ✓ Use This       AI graphic"       ││
│ └──────────────────────────────────────┘│
│                                         │
│ IG | FB | LinkedIn captions...          │
│ #hashtags                               │
│ [Open in Editor →]                      │
└─────────────────────────────────────────┘
```

### Photo Matching Logic (client-side)
Simple keyword matching against `DEFAULT_PHOTOS` labels:
```typescript
const matchPhoto = (tags: string[]) => {
  const scored = DEFAULT_PHOTOS.map((p, idx) => ({
    idx,
    score: tags.filter(t => 
      p.label.toLowerCase().includes(t.toLowerCase())
    ).length
  }));
  return scored.sort((a, b) => b.score - a.score)[0]?.idx ?? 0;
};
```

### File Changes

| File | Change |
|------|--------|
| `supabase/functions/generate-content-package/index.ts` | Add `image_prompt` and `suggested_photo_tags` to tool schema; update system prompt for visual direction |
| `src/components/admin/social/types.ts` | Add fields to `PackagePost` interface |
| `src/components/admin/social/ContentPackageTab.tsx` | Add photo matching, AI image generation per post, image previews, updated "Open in Editor" with image |
| `src/pages/admin/SocialGraphics.tsx` | Update `handleLoadPost` to accept and inject images into the photo array |

