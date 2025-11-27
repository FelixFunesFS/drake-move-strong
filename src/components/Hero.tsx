import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface HeroProps {
  title: string | ReactNode;
  subtitle: string;
  primaryCTA?: { text: string; link: string };
  secondaryCTA?: { text: string; link: string };
  backgroundImage?: string;
  overlay?: boolean;
  eyebrow?: string;
}

const Hero = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  overlay = true,
  eyebrow,
}: HeroProps) => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && <div className="absolute inset-0 bg-drake-dark/75" />}
        </>
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-drake-dark via-drake-dark-muted to-primary/20" />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {eyebrow && (
            <p className="text-drake-gold font-semibold text-sm uppercase tracking-wide mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA && (
              <Button
                asChild
                size="lg"
                className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold text-lg px-8 py-6"
              >
                <Link to={primaryCTA.link}>{primaryCTA.text}</Link>
              </Button>
            )}
            {secondaryCTA && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-drake-dark font-semibold text-lg px-8 py-6"
              >
                <Link to={secondaryCTA.link}>{secondaryCTA.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
