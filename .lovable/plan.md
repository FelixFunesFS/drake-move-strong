

# White Contact Bar + Teal Utility Buttons

## Summary
Change the sticky mobile contact bar to a white background with teal text/icons, keeping the scroll-to-top and chat buttons teal.

## Changes

### `src/components/MobileContactBar.tsx`
- Background: `bg-primary` → `bg-white`
- Border: `border-primary-foreground/20` → `border-border`
- Text/icons: `text-primary-foreground` → `text-primary`
- Hover states: `hover:bg-primary/90` → `hover:bg-gray-50`
- Active states: `active:bg-primary/80` → `active:bg-gray-100`
- Divider: `bg-primary-foreground/20` → `bg-border`

### No changes to:
- `src/components/ScrollToTopButton.tsx` (stays teal)
- `src/components/chat/ChatBot.tsx` (stays teal)

