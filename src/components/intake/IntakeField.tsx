import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import ResponsiveSignaturePad from './ResponsiveSignaturePad';
import { cn } from '@/lib/utils';
import { IntakeField as Field, IntakeAnswers, detailKey } from './schema';

interface Props {
  field: Field;
  answers: IntakeAnswers;
  errors: Record<string, string>;
  onChange: (key: string, value: string | string[]) => void;
}

const SCALE = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function IntakeField({ field, answers, errors, onChange }: Props) {
  const uid = useId();
  const id = `${uid}-${field.k}`;
  const error = errors[field.k];
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const value = answers[field.k];
  const describedBy = [field.hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;

  const QuestionLabel = ({ htmlFor }: { htmlFor?: string }) => (
    <Label htmlFor={htmlFor} className="text-base font-heading font-semibold leading-snug text-foreground">
      {field.q}
      {field.req && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
    </Label>
  );

  const Hint = () =>
    field.hint ? (
      <p id={hintId} className="text-sm text-muted-foreground">
        {field.hint}
      </p>
    ) : null;

  const Error = () =>
    error ? (
      <p id={errorId} className="text-sm font-medium text-destructive">
        {error}
      </p>
    ) : null;

  /* ---------------------------------------------------------------- legal */
  if (field.t === 'legal') {
    return (
      <section aria-labelledby={`${id}-title`} className="space-y-3">
        <h3 id={`${id}-title`} className="font-hero text-xl uppercase tracking-wide">
          {field.q}
        </h3>
        <div className="max-h-72 overflow-y-auto rounded-lg border bg-muted/40 p-4 space-y-3 text-sm leading-relaxed">
          {field.legal?.map((block, i) =>
            block.type === 'h' ? (
              <h4 key={i} className="font-heading font-semibold text-foreground pt-1">
                {block.text}
              </h4>
            ) : (
              <p key={i} className="text-muted-foreground">
                {block.text}
              </p>
            ),
          )}
        </div>
      </section>
    );
  }

  /* ------------------------------------------------------------------ ack */
  if (field.t === 'ack') {
    return (
      <div className="space-y-2">
        <div className="flex items-start gap-3 rounded-lg border p-4">
          <Checkbox
            id={id}
            checked={value === 'Yes'}
            onCheckedChange={(checked) => onChange(field.k, checked ? 'Yes' : '')}
            aria-describedby={describedBy}
            aria-invalid={!!error}
            className="mt-0.5 h-5 w-5"
          />
          <Label htmlFor={id} className="text-sm leading-relaxed cursor-pointer font-normal">
            {field.q}
          </Label>
        </div>
        <Error />
      </div>
    );
  }

  /* ------------------------------------------------------------ signature */
  if (field.t === 'sig') {
    return (
      <div className="space-y-2">
        <QuestionLabel />
        <Hint />
        <div className="rounded-lg border bg-card p-2 overflow-hidden">
          <ResponsiveSignaturePad onSignatureChange={(data) => onChange(field.k, data ?? '')} />
        </div>
        <Error />
      </div>
    );
  }

  /* ------------------------------------------------- yes/no matrix (group) */
  if (field.t === 'group') {
    return (
      <fieldset className="space-y-3">
        <legend className="text-base font-heading font-semibold mb-2">{field.q}</legend>
        <div className="space-y-2">
          {field.items?.map((item) => (
            <div
              key={item.k}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3"
            >
              <span className="text-sm">{item.q}</span>
              <RadioGroup
                value={(answers[item.k] as string) || ''}
                onValueChange={(v) => onChange(item.k, v)}
                className="flex gap-2"
                aria-label={item.q}
              >
                {['Yes', 'No'].map((opt) => (
                  <Label
                    key={opt}
                    htmlFor={`${id}-${item.k}-${opt}`}
                    className={cn(
                      'flex min-h-11 min-w-[4.5rem] cursor-pointer items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors',
                      answers[item.k] === opt
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'hover:bg-muted',
                    )}
                  >
                    <RadioGroupItem value={opt} id={`${id}-${item.k}-${opt}`} className="sr-only" />
                    {opt}
                  </Label>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </fieldset>
    );
  }

  /* --------------------------------------------------------------- yes/no */
  if (field.t === 'yn') {
    const showDetail = value === 'Yes' && !!field.ynDetail;
    const dKey = detailKey(field.k);
    return (
      <div className="space-y-3">
        <fieldset className="space-y-2">
          <legend className="text-base font-heading font-semibold leading-snug">
            {field.q}
            {field.req && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
          </legend>
          <Hint />
          <RadioGroup
            value={(value as string) || ''}
            onValueChange={(v) => onChange(field.k, v)}
            className="flex gap-3 pt-1"
            aria-describedby={describedBy}
          >
            {['Yes', 'No'].map((opt) => (
              <Label
                key={opt}
                htmlFor={`${id}-${opt}`}
                className={cn(
                  'flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors sm:flex-none sm:min-w-[6rem]',
                  value === opt ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted',
                )}
              >
                <RadioGroupItem value={opt} id={`${id}-${opt}`} className="sr-only" />
                {opt}
              </Label>
            ))}
          </RadioGroup>
          <Error />
        </fieldset>

        {showDetail && (
          <div className="space-y-2 border-l-2 border-primary/40 pl-4">
            <Label htmlFor={`${id}-detail`} className="text-sm font-medium">
              {field.ynDetail}
              <span className="text-destructive ml-1" aria-hidden="true">*</span>
            </Label>
            <Textarea
              id={`${id}-detail`}
              rows={2}
              value={(answers[dKey] as string) || ''}
              onChange={(e) => onChange(dKey, e.target.value)}
              aria-invalid={!!errors[dKey]}
              aria-describedby={errors[dKey] ? `${id}-detail-error` : undefined}
              className="text-base"
            />
            {errors[dKey] && (
              <p id={`${id}-detail-error`} className="text-sm font-medium text-destructive">
                {errors[dKey]}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  /* --------------------------------------------------------------- choice */
  if (field.t === 'choice') {
    return (
      <fieldset className="space-y-2">
        <legend className="text-base font-heading font-semibold leading-snug">
          {field.q}
          {field.req && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
        </legend>
        <Hint />
        <RadioGroup
          value={(value as string) || ''}
          onValueChange={(v) => onChange(field.k, v)}
          className="flex flex-wrap gap-3 pt-1"
          aria-describedby={describedBy}
        >
          {field.o?.map((opt) => (
            <Label
              key={opt}
              htmlFor={`${id}-${opt}`}
              className={cn(
                'flex min-h-11 cursor-pointer items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors',
                value === opt ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted',
              )}
            >
              <RadioGroupItem value={opt} id={`${id}-${opt}`} className="sr-only" />
              {opt}
            </Label>
          ))}
        </RadioGroup>
        <Error />
      </fieldset>
    );
  }

  /* --------------------------------------------------------------- checks */
  if (field.t === 'checks') {
    const selected = Array.isArray(value) ? value : [];
    return (
      <fieldset className="space-y-2">
        <legend className="text-base font-heading font-semibold leading-snug">{field.q}</legend>
        <Hint />
        <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
          {field.o?.map((opt) => (
            <Label
              key={opt}
              htmlFor={`${id}-${opt}`}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-4 py-2 text-sm font-normal transition-colors hover:bg-muted"
            >
              <Checkbox
                id={`${id}-${opt}`}
                checked={selected.includes(opt)}
                onCheckedChange={(checked) =>
                  onChange(field.k, checked ? [...selected, opt] : selected.filter((s) => s !== opt))
                }
              />
              {opt}
            </Label>
          ))}
        </div>
      </fieldset>
    );
  }

  /* ---------------------------------------------------------------- scale */
  if (field.t === 'scale') {
    return (
      <fieldset className="space-y-2">
        <legend className="text-base font-heading font-semibold leading-snug">
          {field.q}
          {field.req && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
        </legend>
        <RadioGroup
          value={(value as string) || ''}
          onValueChange={(v) => onChange(field.k, v)}
          className="grid grid-cols-5 gap-2 pt-1 sm:grid-cols-10"
          aria-describedby={describedBy}
        >
          {SCALE.map((n) => (
            <Label
              key={n}
              htmlFor={`${id}-${n}`}
              className={cn(
                'flex min-h-11 cursor-pointer items-center justify-center rounded-md border text-sm font-semibold transition-colors',
                value === n ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted',
              )}
            >
              <RadioGroupItem value={n} id={`${id}-${n}`} className="sr-only" />
              {n}
            </Label>
          ))}
        </RadioGroup>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{field.lo}</span>
          <span className="text-right">{field.hi}</span>
        </div>
        <Error />
      </fieldset>
    );
  }

  /* ------------------------------------------------------------- textarea */
  if (field.t === 'textarea') {
    return (
      <div className="space-y-2">
        <QuestionLabel htmlFor={id} />
        <Hint />
        <Textarea
          id={id}
          rows={3}
          value={(value as string) || ''}
          onChange={(e) => onChange(field.k, e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className="text-base"
        />
        <Error />
      </div>
    );
  }

  /* ----------------------------------------------------- text/tel/email/date */
  return (
    <div className="space-y-2">
      <QuestionLabel htmlFor={id} />
      <Hint />
      <Input
        id={id}
        type={field.t === 'text' ? 'text' : field.t}
        inputMode={field.t === 'tel' ? 'tel' : undefined}
        autoComplete={field.ac}
        value={(value as string) || ''}
        onChange={(e) => onChange(field.k, e.target.value)}
        aria-describedby={describedBy}
        aria-invalid={!!error}
        className="h-12 text-base"
      />
      <Error />
    </div>
  );
}
