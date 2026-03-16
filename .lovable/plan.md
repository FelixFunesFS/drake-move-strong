

## Fix: Mobile-Uploaded Images Not Displaying

### Root Cause

The `addPhotosFromFiles` function (line 169-178) has two issues affecting mobile uploads:

1. **No error handling**: If `FileReader.readAsDataURL()` fails (common with large mobile photos 5-15MB), the error is silently swallowed and no photo is added.
2. **No HEIC/HEIF support**: iPhones capture in HEIC format by default. While `accept="image/*"` allows selection, many browsers cannot render HEIC in `<img>` tags, resulting in a broken/blank image.
3. **No file size/type validation**: Large mobile photos create enormous data URLs that can cause rendering issues or memory problems.

### Changes — `src/pages/admin/SocialGraphics.tsx`

**Replace `addPhotosFromFiles` (lines 169-178)** with a robust version that:

- Validates file type (rejects unsupported formats like HEIC with a toast message)
- Compresses large images using a canvas resize step (max 2048px dimension) before storing as data URL — this prevents memory bloat from 12MP phone photos
- Adds `onerror` handling on `FileReader` with a toast notification
- Caps batch uploads at 10 files with a toast warning
- Uses `createImageBitmap` or canvas to verify the image actually loads before adding to state

```text
Flow:
File selected → validate type → FileReader.readAsDataURL → 
  create temp Image → verify loads → resize via canvas if > 2048px → 
  store compressed dataURL → add to photos state
  
On any failure → toast.error("Could not load image")
```

### Technical Detail

```typescript
const addPhotosFromFiles = (files: FileList | File[]) => {
  const fileArray = Array.from(files);
  if (fileArray.length > 10) {
    toast.error(`Max 10 images at once. Only first 10 will be added.`);
  }
  fileArray.slice(0, 10).forEach(file => {
    if (file.type && !file.type.startsWith('image/')) {
      toast.error(`${file.name} is not an image`);
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => toast.error(`Failed to read ${file.name}`);
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (!dataUrl) { toast.error(`Failed to load ${file.name}`); return; }
      // Verify & compress via canvas
      const img = new Image();
      img.onload = () => {
        const MAX = 2048;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          const ratio = Math.min(MAX / width, MAX / height);
          width *= ratio; height *= ratio;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.85);
        setPhotos(prev => [{ src: compressed, label: file.name.replace(/\.[^.]+$/, ''), isCustom: true }, ...prev]);
      };
      img.onerror = () => toast.error(`${file.name} format not supported. Try JPG or PNG.`);
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
};
```

### File
| File | Change |
|------|--------|
| `src/pages/admin/SocialGraphics.tsx` | Replace `addPhotosFromFiles` with validated, compressed, error-handled version (lines 169-178) |

