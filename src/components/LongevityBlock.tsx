import { cn } from "@/lib/utils";
import { BRAND_QUOTES } from "@/data/trustStats";
import drakeLogo from "@/assets/drake-logo-new.png";
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
    return <div className={cn("py-6 text-center", className)}>
        <p className="text-muted-foreground italic max-w-2xl mx-auto">
          "{quote.text}"
        </p>
      </div>;
  }
  if (variant === 'card') {
    return <div className={cn("rounded-xl border border-drake-gold/30 bg-gradient-to-br from-drake-teal/5 to-transparent p-6 md:p-8", className)}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-drake-gold/20 flex items-center justify-center p-1.5">
            <img src={drakeLogo} alt="Drake Fitness" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-foreground font-medium leading-relaxed">
              {quote.text}
            </p>
          </div>
        </div>
      </div>;
  }

  // Default variant - prominent section
  return <section className={cn("py-12 md:py-16 bg-drake-teal text-white relative overflow-hidden", className)}>
      {/* Background design patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-drake-gold/10" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255,255,255,0.5) 20px,
            rgba(255,255,255,0.5) 21px
          )`
    }} />
      {/* Decorative blurred circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-drake-gold/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <img src={drakeLogo} alt="Drake Fitness" className="w-16 md:w-20 h-auto mb-6 mx-auto" />
          <blockquote className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
            "{quote.text}"
          </blockquote>
        </div>
      </div>
    </section>;
}
export default LongevityBlock;