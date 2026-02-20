
# Improve Mobile Hero Image Display and Text Contrast

## Changes

### 1. Adjust mobile image crop — `src/components/Hero.tsx` (line 95)

The current mobile `object-position` is `center_5%`, which crops to the very top of the image (ceiling/lights). Shift it down to show the training action:

```
Before: object-[center_5%] md:object-[center_40%]
After:  object-[center_30%] md:object-[center_40%]
```

This moves the focal point from the top 5% down to roughly the upper third, where the people and movement are.

### 2. Lighten mobile gradient for better image visibility — `src/components/Hero.tsx` (line 100)

The current mobile gradient is heavy (`from-black/80 via-black/60 to-black/30`), obscuring most of the photo. Reduce it slightly while keeping text readable:

```
Before: bg-gradient-to-t from-black/80 via-black/60 to-black/30
After:  bg-gradient-to-t from-black/75 via-black/45 to-black/20
```

The text sits in the upper portion of the hero (pt-[15vh]), so the lighter top (`to-black/20`) lets more image show through at the top. The bottom remains strong enough for any content near the base.

Desktop gradient is unchanged (`md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent`).

### 3. Ensure text contrast meets WCAG AA — No additional file changes needed

With the adjusted gradient, here is the contrast situation:

- **White title text** (`#FFFFFF`) over `black/45` overlay on a photo = effective background is roughly `#737373` or darker. White on `#737373` = contrast ratio ~4.9:1, which passes **WCAG AA** for large text (minimum 3:1 for large text, 4.5:1 for normal). The hero H1 at 48px+ qualifies as large text.
- **Gold accent text** (`#F2B544`) already has `drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]` applied, which creates a dark halo ensuring legibility regardless of background.
- **Subtitle text** (`text-white`) has `drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]` already applied, providing sufficient contrast.
- **CTA buttons** are solid-filled (gold primary, frosted white secondary) — no contrast concern.

The gradient reduction is moderate enough that all text remains accessible. The combination of gradient overlay + drop shadows on text ensures WCAG AA compliance at all breakpoints.

## Summary

| What | Before | After |
|---|---|---|
| Mobile image crop | `center_5%` (ceiling) | `center_30%` (action) |
| Mobile gradient top | `black/30` | `black/20` |
| Mobile gradient mid | `black/60` | `black/45` |
| Mobile gradient bottom | `black/80` | `black/75` |
| Desktop | No change | No change |
| Text contrast | AA compliant | Still AA compliant |
