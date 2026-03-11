import { useState, useRef, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Search, Type, Sparkles, X, Image as ImageIcon } from 'lucide-react';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

// Photo library
import communityGroupPhoto from '@/assets/community-group-photo-large.jpg';
import communityPlankRows from '@/assets/community-plank-rows-kettlebells-new.jpg';
import groupOverheadPress from '@/assets/group-overhead-press-class.jpg';
import groupTurkishGetup from '@/assets/group-turkish-getup-class.jpg';
import studioGroupGoblet from '@/assets/studio-group-goblet-squats.jpg';
import studioGroupOverhead from '@/assets/studio-group-overhead.jpg';
import studioLargeGroup from '@/assets/studio-large-group.jpg';
import membersOverheadLunge from '@/assets/members-overhead-lunge-natural-light.jpg';
import membersKettlebellSwing from '@/assets/members-kettlebell-swing-pair.jpg';
import membersTurkishGetupPair from '@/assets/members-turkish-getup-pair.jpg';
import heroGroupTurkishGetup from '@/assets/hero-group-turkish-getup.jpg';
import heroKettlebellTraining from '@/assets/hero-kettlebell-training.jpg';
import communityTurkishGetup from '@/assets/community-turkish-getup-class.jpg';
import ctaGroupTurkishGetup from '@/assets/cta-group-turkish-getup.jpg';
import groupPlankRowsKettlebells from '@/assets/group-plank-rows-kettlebells.jpg';
import studioKettlebellClass from '@/assets/studio-kettlebell-class.jpg';
import membersOverheadPressGroup from '@/assets/members-overhead-press-group.jpg';
import membersPlankRowsStudio from '@/assets/members-plank-rows-studio.jpg';
import outdoorTraining from '@/assets/outdoor-training.jpg';
import davidDoubleKb from '@/assets/david-double-kb-storefront-new.jpg';
import logo from '@/assets/drake-fitness-logo-social.png';

const PHOTOS = [
  { src: communityGroupPhoto, label: 'Community Group' },
  { src: communityPlankRows, label: 'Plank Rows' },
  { src: groupOverheadPress, label: 'Overhead Press Class' },
  { src: groupTurkishGetup, label: 'Turkish Getup Class' },
  { src: studioGroupGoblet, label: 'Goblet Squats' },
  { src: studioGroupOverhead, label: 'Studio Overhead' },
  { src: studioLargeGroup, label: 'Large Group' },
  { src: membersOverheadLunge, label: 'Overhead Lunge' },
  { src: membersKettlebellSwing, label: 'KB Swing Pair' },
  { src: membersTurkishGetupPair, label: 'TGU Pair' },
  { src: heroGroupTurkishGetup, label: 'Hero TGU' },
  { src: heroKettlebellTraining, label: 'Hero KB Training' },
  { src: communityTurkishGetup, label: 'Community TGU' },
  { src: ctaGroupTurkishGetup, label: 'CTA Group TGU' },
  { src: groupPlankRowsKettlebells, label: 'Group Plank Rows' },
  { src: studioKettlebellClass, label: 'Studio KB Class' },
  { src: membersOverheadPressGroup, label: 'Overhead Press Group' },
  { src: membersPlankRowsStudio, label: 'Plank Rows Studio' },
  { src: outdoorTraining, label: 'Outdoor Training' },
  { src: davidDoubleKb, label: 'David Storefront' },
];

type TemplateId = 'full-bleed' | 'split-left' | 'centered' | 'editorial' | 'split-right' | 'collage';

const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: 'full-bleed', label: 'Full Bleed' },
  { id: 'split-left', label: 'Split Left' },
  { id: 'centered', label: 'Centered Card' },
  { id: 'editorial', label: 'Editorial Strip' },
  { id: 'split-right', label: 'Split Right' },
  { id: 'collage', label: 'Collage' },
];

interface ContentPreset {
  label: string;
  eyebrow: string;
  headline: string;
  programLine: string;
  detailLine: string;
  ctaText: string;
  showBadge: boolean;
}

