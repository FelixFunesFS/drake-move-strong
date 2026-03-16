// Photo library imports
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

export { default as logo } from '@/assets/drake-fitness-logo-social.png';

export interface PhotoItem {
  src: string;
  label: string;
  isCustom?: boolean;
}

export const DEFAULT_PHOTOS: PhotoItem[] = [
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

export type TemplateId = 'full-bleed' | 'split-left' | 'centered' | 'editorial' | 'split-right' | 'collage' | 'schedule-grid' | 'class-highlight' | 'diagonal-strip' | 'fade-blend' | 'circle-cutout' | 'photo-strip' | 'overlap-cards' | 'marquee-banner' | 'stacked-bars' | 'frame-inset';

export interface CanvasSize {
  name: string;
  width: number;
  height: number;
  label: string;
}

export const CANVAS_SIZES: CanvasSize[] = [
  { name: 'landscape', width: 1200, height: 630, label: 'Landscape (1200×630)' },
  { name: 'square', width: 1080, height: 1080, label: 'Square (1080×1080)' },
  { name: 'story', width: 1080, height: 1920, label: 'Story (1080×1920)' },
  { name: 'portrait', width: 1080, height: 1350, label: 'Portrait (1080×1350)' },
];

export const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: 'full-bleed', label: 'Full Bleed' },
  { id: 'split-left', label: 'Split Left' },
  { id: 'centered', label: 'Centered Card' },
  { id: 'editorial', label: 'Editorial Strip' },
  { id: 'split-right', label: 'Split Right' },
  { id: 'collage', label: 'Collage' },
  { id: 'schedule-grid', label: 'Schedule Grid' },
  { id: 'class-highlight', label: 'Class Highlight' },
];

export interface ContentPreset {
  label: string;
  eyebrow: string;
  headline: string;
  programLine: string;
  detailLine: string;
  ctaText: string;
  showBadge: boolean;
}

export const CONTENT_PRESETS: ContentPreset[] = [
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

export const TEAL = '#0B4A52';
export const GOLD = '#F2B544';
export const DARK = '#1A1A1A';
export const SOFT_TEAL = '#10757E';

export const TEAL_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L30 0 L60 30 L30 60Z' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E")`;

// Instructor colors
export const INSTRUCTOR_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'David': { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' },
  'Misty': { bg: '#FCE7F3', text: '#9D174D', border: '#EC4899' },
  'Nick': { bg: '#DBEAFE', text: '#1E40AF', border: '#3B82F6' },
  'default': { bg: '#F3F4F6', text: '#374151', border: '#9CA3AF' },
};

export interface ScheduleClass {
  id: string;
  class_name: string;
  class_date: string;
  start_time: string;
  end_time: string | null;
  instructor: string | null;
  is_online: boolean | null;
  punchpass_url: string | null;
}

export interface SlideContent {
  photo: number;
  secondPhoto: number | null;
  thirdPhoto: number | null;
  template: TemplateId;
  eyebrow: string;
  headline: string;
  programLine: string;
  detailLine: string;
  ctaText: string;
  showBadge: boolean;
  scheduleClasses?: ScheduleClass[];
}

export interface PackagePost {
  number: number;
  caption_ig: string;
  caption_fb: string;
  caption_linkedin: string;
  suggested_template: TemplateId;
  headline: string;
  detail: string;
  cta: string;
  hashtags: string[];
}
