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
          {/* Logo */}
          <img 
            src={drakeLogo} 
            alt="Drake Fitness" 
            className="w-auto h-auto max-w-full mb-8 mx-auto" 
          />
          
          {/* Bold metric display */}
          <div className="mb-6">
            {/* Decorative line with number */}
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-drake-gold/60" />
              <span className="font-hero text-6xl md:text-7xl lg:text-8xl text-white tracking-tight">
                10+
              </span>
              <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-drake-gold/60" />
            </div>
            <p className="font-hero text-xl md:text-2xl text-drake-gold uppercase tracking-widest">
              Years
            </p>
          </div>
          
          {/* Supporting statement */}
          <div className="space-y-3 text-white/90">
            <p className="text-lg md:text-xl font-medium">
              Clients training with us for over a decade.
            </p>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              That doesn't happen from trends or hype. It happens because the work is thoughtful, safe, and built for real life.
            </p>
          </div>
        </div>
      </div>
    </section>;
}
export default LongevityBlock;