const CONTENT_PRESETS: ContentPreset[] = [
  {
    label: 'Intro Offer',
    eyebrow: 'WEST ASHLEY · CHARLESTON',
    headline: 'Try 3 Classes Free',
    programLine: 'Strength & Mobility Classes',
    detailLine: 'All Levels Welcome',
    ctaText: 'Book Your Free Class →',
    showBadge: true,
  },
  {
    label: 'Schedule Promo',
    eyebrow: 'WEST ASHLEY · CHARLESTON',
    headline: 'Strength & Mobility',
    programLine: 'KB Strong Classes',
    detailLine: 'Mon · Wed · Fri | 8am & 11am',
    ctaText: 'View Schedule',
    showBadge: false,
  },
  {
    label: 'New Member',
    eyebrow: 'WEST ASHLEY · CHARLESTON',
    headline: 'New Member Special',
    programLine: 'Unlimited Classes — $110/mo',
    detailLine: 'First Month · No Contract',
    ctaText: 'Get Started →',
    showBadge: true,
  },
  {
    label: 'Community',
    eyebrow: 'WEST ASHLEY · CHARLESTON',
    headline: 'Join the Community',
    programLine: 'Small Group Training',
    detailLine: 'West Ashley, Charleston',
    ctaText: 'Try A Class Free',
    showBadge: false,
  },
];

const TEAL = '#0B4A52';
const GOLD = '#F2B544';
const DARK = '#1A1A1A';
const SOFT_TEAL = '#10757E';

const TEAL_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L30 0 L60 30 L30 60Z' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E")`;

// Gold badge component for "3 FREE CLASSES"
function FreeBadge({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${GOLD} 0%, #E5A635 100%)`,
      color: DARK,
      padding: '10px 22px',
      fontFamily: "'Oswald', sans-serif",
      fontWeight: 800,
      fontSize: 18,
      textTransform: 'uppercase',
      letterSpacing: 2,
      borderRadius: 6,
      boxShadow: '0 4px 20px rgba(242,181,68,0.4)',
      display: 'inline-block',
      lineHeight: 1.2,
      textAlign: 'center' as const,
      ...style,
    }}>
      <span style={{ fontSize: 28, display: 'block', lineHeight: 1 }}>3 FREE</span>
      <span style={{ fontSize: 14, letterSpacing: 3 }}>CLASSES</span>
    </div>
  );
}

// CTA button element
function CTAButton({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: GOLD,
      color: DARK,
      padding: '14px 36px',
      fontFamily: "'Oswald', sans-serif",
      fontSize: 18,
      fontWeight: 700,
      textTransform: 'uppercase',
      borderRadius: 6,
      letterSpacing: 1.5,
      display: 'inline-block',
      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      ...style,
    }}>
      {text}
    </div>
  );
}

// Circular photo inset used on split templates
function PhotoInset({ src, size, style }: { src: string; size: number; style?: React.CSSProperties }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      border: `3px solid ${GOLD}`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
      flexShrink: 0,
      ...style,
    }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
    </div>
  );
}

