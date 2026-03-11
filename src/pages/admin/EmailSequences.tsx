import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Copy, Check, Mail, Clock, Heart, UserCheck, 
  TrendingUp, AlertCircle, Sparkles, ArrowRight,
  Monitor, Smartphone, Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EmailStep {
  day: number;
  dayLabel: string;
  subject: string;
  goal: string;
  psychology: string;
  keyElements: string[];
  type: 'relationship' | 'conversion' | 'personal';
  fromLine: string;
  previewText: string;
}

const newLeadSequence: EmailStep[] = [
  {
    day: 0,
    dayLabel: 'Instant',
    subject: "You're in — here's what happens next",
    goal: 'Confirm & validate their decision',
    psychology: 'Confirmation bias. Validate immediately to reduce buyer\'s remorse in the highest drop-off window.',
    keyElements: [
      'Warm welcome from David Drake',
      'Studio address + parking info (2 Avondale Ave)',
      'Link to class schedule',
      '"No experience needed — we meet you where you are"',
    ],
    type: 'relationship',
    fromLine: 'David Drake — Drake Fitness',
    previewText: "Welcome to Drake Fitness. Here's everything you need to know for your first class.",
  },
  {
    day: 1,
    dayLabel: 'Day 1',
    subject: "You're all set — just show up",
    goal: 'Remove all friction and anxiety',
    psychology: 'Friction removal. No prep, no gear list. Reinforce the brand promise: "Sign up and show up."',
    keyElements: [
      '"There\'s nothing to prepare"',
      '"Wear whatever you\'d wear for a walk"',
      '"Every class is modified to your level"',
      'Photo of a real class in action',
    ],
    type: 'relationship',
    fromLine: 'David @ Drake Fitness',
    previewText: "No gear required. No experience needed. Just you.",
  },
  {
    day: 5,
    dayLabel: 'Day 5',
    subject: "Meet David — 25 years of keeping people moving",
    goal: 'Build coach authority + warmth',
    psychology: 'Authority + warmth. One coach, one story. People train with people, not brands.',
    keyElements: [
      'David\'s 25+ year coaching background',
      'His philosophy: strength for life, not competition',
      'A personal anecdote or member interaction',
      'Studio photo — inviting, not intimidating',
    ],
    type: 'relationship',
    fromLine: 'David Drake',
    previewText: "I've spent 25 years helping real people build real strength. Here's why.",
  },
  {
    day: 10,
    dayLabel: 'Day 10',
    subject: "How Sarah went from back pain to deadlifts",
    goal: 'Social proof from someone like them',
    psychology: 'Social proof at the "should I actually go?" moment. Use a relatable member story that mirrors the reader.',
    keyElements: [
      'Real member transformation story',
      'Before/after in terms of capability, not aesthetics',
      'Quote from the member in their own words',
      'Subtle CTA: "Ready to write your own story?"',
    ],
    type: 'relationship',
    fromLine: 'Drake Fitness',
    previewText: "She almost didn't come back after day one. Here's what changed.",
  },
  {
    day: 18,
    dayLabel: 'Day 18',
    subject: "How's it going? (reply to this email)",
    goal: 'Open personal dialogue',
    psychology: 'Personal touch. Plain-text feel. This is the email that separates you from every automated funnel.',
    keyElements: [
      'Plain text — no images, no fancy design',
      'Short (3-4 sentences max)',
      'Genuine question, not rhetorical',
      'Reply-to goes to David\'s real inbox',
    ],
    type: 'personal',
    fromLine: 'David Drake',
    previewText: "Just checking in — I'd love to hear how things are going.",
  },
  {
    day: 24,
    dayLabel: 'Day 24',
    subject: "Ready to keep going? Members-only offer inside",
    goal: 'First conversion ask',
    psychology: 'Conversion only after value is proven. By day 24, they\'ve experienced classes and built trust.',
    keyElements: [
      'Membership options with clear pricing',
      'Limited-time incentive (first month discount or bonus)',
      'Recap of what they\'ve experienced',
      'Single clear CTA button',
    ],
    type: 'conversion',
    fromLine: 'David Drake — Drake Fitness',
    previewText: "You've put in the work. Let's keep the momentum going.",
  },
  {
    day: 30,
    dayLabel: 'Day 30',
    subject: "Your free pass wraps up this week",
    goal: 'Urgency without pressure',
    psychology: 'Scarcity + recap. Not aggressive — just a clear deadline paired with a summary of benefits.',
    keyElements: [
      'Pass expiration reminder',
      'Recap: classes attended, what they\'ve learned',
      'Final membership offer',
      '"No pressure — but the door\'s open"',
    ],
    type: 'conversion',
    fromLine: 'Drake Fitness',
    previewText: "Your 3-class pass expires soon. Here's what members get next.",
  },
];

