import { CheckCircle2, Target, Users, TrendingUp, Heart, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";
import AnimatedSection from "./AnimatedSection";
import { PUNCHPASS_URLS } from "@/data/pricing";

interface ReasonCard {
  image: string;
  alt: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  span?: boolean;
}

interface CommunityReasonsSectionProps {
  images: {
    communityGroupPhoto: string;
    turkishGetup: string;
    kettlebellRack: string;
    overheadPress: string;
    plankRows: string;
  };
}

const CommunityReasonsSection = ({ images }: CommunityReasonsSectionProps) => {
  const reasons: ReasonCard[] = [
    {
      image: images.turkishGetup,
      alt: "Group Turkish get-up class demonstrating mobility-first training",
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: "Mobility before intensity",
      description: "We improve how your joints move before adding load — eliminating pain and preventing injury.",
      link: "/mobility-fitness-avondale",
    },
    {
      image: images.kettlebellRack,
      alt: "Members holding kettlebells in rack position during functional strength class",
      icon: <Target className="w-5 h-5" />,
      title: "Functional strength for daily life",
      description: "Lift, carry, bend, twist, and move with confidence.",
    },
    {
      image: images.overheadPress,
      alt: "Small group overhead press class with personal coaching attention",
      icon: <Users className="w-5 h-5" />,
      title: "Small classes, real coaching",
      description: "You get attention, guidance, and form corrections every session.",
    },
    {
      image: images.plankRows,
      alt: "Members doing plank rows with kettlebells showing measurable progress",
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Progress you can measure",
      description: "Assessments every 4–8 weeks so you can see and feel your gains.",
    },
    {
      image: images.communityGroupPhoto,
      alt: "Drake Fitness community group photo — supportive, ego-free environment",
      icon: <Heart className="w-5 h-5" />,
      title: "Expert coaching, ego-free community",
      description: "25+ years helping real people achieve sustainable results. All ages and levels welcome.",
      span: true,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-drake-dark overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedSection animation="fadeInUp">
          <p className="section-eyebrow text-drake-gold text-center">WHAT MAKES US DIFFERENT</p>
          <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase text-white">
            Why Charleston Chooses <span className="text-drake-gold">Drake Fitness</span>
          </h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10 md:mb-14 text-lg">
            This isn't a gym. It's a studio built around joint health, mobility, and sustainable strength.
          </p>
        </AnimatedSection>

        {/* Grid: mobile single-col, desktop 3-col */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
          {/* Reason 1 */}
          <ReasonImageCard reason={reasons[0]} index={0} />

          {/* Reason 2 */}
          <ReasonImageCard reason={reasons[1]} index={1} />

          {/* Reason 3 */}
          <ReasonImageCard reason={reasons[2]} index={2} />

          {/* Reset Week CTA Card - inserted after 3rd reason */}
          <AnimatedSection animation="fadeInUp" delay={0.3} className="md:col-span-2">
            <div className="bg-primary rounded-xl p-6 md:p-8 flex flex-col justify-center h-full min-h-[220px]">
              <p className="section-eyebrow text-drake-gold mb-1">YOUR FIRST STEP</p>
              <h3 className="font-hero text-2xl md:text-3xl font-bold text-white uppercase mb-3">
                Reset Week — <span className="text-drake-gold">$50</span>
              </h3>
              <p className="text-gray-200 mb-6 text-base md:text-lg max-w-lg">
                7 days of unlimited classes. No commitment. No experience needed. See what mobility-first training feels like.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-bold text-base px-6 py-5 h-auto"
                >
                  <a
                    href={PUNCHPASS_URLS.resetWeek}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Start Reset Week
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-6 py-5 h-auto"
                >
                  <Link to="/schedule" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    View Schedule
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Reason 4 */}
          <ReasonImageCard reason={reasons[3]} index={3} />

          {/* Reason 5 - spans 2 cols on desktop */}
          <AnimatedSection animation="scaleIn" delay={0.15} className="md:col-span-2">
            <ReasonOverlayContent reason={reasons[4]} tall />
          </AnimatedSection>

          {/* Reason 4 duplicate removed — last col filled by span */}
        </div>
      </div>
    </section>
  );
};

/** Image card with gradient text overlay */
const ReasonImageCard = ({ reason, index }: { reason: ReasonCard; index: number }) => (
  <AnimatedSection animation="scaleIn" delay={index * 0.08}>
    <ReasonOverlayContent reason={reason} />
  </AnimatedSection>
);

const ReasonOverlayContent = ({ reason, tall }: { reason: ReasonCard; tall?: boolean }) => {
  const Wrapper = reason.link ? Link : "div";
  const wrapperProps = reason.link
    ? { to: reason.link, className: `block relative overflow-hidden rounded-xl group ${tall ? "aspect-[2/1] md:aspect-video" : "aspect-[4/3]"}` }
    : { className: `relative overflow-hidden rounded-xl group ${tall ? "aspect-[2/1] md:aspect-video" : "aspect-[4/3]"}` };

  return (
    // @ts-ignore - dynamic wrapper
    <Wrapper {...wrapperProps}>
      <OptimizedImage
        src={reason.image}
        alt={reason.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        aspectRatio="auto"
        transparent
        hideLoadingPlaceholder
      />
      {/* Gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Text overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center text-white flex-shrink-0">
            {reason.icon}
          </span>
          <h3 className="font-hero text-lg md:text-xl font-bold text-white uppercase leading-tight">
            {reason.title}
          </h3>
        </div>
        <p className="text-gray-200 text-sm md:text-base leading-snug max-w-md">
          {reason.description}
        </p>
        {reason.link && (
          <span className="text-drake-gold text-sm font-semibold mt-1 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Learn more <ArrowRight className="w-3 h-3" />
          </span>
        )}
      </div>
    </Wrapper>
  );
};

export default CommunityReasonsSection;