// Rounded-rect photo inset used on full-bleed
function PhotoInsetRect({ src, width, height, rotation, style }: { src: string; width: number; height: number; rotation?: number; style?: React.CSSProperties }) {
  return (
    <div style={{
      width,
      height,
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

// Frosted overlapping info card for split layouts
function FrostedCard({ eyebrow, headline, detailLine, ctaText, showBadge, style }: {
  eyebrow?: string;
  headline: string;
  detailLine: string;
  ctaText: string;
  showBadge: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{
      background: 'rgba(11, 74, 82, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: `1px solid rgba(242, 181, 68, 0.25)`,
      borderRadius: 12,
      padding: '28px 32px',
      boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)',
      fontFamily: "'Oswald', sans-serif",
      maxWidth: 360,
      ...style,
    }}>
      {eyebrow && (
        <div style={{ fontSize: 11, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>{eyebrow}</div>
      )}
      <div style={{ fontSize: 32, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: 1, marginBottom: 8 }}>
        {headline}
      </div>
      {detailLine && (
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', letterSpacing: 1, marginBottom: 14 }}>{detailLine}</div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' as const }}>
        <CTAButton text={ctaText} style={{ fontSize: 14, padding: '10px 24px' }} />
        {showBadge && <FreeBadge style={{ transform: 'scale(0.7)', transformOrigin: 'left center' }} />}
      </div>
    </div>
  );
}

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
}

function TemplatePreview({ template, photo, secondPhoto, thirdPhoto, eyebrow, headline, programLine, detailLine, ctaText, showBadge, previewRef }: TemplatePreviewProps) {
  const font = "'Oswald', sans-serif";

  if (template === 'full-bleed') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 120px 40px rgba(0,0,0,0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 40%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,74,82,0.3) 0%, transparent 50%)' }} />
        {/* Secondary photo inset — top-left corner */}
        {secondPhoto && (
          <div style={{ position: 'absolute', top: 28, left: 40 }}>
            <PhotoInsetRect src={secondPhoto} width={180} height={120} rotation={-3} />
          </div>
        )}
        {showBadge && (
          <div style={{ position: 'absolute', top: 32, right: 40 }}>
            <FreeBadge />
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 40, left: 48, right: 48 }}>
          <img src={logo} alt="" style={{ height: 56, marginBottom: 16 }} crossOrigin="anonymous" />
          <div style={{ width: 80, height: 3, background: GOLD, marginBottom: 14, borderRadius: 2 }} />
          <div style={{ fontSize: 13, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>{eyebrow}</div>
          <div style={{ fontSize: 54, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.08, letterSpacing: 1.5, textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>{headline}</div>
          <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)', marginTop: 8, fontWeight: 400, letterSpacing: 1.5, textTransform: 'uppercase' }}>{programLine}</div>
          {detailLine && (
            <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', marginTop: 6, fontWeight: 400, letterSpacing: 1 }}>{detailLine}</div>
          )}
          <CTAButton text={ctaText} style={{ marginTop: 18 }} />
        </div>
      </div>
    );
  }

  if (template === 'split-left') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        <div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(0 0, 65% 0, 55% 100%, 0 100%)' }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.3)' }} />
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', background: TEAL, backgroundImage: TEAL_PATTERN, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 44px 48px 64px' }}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${SOFT_TEAL} 0%, ${TEAL} 100%)`, opacity: 0.5 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <img src={logo} alt="" style={{ height: 50, marginBottom: 20 }} crossOrigin="anonymous" />
            <div style={{ fontSize: 12, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 }}>{eyebrow}</div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.12, letterSpacing: 1 }}>{headline}</div>
            <div style={{ width: 64, height: 3, background: GOLD, marginTop: 16, marginBottom: 12, borderRadius: 2 }} />
            <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.9)', fontWeight: 500, lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: 1 }}>{programLine}</div>
            {detailLine && (
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginTop: 6, fontWeight: 400, letterSpacing: 0.5 }}>{detailLine}</div>
            )}
            {/* Circular secondary photo inset on teal panel */}
            {secondPhoto && (
              <PhotoInset src={secondPhoto} size={80} style={{ marginTop: 14 }} />
            )}
            <CTAButton text={ctaText} style={{ marginTop: 20 }} />
            {showBadge && <FreeBadge style={{ marginTop: 16 }} />}
          </div>
        </div>
        {/* Frosted overlapping card on the seam */}
        <FrostedCard
          headline={headline}
          detailLine={programLine}
          ctaText={ctaText}
          showBadge={false}
          style={{ position: 'absolute', bottom: 36, left: '42%', transform: 'translateX(-50%)', zIndex: 10 }}
        />
      </div>
    );
  }

  if (template === 'centered') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        {/* Stacked rotated photo frames behind */}
        <div style={{ position: 'absolute', inset: -20, transform: 'rotate(-3deg)', transformOrigin: 'center' }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }} crossOrigin="anonymous" />
        </div>
        <div style={{ position: 'absolute', inset: -20, transform: 'rotate(3deg)', transformOrigin: 'center' }}>
          <img src={secondPhoto || photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25)' }} crossOrigin="anonymous" />
        </div>
        {/* Main image */}
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(11,74,82,0.78) 0%, rgba(11,74,82,0.92) 70%, rgba(0,0,0,0.95) 100%)` }} />
        <div style={{ position: 'absolute', top: 50, left: 90, right: 90, bottom: 50, border: '1px solid rgba(242,181,68,0.2)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, padding: '0 60px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(2px)' }}>
          {/* Gold corner accents */}
          <div style={{ position: 'absolute', top: -1, left: -1, width: 32, height: 32, borderTop: `3px solid ${GOLD}`, borderLeft: `3px solid ${GOLD}`, borderRadius: '8px 0 0 0' }} />
          <div style={{ position: 'absolute', top: -1, right: -1, width: 32, height: 32, borderTop: `3px solid ${GOLD}`, borderRight: `3px solid ${GOLD}`, borderRadius: '0 8px 0 0' }} />
          <div style={{ position: 'absolute', bottom: -1, left: -1, width: 32, height: 32, borderBottom: `3px solid ${GOLD}`, borderLeft: `3px solid ${GOLD}`, borderRadius: '0 0 0 8px' }} />
          <div style={{ position: 'absolute', bottom: -1, right: -1, width: 32, height: 32, borderBottom: `3px solid ${GOLD}`, borderRight: `3px solid ${GOLD}`, borderRadius: '0 0 8px 0' }} />

          {/* Flanking photos when secondPhoto exists */}
          {secondPhoto && (
            <>
              <div style={{ position: 'absolute', left: -50, top: '50%', transform: 'translateY(-50%) rotate(-4deg)' }}>
                <PhotoInsetRect src={secondPhoto} width={100} height={130} rotation={-4} />
              </div>
              <div style={{ position: 'absolute', right: -50, top: '50%', transform: 'translateY(-50%) rotate(4deg)' }}>
                <PhotoInsetRect src={secondPhoto} width={100} height={130} rotation={4} />
              </div>
            </>
          )}

          <img src={logo} alt="" style={{ height: 56, marginBottom: 18 }} crossOrigin="anonymous" />
          <div style={{ fontSize: 13, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 4, marginBottom: 12 }}>{eyebrow}</div>
          <div style={{ fontSize: 52, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.08, letterSpacing: 2, textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}>{headline}</div>
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.8)', marginTop: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5 }}>{programLine}</div>
          <div style={{ width: 100, height: 3, background: GOLD, marginTop: 16, marginBottom: 12, borderRadius: 2 }} />
          {detailLine && (
            <div style={{ fontSize: 17, color: GOLD, fontWeight: 400, letterSpacing: 1.5, marginBottom: 8 }}>{detailLine}</div>
          )}
          {showBadge ? (
            <FreeBadge style={{ marginTop: 8 }} />
          ) : (
            <CTAButton text={ctaText} style={{ marginTop: 8 }} />
          )}
        </div>
      </div>
    );
  }

  if (template === 'editorial') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, display: 'flex', flexDirection: 'column', fontFamily: font, overflow: 'hidden' }}>
        {/* Header bar */}
        <div style={{ height: 72, background: `linear-gradient(135deg, ${TEAL} 0%, ${SOFT_TEAL} 100%)`, display: 'flex', alignItems: 'center', padding: '0 40px', gap: 16, flexShrink: 0 }}>
          <img src={logo} alt="" style={{ height: 40 }} crossOrigin="anonymous" />
          <span style={{ fontSize: 22, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 3 }}>DRAKE FITNESS</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Small secondary photo strip in header */}
            {secondPhoto && (
              <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${GOLD}`, flexShrink: 0 }}>
                <img src={secondPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
              </div>
            )}
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 500 }}>{programLine}</span>
            <span style={{ fontSize: 12, color: GOLD, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 500 }}>{eyebrow}</span>
          </div>
        </div>
        {/* Gold accent stripe */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD} 60%, transparent 100%)`, flexShrink: 0 }} />
        {/* Photo */}
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} crossOrigin="anonymous" />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 60px 10px rgba(0,0,0,0.25)' }} />
          {showBadge && (
            <div style={{ position: 'absolute', top: 20, right: 32 }}>
              <FreeBadge />
            </div>
          )}
        </div>
        {/* Footer bar */}
        <div style={{ height: 84, background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', flexShrink: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: GOLD, transform: 'skewX(-12deg)', transformOrigin: 'top left' }} />
          <div style={{ paddingLeft: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 1.5 }}>{headline}</div>
            {detailLine && (
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginTop: 2 }}>{detailLine}</div>
            )}
          </div>
          <CTAButton text={ctaText} />
        </div>
      </div>
    );
  }

  if (template === 'collage') {
    const img2 = secondPhoto || photo;
    const img3 = thirdPhoto || secondPhoto || photo;
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, fontFamily: font, overflow: 'hidden', position: 'relative', background: DARK }}>
        {/* Photo mosaic grid */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '60%', height: '100%' }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 60px 10px rgba(0,0,0,0.3)' }} />
        </div>
        {/* Gold divider */}
        <div style={{ position: 'absolute', top: 0, left: '60%', width: 4, height: '100%', background: GOLD, zIndex: 2 }} />
        {/* Right column — two stacked photos */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '50%' }}>
          <img src={img2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px 5px rgba(0,0,0,0.2)' }} />
        </div>
        {/* Horizontal gold divider */}
        <div style={{ position: 'absolute', top: '50%', right: 0, width: '40%', height: 4, background: GOLD, zIndex: 2, transform: 'translateY(-2px)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40%', height: '50%' }}>
          <img src={img3} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px 5px rgba(0,0,0,0.2)' }} />
        </div>
        {/* Dark overlay strip at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.8) 60%, transparent 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 40px 28px',
          zIndex: 5,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img src={logo} alt="" style={{ height: 44 }} crossOrigin="anonymous" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 4 }}>{eyebrow}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: 1 }}>{headline}</div>
              {detailLine && (
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', letterSpacing: 1, marginTop: 2 }}>{detailLine}</div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {showBadge && <FreeBadge style={{ transform: 'scale(0.8)' }} />}
            <CTAButton text={ctaText} />
          </div>
        </div>
      </div>
    );
  }

  // split-right
  return (
    <div ref={previewRef} style={{ width: 1200, height: 630, position: 'relative', overflow: 'hidden', fontFamily: font }}>
      <div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 50% 100%)' }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.3)' }} />
      </div>
      <div style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', background: TEAL, backgroundImage: TEAL_PATTERN, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 44px' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${SOFT_TEAL} 0%, ${TEAL} 100%)`, opacity: 0.5 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src={logo} alt="" style={{ height: 50, marginBottom: 20 }} crossOrigin="anonymous" />
          <div style={{ fontSize: 12, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 }}>{eyebrow}</div>
          <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 42, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.12, letterSpacing: 1 }}>{headline}</div>
          </div>
          <div style={{ width: 64, height: 3, background: GOLD, marginTop: 16, marginBottom: 12, borderRadius: 2 }} />
          <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.9)', fontWeight: 500, lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: 1 }}>{programLine}</div>
          {detailLine && (
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginTop: 6, fontWeight: 400, letterSpacing: 0.5 }}>{detailLine}</div>
          )}
          {/* Circular secondary photo inset */}
          {secondPhoto && (
            <PhotoInset src={secondPhoto} size={80} style={{ marginTop: 14 }} />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20 }}>
            <CTAButton text={ctaText} />
            {showBadge && <FreeBadge style={{ transform: 'scale(0.85)' }} />}
          </div>
        </div>
      </div>
      {/* Frosted overlapping card on the seam */}
      <FrostedCard
        headline={headline}
        detailLine={programLine}
        ctaText={ctaText}
        showBadge={false}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
      />
    </div>
  );
}