const winBackSequence: EmailStep[] = [
  {
    day: 0,
    dayLabel: 'Day 0',
    subject: "Hey — David here. We miss seeing you.",
    goal: 'Re-engage with warmth, no pitch',
    psychology: 'Personal from-line, warm, no pitch. Just a human reaching out.',
    keyElements: [
      'Short, personal message from David',
      '"The studio isn\'t the same without you"',
      'No CTA, no offer — just warmth',
      'Reply-to David\'s real email',
    ],
    type: 'personal',
    fromLine: 'David Drake',
    previewText: "It's been a while — just wanted to say hey.",
  },
  {
    day: 5,
    dayLabel: 'Day 5',
    subject: "What's new at the studio",
    goal: 'Spark curiosity',
    psychology: 'Curiosity. Show them what\'s changed — new classes, schedule updates, community growth.',
    keyElements: [
      'New class types or schedule changes',
      'Recent community moments or events',
      'Studio updates or improvements',
      'Light CTA: "Check out the new schedule"',
    ],
    type: 'relationship',
    fromLine: 'Drake Fitness',
    previewText: "A few things have changed since you were last here.",
  },
  {
    day: 12,
    dayLabel: 'Day 12',
    subject: "Mike's comeback story",
    goal: 'Social proof for re-engagement',
    psychology: 'A member who came back and is glad they did. Normalizes returning after a break.',
    keyElements: [
      'Story of a member who took a break and returned',
      'What made them come back',
      'How they felt after their first class back',
      '"It\'s never too late to walk back in"',
    ],
    type: 'relationship',
    fromLine: 'Drake Fitness',
    previewText: "He took 6 months off. Here's what happened when he came back.",
  },
  {
    day: 21,
    dayLabel: 'Day 21',
    subject: "Come back for a week — on us",
    goal: 'Low-commitment return offer',
    psychology: 'Low barrier. A free week removes the financial and commitment objections.',
    keyElements: [
      'Free week pass — no strings attached',
      'Link to book a class directly',
      '"Just one class. See how it feels."',
      'Expiration on the offer (7-10 days)',
    ],
    type: 'conversion',
    fromLine: 'David Drake — Drake Fitness',
    previewText: "No commitment. No catch. Just come move with us for a week.",
  },
  {
    day: 35,
    dayLabel: 'Day 35',
    subject: "The door's always open",
    goal: 'Soft close — plant the seed',
    psychology: 'No guilt, no pressure. The final touch that keeps the door open for whenever they\'re ready.',
    keyElements: [
      'Graceful, no-pressure close',
      '"Whenever you\'re ready, we\'re here"',
      'Studio hours and contact info',
      'Unsubscribe option prominently shown',
    ],
    type: 'personal',
    fromLine: 'David Drake',
    previewText: "No pressure. Whenever you're ready, we'll be here.",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={handleCopy}>
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
    </Button>
  );
}

