import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import ImageGallery from "@/components/ImageGallery";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import classGroup from "@/assets/class-group.jpg";
import mobilityClass from "@/assets/mobility-class.jpg";
import kbStrong from "@/assets/kb-strong.jpg";
import groupTraining from "@/assets/group-training.jpg";
import kettlebellTraining from "@/assets/kettlebell-training.jpg";
import kettlebellFormCheck from "@/assets/kettlebell-form-check.jpg";

const Classes = () => {
  const classTypes = [
    {
      name: "Foundation Flow™",
      badge: "Beginner Friendly",
      badgeVariant: "secondary" as const,
      image: mobilityClass,
      description: "A gentle, mobility-based class that focuses on movement quality, breathing, stability, and basic strength patterns. Perfect for beginners or anyone returning to fitness.",
      details: "Start your day with mobility-first training. Focus on movement quality, breathwork, and stability.",
    },
    {
      name: "Functional Strength™",
      badge: "Most Popular",
      badgeVariant: "default" as const,
      image: classGroup,
      description: "Mobility + kettlebell strength + functional conditioning in a coach-led, joint-smart format. Safe, scalable, sustainable.",
      details: "Our core program blending mobility, kettlebell strength, and functional conditioning. Lift with proper form and movement quality.",
    },
    {
      name: "KB Strong™",
      badge: "Advanced",
      badgeVariant: "destructive" as const,
      image: kbStrong,
      description: "Higher-intensity kettlebell strength class with advanced progressions and technique refinement.",
      details: "Strength-intensive kettlebell training with technique refinement and progressive loading. Members ready to push harder with proper form and technique.",
    },
    {
      name: "Mobility Reset™",
      badge: "Recovery",
      badgeVariant: "secondary" as const,
      description: "Slow, controlled mobility work designed to improve flexibility, restore range of motion, and reduce stiffness.",
      details: "Focused on restoration, mobility work, deep stretches, joint health, and movement restoration.",
    },
    {
      name: "Functional Flow Online™",
      badge: "🔵 Live Zoom",
      badgeVariant: "outline" as const,
      description: "Live Zoom classes focused on mobility, bodyweight patterns, and functional movement. Train from anywhere.",
      details: "Train live from your living room. Focused on mobility, bodyweight patterns, and functional movement when you can't make it to the studio.",
    },
    {
      name: "Weekend Warrior™",
      badge: "Saturday Community Strength",
      badgeVariant: "secondary" as const,
      description: "Full-body strength and conditioning with dynamic energy. A great way to start your weekend with the community.",
      details: "Community-focused weekend strength class with mobility prep and joint-friendly conditioning.",
    },
  ];

  const levelGuide = [
    {
      level: "Beginner Friendly",
      description: "Perfect for newcomers or those returning to fitness. Gentle pacing with detailed instruction.",
      color: "bg-secondary/50",
    },
    {
      level: "All Levels",
      description: "Scalable for everyone. Modifications provided for all fitness levels.",
      color: "bg-primary/20",
    },
    {
      level: "Intermediate/Advanced",
      description: "For regular members ready to push harder with proper form and technique.",
      color: "bg-destructive/20",
    },
    {
      level: "Recovery",
      description: "Focused on restoration, mobility work, and joint health. Great for active recovery days.",
      color: "bg-muted",
    },
    {
      level: "🔵 Live Zoom",
      description: "Join remotely from anywhere. Interactive online training with real-time coaching.",
      color: "bg-accent/20",
    },
  ];

  const faqs = [
    {
      question: "Do I need experience?",
      answer: "No. Our Foundation Flow classes are specifically designed for beginners. We meet you where you are.",
    },
    {
      question: "Will this help my joint pain?",
      answer: "Yes. We are a mobility-first studio. We focus on safe, joint-friendly training that builds strength without hurting your body.",
    },
    {
      question: "How big are the classes?",
      answer: "We keep classes small to ensure everyone gets attention, coaching cues, and form correction from David or Nick.",
    },
    {
      question: "Do you offer online classes?",
      answer: "Yes. Functional Flow Online classes let you train live with us via Zoom. Perfect if you can't make it to the studio.",
    },
    {
      question: "What if I have an injury?",
      answer: "We modify movements for every individual. Our priority is keeping you safe while progressively building strength around your limitations.",
    },
  ];

  const galleryImages = [
    { src: classGroup, alt: "Group class training session" },
    { src: groupTraining, alt: "Functional group training" },
    { src: kettlebellTraining, alt: "Kettlebell training technique" },
    { src: kettlebellFormCheck, alt: "Coach checking kettlebell form" },
    { src: kbStrong, alt: "KB Strong advanced class" },
    { src: mobilityClass, alt: "Mobility reset class" },
  ];

  return (
    <main>
      <Hero
        eyebrow="OUR PROGRAMS"
        title="Class Types That Build Strength, Mobility & Confidence"
        subtitle="Every class is coached, structured, and designed for long-term, pain-free progress. We prioritize movement quality over intensity."
        primaryCTA={{ text: "See Full Schedule", link: "/schedule" }}
        backgroundImage={classGroup}
      />

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classTypes.map((classItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)" }}
                  className="bg-card rounded-lg overflow-hidden border border-border transition-shadow"
                >
                  {classItem.image && (
                    <div className="overflow-hidden">
                      <OptimizedImage
                        src={classItem.image}
                        alt={classItem.name}
                        aspectRatio="video"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold">{classItem.name}</h3>
                      <Badge variant={classItem.badgeVariant} className="shrink-0 ml-2">
                        {classItem.badge}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{classItem.description}</p>
                    <p className="text-sm text-foreground">{classItem.details}</p>
                    <Button asChild className="w-full mt-4" variant="outline">
                      <Link to="/schedule">View Times</Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn">
        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12">
              <p className="section-eyebrow text-primary text-center">SEE IT IN ACTION</p>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
                Our <span className="text-primary">Classes</span> in Action
              </h2>
              <p className="text-xl text-center text-muted-foreground mb-8">
                Watch a typical class session
              </p>
              <YouTubeEmbed
                title="Drake Fitness Class Demo"
                placeholder="Add a video showcasing your class structure and coaching style"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">THE EXPERIENCE</p>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
              Class <span className="text-primary">Gallery</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Experience the Drake Fitness atmosphere
            </p>
            <ImageGallery images={galleryImages} />
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn">
        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">CLASS LEVELS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
              Class Type <span className="text-primary">Guide</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Understanding our class levels and what to expect
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {levelGuide.map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`${level.color} p-6 rounded-lg border border-border`}
                >
                  <h3 className="font-bold text-lg mb-2">{level.level}</h3>
                  <p className="text-sm">{level.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
              Not Sure Which Class is <span className="text-primary">Right For You?</span>
            </h2>
            <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg border border-border text-center">
              <p className="text-lg mb-6">
                We recommend beginning with <strong>Foundation Flow™</strong> or <strong>Mobility Reset™</strong>. These classes build the groundwork for everything else we do.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/contact">Book Free Assessment</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/schedule">View Full Schedule</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn">
        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">QUESTIONS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
              Common <span className="text-primary">Questions</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <CTASection
        eyebrow="GET STARTED"
        title="Ready to Feel Stronger, Move Better, and Train Smarter?"
        subtitle="Join us for a free movement assessment and start your journey to better movement."
        ctaText="Book Now"
        ctaLink="/contact"
        variant="gold"
        slanted={true}
      />
    </main>
  );
};

export default Classes;
