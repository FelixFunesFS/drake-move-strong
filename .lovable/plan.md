

## Fix: Camera Re-upload Bug + Ensure Upload Works

### Problem
In `handleFileUpload` (line 180-183), only `fileInputRef.current.value` is reset after upload. The `cameraInputRef` is never reset, so if a user takes a photo, then tries to take another, the `onChange` event won't fire because the input value hasn't changed.

### Change — `src/pages/admin/SocialGraphics.tsx`

**Line 180-183** — Reset both refs after upload:

```typescript
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) addPhotosFromFiles(e.target.files);
  // Reset both inputs so the same file/photo can be re-selected
  if (fileInputRef.current) fileInputRef.current.value = '';
  if (cameraInputRef.current) cameraInputRef.current.value = '';
};
```

Single line addition. Everything else (multiple file support, drag-drop, camera capture) is already correctly implemented.

### File
| File | Change |
|------|--------|
| `src/pages/admin/SocialGraphics.tsx` | Line 183: Add `cameraInputRef` reset |