function EmailCard({ step, index, total }: { step: EmailStep; index: number; total: number }) {
  const typeConfig = {
    relationship: { label: 'Relationship', badgeClass: 'bg-primary/10 text-primary border-primary/20', icon: Heart, dotClass: 'bg-primary' },
    conversion: { label: 'Conversion', badgeClass: 'bg-accent/20 text-accent-foreground border-accent/30', icon: TrendingUp, dotClass: 'bg-accent' },
    personal: { label: 'Personal Touch', badgeClass: 'bg-muted text-foreground border-border', icon: UserCheck, dotClass: 'bg-muted-foreground' },
  };
  const config = typeConfig[step.type];
  const Icon = config.icon;

  return (
    <div className="relative flex gap-4 md:gap-6">
      {/* Timeline connector */}
      <div className="hidden md:flex flex-col items-center">
        <div className={cn('w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-primary-foreground font-bold text-sm', config.dotClass)}>
          {step.day === 0 ? '⚡' : step.day}
        </div>
        {index < total - 1 && (
          <div className="w-0.5 flex-1 bg-border mt-2" />
        )}
      </div>

      {/* Card */}
      <Card className="flex-1 p-4 md:p-6 mb-4 md:mb-6 border shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="outline" className="md:hidden text-xs font-mono">
            {step.dayLabel}
          </Badge>
          <Badge variant="outline" className={cn('text-xs', config.badgeClass)}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
          <span className="text-xs text-muted-foreground ml-auto">From: {step.fromLine}</span>
        </div>

        {/* Subject line */}
        <div className="flex items-start gap-2 mb-2">
          <Mail className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <h3 className="font-semibold text-foreground text-sm md:text-base leading-snug flex-1">
            {step.subject}
          </h3>
          <CopyButton text={step.subject} />
        </div>

        {/* Preview text */}
        <p className="text-xs text-muted-foreground italic ml-6 mb-3">{step.previewText}</p>

        {/* Goal */}
        <div className="flex items-center gap-2 mb-3 ml-6">
          <Sparkles className="h-3.5 w-3.5 text-accent shrink-0" />
          <span className="text-sm font-medium text-foreground">{step.goal}</span>
        </div>

        {/* Psychology insight */}
        <div className="bg-muted/60 rounded-lg p-3 mb-3 ml-6">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Why it works:</strong> {step.psychology}
          </p>
        </div>

        {/* Key elements */}
        <ul className="space-y-1.5 ml-6">
          {step.keyElements.map((el, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
              <span>{el}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function SequenceTimeline({ steps }: { steps: EmailStep[] }) {
  return (
    <div className="max-w-3xl mx-auto">
      {steps.map((step, i) => (
        <EmailCard key={i} step={step} index={i} total={steps.length} />
      ))}
    </div>
  );
}

function ProviderTips() {
  const tips = [
    {
      icon: Monitor,
      title: 'Gmail',
      tips: [
        'Keep emails under 102KB to avoid clipping',
        'Use inline styles — Gmail strips <style> tags',
        'Test with both light and dark mode',
      ],
    },
    {
      icon: Smartphone,
      title: 'Outlook',
      tips: [
        'Images blocked by default — use ALT text',
        'Avoid CSS floats — use tables for layout',
        'Test Windows Outlook + Outlook.com separately',
      ],
    },
    {
      icon: Moon,
      title: 'Apple Mail / Dark Mode',
      tips: [
        'Add dark mode meta tag for color inversion',
        'Use transparent PNGs for logos',
        'Test both iOS Mail and macOS Mail',
      ],
    },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-accent" />
        Email Provider Compatibility
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tips.map((provider) => (
          <Card key={provider.title} className="p-4 border">
            <div className="flex items-center gap-2 mb-3">
              <provider.icon className="h-5 w-5 text-primary" />
              <h4 className="font-semibold text-sm text-foreground">{provider.title}</h4>
            </div>
            <ul className="space-y-2">
              {provider.tips.map((tip, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function EmailSequences() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-hero font-bold text-foreground uppercase tracking-tight">
            Email Nurture Playbook
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Proven sequences for converting leads and re-engaging lapsed members.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'New Lead Emails', value: '7', sub: '30-day sequence' },
            { label: 'Win-Back Emails', value: '5', sub: '35-day sequence' },
            { label: 'Conversion Emails', value: '3', sub: 'Across both tracks' },
            { label: 'Personal Touches', value: '3', sub: 'Plain-text style' },
          ].map((stat) => (
            <Card key={stat.label} className="p-3 md:p-4 border text-center">
              <div className="text-xl md:text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs font-medium text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="new-lead" className="w-full">
          <TabsList className="w-full grid grid-cols-2 h-auto">
            <TabsTrigger value="new-lead" className="text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Clock className="h-4 w-4 mr-1.5 hidden sm:inline" />
              New Lead Nurture
            </TabsTrigger>
            <TabsTrigger value="win-back" className="text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="h-4 w-4 mr-1.5 hidden sm:inline" />
              Win-Back Sequence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new-lead" className="mt-6">
            {/* Strategy summary */}
            <Card className="p-4 md:p-5 border border-primary/20 bg-primary/5 mb-6">
              <h3 className="font-semibold text-foreground text-sm mb-2">Strategy: Try 3 Free Classes → Member</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div><strong className="text-foreground">Days 0–1:</strong> Reduce remorse + remove friction</div>
                <div><strong className="text-foreground">Days 5–18:</strong> Build trust + social proof + check-in</div>
                <div><strong className="text-foreground">Days 24–30:</strong> Convert only after value is proven</div>
              </div>
            </Card>
            <SequenceTimeline steps={newLeadSequence} />
          </TabsContent>

          <TabsContent value="win-back" className="mt-6">
            <Card className="p-4 md:p-5 border border-primary/20 bg-primary/5 mb-6">
              <h3 className="font-semibold text-foreground text-sm mb-2">Strategy: Lapsed Member → Return Visit</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div><strong className="text-foreground">Days 0–5:</strong> Warm re-engagement, no pitch</div>
                <div><strong className="text-foreground">Days 12–21:</strong> Social proof + low-barrier offer</div>
                <div><strong className="text-foreground">Day 35:</strong> Soft close — plant the seed</div>
              </div>
            </Card>
            <SequenceTimeline steps={winBackSequence} />
          </TabsContent>
        </Tabs>

        <ProviderTips />
      </div>
    </AdminLayout>
  );
}
