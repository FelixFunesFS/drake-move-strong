import { cn } from "@/lib/utils";
import { BRAND_QUOTES } from "@/data/trustStats";
import { Heart } from "lucide-react";

interface LongevityBlockProps {
  className?: string;
  variant?: 'default' | 'card' | 'minimal';
}

export function LongevityBlock({ 
  className,
  variant = 'default'
}: LongevityBlockProps) {
  const quote = BRAND_QUOTES.longevity;

  if (variant === 'minimal') {
    return (
      <div className={cn(
        "py-6 text-center",
        className
      )}>
        <p className="text-muted-foreground italic max-w-2xl mx-auto">
          "{quote.text}"
        </p>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn(
        "rounded-xl border border-drake-gold/30 bg-gradient-to-br from-drake-teal/5 to-transparent p-6 md:p-8",
        className
      )}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-drake-gold/20 flex items-center justify-center">
            <Heart size={20} className="text-drake-gold" />
          </div>
          <div>
            <p className="text-foreground font-medium leading-relaxed">
              {quote.text}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default variant - prominent section
  return (
    <section className={cn(
      "py-12 md:py-16 bg-drake-teal text-white",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-6">
            <Heart size={28} className="text-drake-gold" />
          </div>
          <blockquote className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
            "{quote.text}"
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default LongevityBlock;
