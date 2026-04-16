import { useState, useRef, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Copy, Check, Mail, Clock, Heart, UserCheck, 
  TrendingUp, AlertCircle, Sparkles, ArrowRight,
  Monitor, Smartphone, Moon, Send, Loader2, Eye, Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { getEmailPreviewHtml } from '@/lib/emailTemplates';

interface EmailStep {
  day: number;
  dayLabel: string;
  stepName: string;
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
    day: 0, dayLabel: 'Instant', stepName: '1. Welcome & What to Expect',
    subject: "You're in — here's what happens next",
    goal: 'Confirm & validate their decision',
    psychology: 'Confirmation bias. Validate immediately to reduce buyer\'s remorse in the highest drop-off window.',
    keyElements: ['Warm welcome from David Drake', 'Studio address + parking info (2 Avondale Ave)', 'Link to class schedule', '"No experience needed — we meet you where you are"'],
    type: 'relationship', fromLine: 'David Drake — Drake Fitness',
    previewText: "Welcome to Drake Fitness. Here's everything you need to know for your first class.",
  },
  {
    day: 1, dayLabel: 'Day 1', stepName: '2. Just Show Up',
    subject: "You're all set — just show up",
    goal: 'Remove all friction and anxiety',
    psychology: 'Friction removal. No prep, no gear list. Reinforce the brand promise: "Sign up and show up."',
    keyElements: ['"There\'s nothing to prepare"', '"Wear whatever you\'d wear for a walk"', '"Every class is modified to your level"', 'Photo of a real class in action'],
    type: 'relationship', fromLine: 'David @ Drake Fitness',
    previewText: "No gear required. No experience needed. Just you.",
  },
  {
    day: 3, dayLabel: 'Day 3', stepName: '3. Recovery & Reassurance',
    subject: "Feeling sore? Good — here's what to do next",
    goal: 'Normalize soreness & bridge to class 2',
    psychology: 'Recovery reassurance. The 48-72hr window after a first class is the highest dropout moment. Normalizing soreness and providing actionable tips positions David as their coach, not a salesperson.',
    keyElements: ['Normalize soreness: "Your body is responding — that\'s the point"', '4 recovery tips: Hydrate, Eat whole foods, Walk 15 min, Sleep', 'Coach\'s Tip callout: diaphragmatic breathing teaser (Original Strength)', '"Class 2 is always easier than class 1" — bridge to next visit'],
    type: 'relationship', fromLine: 'David Drake',
    previewText: "Here's exactly what to do before your next class.",
  },
  {
    day: 5, dayLabel: 'Day 5', stepName: '4. Meet Your Coach',
    subject: "Meet David — 25 years of keeping people moving",
    goal: 'Build coach authority + warmth',
    psychology: 'Authority + warmth. One coach, one story. People train with people, not brands.',
    keyElements: ['David\'s 25+ year coaching background', 'His philosophy: strength for life, not competition', 'A personal anecdote or member interaction', 'Studio photo — inviting, not intimidating'],
    type: 'relationship', fromLine: 'David Drake',
    previewText: "I've spent 25 years helping real people build real strength. Here's why.",
  },
  {
    day: 10, dayLabel: 'Day 10', stepName: '5. Member Success Stories',
    subject: "How Sarah went from back pain to deadlifts",
    goal: 'Social proof from someone like them',
    psychology: 'Social proof at the "should I actually go?" moment. Use a relatable member story that mirrors the reader.',
    keyElements: ['Real member transformation story', 'Before/after in terms of capability, not aesthetics', 'Quote from the member in their own words', 'Subtle CTA: "Ready to write your own story?"'],
    type: 'relationship', fromLine: 'Drake Fitness',
    previewText: "She almost didn't come back after day one. Here's what changed.",
  },
  {
    day: 18, dayLabel: 'Day 18', stepName: '6. Personal Check-In',
    subject: "How's it going? (reply to this email)",
    goal: 'Open personal dialogue',
    psychology: 'Personal touch. Plain-text feel. This is the email that separates you from every automated funnel.',
    keyElements: ['Plain text — no images, no fancy design', 'Short (3-4 sentences max)', 'Genuine question, not rhetorical', 'Reply-to goes to David\'s real inbox'],
    type: 'personal', fromLine: 'David Drake',
    previewText: "Just checking in — I'd love to hear how things are going.",
  },
  {
    day: 24, dayLabel: 'Day 24', stepName: '7. Membership Offer',
    subject: "Ready to keep going? Members-only offer inside",
    goal: 'First conversion ask',
    psychology: 'Conversion only after value is proven. By day 24, they\'ve experienced classes and built trust.',
    keyElements: ['Membership options with clear pricing', 'Limited-time incentive (first month discount or bonus)', 'Recap of what they\'ve experienced', 'Single clear CTA button'],
    type: 'conversion', fromLine: 'David Drake — Drake Fitness',
    previewText: "You've put in the work. Let's keep the momentum going.",
  },
  {
    day: 30, dayLabel: 'Day 30', stepName: '8. Final Reminder',
    subject: "Your free pass wraps up this week",
    goal: 'Urgency without pressure',
    psychology: 'Scarcity + recap. Not aggressive — just a clear deadline paired with a summary of benefits.',
    keyElements: ['Pass expiration reminder', 'Recap: classes attended, what they\'ve learned', 'Final membership offer', '"No pressure — but the door\'s open"'],
    type: 'conversion', fromLine: 'Drake Fitness',
    previewText: "Your 3-class pass expires soon. Here's what members get next.",
  },
];

