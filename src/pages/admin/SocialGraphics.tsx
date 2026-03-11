import { useState, useRef, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Search, Type } from 'lucide-react';
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

type TemplateId = 'full-bleed' | 'split-left' | 'centered' | 'editorial' | 'split-right';

const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: 'full-bleed', label: 'Full Bleed' },
  { id: 'split-left', label: 'Split Left' },
  { id: 'centered', label: 'Centered Card' },
  { id: 'editorial', label: 'Editorial Strip' },
  { id: 'split-right', label: 'Split Right' },
];

const HEADLINE_PRESETS = [
  'Try 3 Classes Free',
  'Limited Spots This Week',
  'New Member Special',
  'Strength & Mobility',
  'Join the Community',
  'First Class Free',
];

const TEAL = '#0B4A52';
const GOLD = '#F2B544';
const DARK = '#1A1A1A';
const SOFT_TEAL = '#10757E';

// SVG pattern for teal panels (inline data URI for export compatibility)
const TEAL_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L30 0 L60 30 L30 60Z' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E")`;

function TemplatePreview({ template, photo, headline, subtext, previewRef }: {
  template: TemplateId;
  photo: string;
  headline: string;
  subtext: string;
  previewRef: React.RefObject<HTMLDivElement>;
}) {
  const font = "'Oswald', sans-serif";
  const eyebrow = 'WEST ASHLEY · CHARLESTON';

  if (template === 'full-bleed') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        {/* Vignette */}
        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 120px 40px rgba(0,0,0,0.5)' }} />
        {/* Dual gradient: bottom dark + left teal tint */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 40%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,74,82,0.3) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 48, right: 48 }}>
          <img src={logo} alt="" style={{ height: 56, marginBottom: 16 }} crossOrigin="anonymous" />
          {/* Gold accent line */}
          <div style={{ width: 80, height: 3, background: GOLD, marginBottom: 14, borderRadius: 2 }} />
          <div style={{ fontSize: 13, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>{eyebrow}</div>
          <div style={{ fontSize: 54, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.08, letterSpacing: 1.5, textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>{headline}</div>
          <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.85)', marginTop: 10, fontWeight: 400, letterSpacing: 1.5 }}>{subtext}</div>
        </div>
      </div>
    );
  }

  if (template === 'split-left') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        {/* Photo fills full width, clipped to left side with angle */}
        <div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(0 0, 65% 0, 55% 100%, 0 100%)' }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.3)' }} />
        </div>
        {/* Teal panel with pattern */}
        <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', background: TEAL, backgroundImage: TEAL_PATTERN, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 44px 48px 64px' }}>
          {/* Subtle gradient overlay on panel */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${SOFT_TEAL} 0%, ${TEAL} 100%)`, opacity: 0.5 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <img src={logo} alt="" style={{ height: 50, marginBottom: 20, alignSelf: 'flex-start' }} crossOrigin="anonymous" />
            <div style={{ fontSize: 12, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 }}>{eyebrow}</div>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.12, letterSpacing: 1 }}>{headline}</div>
            <div style={{ width: 64, height: 3, background: GOLD, marginTop: 20, marginBottom: 16, borderRadius: 2 }} />
            <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.8)', fontWeight: 400, lineHeight: 1.4 }}>{subtext}</div>
          </div>
        </div>
      </div>
    );
  }

  if (template === 'centered') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, position: 'relative', overflow: 'hidden', fontFamily: font }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        {/* Radial gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(11,74,82,0.78) 0%, rgba(11,74,82,0.92) 70%, rgba(0,0,0,0.95) 100%)` }} />
        {/* Inner frosted card */}
        <div style={{ position: 'absolute', top: 60, left: 100, right: 100, bottom: 60, border: '1px solid rgba(242,181,68,0.2)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 60px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(2px)' }}>
          {/* Gold corner accents — top-left */}
          <div style={{ position: 'absolute', top: -1, left: -1, width: 32, height: 32, borderTop: `3px solid ${GOLD}`, borderLeft: `3px solid ${GOLD}`, borderRadius: '8px 0 0 0' }} />
          {/* Gold corner accents — top-right */}
          <div style={{ position: 'absolute', top: -1, right: -1, width: 32, height: 32, borderTop: `3px solid ${GOLD}`, borderRight: `3px solid ${GOLD}`, borderRadius: '0 8px 0 0' }} />
          {/* Gold corner accents — bottom-left */}
          <div style={{ position: 'absolute', bottom: -1, left: -1, width: 32, height: 32, borderBottom: `3px solid ${GOLD}`, borderLeft: `3px solid ${GOLD}`, borderRadius: '0 0 0 8px' }} />
          {/* Gold corner accents — bottom-right */}
          <div style={{ position: 'absolute', bottom: -1, right: -1, width: 32, height: 32, borderBottom: `3px solid ${GOLD}`, borderRight: `3px solid ${GOLD}`, borderRadius: '0 0 8px 0' }} />

          <img src={logo} alt="" style={{ height: 60, marginBottom: 24 }} crossOrigin="anonymous" />
          <div style={{ fontSize: 13, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 4, marginBottom: 16 }}>{eyebrow}</div>
          <div style={{ fontSize: 56, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.08, letterSpacing: 2, textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}>{headline}</div>
          <div style={{ width: 100, height: 3, background: GOLD, marginTop: 24, marginBottom: 20, borderRadius: 2 }} />
          <div style={{ fontSize: 24, color: GOLD, fontWeight: 500, letterSpacing: 2 }}>{subtext}</div>
        </div>
      </div>
    );
  }

  if (template === 'editorial') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, display: 'flex', flexDirection: 'column', fontFamily: font, overflow: 'hidden' }}>
        {/* Header bar */}
        <div style={{ height: 80, background: `linear-gradient(135deg, ${TEAL} 0%, ${SOFT_TEAL} 100%)`, display: 'flex', alignItems: 'center', padding: '0 40px', gap: 16, position: 'relative' }}>
          <img src={logo} alt="" style={{ height: 42 }} crossOrigin="anonymous" />
          <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 3 }}>DRAKE FITNESS</span>
          <div style={{ marginLeft: 'auto', fontSize: 12, color: GOLD, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 500 }}>{eyebrow}</div>
        </div>
        {/* Gold accent stripe */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD} 60%, transparent 100%)` }} />
        {/* Photo */}
        <div style={{ flex: 1, position: 'relative' }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 60px 10px rgba(0,0,0,0.25)' }} />
        </div>
        {/* Footer bar */}
        <div style={{ height: 84, background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', position: 'relative' }}>
          {/* Diagonal gold slash */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: GOLD, transform: 'skewX(-12deg)', transformOrigin: 'top left' }} />
          <div style={{ fontSize: 30, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 1.5, paddingLeft: 20 }}>{headline}</div>
          <div style={{ background: GOLD, color: DARK, padding: '12px 32px', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', borderRadius: 6, letterSpacing: 1.5 }}>{subtext}</div>
        </div>
      </div>
    );
  }

  // split-right
  return (
    <div ref={previewRef} style={{ width: 1200, height: 630, position: 'relative', overflow: 'hidden', fontFamily: font }}>
      {/* Photo fills full width, clipped to right side with angle */}
      <div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 50% 100%)' }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.3)' }} />
      </div>
      {/* Teal panel with pattern */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', background: TEAL, backgroundImage: TEAL_PATTERN, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 44px' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${SOFT_TEAL} 0%, ${TEAL} 100%)`, opacity: 0.5 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src={logo} alt="" style={{ height: 50, marginBottom: 20, alignSelf: 'flex-start' }} crossOrigin="anonymous" />
          <div style={{ fontSize: 12, fontWeight: 500, color: GOLD, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 }}>{eyebrow}</div>
          {/* Decorative gold bracket around headline */}
          <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 16 }}>
            <div style={{ fontSize: 42, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.12, letterSpacing: 1 }}>{headline}</div>
          </div>
          <div style={{ width: 64, height: 3, background: GOLD, marginTop: 20, marginBottom: 16, borderRadius: 2 }} />
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', fontWeight: 400, lineHeight: 1.4, marginBottom: 24 }}>{subtext}</div>
          <div style={{ background: GOLD, color: DARK, padding: '12px 32px', fontSize: 17, fontWeight: 700, textTransform: 'uppercase', borderRadius: 6, letterSpacing: 1.5, alignSelf: 'flex-start', display: 'inline-block' }}>Get Started →</div>
        </div>
      </div>
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
  const [headline, setHeadline] = useState('Try 3 Classes Free');
  const [subtext, setSubtext] = useState('West Ashley · Charleston, SC');
  const [photoSearch, setPhotoSearch] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const filteredPhotos = PHOTOS.filter(p =>
    p.label.toLowerCase().includes(photoSearch.toLowerCase())
  );

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

        {/* Template Picker with Visual Thumbnails */}
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

        {/* Live Preview — dynamically scaled */}
        <div className="bg-muted rounded-lg p-4 overflow-hidden">
          <p className="text-xs text-muted-foreground mb-2">Live Preview (1200×630)</p>
          <div className="w-full overflow-x-auto">
            <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: 1200, height: 630 }}>
              <TemplatePreview
                template={template}
                photo={PHOTOS[selectedPhoto]?.src || PHOTOS[0].src}
                headline={headline}
                subtext={subtext}
                previewRef={previewRef}
              />
            </div>
          </div>
        </div>

        {/* Text Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> Headline</label>
            <Input value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Try 3 Classes Free" />
            {/* Preset chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {HEADLINE_PRESETS.map(preset => (
                <button
                  key={preset}
                  onClick={() => setHeadline(preset)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                    headline === preset
                      ? 'bg-drake-gold text-drake-dark border-drake-gold font-semibold'
                      : 'border-border text-muted-foreground hover:border-drake-gold/50 hover:text-foreground'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> Subtext / CTA</label>
            <Input value={subtext} onChange={e => setSubtext(e.target.value)} placeholder="West Ashley · Charleston, SC" />
          </div>
        </div>

        {/* Photo Picker */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-lg font-semibold">Choose Photo</h2>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input value={photoSearch} onChange={e => setPhotoSearch(e.target.value)} placeholder="Search photos…" className="pl-9 h-9" />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {filteredPhotos.map((p) => {
              const realIdx = PHOTOS.indexOf(p);
              return (
                <button
                  key={p.label}
                  onClick={() => setSelectedPhoto(realIdx)}
                  className={`relative aspect-video rounded-md overflow-hidden border-2 transition-all ${
                    selectedPhoto === realIdx ? 'border-drake-gold ring-2 ring-drake-gold/40' : 'border-transparent hover:border-muted-foreground/30'
                  }`}
                >
                  <img src={p.src} alt={p.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-1 py-0.5 truncate">{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
