import { useState, useRef, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Search, Type, Sparkles, X, Image as ImageIcon, Upload, Plus, Minus, ChevronLeft, ChevronRight, Monitor, Smartphone, Square, RectangleHorizontal } from 'lucide-react';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

import {
  PhotoItem, DEFAULT_PHOTOS, TemplateId, CanvasSize, CANVAS_SIZES,
  TEMPLATES, ContentPreset, CONTENT_PRESETS, SlideContent, PackagePost, ScheduleClass,
} from '@/components/admin/social/types';
import TemplatePreview from '@/components/admin/social/TemplatePreview';
import { TemplateThumbnail } from '@/components/admin/social/TemplateThumbnails';
import SchedulePresets from '@/components/admin/social/SchedulePresets';
import ContentPackageTab from '@/components/admin/social/ContentPackageTab';

const DEFAULT_SLIDE: SlideContent = {
  photo: 0,
  secondPhoto: null,
  thirdPhoto: null,
  template: 'full-bleed',
  eyebrow: 'WEST ASHLEY · CHARLESTON',
  headline: 'Try 3 Classes Free',
  programLine: 'Strength & Mobility Classes',
  detailLine: 'All Levels Welcome',
  ctaText: 'Book Your Free Class →',
  showBadge: true,
};

const SIZE_ICONS: Record<string, React.ReactNode> = {
  landscape: <RectangleHorizontal className="h-4 w-4" />,
  square: <Square className="h-4 w-4" />,
  story: <Smartphone className="h-4 w-4" />,
  portrait: <Monitor className="h-4 w-4" />,
};

