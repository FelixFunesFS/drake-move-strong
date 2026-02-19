

# Reposition AI Chat Button on Mobile

## Problem
The AI chat bubble on mobile is floating too high (136px from bottom). The user wants it positioned in the bottom-right corner, directly above the "Text Us" section of the sticky bottom bar.

## Solution

### File: `src/components/chat/ChatBot.tsx`

**1. Chat toggle button (line ~179):** Adjust the mobile bottom offset so the button sits just above the MobileContactBar (~60px tall including safe area padding):

```
// Before:
bottom-[136px] md:bottom-24 right-6

// After:
bottom-[72px] md:bottom-24 right-4
```

- `bottom-[72px]` places it snugly above the bottom bar on mobile
- `right-4` shifts it slightly inward to align better with the "Text Us" side

**2. Chat window (line ~190):** Adjust the mobile bottom offset so the chat window opens above the repositioned button:

```
// Before:
bottom-[200px] md:bottom-40

// After:
bottom-[136px] md:bottom-40
```

This keeps the chat window above the button with enough clearance, while the desktop positioning remains unchanged.