const winBackSequence: EmailStep[] = [
  {
    day: 0, dayLabel: 'Day 0', stepName: '1. We Miss You',
    subject: "Hey — David here. We miss seeing you.",
    goal: 'Re-engage with warmth, no pitch',
    psychology: 'Personal from-line, warm, no pitch. Just a human reaching out.',
    keyElements: ['Short, personal message from David', '"The studio isn\'t the same without you"', 'No CTA, no offer — just warmth', 'Reply-to David\'s real email'],
    type: 'personal', fromLine: 'David Drake',
    previewText: "It's been a while — just wanted to say hey.",
  },
  {
    day: 5, dayLabel: 'Day 5', stepName: '2. What\'s New',
    subject: "What's new at the studio",
    goal: 'Spark curiosity',
    psychology: 'Curiosity. Show them what\'s changed — new classes, schedule updates, community growth.',
    keyElements: ['New class types or schedule changes', 'Recent community moments or events', 'Studio updates or improvements', 'Light CTA: "Check out the new schedule"'],
    type: 'relationship', fromLine: 'Drake Fitness',
    previewText: "A few things have changed since you were last here.",
  },
  {
    day: 12, dayLabel: 'Day 12', stepName: '3. Comeback Story',
    subject: "Mike's comeback story",
    goal: 'Social proof for re-engagement',
    psychology: 'A member who came back and is glad they did. Normalizes returning after a break.',
    keyElements: ['Story of a member who took a break and returned', 'What made them come back', 'How they felt after their first class back', '"It\'s never too late to walk back in"'],
    type: 'relationship', fromLine: 'Drake Fitness',
    previewText: "He took 6 months off. Here's what happened when he came back.",
  },
  {
    day: 21, dayLabel: 'Day 21', stepName: '4. Free Week Offer',
    subject: "Come back for a week — on us",
    goal: 'Low-commitment return offer',
    psychology: 'Low barrier. A free week removes the financial and commitment objections.',
    keyElements: ['Free week pass — no strings attached', 'Link to book a class directly', '"Just one class. See how it feels."', 'Expiration on the offer (7-10 days)'],
    type: 'conversion', fromLine: 'David Drake — Drake Fitness',
    previewText: "No commitment. No catch. Just come move with us for a week.",
  },
  {
    day: 35, dayLabel: 'Day 35', stepName: '5. Door\'s Always Open',
    subject: "The door's always open",
    goal: 'Soft close — plant the seed',
    psychology: 'No guilt, no pressure. The final touch that keeps the door open for whenever they\'re ready.',
    keyElements: ['Graceful, no-pressure close', '"Whenever you\'re ready, we\'re here"', 'Studio hours and contact info', 'Unsubscribe option prominently shown'],
    type: 'personal', fromLine: 'David Drake',
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
      {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
    </Button>
  );
}

function EmailCard({ step, index, total, sequenceKey, onPreview }: { step: EmailStep; index: number; total: number; sequenceKey: 'new-lead' | 'win-back'; onPreview: (seq: 'new-lead' | 'win-back', dayLabel: string, subject: string) => void }) {
  const typeConfig = {
    relationship: { label: 'Relationship', badgeClass: 'bg-primary/10 text-primary border-primary/20', icon: Heart, dotClass: 'bg-primary' },
    conversion: { label: 'Conversion', badgeClass: 'bg-accent/20 text-accent-foreground border-accent/30', icon: TrendingUp, dotClass: 'bg-accent' },
    personal: { label: 'Personal Touch', badgeClass: 'bg-muted text-foreground border-border', icon: UserCheck, dotClass: 'bg-muted-foreground' },
  };
  const config = typeConfig[step.type];
  const Icon = config.icon;

  return (
    <div className="relative flex gap-4 md:gap-6">
      <div className="hidden md:flex flex-col items-center">
        <div className={cn('w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-primary-foreground font-bold text-sm', config.dotClass)}>
          {step.day === 0 ? '⚡' : step.day}
        </div>
        {index < total - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
      </div>
      <Card className="flex-1 p-4 md:p-6 mb-4 md:mb-6 border shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-sm font-bold text-foreground">{step.stepName}</span>
          <span className="text-xs text-muted-foreground">· {step.dayLabel}</span>
          <Badge variant="outline" className={cn('text-xs ml-auto', config.badgeClass)}>
            <Icon className="h-3 w-3 mr-1" />{config.label}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">From: {step.fromLine}</span>
        </div>
        <div className="flex items-start gap-2 mb-2">
          <Mail className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <h3 className="font-semibold text-foreground text-sm md:text-base leading-snug flex-1">{step.subject}</h3>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => onPreview(sequenceKey, step.dayLabel, step.subject)} title="Preview email">
            <Eye className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
          <CopyButton text={step.subject} />
        </div>
        <p className="text-xs text-muted-foreground italic ml-6 mb-3">{step.previewText}</p>
        <div className="flex items-center gap-2 mb-3 ml-6">
          <Sparkles className="h-3.5 w-3.5 text-accent shrink-0" />
          <span className="text-sm font-medium text-foreground">{step.goal}</span>
        </div>
        <div className="bg-muted/60 rounded-lg p-3 mb-3 ml-6">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Why it works:</strong> {step.psychology}
          </p>
        </div>
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

function SequenceTimeline({ steps, sequenceKey, onPreview }: { steps: EmailStep[]; sequenceKey: 'new-lead' | 'win-back'; onPreview: (seq: 'new-lead' | 'win-back', dayLabel: string, subject: string) => void }) {
  return (
    <div className="max-w-3xl mx-auto">
      {steps.map((step, i) => (
        <EmailCard key={i} step={step} index={i} total={steps.length} sequenceKey={sequenceKey} onPreview={onPreview} />
      ))}
    </div>
  );
}

function ProviderTips() {
  const tips = [
    { icon: Monitor, title: 'Gmail', tips: ['Keep emails under 102KB to avoid clipping', 'Use inline styles — Gmail strips <style> tags', 'Test with both light and dark mode'] },
    { icon: Smartphone, title: 'Outlook', tips: ['Images blocked by default — use ALT text', 'Avoid CSS floats — use tables for layout', 'Test Windows Outlook + Outlook.com separately'] },
    { icon: Moon, title: 'Apple Mail / Dark Mode', tips: ['Add dark mode meta tag for color inversion', 'Use transparent PNGs for logos', 'Test both iOS Mail and macOS Mail'] },
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
                  <span className="text-primary mt-0.5">•</span>{tip}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}

function EmailPreviewDialog({ open, onOpenChange, sequenceKey, dayLabel, subject }: { open: boolean; onOpenChange: (o: boolean) => void; sequenceKey: 'new-lead' | 'win-back'; dayLabel: string; subject: string }) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [htmlCopied, setHtmlCopied] = useState(false);
  const html = getEmailPreviewHtml(sequenceKey, dayLabel);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !html) return;
    const doc = iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [html, device, open]);

  const handleCopyHtml = () => {
    if (!html) return;
    navigator.clipboard.writeText(html);
    setHtmlCopied(true);
    toast.success('Raw HTML copied — paste directly into PunchPass');
    setTimeout(() => setHtmlCopied(false), 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-4 py-3 border-b flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-sm font-semibold truncate">{subject}</DialogTitle>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={handleCopyHtml}
                disabled={!html}
              >
                {htmlCopied ? <Check className="h-3.5 w-3.5 mr-1 text-primary" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {htmlCopied ? 'Copied!' : 'Copy HTML'}
              </Button>
              <Button
                variant={device === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setDevice('desktop')}
              >
                <Monitor className="h-3.5 w-3.5 mr-1" />Desktop
              </Button>
              <Button
                variant={device === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setDevice('mobile')}
              >
                <Smartphone className="h-3.5 w-3.5 mr-1" />Mobile
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-auto bg-muted/30 flex justify-center p-4">
          {html ? (
            <iframe
              ref={iframeRef}
              title="Email Preview"
              className="border rounded-lg bg-background shadow-sm transition-all duration-300"
              style={{
                width: device === 'desktop' ? 600 : 375,
                maxWidth: '100%',
                height: '100%',
                minHeight: 500,
              }}
            />
          ) : (
            <div className="flex items-center justify-center text-muted-foreground text-sm">
              No preview available for this email.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function EmailSequences() {
  const [sending, setSending] = useState(false);
  const [pushing, setPushing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<{ open: boolean; seq: 'new-lead' | 'win-back'; dayLabel: string; subject: string }>({ open: false, seq: 'new-lead', dayLabel: '', subject: '' });

  const handlePushToResend = async (file: File) => {
    setPushing(true);
    try {
      const csv = await file.text();
      // Build template map: { "Day 0": "<html>...", ... }
      const dayLabels = ['Day 0', 'Day 5', 'Day 12', 'Day 21', 'Day 35'];
      const templates: Record<string, string> = {};
      for (const d of dayLabels) {
        const html = getEmailPreviewHtml('win-back', d);
        if (html) templates[d] = html;
      }
      const { data, error } = await supabase.functions.invoke('push-winback-to-resend', {
        body: { csv, templates },
      });
      if (error) throw error;
      const added = data?.contacts?.added ?? 0;
      const skipped = data?.contacts?.skipped ?? 0;
      const okBroadcasts = (data?.broadcasts ?? []).filter((b: { broadcast_id?: string }) => b.broadcast_id).length;
      toast.success(`Audience updated: +${added} added, ${skipped} skipped. ${okBroadcasts}/5 broadcast drafts created. Review & schedule in Resend.`);
      console.log('push-winback-to-resend result:', data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to push to Resend';
      toast.error(msg);
      console.error(err);
    } finally {
      setPushing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSendPreviews = async () => {
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-nurture-previews');
      if (error) throw error;
      toast.success(`${data.sent} of ${data.total} preview emails sent!`);
      if (data.failed > 0) toast.warning(`${data.failed} emails failed to send.`);
    } catch (err) {
      toast.error('Failed to send preview emails. DNS may still be verifying.');
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handlePreview = (seq: 'new-lead' | 'win-back', dayLabel: string, subject: string) => {
    setPreview({ open: true, seq, dayLabel, subject });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-hero font-bold text-foreground uppercase tracking-tight">Email Nurture Playbook</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">Proven sequences for converting leads and re-engaging lapsed members.</p>
          </div>
          <Button variant="gold" onClick={handleSendPreviews} disabled={sending} className="shrink-0">
            {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
            {sending ? 'Sending…' : 'Send Preview Emails'}
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'New Lead Emails', value: '8', sub: '30-day sequence' },
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

        <Tabs defaultValue="new-lead" className="w-full">
          <TabsList className="w-full grid grid-cols-2 h-auto">
            <TabsTrigger value="new-lead" className="text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Clock className="h-4 w-4 mr-1.5 hidden sm:inline" />New Lead Nurture
            </TabsTrigger>
            <TabsTrigger value="win-back" className="text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="h-4 w-4 mr-1.5 hidden sm:inline" />Win-Back Sequence
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new-lead" className="mt-6">
            <Card className="p-4 md:p-5 border border-primary/20 bg-primary/5 mb-6">
              <h3 className="font-semibold text-foreground text-sm mb-2">Strategy: Try 3 Free Classes → Member</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div><strong className="text-foreground">Days 0–1:</strong> Reduce remorse + remove friction</div>
                <div><strong className="text-foreground">Days 5–18:</strong> Build trust + social proof + check-in</div>
                <div><strong className="text-foreground">Days 24–30:</strong> Convert only after value is proven</div>
              </div>
            </Card>
            <SequenceTimeline steps={newLeadSequence} sequenceKey="new-lead" onPreview={handlePreview} />
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
            <SequenceTimeline steps={winBackSequence} sequenceKey="win-back" onPreview={handlePreview} />
          </TabsContent>
        </Tabs>

        <ProviderTips />
      </div>

      <EmailPreviewDialog
        open={preview.open}
        onOpenChange={(o) => setPreview((p) => ({ ...p, open: o }))}
        sequenceKey={preview.seq}
        dayLabel={preview.dayLabel}
        subject={preview.subject}
      />
    </AdminLayout>
  );
}
