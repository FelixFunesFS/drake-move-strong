import { useState, useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Download, Search, Type, Sparkles, X, Image as ImageIcon, Upload, Plus, Minus, ChevronLeft, ChevronRight, Monitor, Smartphone, Square, RectangleHorizontal, ChevronDown, GripVertical, Camera } from 'lucide-react';
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
  fourthPhoto: null,
  fifthPhoto: null,
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

const MULTI_IMAGE_TEMPLATES = new Set(['fade-blend', 'circle-cutout', 'photo-strip', 'overlap-cards', 'collage']);

export default function SocialGraphics() {
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>(CANVAS_SIZES[0]);
  const [isCarousel, setIsCarousel] = useState(false);
  const [slides, setSlides] = useState<SlideContent[]>([{ ...DEFAULT_SLIDE }]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const slide = slides[activeSlide] || DEFAULT_SLIDE;
  const updateSlide = (updates: Partial<SlideContent>) => {
    setSlides(prev => prev.map((s, i) => i === activeSlide ? { ...s, ...updates } : s));
  };

  const [photoSearch, setPhotoSearch] = useState('');
  const [pickingFor, setPickingFor] = useState<'primary' | 'secondary' | 'tertiary' | 'fourth' | 'fifth'>('primary');
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scheduleClasses, setScheduleClasses] = useState<ScheduleClass[]>([]);

  // Collapsible sections
  const [photosOpen, setPhotosOpen] = useState(true);
  const [contentOpen, setContentOpen] = useState(true);

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
        await new Promise(r => setTimeout(r, 300));
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
    } else if (pickingFor === 'fourth') {
      updateSlide({ fourthPhoto: realIdx });
    } else if (pickingFor === 'fifth') {
      updateSlide({ fifthPhoto: realIdx });
    } else {
      updateSlide({ photo: realIdx });
    }
  };

  const addPhotosFromFiles = (files: FileList | File[]) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setPhotos(prev => [{ src: dataUrl, label: file.name.replace(/\.[^.]+$/, ''), isCustom: true }, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addPhotosFromFiles(e.target.files);
    // Reset both inputs so the same file/photo can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) addPhotosFromFiles(e.dataTransfer.files);
  };

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

  const handleLoadPost = (post: PackagePost, imageUrl?: string) => {
    // If an image URL is provided, inject it into the photos array as a custom upload
    if (imageUrl) {
      const newPhoto: PhotoItem = { src: imageUrl, label: `AI: ${post.headline}`, isCustom: true };
      setPhotos(prev => {
        const newPhotos = [newPhoto, ...prev];
        // Set the new photo as primary for this slide
        updateSlide({
          headline: post.headline,
          detailLine: post.detail,
          ctaText: post.cta,
          template: post.suggested_template as TemplateId,
          showBadge: false,
          photo: 0, // First photo = newly added
        });
        return newPhotos;
      });
    } else {
      updateSlide({
        headline: post.headline,
        detailLine: post.detail,
        ctaText: post.cta,
        template: post.suggested_template as TemplateId,
        showBadge: false,
      });
    }
    toast.success('Loaded post into editor');
  };

  // Preview scaling — fits within left column (responsive)
  const maxPreviewWidth = isMobile ? Math.min(window.innerWidth - 32, 560) : 560;
  const maxPreviewHeight = isMobile ? 400 : 500;
  const PREVIEW_SCALE = Math.min(maxPreviewWidth / canvasSize.width, maxPreviewHeight / canvasSize.height, isMobile ? 0.45 : 0.55);

  const secondPhoto = slide.secondPhoto !== null ? photos[slide.secondPhoto]?.src : undefined;
  const thirdPhoto = slide.thirdPhoto !== null ? photos[slide.thirdPhoto]?.src : undefined;
  const fourthPhoto = slide.fourthPhoto !== null ? photos[slide.fourthPhoto]?.src : undefined;
  const fifthPhoto = slide.fifthPhoto !== null ? photos[slide.fifthPhoto]?.src : undefined;
  const needsMultiImage = MULTI_IMAGE_TEMPLATES.has(slide.template);
  const needsThirdImage = slide.template === 'photo-strip' || slide.template === 'collage';
  const needsFourthFifth = slide.template === 'photo-strip' || slide.template === 'collage' || slide.template === 'overlap-cards';

  return (
    <AdminLayout>
      <div className="space-y-4">
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

          <TabsContent value="editor" className="mt-4">
            {/* SPLIT-PANE LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* LEFT: Sticky Preview */}
              <div className="w-full lg:w-[580px] flex-shrink-0 lg:sticky lg:top-4 space-y-3">
                {/* Size Tabs */}
                <div className="flex gap-1.5 flex-wrap overflow-x-auto pb-1">
                  {CANVAS_SIZES.map(size => (
                    <button
                      key={size.name}
                      onClick={() => setCanvasSize(size)}
                      className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md border transition-all font-medium ${
                        canvasSize.name === size.name ? 'bg-drake-gold text-drake-dark border-drake-gold' : 'border-border text-muted-foreground hover:border-drake-gold/50'
                      }`}
                    >
                      {SIZE_ICONS[size.name]}
                      {size.name.charAt(0).toUpperCase() + size.name.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Preview */}
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground mb-1.5">
                    {canvasSize.width}×{canvasSize.height}
                    {isCarousel && ` · Slide ${activeSlide + 1}/${slides.length}`}
                  </p>
                  <div style={{ width: canvasSize.width * PREVIEW_SCALE, height: canvasSize.height * PREVIEW_SCALE, position: 'relative', margin: '0 auto' }}>
                    <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: 'top left', width: canvasSize.width, height: canvasSize.height, position: 'absolute', top: 0, left: 0 }}>
                      <TemplatePreview
                        template={slide.template}
                        photo={photos[slide.photo]?.src || photos[0]?.src}
                        secondPhoto={secondPhoto}
                        thirdPhoto={thirdPhoto}
                        fourthPhoto={fourthPhoto}
                        fifthPhoto={fifthPhoto}
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

                {/* Carousel Controls */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium">Carousel</label>
                    <button
                      onClick={() => { setIsCarousel(!isCarousel); if (!isCarousel) { setSlides([{ ...DEFAULT_SLIDE }]); setActiveSlide(0); } }}
                      className={`w-9 h-5 rounded-full transition-colors ${isCarousel ? 'bg-drake-gold' : 'bg-muted-foreground/30'}`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full bg-white shadow transition-transform mx-0.5 ${isCarousel ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  {isCarousel && (
                    <>
                      <div className="flex items-center gap-0.5">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))} disabled={activeSlide === 0}>
                          <ChevronLeft className="h-3.5 w-3.5" />
                        </Button>
                        {slides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveSlide(i)}
                            className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all ${i === activeSlide ? 'bg-drake-gold text-drake-dark' : 'bg-muted text-muted-foreground hover:bg-muted-foreground/20'}`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))} disabled={activeSlide === slides.length - 1}>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-6 w-6 p-0" onClick={addSlide} disabled={slides.length >= 10}><Plus className="h-3 w-3" /></Button>
                        <Button size="sm" variant="outline" className="h-6 w-6 p-0" onClick={removeSlide} disabled={slides.length <= 1}><Minus className="h-3 w-3" /></Button>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => applyCarouselSequence('weekly-schedule')} className="text-[9px] px-2 py-1 rounded border border-border hover:border-drake-gold/50 text-muted-foreground">Weekly</button>
                        <button onClick={() => applyCarouselSequence('class-spotlight')} className="text-[9px] px-2 py-1 rounded border border-border hover:border-drake-gold/50 text-muted-foreground">Spotlight</button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* RIGHT: Scrollable Controls */}
              <div className="flex-1 min-w-0 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
                {/* Template Grid */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Template</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {TEMPLATES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => updateSlide({ template: t.id })}
                        className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all ${
                          slide.template === t.id ? 'bg-accent ring-2 ring-drake-gold' : 'hover:bg-muted'
                        }`}
                      >
                        <TemplateThumbnail id={t.id} active={slide.template === t.id} />
                        <span className={`text-[9px] font-medium leading-tight text-center ${slide.template === t.id ? 'text-drake-gold' : 'text-muted-foreground'}`}>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors">
                    <span className="flex items-center gap-1"><Type className="h-3.5 w-3.5" /> Content</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${contentOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2">
                    {/* Quick Presets */}
                    <div className="flex gap-1.5 flex-wrap mb-2">
                      {CONTENT_PRESETS.map(preset => (
                        <button
                          key={preset.label}
                          onClick={() => applyPreset(preset)}
                          className={`text-[10px] px-2 py-1 rounded-full border transition-all font-medium ${
                            slide.headline === preset.headline && slide.programLine === preset.programLine
                              ? 'bg-drake-gold text-drake-dark border-drake-gold'
                              : 'border-border text-muted-foreground hover:border-drake-gold/50'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-medium text-muted-foreground mb-0.5 block">Eyebrow</label>
                        <Input value={slide.eyebrow} onChange={e => updateSlide({ eyebrow: e.target.value })} className="h-8 text-xs" />
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-muted-foreground mb-0.5 block">Headline</label>
                        <Input value={slide.headline} onChange={e => updateSlide({ headline: e.target.value })} className="h-8 text-xs" />
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-muted-foreground mb-0.5 block">Program</label>
                        <Input value={slide.programLine} onChange={e => updateSlide({ programLine: e.target.value })} className="h-8 text-xs" />
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-muted-foreground mb-0.5 block">Detail</label>
                        <Input value={slide.detailLine} onChange={e => updateSlide({ detailLine: e.target.value })} className="h-8 text-xs" />
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-muted-foreground mb-0.5 block">CTA</label>
                        <Input value={slide.ctaText} onChange={e => updateSlide({ ctaText: e.target.value })} className="h-8 text-xs" />
                      </div>
                      <div className="flex items-center gap-2 pt-4">
                        <label className="text-[10px] font-medium text-muted-foreground">Badge</label>
                        <button
                          onClick={() => updateSlide({ showBadge: !slide.showBadge })}
                          className={`w-8 h-5 rounded-full transition-colors ${slide.showBadge ? 'bg-drake-gold' : 'bg-muted-foreground/30'}`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full bg-white shadow transition-transform mx-0.5 ${slide.showBadge ? 'translate-x-3' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </div>

                    {/* Schedule Presets */}
                    <SchedulePresets onApplyPreset={handleSchedulePreset} />
                  </CollapsibleContent>
                </Collapsible>

                {/* Photos Section */}
                <Collapsible open={photosOpen} onOpenChange={setPhotosOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors">
                    <span className="flex items-center gap-1"><ImageIcon className="h-3.5 w-3.5" /> Photos</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${photosOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2">
                    {/* Drop zone & upload */}
                    <div
                      onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-4 sm:p-3 text-center cursor-pointer transition-all min-h-[60px] ${
                        isDragOver ? 'border-drake-gold bg-drake-gold/10' : 'border-border hover:border-drake-gold/50'
                      }`}
                    >
                      <Upload className="h-5 w-5 sm:h-4 sm:w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs sm:text-[10px] text-muted-foreground">
                        {isMobile ? 'Tap to choose from library' : 'Drop images or click to upload'}
                      </p>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
                    {/* Camera capture for mobile */}
                    <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} className="hidden" />
                    {isMobile && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => cameraInputRef.current?.click()}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                      </Button>
                    )}

                    {/* Photo slot selectors */}
                    <div className="flex gap-1.5 flex-wrap">
                      <button
                        onClick={() => setPickingFor('primary')}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-medium transition-all ${
                          pickingFor === 'primary' ? 'border-drake-gold bg-drake-gold/10 text-drake-gold' : 'border-border text-muted-foreground'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full bg-drake-gold text-drake-dark text-[8px] flex items-center justify-center font-bold">1</span>
                        Primary
                      </button>
                      <button
                        onClick={() => setPickingFor('secondary')}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-medium transition-all ${
                          pickingFor === 'secondary' ? 'border-drake-gold bg-drake-gold/10 text-drake-gold' : 'border-border text-muted-foreground'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full bg-drake-teal text-white text-[8px] flex items-center justify-center font-bold">2</span>
                        Secondary
                        {slide.secondPhoto !== null && (
                          <button onClick={(e) => { e.stopPropagation(); updateSlide({ secondPhoto: null }); }} className="ml-0.5 p-0.5 rounded hover:bg-destructive/20">
                            <X className="h-2.5 w-2.5" />
                          </button>
                        )}
                      </button>
                      {needsThirdImage && (
                        <button
                          onClick={() => setPickingFor('tertiary')}
                          className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-medium transition-all ${
                            pickingFor === 'tertiary' ? 'border-drake-gold bg-drake-gold/10 text-drake-gold' : 'border-border text-muted-foreground'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full bg-drake-teal text-white text-[8px] flex items-center justify-center font-bold">3</span>
                          Third
                          {slide.thirdPhoto !== null && (
                            <button onClick={(e) => { e.stopPropagation(); updateSlide({ thirdPhoto: null }); }} className="ml-0.5 p-0.5 rounded hover:bg-destructive/20">
                              <X className="h-2.5 w-2.5" />
                            </button>
                          )}
                        </button>
                      )}
                      {needsFourthFifth && (
                        <>
                          <button
                            onClick={() => setPickingFor('fourth')}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-medium transition-all ${
                              pickingFor === 'fourth' ? 'border-drake-gold bg-drake-gold/10 text-drake-gold' : 'border-border text-muted-foreground'
                            }`}
                          >
                            <span className="w-3 h-3 rounded-full bg-drake-teal text-white text-[8px] flex items-center justify-center font-bold">4</span>
                            Fourth
                            {slide.fourthPhoto !== null && (
                              <button onClick={(e) => { e.stopPropagation(); updateSlide({ fourthPhoto: null }); }} className="ml-0.5 p-0.5 rounded hover:bg-destructive/20">
                                <X className="h-2.5 w-2.5" />
                              </button>
                            )}
                          </button>
                          <button
                            onClick={() => setPickingFor('fifth')}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-medium transition-all ${
                              pickingFor === 'fifth' ? 'border-drake-gold bg-drake-gold/10 text-drake-gold' : 'border-border text-muted-foreground'
                            }`}
                          >
                            <span className="w-3 h-3 rounded-full bg-drake-teal text-white text-[8px] flex items-center justify-center font-bold">5</span>
                            Fifth
                            {slide.fifthPhoto !== null && (
                              <button onClick={(e) => { e.stopPropagation(); updateSlide({ fifthPhoto: null }); }} className="ml-0.5 p-0.5 rounded hover:bg-destructive/20">
                                <X className="h-2.5 w-2.5" />
                              </button>
                            )}
                          </button>
                        </>
                      )}
                    </div>

                    {needsMultiImage && slide.secondPhoto === null && (
                      <p className="text-[10px] text-drake-gold/80 bg-drake-gold/10 rounded px-2 py-1">
                        💡 This template uses multiple photos. Select a secondary image for best results.
                      </p>
                    )}

                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input value={photoSearch} onChange={e => setPhotoSearch(e.target.value)} placeholder="Search…" className="pl-7 h-7 text-[11px]" />
                    </div>

                    {/* Photo grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-64 overflow-y-auto">
                      {filteredPhotos.map((p, idx) => {
                        const realIdx = photos.indexOf(p);
                        const isPrimary = slide.photo === realIdx;
                        const isSecondary = slide.secondPhoto === realIdx;
                        const isTertiary = slide.thirdPhoto === realIdx;
                        const isActive = pickingFor === 'primary' ? isPrimary : pickingFor === 'secondary' ? isSecondary : pickingFor === 'tertiary' ? isTertiary : pickingFor === 'fourth' ? slide.fourthPhoto === realIdx : pickingFor === 'fifth' ? slide.fifthPhoto === realIdx : false;
                        return (
                          <button
                            key={`${p.label}-${idx}`}
                            onClick={() => handlePhotoSelect(realIdx)}
                            className={`relative aspect-video rounded overflow-hidden border-2 transition-all ${
                              isActive ? 'border-drake-gold ring-1 ring-drake-gold/40' : 'border-transparent hover:border-muted-foreground/30'
                            }`}
                          >
                            <img src={p.src} alt={p.label} className="w-full h-full object-cover" />
                            <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] px-0.5 py-0 truncate">
                              {p.isCustom && '📎 '}{p.label}
                            </span>
                            {isPrimary && <span className="absolute top-0.5 left-0.5 text-[7px] bg-drake-gold text-drake-dark px-0.5 rounded font-bold">1</span>}
                            {isSecondary && <span className="absolute top-0.5 left-0.5 text-[7px] bg-drake-teal text-white px-0.5 rounded font-bold">2</span>}
                            {isTertiary && <span className="absolute top-0.5 right-0.5 text-[7px] bg-drake-teal text-white px-0.5 rounded font-bold">3</span>}
                          </button>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
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
