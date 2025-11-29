import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
interface CTASectionProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  variant?: "primary" | "gold" | "dark";
  eyebrow?: string;
  slanted?: boolean;
}
const CTASection = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  variant = "primary",
  eyebrow,
  slanted = false
}: CTASectionProps) => {
  const bgClasses = {
    primary: "bg-primary",
    gold: "bg-drake-gold",
    dark: "bg-drake-dark"
  };
  const textClasses = {
    primary: "text-white",
    gold: "text-drake-dark",
    dark: "text-white"
  };
  const buttonClasses = {
    primary: "bg-drake-gold hover:bg-drake-gold/90 text-drake-dark",
    gold: "bg-drake-dark hover:bg-drake-dark/90 text-white",
    dark: "bg-drake-gold hover:bg-drake-gold/90 text-drake-dark"
  };
  return <section className={`${bgClasses[variant]} py-12 md:py-16 lg:py-20 ${slanted ? 'section-slant-top' : ''}`}>
      <div className="container mx-auto px-4 text-center text-primary-foreground">
        {eyebrow && <p className={`section-eyebrow ${variant === "gold" ? "text-drake-dark/70" : "text-gray-400"} mb-2`}>
            {eyebrow}
          </p>}
        <h2 className={`font-hero text-2xl md:text-3xl lg:text-4xl font-bold mb-4 uppercase tracking-tight ${textClasses[variant]}`}>
          {title}
        </h2>
        {subtitle && <p className={`text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto ${variant === "gold" ? "text-drake-dark/80" : "text-gray-200"}`}>
            {subtitle}
          </p>}
        <Button asChild size="lg" className={`${buttonClasses[variant]} font-semibold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto`}>
          <Link to={ctaLink}>{ctaText}</Link>
        </Button>
      </div>
    </section>;
};
export default CTASection;