// Tiny layout thumbnails for template picker
function TemplateThumbnail({ id, active }: { id: TemplateId; active: boolean }) {
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
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 10, background: 'rgba(26,26,26,0.8)' }}>
          <div style={{ position: 'absolute', bottom: 2, left: 4, width: 20, height: 2, background: '#fff', borderRadius: 1 }} />
        </div>
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

export default function SocialGraphics() {
  const [template, setTemplate] = useState<TemplateId>('full-bleed');
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [secondPhotoIdx, setSecondPhotoIdx] = useState<number | null>(null);
  const [thirdPhotoIdx, setThirdPhotoIdx] = useState<number | null>(null);
  const [eyebrow, setEyebrow] = useState('WEST ASHLEY · CHARLESTON');
  const [headline, setHeadline] = useState('Try 3 Classes Free');
  const [programLine, setProgramLine] = useState('Strength & Mobility Classes');
  const [detailLine, setDetailLine] = useState('All Levels Welcome');
  const [ctaText, setCtaText] = useState('Book Your Free Class →');
  const [showBadge, setShowBadge] = useState(true);
  const [photoSearch, setPhotoSearch] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [pickingFor, setPickingFor] = useState<'primary' | 'secondary' | 'tertiary'>('primary');
  const previewRef = useRef<HTMLDivElement>(null);

  const filteredPhotos = PHOTOS.filter(p =>
    p.label.toLowerCase().includes(photoSearch.toLowerCase())
  );

  const applyPreset = (preset: ContentPreset) => {
    setEyebrow(preset.eyebrow);
    setHeadline(preset.headline);
    setProgramLine(preset.programLine);
    setDetailLine(preset.detailLine);
    setCtaText(preset.ctaText);
    setShowBadge(preset.showBadge);
  };

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        width: 1200,
        height: 630,
        pixelRatio: 1,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `drake-fitness-${template}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Image downloaded!');
    } catch (err) {
      console.error('Export failed:', err);
      toast.error('Export failed. Try again.');
    } finally {
      setIsExporting(false);
    }
  }, [template]);

  const handlePhotoSelect = (realIdx: number) => {
    if (pickingFor === 'secondary') {
      setSecondPhotoIdx(realIdx);
    } else if (pickingFor === 'tertiary') {
      setThirdPhotoIdx(realIdx);
    } else {
      setSelectedPhoto(realIdx);
    }
  };

  const PREVIEW_SCALE = 0.5;
  const CANVAS_W = 1200;
  const CANVAS_H = 630;

  const secondPhoto = secondPhotoIdx !== null ? PHOTOS[secondPhotoIdx]?.src : undefined;
  const thirdPhoto = thirdPhotoIdx !== null ? PHOTOS[thirdPhotoIdx]?.src : undefined;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-hero uppercase tracking-wide">Social Graphics</h1>
            <p className="text-muted-foreground text-sm">Create branded 1200×630 images for Facebook events, ads & social posts</p>
          </div>
          <Button onClick={handleDownload} disabled={isExporting} variant="gold" size="lg">
            <Download className="mr-2 h-5 w-5" />
            {isExporting ? 'Exporting…' : 'Download PNG'}
          </Button>
        </div>

        {/* Template Picker */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Template</label>
          <div className="flex gap-3 flex-wrap">
            {TEMPLATES.map(t => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all ${
                  template === t.id ? 'bg-accent ring-2 ring-drake-gold' : 'hover:bg-muted'
                }`}
              >
                <TemplateThumbnail id={t.id} active={template === t.id} />
                <span className={`text-[11px] font-medium ${template === t.id ? 'text-drake-gold' : 'text-muted-foreground'}`}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Presets */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            <Sparkles className="h-3 w-3 inline mr-1" />
            Quick Presets
          </label>
          <div className="flex gap-2 flex-wrap">
            {CONTENT_PRESETS.map(preset => (
              <button
                key={preset.label}
                onClick={() => applyPreset(preset)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                  headline === preset.headline && programLine === preset.programLine
                    ? 'bg-drake-gold text-drake-dark border-drake-gold'
                    : 'border-border text-muted-foreground hover:border-drake-gold/50 hover:text-foreground'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview — fixed scaling container */}
        <div className="bg-muted rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-2">Live Preview (1200×630)</p>
          <div style={{ width: CANVAS_W * PREVIEW_SCALE, height: CANVAS_H * PREVIEW_SCALE, position: 'relative' }}>
            <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: 'top left', width: CANVAS_W, height: CANVAS_H, position: 'absolute', top: 0, left: 0 }}>
              <TemplatePreview
                template={template}
                photo={PHOTOS[selectedPhoto]?.src || PHOTOS[0].src}
                secondPhoto={secondPhoto}
                thirdPhoto={thirdPhoto}
                eyebrow={eyebrow}
                headline={headline}
                programLine={programLine}
                detailLine={detailLine}
                ctaText={ctaText}
                showBadge={showBadge}
                previewRef={previewRef}
              />
            </div>
          </div>
        </div>

        {/* Content Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> Eyebrow</label>
            <Input value={eyebrow} onChange={e => setEyebrow(e.target.value)} placeholder="WEST ASHLEY · CHARLESTON" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> Headline</label>
            <Input value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Try 3 Classes Free" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> Program Line</label>
            <Input value={programLine} onChange={e => setProgramLine(e.target.value)} placeholder="Strength & Mobility Classes" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> Detail Line</label>
            <Input value={detailLine} onChange={e => setDetailLine(e.target.value)} placeholder="All Levels Welcome" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> CTA Text</label>
            <Input value={ctaText} onChange={e => setCtaText(e.target.value)} placeholder="Book Your Free Class →" />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <label className="text-sm font-medium">Show "3 Free Classes" Badge</label>
            <button
              onClick={() => setShowBadge(!showBadge)}
              className={`w-10 h-6 rounded-full transition-colors ${showBadge ? 'bg-drake-gold' : 'bg-muted-foreground/30'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform mx-1 ${showBadge ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Photo Pickers */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-lg font-semibold">Choose Photos</h2>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input value={photoSearch} onChange={e => setPhotoSearch(e.target.value)} placeholder="Search photos…" className="pl-9 h-9" />
            </div>
          </div>

          {/* Photo slot selectors */}
          <div className="flex gap-3 mb-3 flex-wrap">
            <button
              onClick={() => setPickingFor('primary')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                pickingFor === 'primary' ? 'border-drake-gold bg-drake-gold/10 text-drake-gold' : 'border-border text-muted-foreground hover:border-muted-foreground'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              Primary Photo
              <span className="text-xs opacity-60">({PHOTOS[selectedPhoto]?.label})</span>
            </button>
            <button
              onClick={() => setPickingFor('secondary')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                pickingFor === 'secondary' ? 'border-drake-gold bg-drake-gold/10 text-drake-gold' : 'border-border text-muted-foreground hover:border-muted-foreground'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              Secondary
              {secondPhotoIdx !== null ? (
                <>
                  <span className="text-xs opacity-60">({PHOTOS[secondPhotoIdx]?.label})</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSecondPhotoIdx(null); }}
                    className="ml-1 p-0.5 rounded hover:bg-destructive/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </>
              ) : (
                <span className="text-xs opacity-40">(optional)</span>
              )}
            </button>
            {template === 'collage' && (
              <button
                onClick={() => setPickingFor('tertiary')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  pickingFor === 'tertiary' ? 'border-drake-gold bg-drake-gold/10 text-drake-gold' : 'border-border text-muted-foreground hover:border-muted-foreground'
                }`}
              >
                <ImageIcon className="h-4 w-4" />
                Third
                {thirdPhotoIdx !== null ? (
                  <>
                    <span className="text-xs opacity-60">({PHOTOS[thirdPhotoIdx]?.label})</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setThirdPhotoIdx(null); }}
                      className="ml-1 p-0.5 rounded hover:bg-destructive/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <span className="text-xs opacity-40">(optional)</span>
                )}
              </button>
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Selecting for: <span className="font-semibold text-drake-gold">{pickingFor === 'primary' ? 'Primary' : pickingFor === 'secondary' ? 'Secondary' : 'Third'}</span>
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {filteredPhotos.map((p) => {
              const realIdx = PHOTOS.indexOf(p);
              const isPrimary = selectedPhoto === realIdx;
              const isSecondary = secondPhotoIdx === realIdx;
              const isTertiary = thirdPhotoIdx === realIdx;
              const isActive = pickingFor === 'primary' ? isPrimary : pickingFor === 'secondary' ? isSecondary : isTertiary;
              return (
                <button
                  key={p.label}
                  onClick={() => handlePhotoSelect(realIdx)}
                  className={`relative aspect-video rounded-md overflow-hidden border-2 transition-all ${
                    isActive ? 'border-drake-gold ring-2 ring-drake-gold/40' : 'border-transparent hover:border-muted-foreground/30'
                  }`}
                >
                  <img src={p.src} alt={p.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-1 py-0.5 truncate">{p.label}</span>
                  {/* Slot indicators */}
                  {isPrimary && (
                    <span className="absolute top-1 left-1 text-[9px] bg-drake-gold text-drake-dark px-1 rounded font-bold">1</span>
                  )}
                  {isSecondary && (
                    <span className="absolute top-1 left-1 text-[9px] bg-drake-teal text-white px-1 rounded font-bold">2</span>
                  )}
                  {isTertiary && (
                    <span className="absolute top-1 right-1 text-[9px] bg-drake-teal text-white px-1 rounded font-bold">3</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
