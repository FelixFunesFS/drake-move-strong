import React from 'react';
import { TemplateId, CanvasSize, TEAL, GOLD, DARK, SOFT_TEAL, TEAL_PATTERN, logo, ScheduleClass, INSTRUCTOR_COLORS } from './types';
import { FreeBadge, CTAButton, PhotoInsetRect, FrostedCard, BrandPanel } from './TemplateElements';

interface TemplatePreviewProps {
  template: TemplateId;
  photo: string;
  secondPhoto?: string;
  thirdPhoto?: string;
  fourthPhoto?: string;
  fifthPhoto?: string;
  eyebrow: string;
  headline: string;
  programLine: string;
  detailLine: string;
  ctaText: string;
  showBadge: boolean;
  previewRef: React.RefObject<HTMLDivElement>;
  canvasSize: CanvasSize;
  scheduleClasses?: ScheduleClass[];
}

export default function TemplatePreview({ template, photo, secondPhoto, thirdPhoto, fourthPhoto, fifthPhoto, eyebrow, headline, programLine, detailLine, ctaText, showBadge, previewRef, canvasSize, scheduleClasses }: TemplatePreviewProps) {
  const { width: W, height: H } = canvasSize;
  const s = W / 1200; // proportional scale factor
  const font = "'Oswald', sans-serif";
  const isVertical = H > W; // story/portrait

  if (template === 'schedule-grid') {
    return <ScheduleGridTemplate ref={previewRef} W={W} H={H} s={s} font={font} eyebrow={eyebrow} headline={headline} ctaText={ctaText} photo={photo} scheduleClasses={scheduleClasses || []} />;
  }

  if (template === 'class-highlight') {
    return <ClassHighlightTemplate ref={previewRef} W={W} H={H} s={s} font={font} eyebrow={eyebrow} headline={headline} programLine={programLine} detailLine={detailLine} ctaText={ctaText} photo={photo} scheduleClasses={scheduleClasses || []} />;
  }

  if (template === 'full-bleed') {
    return (
      <div ref={previewRef} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 ${120 * s}px ${40 * s}px rgba(0,0,0,0.5)` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 40%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,74,82,0.3) 0%, transparent 50%)' }} />
        {secondPhoto && (
          <div style={{ position: 'absolute', top: 28 * s, left: 40 * s }}>
            <PhotoInsetRect src={secondPhoto} width={180 * s} height={120 * s} rotation={-3} />
          </div>
        )}
        {showBadge && (
          <div style={{ position: 'absolute', top: 32 * s, right: 40 * s }}>
            <FreeBadge s={s} />
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 40 * s, left: 48 * s, right: 48 * s }}>
          <img src={logo} alt="" style={{ height: 56 * s, marginBottom: 16 * s }} crossOrigin="anonymous" />
          <div style={{ width: 80 * s, height: 3 * s, background: GOLD, marginBottom: 14 * s, borderRadius: 2 }} />
          <div style={{ fontSize: 13 * s, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3 * s, marginBottom: 8 * s }}>{eyebrow}</div>
          <div style={{ fontSize: 54 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.08, letterSpacing: 1.5 * s, textShadow: `0 ${2 * s}px ${20 * s}px rgba(0,0,0,0.6)` }}>{headline}</div>
          <div style={{ fontSize: 22 * s, color: 'rgba(255,255,255,0.7)', marginTop: 8 * s, fontWeight: 400, letterSpacing: 1.5 * s, textTransform: 'uppercase' }}>{programLine}</div>
          {detailLine && (
            <div style={{ fontSize: 17 * s, color: 'rgba(255,255,255,0.55)', marginTop: 6 * s, fontWeight: 400, letterSpacing: 1 * s }}>{detailLine}</div>
          )}
          <CTAButton text={ctaText} s={s} style={{ marginTop: 18 * s }} />
        </div>
      </div>
    );
  }

  if (template === 'split-left') {
    const clipRight = isVertical ? '100%' : '68%';
    const clipBottom = isVertical ? '100%' : '50%';
    return (
      <div ref={previewRef} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        <div style={{ position: 'absolute', inset: 0, clipPath: isVertical ? 'polygon(0 0, 100% 0, 100% 55%, 0 65%)' : `polygon(0 0, ${clipRight} 0, ${clipBottom} 100%, 0 100%)` }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
          <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 ${80 * s}px ${20 * s}px rgba(0,0,0,0.3)` }} />
        </div>
        <BrandPanel eyebrow={eyebrow} programLine={programLine} s={s} style={isVertical ? { bottom: 0, left: 0, width: '100%', height: '45%' } : { right: 0, top: 0, width: '50%', height: '100%', padding: `${48 * s}px ${44 * s}px ${48 * s}px ${64 * s}px` }} />
        <FrostedCard
          eyebrow={eyebrow} headline={headline} detailLine={detailLine} ctaText={ctaText} showBadge={showBadge} s={s}
          style={{ position: 'absolute', bottom: isVertical ? '42%' : 36 * s, left: isVertical ? '50%' : '42%', transform: isVertical ? 'translateX(-50%)' : 'translateX(-50%)', zIndex: 10 }}
        />
      </div>
    );
  }

  if (template === 'centered') {
    return (
      <div ref={previewRef} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        <div style={{ position: 'absolute', inset: -20, transform: 'rotate(-3deg)', transformOrigin: 'center' }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} crossOrigin="anonymous" />
        </div>
        <div style={{ position: 'absolute', inset: -20, transform: 'rotate(3deg)', transformOrigin: 'center' }}>
          <img src={secondPhoto || photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25)' }} crossOrigin="anonymous" />
        </div>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(11,74,82,0.78) 0%, rgba(11,74,82,0.92) 70%, rgba(0,0,0,0.95) 100%)` }} />
        <div style={{ position: 'absolute', top: 50 * s, left: 90 * s, right: 90 * s, bottom: 50 * s, border: '1px solid rgba(242,181,68,0.2)', borderRadius: 8 * s, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, padding: `0 ${60 * s}px`, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(2px)' }}>
          {[{ t: -1, l: -1, bT: true, bL: true, br: '8px 0 0 0' }, { t: -1, r: -1, bT: true, bR: true, br: '0 8px 0 0' }, { b: -1, l: -1, bB: true, bL: true, br: '0 0 0 8px' }, { b: -1, r: -1, bB: true, bR: true, br: '0 0 8px 0' }].map((c, i) => (
            <div key={i} style={{ position: 'absolute', top: c.t, left: c.l, right: c.r, bottom: c.b, width: 32 * s, height: 32 * s, borderTop: c.bT ? `3px solid ${GOLD}` : undefined, borderLeft: c.bL ? `3px solid ${GOLD}` : undefined, borderRight: c.bR ? `3px solid ${GOLD}` : undefined, borderBottom: c.bB ? `3px solid ${GOLD}` : undefined, borderRadius: c.br } as React.CSSProperties} />
          ))}
          {secondPhoto && !isVertical && (
            <>
              <div style={{ position: 'absolute', left: -50 * s, top: '50%', transform: 'translateY(-50%) rotate(-4deg)' }}>
                <PhotoInsetRect src={secondPhoto} width={100 * s} height={130 * s} rotation={-4} />
              </div>
              <div style={{ position: 'absolute', right: -50 * s, top: '50%', transform: 'translateY(-50%) rotate(4deg)' }}>
                <PhotoInsetRect src={secondPhoto} width={100 * s} height={130 * s} rotation={4} />
              </div>
            </>
          )}
          <img src={logo} alt="" style={{ height: 56 * s, marginBottom: 18 * s }} crossOrigin="anonymous" />
          <div style={{ fontSize: 13 * s, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 4 * s, marginBottom: 12 * s }}>{eyebrow}</div>
          <div style={{ fontSize: 52 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.08, letterSpacing: 2 * s, textShadow: `0 ${2 * s}px ${30 * s}px rgba(0,0,0,0.4)` }}>{headline}</div>
          <div style={{ fontSize: 20 * s, color: 'rgba(255,255,255,0.8)', marginTop: 8 * s, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5 * s }}>{programLine}</div>
          <div style={{ width: 100 * s, height: 3 * s, background: GOLD, marginTop: 16 * s, marginBottom: 12 * s, borderRadius: 2 }} />
          {detailLine && (
            <div style={{ fontSize: 17 * s, color: GOLD, fontWeight: 400, letterSpacing: 1.5 * s, marginBottom: 8 * s }}>{detailLine}</div>
          )}
          {showBadge ? <FreeBadge s={s} style={{ marginTop: 8 * s }} /> : <CTAButton text={ctaText} s={s} style={{ marginTop: 8 * s }} />}
        </div>
      </div>
    );
  }

  if (template === 'editorial') {
    return (
      <div ref={previewRef} style={{ width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: font, overflow: 'hidden' }}>
        <div style={{ height: 72 * s, background: `linear-gradient(135deg, ${TEAL} 0%, ${SOFT_TEAL} 100%)`, display: 'flex', alignItems: 'center', padding: `0 ${40 * s}px`, gap: 16 * s, flexShrink: 0 }}>
          <img src={logo} alt="" style={{ height: 40 * s }} crossOrigin="anonymous" />
          <span style={{ fontSize: 22 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 3 * s }}>DRAKE FITNESS</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 * s }}>
            {secondPhoto && (
              <div style={{ width: 44 * s, height: 44 * s, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${GOLD}`, flexShrink: 0 }}>
                <img src={secondPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
              </div>
            )}
            <span style={{ fontSize: 14 * s, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 1.5 * s, fontWeight: 500 }}>{programLine}</span>
            <span style={{ fontSize: 12 * s, color: GOLD, textTransform: 'uppercase', letterSpacing: 3 * s, fontWeight: 500 }}>{eyebrow}</span>
          </div>
        </div>
        <div style={{ height: 4 * s, background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD} 60%, transparent 100%)`, flexShrink: 0 }} />
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} crossOrigin="anonymous" />
          <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 ${60 * s}px ${10 * s}px rgba(0,0,0,0.25)` }} />
          {showBadge && (
            <div style={{ position: 'absolute', top: 20 * s, right: 32 * s }}>
              <FreeBadge s={s} />
            </div>
          )}
        </div>
        <div style={{ height: 84 * s, background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${40 * s}px`, flexShrink: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6 * s, background: GOLD, transform: 'skewX(-12deg)', transformOrigin: 'top left' }} />
          <div style={{ paddingLeft: 20 * s }}>
            <div style={{ fontSize: 28 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 1.5 * s }}>{headline}</div>
            {detailLine && (
              <div style={{ fontSize: 14 * s, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 * s, marginTop: 2 * s }}>{detailLine}</div>
            )}
          </div>
          <CTAButton text={ctaText} s={s} />
        </div>
      </div>
    );
  }

  if (template === 'collage') {
    const img2 = secondPhoto || photo;
    const img3 = thirdPhoto || secondPhoto || photo;
    const img4 = fourthPhoto || thirdPhoto || secondPhoto || photo;
    const img5 = fifthPhoto || fourthPhoto || thirdPhoto || secondPhoto || photo;
    const hasExtra = fourthPhoto || fifthPhoto;
    return (
      <div ref={previewRef} style={{ width: W, height: H, fontFamily: font, overflow: 'hidden', position: 'relative', background: DARK }}>
        {hasExtra ? (
          <>
            {/* 4-5 image grid */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: isVertical ? '40%' : '55%' }}>
              <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
            </div>
            <div style={{ position: 'absolute', top: 0, left: '50%', width: '50%', height: isVertical ? '20%' : '55%' }}>
              <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flex: 1 }}><img src={img2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" /></div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: isVertical ? '20%' : 0, left: '50%', width: '50%', height: isVertical ? '20%' : '55%', display: fifthPhoto ? 'block' : 'none' }}>
              {fifthPhoto && <img src={img5} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />}
            </div>
            <div style={{ position: 'absolute', top: isVertical ? '40%' : '55%', left: 0, width: '33.33%', height: isVertical ? '20%' : '45%' }}>
              <img src={img3} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
            </div>
            <div style={{ position: 'absolute', top: isVertical ? '40%' : '55%', left: '33.33%', width: '33.33%', height: isVertical ? '20%' : '45%' }}>
              <img src={img4} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
            </div>
            <div style={{ position: 'absolute', top: isVertical ? '40%' : '55%', left: '66.66%', width: '33.34%', height: isVertical ? '20%' : '45%' }}>
              <img src={fifthPhoto ? img5 : img2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
            </div>
            {/* Gold grid lines */}
            <div style={{ position: 'absolute', top: 0, left: '50%', width: 3, height: isVertical ? '40%' : '55%', background: GOLD, zIndex: 2 }} />
            <div style={{ position: 'absolute', top: isVertical ? '40%' : '55%', left: '33.33%', width: 3, height: isVertical ? '20%' : '45%', background: GOLD, zIndex: 2 }} />
            <div style={{ position: 'absolute', top: isVertical ? '40%' : '55%', left: '66.66%', width: 3, height: isVertical ? '20%' : '45%', background: GOLD, zIndex: 2 }} />
            <div style={{ position: 'absolute', top: isVertical ? '40%' : '55%', left: 0, right: 0, height: 3, background: GOLD, zIndex: 2 }} />
          </>
        ) : (
          <>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '60%', height: isVertical ? '60%' : '100%' }}>
              <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
              <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 ${60 * s}px ${10 * s}px rgba(0,0,0,0.3)` }} />
            </div>
            <div style={{ position: 'absolute', top: 0, left: '60%', width: 4, height: isVertical ? '60%' : '100%', background: GOLD, zIndex: 2 }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: isVertical ? '30%' : '50%' }}>
              <img src={img2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
            </div>
            <div style={{ position: 'absolute', top: isVertical ? '30%' : '50%', right: 0, width: '40%', height: 4, background: GOLD, zIndex: 2, transform: 'translateY(-2px)' }} />
            <div style={{ position: 'absolute', top: isVertical ? '30%' : '50%', right: 0, width: '40%', height: isVertical ? '30%' : '50%' }}>
              <img src={img3} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
            </div>
          </>
        )}
        {showBadge && (
          <div style={{ position: 'absolute', top: 20 * s, right: 20 * s, zIndex: 6 }}>
            <FreeBadge s={s} />
          </div>
        )}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: isVertical ? '40%' : 120 * s,
          background: isVertical ? DARK : 'linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.8) 60%, transparent 100%)',
          display: 'flex', alignItems: isVertical ? 'center' : 'flex-end', justifyContent: 'space-between',
          padding: isVertical ? `${20 * s}px ${40 * s}px` : `0 ${40 * s}px ${28 * s}px`, zIndex: 5,
          flexDirection: isVertical ? 'column' : 'row', gap: isVertical ? 12 * s : 0,
        }}>
          <div style={{ display: 'flex', alignItems: isVertical ? 'center' : 'center', gap: 20 * s, flexDirection: isVertical ? 'column' : 'row', textAlign: isVertical ? 'center' as const : undefined }}>
            <img src={logo} alt="" style={{ height: 44 * s }} crossOrigin="anonymous" />
            <div>
              <div style={{ fontSize: 12 * s, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3 * s, marginBottom: 4 * s }}>{eyebrow}</div>
              <div style={{ fontSize: 32 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: 1 * s }}>{headline}</div>
              {detailLine && (
                <div style={{ fontSize: 14 * s, color: 'rgba(255,255,255,0.55)', letterSpacing: 1 * s, marginTop: 2 * s }}>{detailLine}</div>
              )}
            </div>
          </div>
          <CTAButton text={ctaText} s={s} />
        </div>
      </div>
    );
  }

  // ── NEW TEMPLATES ──

  if (template === 'diagonal-strip') {
    return (
      <div ref={previewRef} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 100%)' }} />
        {/* Diagonal gold strip */}
        <div style={{
          position: 'absolute', top: '25%', left: '-10%', right: '-10%', height: 140 * s,
          background: `linear-gradient(135deg, ${GOLD} 0%, #E5A635 100%)`,
          transform: 'rotate(-12deg)', transformOrigin: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 ${8 * s}px ${40 * s}px rgba(0,0,0,0.5)`,
        }}>
          <div style={{ fontSize: 14 * s, fontWeight: 500, color: DARK, textTransform: 'uppercase', letterSpacing: 4 * s, marginBottom: 4 * s }}>{eyebrow}</div>
          <div style={{ fontSize: 48 * s, fontWeight: 800, color: DARK, textTransform: 'uppercase', lineHeight: 1, letterSpacing: 2 * s }}>{headline}</div>
          <div style={{ fontSize: 16 * s, fontWeight: 500, color: 'rgba(26,26,26,0.7)', marginTop: 4 * s, letterSpacing: 1 * s }}>{detailLine}</div>
        </div>
        {/* Bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80 * s, background: `linear-gradient(to top, ${DARK} 0%, transparent 100%)`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: `0 ${40 * s}px ${24 * s}px` }}>
          <img src={logo} alt="" style={{ height: 40 * s }} crossOrigin="anonymous" />
          <CTAButton text={ctaText} s={s * 0.9} />
        </div>
        {showBadge && <div style={{ position: 'absolute', bottom: 90 * s, right: 40 * s }}><FreeBadge s={s} /></div>}
      </div>
    );
  }

  if (template === 'fade-blend') {
    const img2 = secondPhoto || photo;
    return (
      <div ref={previewRef} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        {/* Background: second photo */}
        <img src={img2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} crossOrigin="anonymous" />
        {/* Foreground: first photo with gradient mask fade */}
        <div style={{
          position: 'absolute', inset: 0,
          WebkitMaskImage: isVertical
            ? 'linear-gradient(to bottom, black 20%, transparent 70%)'
            : 'linear-gradient(to right, black 25%, transparent 65%)',
          maskImage: isVertical
            ? 'linear-gradient(to bottom, black 20%, transparent 70%)'
            : 'linear-gradient(to right, black 25%, transparent 65%)',
        }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        </div>
        {/* Dark overlay for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, rgba(11,74,82,0.25) 0%, transparent 40%)` }} />
        {/* Content */}
        <div style={{ position: 'absolute', bottom: 40 * s, left: 48 * s, right: 48 * s }}>
          <img src={logo} alt="" style={{ height: 48 * s, marginBottom: 12 * s }} crossOrigin="anonymous" />
          <div style={{ width: 60 * s, height: 3 * s, background: GOLD, marginBottom: 12 * s, borderRadius: 2 }} />
          <div style={{ fontSize: 12 * s, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3 * s, marginBottom: 6 * s }}>{eyebrow}</div>
          <div style={{ fontSize: 48 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.08, letterSpacing: 1.5 * s, textShadow: `0 ${2 * s}px ${16 * s}px rgba(0,0,0,0.5)` }}>{headline}</div>
          <div style={{ fontSize: 20 * s, color: 'rgba(255,255,255,0.7)', marginTop: 6 * s, fontWeight: 400, letterSpacing: 1.5 * s, textTransform: 'uppercase' }}>{programLine}</div>
          {detailLine && <div style={{ fontSize: 16 * s, color: 'rgba(255,255,255,0.5)', marginTop: 4 * s }}>{detailLine}</div>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 * s, marginTop: 16 * s }}>
            <CTAButton text={ctaText} s={s} />
            {showBadge && <FreeBadge s={s * 0.8} />}
          </div>
        </div>
      </div>
    );
  }

  if (template === 'circle-cutout') {
    const img2 = secondPhoto || photo;
    const circleSize = Math.min(W, H) * 0.55;
    return (
      <div ref={previewRef} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font, background: TEAL, backgroundImage: TEAL_PATTERN }}>
        {/* Secondary photo as subtle background */}
        <img src={img2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, opacity: 0.15, filter: 'brightness(0.5)' }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${TEAL} 0%, ${SOFT_TEAL} 50%, ${TEAL} 100%)`, opacity: 0.85 }} />
        {/* Circle cutout with primary photo */}
        <div style={{
          position: 'absolute',
          top: isVertical ? '12%' : '50%',
          left: '50%',
          transform: isVertical ? 'translateX(-50%)' : 'translate(-50%, -55%)',
          width: circleSize, height: circleSize,
          borderRadius: '50%', overflow: 'hidden',
          border: `${6 * s}px solid ${GOLD}`,
          boxShadow: `0 ${12 * s}px ${60 * s}px rgba(0,0,0,0.5), 0 0 0 ${12 * s}px rgba(242,181,68,0.1)`,
        }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        </div>
        {/* Text below circle */}
        <div style={{
          position: 'absolute',
          bottom: isVertical ? '8%' : 36 * s,
          left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center' as const, width: '80%',
        }}>
          <div style={{ fontSize: 12 * s, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 4 * s, marginBottom: 8 * s }}>{eyebrow}</div>
          <div style={{ fontSize: 44 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.08, letterSpacing: 2 * s }}>{headline}</div>
          <div style={{ fontSize: 18 * s, color: 'rgba(255,255,255,0.7)', marginTop: 8 * s, letterSpacing: 1 * s }}>{programLine}</div>
          {detailLine && <div style={{ fontSize: 15 * s, color: 'rgba(255,255,255,0.5)', marginTop: 4 * s }}>{detailLine}</div>}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 * s, marginTop: 16 * s }}>
            <CTAButton text={ctaText} s={s} />
            {showBadge && <FreeBadge s={s * 0.8} />}
          </div>
        </div>
        {/* Logo top-left */}
        <img src={logo} alt="" style={{ position: 'absolute', top: 24 * s, left: 32 * s, height: 40 * s }} crossOrigin="anonymous" />
      </div>
    );
  }

  if (template === 'photo-strip') {
    const img2 = secondPhoto || photo;
    const img3 = thirdPhoto || secondPhoto || photo;
    const img4 = fourthPhoto || null;
    const img5 = fifthPhoto || null;
    const stripGap = 4 * s;
    const allStrips = [photo, img2, img3, ...(img4 ? [img4] : []), ...(img5 ? [img5] : [])];
    return (
      <div ref={previewRef} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font, background: DARK }}>
        {/* Dynamic vertical strips */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: isVertical ? '35%' : 110 * s, display: 'flex', gap: stripGap }}>
          {allStrips.map((img, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ width: stripGap, background: GOLD, flexShrink: 0 }} />}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
              </div>
            </React.Fragment>
          ))}
        </div>
        {/* Bottom content bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: isVertical ? '35%' : 110 * s,
          background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `0 ${40 * s}px`, flexDirection: isVertical ? 'column' : 'row',
          ...(isVertical ? { justifyContent: 'center', gap: 12 * s, textAlign: 'center' as const } : {}),
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 * s, flexDirection: isVertical ? 'column' : 'row' }}>
            <img src={logo} alt="" style={{ height: 40 * s }} crossOrigin="anonymous" />
            <div>
              <div style={{ fontSize: 11 * s, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3 * s, marginBottom: 4 * s }}>{eyebrow}</div>
              <div style={{ fontSize: 32 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: 1 * s }}>{headline}</div>
              {detailLine && <div style={{ fontSize: 14 * s, color: 'rgba(255,255,255,0.5)', marginTop: 2 * s }}>{detailLine}</div>}
            </div>
          </div>
          <CTAButton text={ctaText} s={s} />
        </div>
        {/* Gold top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4 * s, background: GOLD }} />
      </div>
    );
  }

  if (template === 'overlap-cards') {
    const img2 = secondPhoto || photo;
    const img3 = thirdPhoto || null;
    const img4 = fourthPhoto || null;
    const cards = [
      { img: photo, rotation: -6, left: 0, top: 0, z: 1 },
      { img: img2, rotation: 4, left: '35%', top: '10%', z: 2 },
      ...(img3 ? [{ img: img3, rotation: -3, left: '15%', top: '5%', z: 3 }] : []),
      ...(img4 ? [{ img: img4, rotation: 7, left: '50%', top: '8%', z: 4 }] : []),
    ];
    return (
      <div ref={previewRef} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font, background: TEAL, backgroundImage: TEAL_PATTERN }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${SOFT_TEAL} 0%, ${TEAL} 100%)`, opacity: 0.6 }} />
        <div style={{ position: 'absolute', top: isVertical ? '8%' : '10%', left: '50%', transform: 'translateX(-50%)', width: W * 0.7, height: isVertical ? H * 0.45 : H * 0.55 }}>
          {cards.map((c, i) => (
            <div key={i} style={{
              position: 'absolute', left: c.left, top: c.top,
              width: isVertical ? '60%' : '50%', height: '80%',
              borderRadius: 12 * s, overflow: 'hidden',
              border: `${4 * s}px solid rgba(255,255,255,0.9)`,
              boxShadow: `0 ${16 * s}px ${48 * s}px rgba(0,0,0,0.5)`,
              transform: `rotate(${c.rotation}deg)`,
              background: '#fff', zIndex: c.z,
            }}>
              <img src={c.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
            </div>
          ))}
        </div>
        <div style={{
          position: 'absolute', bottom: isVertical ? '6%' : 32 * s,
          left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center' as const, width: '80%', zIndex: 5,
        }}>
          <div style={{ fontSize: 12 * s, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 4 * s, marginBottom: 8 * s }}>{eyebrow}</div>
          <div style={{ fontSize: 42 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.08, letterSpacing: 1.5 * s, textShadow: `0 ${2 * s}px ${20 * s}px rgba(0,0,0,0.3)` }}>{headline}</div>
          <div style={{ fontSize: 18 * s, color: 'rgba(255,255,255,0.7)', marginTop: 6 * s }}>{programLine}</div>
          {detailLine && <div style={{ fontSize: 14 * s, color: 'rgba(255,255,255,0.5)', marginTop: 4 * s }}>{detailLine}</div>}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 * s, marginTop: 14 * s }}>
            <CTAButton text={ctaText} s={s} />
            {showBadge && <FreeBadge s={s * 0.8} />}
          </div>
        </div>
        <img src={logo} alt="" style={{ position: 'absolute', top: 20 * s, left: 28 * s, height: 36 * s, zIndex: 5 }} crossOrigin="anonymous" />
      </div>
    );
  }

  if (template === 'marquee-banner') {
    return (
      <div ref={previewRef} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 ${100 * s}px ${30 * s}px rgba(0,0,0,0.4)` }} />
        {/* Gold marquee banner across center */}
        <div style={{
          position: 'absolute',
          top: '50%', left: 0, right: 0,
          transform: 'translateY(-50%)',
          height: isVertical ? 180 * s : 130 * s,
          background: `linear-gradient(135deg, ${GOLD} 0%, #E5A635 50%, ${GOLD} 100%)`,
          boxShadow: `0 ${8 * s}px ${40 * s}px rgba(0,0,0,0.4), 0 -${4 * s}px ${20 * s}px rgba(0,0,0,0.2)`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          borderTop: `${3 * s}px solid rgba(255,255,255,0.3)`,
          borderBottom: `${3 * s}px solid rgba(255,255,255,0.3)`,
        }}>
          <div style={{ fontSize: 12 * s, fontWeight: 600, color: DARK, textTransform: 'uppercase', letterSpacing: 5 * s, opacity: 0.6, marginBottom: 4 * s }}>{eyebrow}</div>
          <div style={{ fontSize: 52 * s, fontWeight: 800, color: DARK, textTransform: 'uppercase', lineHeight: 1, letterSpacing: 3 * s }}>{headline}</div>
          <div style={{ fontSize: 16 * s, fontWeight: 500, color: 'rgba(26,26,26,0.65)', marginTop: 4 * s, letterSpacing: 1 * s }}>{detailLine}</div>
        </div>
        {/* Top logo */}
        <div style={{ position: 'absolute', top: 24 * s, left: 32 * s }}>
          <img src={logo} alt="" style={{ height: 44 * s }} crossOrigin="anonymous" />
        </div>
        {/* Bottom CTA */}
        <div style={{ position: 'absolute', bottom: 28 * s, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 12 * s }}>
          <CTAButton text={ctaText} s={s} />
          {showBadge && <FreeBadge s={s * 0.8} />}
        </div>
      </div>
    );
  }

  if (template === 'stacked-bars') {
    return (
      <div ref={previewRef} style={{ width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: font, overflow: 'hidden' }}>
        {/* Top teal bar */}
        <div style={{
          height: isVertical ? 100 * s : 80 * s,
          background: `linear-gradient(135deg, ${TEAL} 0%, ${SOFT_TEAL} 100%)`,
          display: 'flex', alignItems: 'center', padding: `0 ${36 * s}px`, gap: 16 * s, flexShrink: 0,
        }}>
          <img src={logo} alt="" style={{ height: 36 * s }} crossOrigin="anonymous" />
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ fontSize: 11 * s, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3 * s }}>{eyebrow}</div>
            <div style={{ fontSize: 16 * s, fontWeight: 500, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 * s }}>{programLine}</div>
          </div>
        </div>
        {/* Gold accent line */}
        <div style={{ height: 4 * s, background: GOLD, flexShrink: 0 }} />
        {/* Middle photo */}
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} crossOrigin="anonymous" />
          <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 ${50 * s}px ${10 * s}px rgba(0,0,0,0.2)` }} />
          {showBadge && <div style={{ position: 'absolute', top: 16 * s, right: 24 * s }}><FreeBadge s={s} /></div>}
        </div>
        {/* Gold accent line */}
        <div style={{ height: 4 * s, background: GOLD, flexShrink: 0 }} />
        {/* Bottom dark bar */}
        <div style={{
          height: isVertical ? 120 * s : 96 * s,
          background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `0 ${36 * s}px`, flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 34 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 1.5 * s }}>{headline}</div>
            {detailLine && <div style={{ fontSize: 14 * s, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 * s, marginTop: 2 * s }}>{detailLine}</div>}
          </div>
          <CTAButton text={ctaText} s={s} />
        </div>
      </div>
    );
  }

  if (template === 'frame-inset') {
    const borderW = 40 * s;
    return (
      <div ref={previewRef} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font, background: TEAL, backgroundImage: TEAL_PATTERN }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${TEAL} 0%, ${SOFT_TEAL} 100%)`, opacity: 0.9 }} />
        {/* Photo inset with gold inner border */}
        <div style={{
          position: 'absolute',
          top: borderW, left: borderW, right: borderW,
          bottom: isVertical ? '35%' : borderW + 90 * s,
          borderRadius: 8 * s,
          border: `${3 * s}px solid ${GOLD}`,
          overflow: 'hidden',
          boxShadow: `0 ${8 * s}px ${40 * s}px rgba(0,0,0,0.4), inset 0 0 ${40 * s}px ${10 * s}px rgba(0,0,0,0.2)`,
        }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        </div>
        {/* Logo top-left corner of frame */}
        <img src={logo} alt="" style={{ position: 'absolute', top: borderW - 14 * s, left: borderW + 12 * s, height: 28 * s, zIndex: 5 }} crossOrigin="anonymous" />
        {/* Text in bottom frame area */}
        <div style={{
          position: 'absolute',
          bottom: isVertical ? '4%' : 16 * s,
          left: borderW + 12 * s, right: borderW + 12 * s,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexDirection: isVertical ? 'column' : 'row',
          gap: isVertical ? 10 * s : 0,
          textAlign: isVertical ? 'center' as const : undefined,
        }}>
          <div>
            <div style={{ fontSize: 11 * s, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3 * s, marginBottom: 6 * s }}>{eyebrow}</div>
            <div style={{ fontSize: 36 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.08, letterSpacing: 1.5 * s }}>{headline}</div>
            {detailLine && <div style={{ fontSize: 14 * s, color: 'rgba(255,255,255,0.6)', marginTop: 4 * s }}>{detailLine}</div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 * s, flexShrink: 0 }}>
            <CTAButton text={ctaText} s={s * 0.9} />
            {showBadge && <FreeBadge s={s * 0.7} />}
          </div>
        </div>
        {/* Corner accents on the outer frame */}
        {[{ top: 8 * s, left: 8 * s }, { top: 8 * s, right: 8 * s }, { bottom: 8 * s, left: 8 * s }, { bottom: 8 * s, right: 8 * s }].map((pos, i) => (
          <div key={i} style={{ position: 'absolute', ...pos, width: 24 * s, height: 24 * s, borderTop: i < 2 ? `3px solid ${GOLD}` : undefined, borderBottom: i >= 2 ? `3px solid ${GOLD}` : undefined, borderLeft: i % 2 === 0 ? `3px solid ${GOLD}` : undefined, borderRight: i % 2 === 1 ? `3px solid ${GOLD}` : undefined } as React.CSSProperties} />
        ))}
      </div>
    );
  }

  // split-right (default)
  return (
    <div ref={previewRef} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font }}>
      <div style={{ position: 'absolute', inset: 0, clipPath: isVertical ? 'polygon(0 35%, 100% 45%, 100% 100%, 0 100%)' : 'polygon(32% 0, 100% 0, 100% 100%, 50% 100%)' }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 ${80 * s}px ${20 * s}px rgba(0,0,0,0.3)` }} />
      </div>
      <BrandPanel eyebrow={eyebrow} programLine={programLine} s={s} style={isVertical ? { top: 0, left: 0, width: '100%', height: '45%' } : { left: 0, top: 0, width: '50%', height: '100%' }} />
      <FrostedCard
        eyebrow={eyebrow} headline={headline} detailLine={detailLine} ctaText={ctaText} showBadge={showBadge} s={s}
        style={{ position: 'absolute', bottom: isVertical ? '42%' : 36 * s, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
      />
    </div>
  );
}

// Schedule Grid Template
const ScheduleGridTemplate = React.forwardRef<HTMLDivElement, {
  W: number; H: number; s: number; font: string;
  eyebrow: string; headline: string; ctaText: string; photo: string;
  scheduleClasses: ScheduleClass[];
}>(({ W, H, s, font, eyebrow, headline, ctaText, photo, scheduleClasses }, ref) => {
  const byDay: Record<string, ScheduleClass[]> = {};
  scheduleClasses.forEach(c => {
    const dayKey = c.class_date;
    if (!byDay[dayKey]) byDay[dayKey] = [];
    byDay[dayKey].push(c);
  });
  const days = Object.keys(byDay).sort().slice(0, 7);
  const isVertical = H > W;

  const formatTime = (t: string) => {
    const [h, m] = t.split(':');
    const hr = parseInt(h);
    const ampm = hr >= 12 ? 'PM' : 'AM';
    return `${hr > 12 ? hr - 12 : hr || 12}:${m} ${ampm}`;
  };

  const getDayLabel = (dateStr: string) => {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  };

  const getInstructorColor = (name: string | null) => {
    if (!name) return INSTRUCTOR_COLORS.default;
    for (const key of Object.keys(INSTRUCTOR_COLORS)) {
      if (name.toLowerCase().includes(key.toLowerCase())) return INSTRUCTOR_COLORS[key];
    }
    return INSTRUCTOR_COLORS.default;
  };

  return (
    <div ref={ref} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font }}>
      <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.12)' }} crossOrigin="anonymous" />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(11,74,82,0.92) 0%, rgba(26,26,26,0.97) 100%)` }} />
      {/* Safe-zone padding container */}
      <div style={{ position: 'absolute', inset: 0, padding: `${H * (H / W > 1.5 ? 0.14 : H > W ? 0.06 : 0.05)}px ${W * (H / W > 1.5 ? 0.06 : 0.05)}px`, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 * s, marginBottom: 8 * s, flexShrink: 0 }}>
          <img src={logo} alt="" style={{ height: 36 * s }} crossOrigin="anonymous" />
          <div>
            <div style={{ fontSize: 10 * s, color: GOLD, textTransform: 'uppercase', letterSpacing: 3 * s, fontWeight: 500 }}>{eyebrow}</div>
            <div style={{ fontSize: Math.min(isVertical ? 28 * s : 22 * s, H * 0.03), fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1 }}>{headline || "This Week's Schedule"}</div>
          </div>
        </div>
        <div style={{ width: '100%', height: 3 * s, background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: 6 * s, borderRadius: 2, flexShrink: 0 }} />
        {/* Schedule List — fills remaining space with dynamic row sizing */}
        {(() => {
          const isStoryCalc = H / W > 1.5;
          const isPortCalc = H > W && !isStoryCalc;
          const padTop = H * (isStoryCalc ? 0.14 : isPortCalc ? 0.06 : 0.05);
          const padBottom = H * (isStoryCalc ? 0.14 : isPortCalc ? 0.06 : 0.05);
          const headerH = 50 * s;
          const footerH = 50 * s;
          const totalClassRows = days.reduce((sum, d) => sum + byDay[d].length, 0);
          const totalRows = days.length + totalClassRows;
          const rowGap = Math.max(2 * s, 4 * s);
          const gapCount = Math.max(0, totalRows - 1);
          const totalGapSpace = gapCount * rowGap;
          const availH = H - padTop - padBottom - headerH - footerH - totalGapSpace;
          const rowH = totalRows > 0 ? availH / totalRows : 40 * s;
          const dayFontSize = Math.max(11 * s, rowH * 0.24);
          const classFontSize = Math.max(12 * s, rowH * 0.24);
          const timeFontSize = Math.max(10 * s, rowH * 0.18);
          const instructorFontSize = Math.max(9 * s, rowH * 0.16);
          const rowPadY = Math.max(4 * s, rowH * 0.12);
          const rowPadX = 12 * s;

          return (
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: rowGap }}>
              {days.map((day, dayIdx) => {
                const dateObj = new Date(day + 'T12:00:00');
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
                const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
                return (
                  <React.Fragment key={day}>
                    <div style={{ 
                      height: rowH, flexShrink: 1, display: 'flex', alignItems: 'center',
                      fontSize: dayFontSize, fontWeight: 800, color: GOLD, textTransform: 'uppercase', 
                      letterSpacing: 2 * s,
                      borderBottom: `1px solid rgba(242,181,68,0.3)`,
                      textShadow: `0 1px ${3 * s}px rgba(0,0,0,0.6)`,
                    }}>
                      {dayName} · {monthDay}
                    </div>
                    {byDay[day].map((cls, i) => {
                      const ic = getInstructorColor(cls.instructor);
                      return (
                        <div key={i} style={{
                          height: rowH, flexShrink: 1, display: 'flex', alignItems: 'center', gap: 12 * s,
                          background: 'rgba(255,255,255,0.10)',
                          borderRadius: 6 * s,
                          padding: `${rowPadY}px ${rowPadX}px`,
                          borderLeft: `${4 * s}px solid ${ic.border}`,
                        }}>
                          <div style={{ fontSize: timeFontSize, fontWeight: 600, color: 'rgba(255,255,255,0.7)', minWidth: 70 * s, textShadow: `0 1px ${3 * s}px rgba(0,0,0,0.5)` }}>
                            {formatTime(cls.start_time)}
                          </div>
                          <div style={{ flex: 1, fontSize: classFontSize, fontWeight: 700, color: '#fff', textShadow: `0 1px ${4 * s}px rgba(0,0,0,0.5)` }}>
                            {cls.class_name}
                          </div>
                          {cls.instructor && (
                            <div style={{ fontSize: instructorFontSize, fontWeight: 600, color: ic.border, textTransform: 'uppercase', letterSpacing: 0.5 * s }}>
                              {cls.instructor}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })()}
        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 8 * s, flexShrink: 0 }}>
          <div style={{ fontSize: 10 * s, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 * s }}>drake.fitness</div>
          <CTAButton text={ctaText || 'Book Now →'} s={s * 0.8} />
        </div>
      </div>
    </div>
  );
});

// Class Highlight Template
const ClassHighlightTemplate = React.forwardRef<HTMLDivElement, {
  W: number; H: number; s: number; font: string;
  eyebrow: string; headline: string; programLine: string; detailLine: string; ctaText: string; photo: string;
  scheduleClasses: ScheduleClass[];
}>(({ W, H, s, font, eyebrow, headline, programLine, detailLine, ctaText, photo, scheduleClasses }, ref) => {
  const cls = scheduleClasses[0];
  const displayName = cls?.class_name || headline || 'KB Strong';
  const displayInstructor = cls?.instructor || programLine || 'Coach David';
  const displayTime = cls ? (() => {
    const [h, m] = cls.start_time.split(':');
    const hr = parseInt(h);
    return `${hr > 12 ? hr - 12 : hr || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
  })() : detailLine;
  const displayDay = cls ? new Date(cls.class_date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' }) : '';
  const ic = INSTRUCTOR_COLORS[displayInstructor?.split(' ').pop() || ''] || INSTRUCTOR_COLORS.default;

  return (
    <div ref={ref} style={{ width: W, height: H, position: 'relative', overflow: 'hidden', fontFamily: font }}>
      <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.15)' }} crossOrigin="anonymous" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(11,74,82,0.3) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, padding: `${40 * s}px` }}>
        <img src={logo} alt="" style={{ height: 44 * s, marginBottom: 16 * s }} crossOrigin="anonymous" />
        <div style={{ fontSize: 13 * s, color: GOLD, textTransform: 'uppercase', letterSpacing: 4 * s, fontWeight: 500, marginBottom: 16 * s }}>{eyebrow}</div>
        {/* Class name — dominant element */}
        <div style={{ fontSize: 72 * s, fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: 3 * s, textShadow: `0 ${4 * s}px ${40 * s}px rgba(0,0,0,0.8), 0 ${2 * s}px ${8 * s}px rgba(0,0,0,0.5)`, maxWidth: '95%' }}>{displayName}</div>
        <div style={{ width: 140 * s, height: 4 * s, background: GOLD, margin: `${24 * s}px 0`, borderRadius: 2 }} />
        {/* Time/Day card */}
        <div style={{
          background: 'rgba(26,26,26,0.85)',
          border: `3px solid ${GOLD}`,
          borderRadius: 12 * s,
          padding: `${16 * s}px ${40 * s}px`,
          marginBottom: 20 * s,
          backdropFilter: 'blur(8px)',
        }}>
          {displayDay && <div style={{ fontSize: 20 * s, color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginBottom: 4 * s, textTransform: 'uppercase', letterSpacing: 2 * s }}>{displayDay}</div>}
          <div style={{ fontSize: 36 * s, color: GOLD, fontWeight: 800, letterSpacing: 1 * s }}>{displayTime}</div>
        </div>
        {/* Instructor badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 * s, marginBottom: 20 * s }}>
          <div style={{ background: ic.bg, color: ic.text, padding: `${8 * s}px ${24 * s}px`, borderRadius: 24 * s, fontSize: 18 * s, fontWeight: 700, border: `3px solid ${ic.border}`, letterSpacing: 0.5 * s }}>
            {displayInstructor}
          </div>
        </div>
        <CTAButton text={ctaText || 'Book Now →'} s={s * 1.1} />
      </div>
    </div>
  );
});
