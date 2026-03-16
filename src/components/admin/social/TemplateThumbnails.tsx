import React from 'react';
import { TemplateId, TEAL, GOLD, DARK } from './types';

export function TemplateThumbnail({ id, active }: { id: TemplateId; active: boolean }) {
  const base: React.CSSProperties = { width: 72, height: 38, borderRadius: 6, overflow: 'hidden', position: 'relative', background: '#e5e5e5' };
  const teal: React.CSSProperties = { background: TEAL };
  const gold: React.CSSProperties = { background: GOLD };
  const ring = active ? `2px solid ${GOLD}` : '2px solid transparent';

  if (id === 'full-bleed') {
    return (
      <div style={{ ...base, border: ring, background: '#888' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 14, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
        <div style={{ position: 'absolute', bottom: 3, left: 4, width: 20, height: 2, ...gold, borderRadius: 1 }} />
        <div style={{ position: 'absolute', bottom: 7, left: 4, width: 30, height: 3, background: '#fff', borderRadius: 1 }} />
      </div>
    );
  }
  if (id === 'split-left') {
    return (
      <div style={{ ...base, border: ring, display: 'flex' }}>
        <div style={{ width: '60%', background: '#888', clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }} />
        <div style={{ width: '40%', ...teal, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 4 }}>
          <div style={{ width: 14, height: 2, ...gold, borderRadius: 1, marginBottom: 2 }} />
          <div style={{ width: 22, height: 2, background: '#fff', borderRadius: 1 }} />
        </div>
      </div>
    );
  }
  if (id === 'centered') {
    return (
      <div style={{ ...base, border: ring, background: 'rgba(11,74,82,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 44, height: 24, border: `1px solid rgba(242,181,68,0.4)`, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <div style={{ width: 16, height: 2, background: '#fff', borderRadius: 1 }} />
          <div style={{ width: 10, height: 1.5, ...gold, borderRadius: 1 }} />
        </div>
      </div>
    );
  }
  if (id === 'editorial') {
    return (
      <div style={{ ...base, border: ring, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 8, ...teal }} />
        <div style={{ height: 2, ...gold }} />
        <div style={{ flex: 1, background: '#888' }} />
        <div style={{ height: 8, background: DARK, display: 'flex', alignItems: 'center', padding: '0 4px', justifyContent: 'space-between' }}>
          <div style={{ width: 20, height: 2, background: '#fff', borderRadius: 1 }} />
          <div style={{ width: 12, height: 5, ...gold, borderRadius: 2 }} />
        </div>
      </div>
    );
  }
  if (id === 'collage') {
    return (
      <div style={{ ...base, border: ring, display: 'flex', position: 'relative' }}>
        <div style={{ width: '60%', background: '#888' }} />
        <div style={{ position: 'absolute', top: 0, left: '60%', width: 2, height: '100%', ...gold }} />
        <div style={{ width: '40%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, background: '#999' }} />
          <div style={{ height: 2, ...gold }} />
          <div style={{ flex: 1, background: '#777' }} />
        </div>
      </div>
    );
  }
  if (id === 'schedule-grid') {
    return (
      <div style={{ ...base, border: ring, background: TEAL, display: 'flex', flexDirection: 'column', padding: 3, gap: 1 }}>
        <div style={{ display: 'flex', gap: 1, flex: 1 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
              <div style={{ height: 3, background: GOLD, borderRadius: '1px 1px 0 0', width: '100%' }} />
            </div>
          ))}
        </div>
        <div style={{ height: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ width: 14, height: 4, ...gold, borderRadius: 1 }} />
        </div>
      </div>
    );
  }
  if (id === 'class-highlight') {
    return (
      <div style={{ ...base, border: ring, background: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <div style={{ width: 28, height: 3, background: '#fff', borderRadius: 1 }} />
        <div style={{ width: 16, height: 1.5, ...gold, borderRadius: 1 }} />
        <div style={{ width: 12, height: 4, ...gold, borderRadius: 2, marginTop: 1 }} />
      </div>
    );
  }
  // New templates
  if (id === 'diagonal-strip') {
    return (
      <div style={{ ...base, border: ring, background: '#888', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '30%', left: '-10%', right: '-10%', height: 10, ...gold, transform: 'rotate(-15deg)' }} />
        <div style={{ position: 'absolute', top: '35%', left: '20%', width: 20, height: 2, background: '#fff', borderRadius: 1 }} />
      </div>
    );
  }
  if (id === 'fade-blend') {
    return (
      <div style={{ ...base, border: ring, display: 'flex' }}>
        <div style={{ width: '50%', background: '#888' }} />
        <div style={{ width: '50%', background: 'linear-gradient(to right, #888, #666)' }} />
        <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', width: 24, height: 2, background: '#fff', borderRadius: 1 }} />
      </div>
    );
  }
  if (id === 'circle-cutout') {
    return (
      <div style={{ ...base, border: ring, ...teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#888', border: `2px solid ${GOLD}` }} />
        <div style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, background: '#fff', borderRadius: 1 }} />
      </div>
    );
  }
  if (id === 'photo-strip') {
    return (
      <div style={{ ...base, border: ring, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex' }}>
          <div style={{ flex: 1, background: '#888' }} />
          <div style={{ width: 2, ...gold }} />
          <div style={{ flex: 1, background: '#999' }} />
          <div style={{ width: 2, ...gold }} />
          <div style={{ flex: 1, background: '#777' }} />
        </div>
        <div style={{ height: 8, background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 24, height: 2, background: '#fff', borderRadius: 1 }} />
        </div>
      </div>
    );
  }
  if (id === 'overlap-cards') {
    return (
      <div style={{ ...base, border: ring, ...teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 22, height: 16, background: '#888', borderRadius: 2, border: `1px solid ${GOLD}`, transform: 'rotate(-8deg)', position: 'absolute', left: 14, top: 6 }} />
        <div style={{ width: 22, height: 16, background: '#999', borderRadius: 2, border: `1px solid ${GOLD}`, transform: 'rotate(5deg)', position: 'absolute', left: 30, top: 8 }} />
        <div style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, background: '#fff', borderRadius: 1 }} />
      </div>
    );
  }
  if (id === 'marquee-banner') {
    return (
      <div style={{ ...base, border: ring, background: '#888', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, height: 10, ...gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 24, height: 2, background: DARK, borderRadius: 1 }} />
        </div>
      </div>
    );
  }
  if (id === 'stacked-bars') {
    return (
      <div style={{ ...base, border: ring, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 8, ...teal, display: 'flex', alignItems: 'center', padding: '0 3px' }}>
          <div style={{ width: 8, height: 4, ...gold, borderRadius: 1 }} />
        </div>
        <div style={{ flex: 1, background: '#888' }} />
        <div style={{ height: 10, background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
          <div style={{ width: 22, height: 2, background: '#fff', borderRadius: 1 }} />
          <div style={{ width: 10, height: 4, ...gold, borderRadius: 1 }} />
        </div>
      </div>
    );
  }
  if (id === 'frame-inset') {
    return (
      <div style={{ ...base, border: ring, ...teal, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
        <div style={{ width: '80%', height: '70%', background: '#888', borderRadius: 2, border: `2px solid ${GOLD}` }} />
        <div style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 22, height: 2, background: '#fff', borderRadius: 1 }} />
      </div>
    );
  }
  // split-right (default)
  return (
    <div style={{ ...base, border: ring, display: 'flex' }}>
      <div style={{ width: '45%', ...teal, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 4 }}>
        <div style={{ width: 14, height: 2, ...gold, borderRadius: 1, marginBottom: 2 }} />
        <div style={{ width: 22, height: 2, background: '#fff', borderRadius: 1, marginBottom: 3 }} />
        <div style={{ width: 16, height: 5, ...gold, borderRadius: 2 }} />
      </div>
      <div style={{ width: '55%', background: '#888', clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }} />
    </div>
  );
}
