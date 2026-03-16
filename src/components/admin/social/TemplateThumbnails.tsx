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
  // split-right
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
