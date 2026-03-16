import React from 'react';
import { TEAL, GOLD, DARK, SOFT_TEAL, TEAL_PATTERN, logo } from './types';

interface ScaleProps {
  s: number; // scale factor = canvasWidth / 1200
}

export function FreeBadge({ style, s = 1 }: { style?: React.CSSProperties; s?: number }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${GOLD} 0%, #E5A635 100%)`,
      color: DARK,
      padding: `${10 * s}px ${22 * s}px`,
      fontFamily: "'Oswald', sans-serif",
      fontWeight: 800,
      fontSize: 18 * s,
      textTransform: 'uppercase',
      letterSpacing: 2 * s,
      borderRadius: 6 * s,
      boxShadow: `0 ${4 * s}px ${20 * s}px rgba(242,181,68,0.4)`,
      display: 'inline-block',
      lineHeight: 1.2,
      textAlign: 'center' as const,
      ...style,
    }}>
      <span style={{ fontSize: 28 * s, display: 'block', lineHeight: 1 }}>3 FREE</span>
      <span style={{ fontSize: 14 * s, letterSpacing: 3 * s }}>CLASSES</span>
    </div>
  );
}

export function CTAButton({ text, style, s = 1 }: { text: string; style?: React.CSSProperties; s?: number }) {
  return (
    <div style={{
      background: GOLD,
      color: DARK,
      padding: `${14 * s}px ${36 * s}px`,
      fontFamily: "'Oswald', sans-serif",
      fontSize: 18 * s,
      fontWeight: 700,
      textTransform: 'uppercase',
      borderRadius: 6 * s,
      letterSpacing: 1.5 * s,
      display: 'inline-block',
      boxShadow: `0 ${4 * s}px ${16 * s}px rgba(0,0,0,0.25)`,
      ...style,
    }}>
      {text}
    </div>
  );
}

export function PhotoInsetRect({ src, width, height, rotation, style }: { src: string; width: number; height: number; rotation?: number; style?: React.CSSProperties }) {
  return (
    <div style={{
      width, height,
      borderRadius: 10,
      overflow: 'hidden',
      border: `3px solid ${GOLD}`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      transform: rotation ? `rotate(${rotation}deg)` : undefined,
      ...style,
    }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
    </div>
  );
}

export function FrostedCard({ eyebrow, headline, detailLine, ctaText, showBadge, style, s = 1 }: {
  eyebrow?: string;
  headline: string;
  detailLine: string;
  ctaText: string;
  showBadge: boolean;
  style?: React.CSSProperties;
  s?: number;
}) {
  return (
    <div style={{
      background: 'rgba(11, 74, 82, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: `1px solid rgba(242, 181, 68, 0.25)`,
      borderRadius: 12 * s,
      padding: `${28 * s}px ${32 * s}px`,
      boxShadow: `0 ${16 * s}px ${48 * s}px rgba(0,0,0,0.5), 0 ${4 * s}px ${12 * s}px rgba(0,0,0,0.3)`,
      fontFamily: "'Oswald', sans-serif",
      maxWidth: 360 * s,
      ...style,
    }}>
      {eyebrow && (
        <div style={{ fontSize: 11 * s, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3 * s, marginBottom: 8 * s }}>{eyebrow}</div>
      )}
      <div style={{ fontSize: 32 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: 1 * s, marginBottom: 8 * s }}>
        {headline}
      </div>
      {detailLine && (
        <div style={{ fontSize: 14 * s, color: 'rgba(255,255,255,0.6)', letterSpacing: 1 * s, marginBottom: 14 * s }}>{detailLine}</div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 * s, flexWrap: 'wrap' as const }}>
        <CTAButton text={ctaText} s={s} style={{ fontSize: 14 * s, padding: `${10 * s}px ${24 * s}px` }} />
        {showBadge && <FreeBadge s={s * 0.7} />}
      </div>
    </div>
  );
}

export function BrandPanel({ eyebrow, programLine, s = 1, style }: { eyebrow: string; programLine: string; s?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ position: 'absolute', ...style, background: TEAL, backgroundImage: TEAL_PATTERN, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${SOFT_TEAL} 0%, ${TEAL} 100%)`, opacity: 0.5 }} />
      <div style={{ position: 'relative', zIndex: 1, padding: `${48 * s}px ${44 * s}px` }}>
        <img src={logo} alt="" style={{ height: 50 * s, marginBottom: 20 * s }} crossOrigin="anonymous" />
        <div style={{ fontSize: 12 * s, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3 * s, marginBottom: 12 * s }}>{eyebrow}</div>
        <div style={{ width: 64 * s, height: 3 * s, background: GOLD, marginTop: 8 * s, marginBottom: 12 * s, borderRadius: 2 }} />
        <div style={{ fontSize: 19 * s, color: 'rgba(255,255,255,0.9)', fontWeight: 500, lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: 1 * s }}>{programLine}</div>
      </div>
    </div>
  );
}