export default function SocialGraphics() {
  // Photos state (defaults + custom uploads)
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);

  // Canvas size
  const [canvasSize, setCanvasSize] = useState<CanvasSize>(CANVAS_SIZES[0]);

  // Mode: single or carousel
  const [isCarousel, setIsCarousel] = useState(false);
  const [slides, setSlides] = useState<SlideContent[]>([{ ...DEFAULT_SLIDE }]);
  const [activeSlide, setActiveSlide] = useState(0);

  // Current slide data accessors
  const slide = slides[activeSlide] || DEFAULT_SLIDE;
  const updateSlide = (updates: Partial<SlideContent>) => {
    setSlides(prev => prev.map((s, i) => i === activeSlide ? { ...s, ...updates } : s));
  };

  // Photo picking
  const [photoSearch, setPhotoSearch] = useState('');
  const [pickingFor, setPickingFor] = useState<'primary' | 'secondary' | 'tertiary'>('primary');
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Schedule classes for schedule templates
  const [scheduleClasses, setScheduleClasses] = useState<ScheduleClass[]>([]);

  const filteredPhotos = photos.filter(p =>
    p.label.toLowerCase().includes(photoSearch.toLowerCase())
  );

  const applyPreset = (preset: ContentPreset) => {
    updateSlide({
      eyebrow: preset.eyebrow,
      headline: preset.headline,
      programLine: preset.programLine,
      detailLine: preset.detailLine,
      ctaText: preset.ctaText,
      showBadge: preset.showBadge,
    });
  };

  const handleSchedulePreset = (data: {
    headline: string; programLine: string; detailLine: string; ctaText: string; eyebrow: string; showBadge: boolean;
    scheduleClasses: ScheduleClass[]; suggestedTemplate: TemplateId;
  }) => {
    setScheduleClasses(data.scheduleClasses);
    updateSlide({
      headline: data.headline,
      programLine: data.programLine,
      detailLine: data.detailLine,
      ctaText: data.ctaText,
      eyebrow: data.eyebrow,
      showBadge: data.showBadge,
      template: data.suggestedTemplate,
      scheduleClasses: data.scheduleClasses,
    });
  };

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        width: canvasSize.width,
        height: canvasSize.height,
        pixelRatio: 1,
        cacheBust: true,
      });
      const link = document.createElement('a');
      const suffix = isCarousel ? `-slide${activeSlide + 1}` : '';
      link.download = `drake-fitness-${slide.template}-${canvasSize.name}${suffix}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Image downloaded!');
    } catch (err) {
      console.error('Export failed:', err);
      toast.error('Export failed. Try again.');
    } finally {
      setIsExporting(false);
    }
  }, [canvasSize, slide.template, activeSlide, isCarousel]);

  const handleDownloadAll = useCallback(async () => {
    if (!previewRef.current || !isCarousel) return;
    setIsExporting(true);
    try {
      for (let i = 0; i < slides.length; i++) {
        setActiveSlide(i);
        await new Promise(r => setTimeout(r, 300)); // wait for render
        const dataUrl = await toPng(previewRef.current!, {
          width: canvasSize.width,
          height: canvasSize.height,
          pixelRatio: 1,
          cacheBust: true,
        });
        const link = document.createElement('a');
        link.download = `drake-fitness-carousel-${i + 1}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        await new Promise(r => setTimeout(r, 200));
      }
      toast.success(`Downloaded ${slides.length} slides!`);
    } catch (err) {
      console.error('Batch export failed:', err);
      toast.error('Export failed.');
    } finally {
      setIsExporting(false);
    }
  }, [canvasSize, slides, isCarousel]);

  const handlePhotoSelect = (realIdx: number) => {
    if (pickingFor === 'secondary') {
      updateSlide({ secondPhoto: realIdx });
    } else if (pickingFor === 'tertiary') {
      updateSlide({ thirdPhoto: realIdx });
    } else {
      updateSlide({ photo: realIdx });
    }
  };

  // Custom image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setPhotos(prev => [{ src: dataUrl, label: file.name.replace(/\.[^.]+$/, ''), isCustom: true }, ...prev]);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Carousel controls
  const addSlide = () => {
    if (slides.length >= 10) return;
    setSlides(prev => [...prev, { ...DEFAULT_SLIDE }]);
    setActiveSlide(slides.length);
  };

  const removeSlide = () => {
    if (slides.length <= 1) return;
    setSlides(prev => prev.filter((_, i) => i !== activeSlide));
    setActiveSlide(Math.min(activeSlide, slides.length - 2));
  };

  const applyCarouselSequence = (type: 'weekly-schedule' | 'class-spotlight' | 'custom') => {
    if (type === 'weekly-schedule' && scheduleClasses.length > 0) {
      // Group by day
      const byDay: Record<string, ScheduleClass[]> = {};
      scheduleClasses.forEach(c => {
        if (!byDay[c.class_date]) byDay[c.class_date] = [];
        byDay[c.class_date].push(c);
      });
      const days = Object.keys(byDay).sort().slice(0, 5);

      const newSlides: SlideContent[] = [
        { ...DEFAULT_SLIDE, template: 'full-bleed', headline: "This Week at\nDrake Fitness", programLine: 'Swipe for the Full Schedule →', detailLine: '', ctaText: 'Swipe →', showBadge: false },
        ...days.map(day => {
          const dayClasses = byDay[day];
          const dayName = new Date(day + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' });
          return {
            ...DEFAULT_SLIDE,
            template: 'schedule-grid' as TemplateId,
            headline: dayName,
            programLine: dayClasses.map(c => c.class_name).join(' · '),
            detailLine: dayClasses.map(c => `${c.start_time.slice(0, 5)} ${c.class_name}`).join(' | '),
            ctaText: 'Book →',
            showBadge: false,
            scheduleClasses: dayClasses,
          };
        }),
        { ...DEFAULT_SLIDE, template: 'centered', headline: 'Book Your Spot', programLine: 'drake.fitness', detailLine: 'Try 3 Classes Free', ctaText: 'Book Now →', showBadge: true },
      ];
      setSlides(newSlides);
      setActiveSlide(0);
      setIsCarousel(true);
      toast.success(`Created ${newSlides.length}-slide carousel`);
    } else if (type === 'class-spotlight') {
      const uniqueClasses = [...new Map(scheduleClasses.map(c => [c.class_name, c])).values()].slice(0, 5);
      const newSlides: SlideContent[] = [
        { ...DEFAULT_SLIDE, template: 'full-bleed', headline: 'Our Classes', programLine: 'Something for Every Body', ctaText: 'Swipe to Explore →', showBadge: false },
        ...uniqueClasses.map(cls => ({
          ...DEFAULT_SLIDE,
          template: 'class-highlight' as TemplateId,
          headline: cls.class_name,
          programLine: cls.instructor || 'Drake Fitness',
          detailLine: '',
          ctaText: 'Try It Free →',
          showBadge: false,
          scheduleClasses: [cls],
        })),
        { ...DEFAULT_SLIDE, template: 'centered', headline: 'Try 3 Free', programLine: 'No Contract · All Levels', ctaText: 'Get Started →', showBadge: true },
      ];
      setSlides(newSlides);
      setActiveSlide(0);
      setIsCarousel(true);
      toast.success(`Created ${newSlides.length}-slide carousel`);
    }
  };

  const handleLoadPost = (post: PackagePost) => {
    updateSlide({
      headline: post.headline,
      detailLine: post.detail,
      ctaText: post.cta,
      template: post.suggested_template as TemplateId,
      showBadge: false,
    });
    toast.success('Loaded post into editor');
  };

  // Preview scaling
  const maxPreviewWidth = 620;
  const PREVIEW_SCALE = Math.min(maxPreviewWidth / canvasSize.width, 400 / canvasSize.height, 0.5);

  const secondPhoto = slide.secondPhoto !== null ? photos[slide.secondPhoto]?.src : undefined;
  const thirdPhoto = slide.thirdPhoto !== null ? photos[slide.thirdPhoto]?.src : undefined;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-hero uppercase tracking-wide">Social Graphics</h1>
            <p className="text-muted-foreground text-sm">Create branded images for social media, ads & carousels</p>
          </div>
          <div className="flex gap-2">
            {isCarousel && slides.length > 1 && (
              <Button onClick={handleDownloadAll} disabled={isExporting} variant="outline" size="sm">
                <Download className="mr-1 h-4 w-4" />
                All Slides
              </Button>
            )}
            <Button onClick={handleDownload} disabled={isExporting} variant="gold" size="lg">
              <Download className="mr-2 h-5 w-5" />
              {isExporting ? 'Exporting…' : 'Download PNG'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="packages">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              AI Packages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-6 mt-4">
            {/* Size Selector */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Output Size</label>
              <div className="flex gap-2 flex-wrap">
                {CANVAS_SIZES.map(size => (
                  <button
                    key={size.name}
                    onClick={() => setCanvasSize(size)}
                    className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border transition-all font-medium ${
                      canvasSize.name === size.name ? 'bg-drake-gold text-drake-dark border-drake-gold' : 'border-border text-muted-foreground hover:border-drake-gold/50'
                    }`}
                  >
                    {SIZE_ICONS[size.name]}
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Carousel Toggle + Controls */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Carousel Mode</label>
                <button
                  onClick={() => { setIsCarousel(!isCarousel); if (!isCarousel) { setSlides([{ ...DEFAULT_SLIDE }]); setActiveSlide(0); } }}
                  className={`w-10 h-6 rounded-full transition-colors ${isCarousel ? 'bg-drake-gold' : 'bg-muted-foreground/30'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform mx-1 ${isCarousel ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>
              {isCarousel && (
                <>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost" onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))} disabled={activeSlide === 0}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${i === activeSlide ? 'bg-drake-gold text-drake-dark' : 'bg-muted text-muted-foreground hover:bg-muted-foreground/20'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <Button size="sm" variant="ghost" onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))} disabled={activeSlide === slides.length - 1}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={addSlide} disabled={slides.length >= 10}><Plus className="h-3 w-3" /></Button>
                    <Button size="sm" variant="outline" onClick={removeSlide} disabled={slides.length <= 1}><Minus className="h-3 w-3" /></Button>
                  </div>
                  {/* Carousel Sequences */}
                  <div className="flex gap-1.5">
                    <button onClick={() => applyCarouselSequence('weekly-schedule')} className="text-[10px] px-2 py-1 rounded border border-border hover:border-drake-gold/50 text-muted-foreground">Weekly Schedule</button>
                    <button onClick={() => applyCarouselSequence('class-spotlight')} className="text-[10px] px-2 py-1 rounded border border-border hover:border-drake-gold/50 text-muted-foreground">Class Spotlight</button>
                  </div>
                </>
              )}
            </div>

            {/* Template Picker */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Template</label>
              <div className="flex gap-3 flex-wrap">
                {TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => updateSlide({ template: t.id })}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all ${
                      slide.template === t.id ? 'bg-accent ring-2 ring-drake-gold' : 'hover:bg-muted'
                    }`}
                  >
                    <TemplateThumbnail id={t.id} active={slide.template === t.id} />
                    <span className={`text-[11px] font-medium ${slide.template === t.id ? 'text-drake-gold' : 'text-muted-foreground'}`}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Presets + Schedule Presets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                        slide.headline === preset.headline && slide.programLine === preset.programLine
                          ? 'bg-drake-gold text-drake-dark border-drake-gold'
                          : 'border-border text-muted-foreground hover:border-drake-gold/50 hover:text-foreground'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
              <SchedulePresets onApplyPreset={handleSchedulePreset} />
            </div>

            {/* Live Preview */}
            <div className="bg-muted rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-2">
                Live Preview ({canvasSize.width}×{canvasSize.height})
                {isCarousel && ` · Slide ${activeSlide + 1}/${slides.length}`}
              </p>
              <div style={{ width: canvasSize.width * PREVIEW_SCALE, height: canvasSize.height * PREVIEW_SCALE, position: 'relative', margin: '0 auto' }}>
                <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: 'top left', width: canvasSize.width, height: canvasSize.height, position: 'absolute', top: 0, left: 0 }}>
                  <TemplatePreview
                    template={slide.template}
                    photo={photos[slide.photo]?.src || photos[0]?.src}
                    secondPhoto={secondPhoto}
                    thirdPhoto={thirdPhoto}
                    eyebrow={slide.eyebrow}
                    headline={slide.headline}
                    programLine={slide.programLine}
                    detailLine={slide.detailLine}
                    ctaText={slide.ctaText}
                    showBadge={slide.showBadge}
                    previewRef={previewRef}
                    canvasSize={canvasSize}
                    scheduleClasses={slide.scheduleClasses || scheduleClasses}
                  />
                </div>
              </div>
            </div>

            {/* Content Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> Eyebrow</label>
                <Input value={slide.eyebrow} onChange={e => updateSlide({ eyebrow: e.target.value })} placeholder="WEST ASHLEY · CHARLESTON" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> Headline</label>
                <Input value={slide.headline} onChange={e => updateSlide({ headline: e.target.value })} placeholder="Try 3 Classes Free" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> Program Line</label>
                <Input value={slide.programLine} onChange={e => updateSlide({ programLine: e.target.value })} placeholder="Strength & Mobility Classes" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> Detail Line</label>
                <Input value={slide.detailLine} onChange={e => updateSlide({ detailLine: e.target.value })} placeholder="All Levels Welcome" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-1"><Type className="h-4 w-4" /> CTA Text</label>
                <Input value={slide.ctaText} onChange={e => updateSlide({ ctaText: e.target.value })} placeholder="Book Your Free Class →" />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <label className="text-sm font-medium">Show "3 Free Classes" Badge</label>
                <button
                  onClick={() => updateSlide({ showBadge: !slide.showBadge })}
                  className={`w-10 h-6 rounded-full transition-colors ${slide.showBadge ? 'bg-drake-gold' : 'bg-muted-foreground/30'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform mx-1 ${slide.showBadge ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            {/* Photo Pickers */}
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h2 className="text-lg font-semibold">Choose Photos</h2>
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input value={photoSearch} onChange={e => setPhotoSearch(e.target.value)} placeholder="Search photos…" className="pl-9 h-9" />
                </div>
                {/* Upload Button */}
                <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-1" /> Upload
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
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
                  <span className="text-xs opacity-60">({photos[slide.photo]?.label})</span>
                </button>
                <button
                  onClick={() => setPickingFor('secondary')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                    pickingFor === 'secondary' ? 'border-drake-gold bg-drake-gold/10 text-drake-gold' : 'border-border text-muted-foreground hover:border-muted-foreground'
                  }`}
                >
                  <ImageIcon className="h-4 w-4" />
                  Secondary
                  {slide.secondPhoto !== null ? (
                    <>
                      <span className="text-xs opacity-60">({photos[slide.secondPhoto]?.label})</span>
                      <button onClick={(e) => { e.stopPropagation(); updateSlide({ secondPhoto: null }); }} className="ml-1 p-0.5 rounded hover:bg-destructive/20">
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs opacity-40">(optional)</span>
                  )}
                </button>
                {slide.template === 'collage' && (
                  <button
                    onClick={() => setPickingFor('tertiary')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                      pickingFor === 'tertiary' ? 'border-drake-gold bg-drake-gold/10 text-drake-gold' : 'border-border text-muted-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <ImageIcon className="h-4 w-4" />
                    Third
                    {slide.thirdPhoto !== null ? (
                      <>
                        <span className="text-xs opacity-60">({photos[slide.thirdPhoto]?.label})</span>
                        <button onClick={(e) => { e.stopPropagation(); updateSlide({ thirdPhoto: null }); }} className="ml-1 p-0.5 rounded hover:bg-destructive/20">
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
                {filteredPhotos.map((p, idx) => {
                  const realIdx = photos.indexOf(p);
                  const isPrimary = slide.photo === realIdx;
                  const isSecondary = slide.secondPhoto === realIdx;
                  const isTertiary = slide.thirdPhoto === realIdx;
                  const isActive = pickingFor === 'primary' ? isPrimary : pickingFor === 'secondary' ? isSecondary : isTertiary;
                  return (
                    <button
                      key={`${p.label}-${idx}`}
                      onClick={() => handlePhotoSelect(realIdx)}
                      className={`relative aspect-video rounded-md overflow-hidden border-2 transition-all ${
                        isActive ? 'border-drake-gold ring-2 ring-drake-gold/40' : 'border-transparent hover:border-muted-foreground/30'
                      }`}
                    >
                      <img src={p.src} alt={p.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-1 py-0.5 truncate">
                        {p.isCustom && '📎 '}{p.label}
                      </span>
                      {isPrimary && <span className="absolute top-1 left-1 text-[9px] bg-drake-gold text-drake-dark px-1 rounded font-bold">1</span>}
                      {isSecondary && <span className="absolute top-1 left-1 text-[9px] bg-drake-teal text-white px-1 rounded font-bold">2</span>}
                      {isTertiary && <span className="absolute top-1 right-1 text-[9px] bg-drake-teal text-white px-1 rounded font-bold">3</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="packages" className="mt-4">
            <ContentPackageTab onLoadPost={handleLoadPost} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
