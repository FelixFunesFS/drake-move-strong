import React from 'react';
import { TemplateId, CanvasSize, TEAL, GOLD, DARK, SOFT_TEAL, TEAL_PATTERN, logo, ScheduleClass, INSTRUCTOR_COLORS } from './types';
import { FreeBadge, CTAButton, PhotoInsetRect, FrostedCard, BrandPanel } from './TemplateElements';

interface TemplatePreviewProps {
  template: TemplateId;
  photo: string;
  secondPhoto?: string;
  thirdPhoto?: string;
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

export default function TemplatePreview({ template, photo, secondPhoto, thirdPhoto, eyebrow, headline, programLine, detailLine, ctaText, showBadge, previewRef, canvasSize, scheduleClasses }: TemplatePreviewProps) {
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
          {/* Gold corner accents */}
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
    return (
      <div ref={previewRef} style={{ width: W, height: H, fontFamily: font, overflow: 'hidden', position: 'relative', background: DARK }}>
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

  // split-right
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
  // Group classes by day
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
      <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.2)' }} crossOrigin="anonymous" />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(11,74,82,0.9) 0%, rgba(26,26,26,0.95) 100%)` }} />
      <div style={{ position: 'absolute', inset: 0, padding: `${30 * s}px ${40 * s}px`, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 * s, marginBottom: 20 * s }}>
          <img src={logo} alt="" style={{ height: 40 * s }} crossOrigin="anonymous" />
          <div>
            <div style={{ fontSize: 12 * s, color: GOLD, textTransform: 'uppercase', letterSpacing: 3 * s, fontWeight: 500 }}>{eyebrow}</div>
            <div style={{ fontSize: isVertical ? 36 * s : 28 * s, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1 }}>{headline || "This Week's Schedule"}</div>
          </div>
        </div>
        <div style={{ width: '100%', height: 3 * s, background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: 16 * s, borderRadius: 2 }} />

        {/* Schedule Grid */}
        <div style={{ flex: 1, display: isVertical ? 'flex' : 'grid', flexDirection: isVertical ? 'column' : undefined, gridTemplateColumns: isVertical ? undefined : `repeat(${Math.min(days.length, 7)}, 1fr)`, gap: isVertical ? 8 * s : 6 * s, overflow: 'hidden' }}>
          {days.map(day => (
            <div key={day} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8 * s, padding: `${10 * s}px ${8 * s}px`, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 13 * s, fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: 2 * s, marginBottom: 8 * s, textAlign: 'center' as const }}>{getDayLabel(day)}</div>
              {byDay[day].map((cls, i) => {
                const ic = getInstructorColor(cls.instructor);
                return (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4 * s, padding: `${6 * s}px ${8 * s}px`, marginBottom: 4 * s, borderLeft: `3px solid ${ic.border}` }}>
                    <div style={{ fontSize: 11 * s, fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{cls.class_name}</div>
                    <div style={{ fontSize: 9 * s, color: 'rgba(255,255,255,0.5)', marginTop: 2 * s }}>{formatTime(cls.start_time)}</div>
                    {cls.instructor && (
                      <div style={{ fontSize: 8 * s, color: ic.border, marginTop: 2 * s, fontWeight: 500 }}>{cls.instructor}</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 * s }}>
          <div style={{ fontSize: 12 * s, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 * s }}>drake.fitness</div>
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
      <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(11,74,82,0.2) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, padding: `${40 * s}px` }}>
        <img src={logo} alt="" style={{ height: 48 * s, marginBottom: 20 * s }} crossOrigin="anonymous" />
        <div style={{ fontSize: 13 * s, color: GOLD, textTransform: 'uppercase', letterSpacing: 4 * s, fontWeight: 500, marginBottom: 12 * s }}>{eyebrow}</div>
        <div style={{ fontSize: 64 * s, fontWeight: 800, color: '#fff', textTransform: 'uppercase', lineHeight: 1, letterSpacing: 2 * s, textShadow: `0 ${4 * s}px ${30 * s}px rgba(0,0,0,0.6)` }}>{displayName}</div>
        <div style={{ width: 120 * s, height: 4 * s, background: GOLD, margin: `${20 * s}px 0`, borderRadius: 2 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 * s, marginBottom: 12 * s }}>
          <div style={{ background: ic.bg, color: ic.text, padding: `${6 * s}px ${16 * s}px`, borderRadius: 20 * s, fontSize: 16 * s, fontWeight: 600, border: `2px solid ${ic.border}` }}>
            {displayInstructor}
          </div>
        </div>
        <div style={{ fontSize: 24 * s, color: 'rgba(255,255,255,0.8)', fontWeight: 500, marginBottom: 6 * s }}>{displayDay}</div>
        <div style={{ fontSize: 32 * s, color: GOLD, fontWeight: 700, marginBottom: 24 * s }}>{displayTime}</div>
        <CTAButton text={ctaText || 'Book Now →'} s={s} />
      </div>
    </div>
  );
});
