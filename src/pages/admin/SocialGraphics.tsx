import { useState, useRef, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
import logo from '@/assets/drake-fitness-logo-kettlebell.png';

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

// Brand colors as inline styles (for html-to-image export reliability)
const TEAL = '#0B4A52';
const GOLD = '#F2B544';
const DARK = '#1A1A1A';

function TemplatePreview({ template, photo, headline, subtext, previewRef }: {
  template: TemplateId;
  photo: string;
  headline: string;
  subtext: string;
  previewRef: React.RefObject<HTMLDivElement>;
}) {
  const commonFont = "'Oswald', sans-serif";

  if (template === 'full-bleed') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, position: 'relative', overflow: 'hidden', fontFamily: commonFont }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 48, right: 48 }}>
          <img src={logo} alt="" style={{ height: 52, marginBottom: 12 }} crossOrigin="anonymous" />
          <div style={{ fontSize: 52, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: 1 }}>{headline}</div>
          <div style={{ fontSize: 22, color: GOLD, marginTop: 8, fontWeight: 500, letterSpacing: 1 }}>{subtext}</div>
        </div>
      </div>
    );
  }

  if (template === 'split-left') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, display: 'flex', fontFamily: commonFont, overflow: 'hidden' }}>
        <div style={{ width: '60%', height: '100%', position: 'relative' }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        </div>
        <div style={{ width: '40%', height: '100%', background: TEAL, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 40px' }}>
          <img src={logo} alt="" style={{ height: 48, marginBottom: 24, alignSelf: 'flex-start' }} crossOrigin="anonymous" />
          <div style={{ fontSize: 40, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.15, letterSpacing: 1 }}>{headline}</div>
          <div style={{ width: 64, height: 4, background: GOLD, marginTop: 20, marginBottom: 16, borderRadius: 2 }} />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)', fontWeight: 400, lineHeight: 1.4 }}>{subtext}</div>
        </div>
      </div>
    );
  }

  if (template === 'centered') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, position: 'relative', overflow: 'hidden', fontFamily: commonFont }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,74,82,0.82)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 80px' }}>
          <img src={logo} alt="" style={{ height: 56, marginBottom: 28 }} crossOrigin="anonymous" />
          <div style={{ fontSize: 56, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: 2 }}>{headline}</div>
          <div style={{ width: 100, height: 4, background: GOLD, marginTop: 24, marginBottom: 20, borderRadius: 2 }} />
          <div style={{ fontSize: 24, color: GOLD, fontWeight: 500, letterSpacing: 1 }}>{subtext}</div>
        </div>
      </div>
    );
  }

  if (template === 'editorial') {
    return (
      <div ref={previewRef} style={{ width: 1200, height: 630, display: 'flex', flexDirection: 'column', fontFamily: commonFont, overflow: 'hidden' }}>
        <div style={{ height: 80, background: TEAL, display: 'flex', alignItems: 'center', padding: '0 40px', gap: 16 }}>
          <img src={logo} alt="" style={{ height: 40 }} crossOrigin="anonymous" />
          <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 2 }}>DRAKE FITNESS</span>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
        </div>
        <div style={{ height: 80, background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: 1 }}>{headline}</div>
          <div style={{ background: GOLD, color: DARK, padding: '10px 28px', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', borderRadius: 6, letterSpacing: 1 }}>{subtext}</div>
        </div>
      </div>
    );
  }

  // split-right
  return (
    <div ref={previewRef} style={{ width: 1200, height: 630, display: 'flex', fontFamily: commonFont, overflow: 'hidden' }}>
      <div style={{ width: '45%', height: '100%', background: TEAL, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 44px' }}>
        <img src={logo} alt="" style={{ height: 48, marginBottom: 24, alignSelf: 'flex-start' }} crossOrigin="anonymous" />
        <div style={{ fontSize: 42, fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.15, letterSpacing: 1 }}>{headline}</div>
        <div style={{ width: 64, height: 4, background: GOLD, marginTop: 20, marginBottom: 16, borderRadius: 2 }} />
        <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.85)', fontWeight: 400, lineHeight: 1.4, marginBottom: 24 }}>{subtext}</div>
        <div style={{ background: GOLD, color: DARK, padding: '12px 32px', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', borderRadius: 6, letterSpacing: 1, alignSelf: 'flex-start' }}>Get Started →</div>
      </div>
      <div style={{ width: '55%', height: '100%', position: 'relative' }}>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
      </div>
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

        {/* Template Tabs */}
        <Tabs value={template} onValueChange={(v) => setTemplate(v as TemplateId)}>
          <TabsList className="w-full flex-wrap h-auto gap-1">
            {TEMPLATES.map(t => (
              <TabsTrigger key={t.id} value={t.id} className="text-xs">{t.label}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Live Preview — scaled to fit */}
        <div className="bg-muted rounded-lg p-4 overflow-hidden">
          <p className="text-xs text-muted-foreground mb-2">Live Preview (actual size: 1200×630)</p>
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
            {filteredPhotos.map((p, idx) => {
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
