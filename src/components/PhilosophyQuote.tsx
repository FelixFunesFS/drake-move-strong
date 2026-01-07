import { cn } from "@/lib/utils";
import { BRAND_QUOTES } from "@/data/trustStats";
import { Quote } from "lucide-react";

type QuoteKey = keyof typeof BRAND_QUOTES;

interface PhilosophyQuoteProps {
  className?: string;
  variant?: 'hero' | 'inline' | 'card';
  quote?: QuoteKey;
}

export function PhilosophyQuote({ 
  className,
  variant = 'inline',
  quote = 'philosophy'
}: PhilosophyQuoteProps) {
  const quoteData = BRAND_QUOTES[quote];

  if (variant === 'hero') {
    return (
      <section className={cn(
        "py-16 md:py-24 bg-drake-dark text-white",
        className
      )}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Quote size={48} className="mx-auto mb-6 text-drake-gold opacity-50" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium leading-relaxed">
              "{quoteData.text}"
            </blockquote>
            {quoteData.attribution && (
              <cite className="block mt-6 text-lg text-white/70 not-italic">
                — {quoteData.attribution}
              </cite>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn(
        "rounded-xl border-l-4 border-drake-gold bg-muted/50 p-6 md:p-8",
        className
      )}>
        <Quote size={24} className="text-drake-gold/50 mb-3" />
        <blockquote className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
          "{quoteData.text}"
        </blockquote>
        {quoteData.attribution && (
          <cite className="block mt-4 text-sm text-muted-foreground not-italic">
            — {quoteData.attribution}
          </cite>
        )}
      </div>
    );
  }

  // Default: inline variant
  return (
    <div className={cn(
      "border-l-4 border-drake-teal pl-6 py-2",
      className
    )}>
      <blockquote className="text-lg text-muted-foreground italic leading-relaxed">
        "{quoteData.text}"
      </blockquote>
      {quoteData.attribution && (
        <cite className="block mt-2 text-sm text-muted-foreground not-italic font-medium">
          — {quoteData.attribution}
        </cite>
      )}
    </div>
  );
}

export default PhilosophyQuote;
