import { useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Check, Download, Loader2 } from 'lucide-react';
import IntakeFieldRenderer from '@/components/intake/IntakeField';
import {
  INTAKE_SCHEMA,
  IntakeAnswers,
  isFieldVisible,
  detailKey,
} from '@/components/intake/schema';
import { buildIntakePdf, intakeFileName } from '@/lib/intakePdf';

const STUDIO_EMAIL = 'david@drake.fitness';
const DRAFT_KEY = 'drake-intake-draft-v1';

const emailSchema = z.string().trim().email('Please enter a valid email address').max(255);
const phoneSchema = z
  .string()
  .trim()
  .min(7, 'Please enter a valid phone number')
  .max(25)
  .regex(/^[0-9+()\-.\s]+$/, 'Please enter a valid phone number');

export default function Intake() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<IntakeAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [emailed, setEmailed] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const topRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);


  const step = INTAKE_SCHEMA[stepIndex];
  const total = INTAKE_SCHEMA.length;
  const progress = Math.round(((stepIndex + (isDone ? 1 : 0)) / total) * 100);

  /* Restore an in-progress draft after an accidental refresh. */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { stepIndex?: number; answers?: IntakeAnswers };
      if (saved.answers && Object.keys(saved.answers).length) {
        setAnswers(saved.answers);
        setStepIndex(Math.min(Math.max(saved.stepIndex ?? 0, 0), INTAKE_SCHEMA.length - 1));
        toast.info('We restored your answers from earlier.');
      }
    } catch {
      /* ignore malformed drafts */
    }
  }, []);

  useEffect(() => {
    if (isDone) return;
    if (!Object.keys(answers).length) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ stepIndex, answers }));
    } catch {
      /* storage may be full or blocked — draft saving is best-effort */
    }
  }, [answers, stepIndex, isDone]);

  const visibleFields = useMemo(
    () => step.fields.filter((f) => isFieldVisible(f, answers)),
    [step, answers],
  );


  const handleChange = (key: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateStep = () => {
    const next: Record<string, string> = {};

    visibleFields.forEach((field) => {
      const raw = answers[field.k];
      const value = typeof raw === 'string' ? raw.trim() : raw;

      if (field.t === 'ack') {
        if (field.req && value !== 'Yes') next[field.k] = 'You must accept this to continue.';
        return;
      }

      if (field.t === 'sig') {
        if (field.req && !value) next[field.k] = 'Please sign in the box above.';
        return;
      }

      if (field.t === 'legal' || field.t === 'group' || field.t === 'checks') return;

      if (field.req && (!value || (Array.isArray(value) && value.length === 0))) {
        next[field.k] = 'This answer is required.';
        return;
      }

      if (typeof value === 'string' && value) {
        if (field.t === 'email') {
          const result = emailSchema.safeParse(value);
          if (!result.success) next[field.k] = result.error.issues[0].message;
        }
        if (field.t === 'tel') {
          const result = phoneSchema.safeParse(value);
          if (!result.success) next[field.k] = result.error.issues[0].message;
        }
        if (field.t === 'date' && field.k === 'dob') {
          const dob = new Date(`${value}T00:00:00`);
          const now = new Date();
          if (Number.isNaN(dob.getTime()) || dob > now) {
            next[field.k] = 'Please enter a valid date of birth.';
          } else if (now.getFullYear() - dob.getFullYear() > 120) {
            next[field.k] = 'Please check the year on your date of birth.';
          }
        }
        if (field.k === 'zip' && !/^\d{5}(-\d{4})?$/.test(value)) {
          next[field.k] = 'Please enter a 5-digit ZIP code.';
        }
        if (field.k === 'state' && !/^[A-Za-z]{2}$|^[A-Za-z][A-Za-z .'-]{2,24}$/.test(value)) {
          next[field.k] = 'Please enter a state (e.g. SC).';
        }
      }


      if (field.t === 'yn' && value === 'Yes' && field.ynDetail) {
        const dk = detailKey(field.k);
        const detail = (answers[dk] as string | undefined)?.trim();
        if (!detail) next[dk] = 'Please add a little more detail.';
      }
    });

    setErrors(next);

    if (Object.keys(next).length) {
      const firstKey = Object.keys(next)[0];
      const el = document.querySelector<HTMLElement>(`[aria-invalid="true"], #${CSS.escape(firstKey)}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus?.();
      return false;
    }
    return true;
  };

  const goTo = (index: number) => {
    setStepIndex(index);
    setErrors({});
    /* Instant, deterministic reset so the new step always opens at its heading. */
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      headingRef.current?.focus({ preventScroll: true });
    });
  };


  const downloadPdf = () => {
    const doc = buildIntakePdf(answers);
    doc.save(intakeFileName(answers));
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (stepIndex < total - 1) {
      goTo(stepIndex + 1);
      return;
    }

    if (honeypot) {
      // Bot filled the hidden field — pretend success without sending.
      setIsDone(true);
      return;
    }

    setIsSubmitting(true);
    let clientCopySent = false;
    try {
      const doc = buildIntakePdf(answers);
      const base64 = doc.output('datauristring').split(',')[1];

      const { data, error } = await supabase.functions.invoke('send-intake-form', {
        body: {
          name: String(answers.name || '').trim(),
          email: String(answers.email || '').trim(),
          phone: String(answers.cell || '').trim(),
          fileName: intakeFileName(answers),
          pdfBase64: base64,
        },
      });

      if (error) throw error;
      clientCopySent = Boolean((data as { clientCopySent?: boolean } | null)?.clientCopySent);
      setEmailed(true);
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      if (!clientCopySent) {
        toast.info('Sent to David. Download your own copy below for your records.');
      }
    } catch (err) {
      console.error('Intake submission failed:', err);
      setEmailed(false);
      toast.error("We couldn't email your form — please download your copy and send it to David.");
    } finally {
      setIsSubmitting(false);
      setIsDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  /* ------------------------------------------------------------ complete */
  if (isDone) {
    return (
      <>
        <SEO
          title="Client History & Agreement"
          description="Drake Fitness client history and training agreement. Takes about 8–10 minutes."
          canonical="https://www.drake.fitness/intake"
          noindex
        />
        <main className="min-h-dvh bg-muted/40 px-4 py-16">
          <Card className="mx-auto max-w-xl shadow-card">
            <CardContent className="space-y-6 p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-8 w-8" aria-hidden="true" />
              </div>
              <h1 className="font-hero text-3xl uppercase">Thank you</h1>
              <p className="text-muted-foreground">
                {emailed
                  ? 'Your intake form is on its way to David, with a copy to ddrake311@gmail.com, and a copy has been emailed to you. He reviews every form before your first session — expect a note back shortly.'
                  : `Your form is complete, but the email didn\u2019t go through. Download your copy below and send it to ${STUDIO_EMAIL} and David will take it from there.`}
              </p>
              <Button onClick={downloadPdf} size="lg" className="min-h-11 w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Download my copy (PDF)
              </Button>
              <p className="text-xs text-muted-foreground">
                Questions? Call (843) 817-5420 or email {STUDIO_EMAIL}.
              </p>

            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  /* -------------------------------------------------------------- wizard */
  return (
    <>
      <SEO
        title="Client History & Agreement"
        description="Drake Fitness client history and training agreement. Takes about 8–10 minutes."
        canonical="https://www.drake.fitness/intake"
        noindex
      />

      <div className="min-h-dvh bg-muted/40" ref={topRef}>
        {/* Progress */}
        <div className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-3xl px-4 py-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${Math.max(progress, 4)}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="font-heading font-semibold">{step.name}</span>
              <span className="text-muted-foreground">
                Step {stepIndex + 1} of {total}
              </span>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-3xl px-4 pb-32 pt-8 md:pb-0">
          <p aria-live="polite" className="sr-only">
            {`Step ${stepIndex + 1} of ${total}: ${step.title ?? step.name}`}
          </p>

          {/* Masthead — full on step 1, compact after */}
          <div className={stepIndex === 0 ? 'mb-8 text-center' : 'mb-5'}>
            {stepIndex === 0 && (
              <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Drake Fitness
              </p>
            )}
            <h1
              className={
                stepIndex === 0
                  ? 'font-hero mt-2 text-3xl uppercase leading-tight md:text-4xl'
                  : 'font-heading text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground'
              }
            >
              Client History &amp; Agreement
            </h1>
            {stepIndex === 0 && (
              <p className="mt-3 text-muted-foreground">
                Takes about 8–10 minutes. Your answers go directly to David Drake.
              </p>
            )}
          </div>

          {step.title && (
            <header className="mb-6">
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="font-hero text-2xl uppercase leading-tight outline-none md:text-3xl"
              >
                {step.title}
              </h2>
              {step.sub && <p className="mt-2 text-muted-foreground">{step.sub}</p>}
            </header>
          )}



          <Card className="shadow-card">
            <CardContent className="space-y-7 p-5 md:p-8">
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                {visibleFields.map((field) => (
                  <div
                    key={field.k}
                    className={field.half ? 'md:col-span-1' : 'md:col-span-2'}
                  >
                    <IntakeFieldRenderer
                      field={field}
                      answers={answers}
                      errors={errors}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              {/* Honeypot — hidden from people, tempting to bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company-website">Company website</label>
                <input
                  id="company-website"
                  name="company-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
            Your answers are sent directly to David over an encrypted connection and are only kept in this browser until you submit.
          </p>

        </main>

        {/* Nav — sticky footer on mobile, inline under the form on desktop */}
        <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:static md:border-0 md:bg-transparent md:pb-0 md:backdrop-blur-none">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 md:justify-end md:pb-16 md:pt-8">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="min-h-11"
              onClick={() => goTo(stepIndex - 1)}
              disabled={stepIndex === 0 || isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back
            </Button>
            <Button type="button" size="lg" className="min-h-11 flex-1 sm:flex-none" onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : stepIndex === total - 1 ? (
                <>
                  Submit form
                  <Check className="ml-2 h-4 w-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
