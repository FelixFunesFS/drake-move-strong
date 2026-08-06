import { useEffect, useRef, useState } from 'react';
import SignaturePad from '@/components/contracts/SignaturePad';

interface Props {
  onSignatureChange: (data: string | null) => void;
}

/** Wraps the shared SignaturePad so the canvas fills the available width on any viewport. */
export default function ResponsiveSignaturePad({ onSignatureChange }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(240, Math.floor(el.clientWidth)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="w-full">
      {width > 0 && (
        <SignaturePad
          key={width}
          width={width}
          height={Math.round(Math.min(200, Math.max(140, width * 0.4)))}
          onSignatureChange={onSignatureChange}
        />
      )}
    </div>
  );
}
