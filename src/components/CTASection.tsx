import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  variant?: "primary" | "gold" | "dark";
}

const CTASection = ({ title, subtitle, ctaText, ctaLink, variant = "primary" }: CTASectionProps) => {
  const bgClasses = {
    primary: "bg-primary",
    gold: "bg-drake-gold",
    dark: "bg-drake-dark",
  };

  const textClasses = {
    primary: "text-white",
    gold: "text-drake-dark",
    dark: "text-white",
  };

  const buttonClasses = {
    primary: "bg-drake-gold hover:bg-drake-gold/90 text-drake-dark",
    gold: "bg-drake-dark hover:bg-drake-dark/90 text-white",
    dark: "bg-drake-gold hover:bg-drake-gold/90 text-drake-dark",
  };

  return (
    <section className={`${bgClasses[variant]} py-16 md:py-20`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textClasses[variant]}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${variant === "gold" ? "text-drake-dark/80" : "text-gray-200"}`}>
            {subtitle}
          </p>
        )}
        <Button asChild size="lg" className={`${buttonClasses[variant]} font-semibold text-lg px-8 py-6`}>
          <Link to={ctaLink}>{ctaText}</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
