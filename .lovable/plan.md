

## Fix: Email Preview Showing Raw HTML Instead of Rendered Email

### Problem
The `<iframe srcDoc={html}>` approach doesn't reliably render in all environments. The Lovable preview sandbox likely blocks or ignores `srcDoc`, causing raw HTML tags to display as text instead of a rendered email.

### Solution
Replace `srcDoc` with a **ref-based `contentDocument.write()`** approach. This writes the HTML directly into the iframe's document object after it mounts, which works universally regardless of CSP or sandbox restrictions.

### Change: `src/pages/admin/EmailSequences.tsx`

In the `EmailPreviewDialog` component:

1. Add a `useRef` + `useEffect` that writes the HTML into the iframe's `contentDocument` whenever `html` or `device` changes
2. Remove the `srcDoc` attribute from the iframe
3. Keep all existing functionality (Copy HTML button, desktop/mobile toggle, dialog layout)

```text
Before:
  <iframe srcDoc={html} sandbox="allow-same-origin" ... />

After:
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (doc && html) {
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [html, device]);

  <iframe ref={iframeRef} ... />
```

This is a single-component fix — only the iframe rendering method changes. No template or content changes needed.

