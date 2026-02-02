import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import ImageGallery from "@/components/ImageGallery";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ComparisonTable,
  ComparisonTableHead,
  ComparisonTableBody,
  ComparisonTableRow,
  ComparisonTableHeaderCell,
  ComparisonTableCell,
} from "@/components/ui/comparison-table";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { StructuredData, buildFAQSchema } from "@/components/StructuredData";
import { NativeWeeklySchedule } from "@/components/schedule/NativeWeeklySchedule";

// Class images - using new authentic photos
import membersOverheadLungeNaturalLight from "@/assets/members-overhead-lunge-natural-light.jpg";
import membersDoubleKettlebellRack from "@/assets/members-double-kettlebell-rack.jpg";
import groupPlankRowsKettlebells from "@/assets/group-plank-rows-kettlebells.jpg";

// Gallery images
import classesGallery1 from "@/assets/classes-gallery-1.jpg";
import classesGallery2 from "@/assets/classes-gallery-2.jpg";
import classesGallery3 from "@/assets/classes-gallery-3.jpg";
import classesGallery4 from "@/assets/classes-gallery-4.jpg";
import classesGallery5 from "@/assets/classes-gallery-5.jpg";
import classesGallery6 from "@/assets/classes-gallery-6.jpg";
import classesGallery7 from "@/assets/classes-gallery-7.jpg";
import classesGallery8 from "@/assets/classes-gallery-8.jpg";
import classesGallery9 from "@/assets/classes-gallery-9.jpg";
import classesGallery10 from "@/assets/classes-gallery-10.jpg";
import communityGroupPhotoLarge from "@/assets/community-group-photo-large.jpg";
import groupOverheadPressClass from "@/assets/group-overhead-press-class.jpg";

const classTypes = [
  {
    name: "Foundation Flow™",
    badge: "Beginner Friendly",
    badgeVariant: "secondary" as const,
    image: membersOverheadLungeNaturalLight,
    description: "A gentle, mobility-based class that focuses on movement quality, breathing, stability, and basic strength patterns. Perfect for beginners or anyone returning to fitness.",
    details: "Start your day with mobility-first training. Focus on movement quality, breathwork, and stability.",
  },
  {
    name: "Functional Strength™",
    badge: "Most Popular",
    badgeVariant: "default" as const,
    image: membersDoubleKettlebellRack,
    description: "Mobility + kettlebell strength + functional conditioning in a coach-led, joint-smart format. Safe, scalable, sustainable.",
    details: "Our core program blending mobility, kettlebell strength, and functional conditioning. Lift with proper form and movement quality.",
  },
  {
    name: "KB Strong™",
    badge: "Advanced",
    badgeVariant: "destructive" as const,
    image: groupPlankRowsKettlebells,
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

const galleryImages = [
  { src: classesGallery1, alt: "Two members performing kettlebell overhead presses in studio" },
  { src: classesGallery2, alt: "Drake Fitness community group photo with members and coaches" },
  { src: communityGroupPhotoLarge, alt: "Large outdoor community group photo at Drake Fitness" },
  { src: classesGallery3, alt: "Group kettlebell goblet squats with coach supervision and studio dog" },
  { src: classesGallery4, alt: "Three members performing synchronized kettlebell presses with dog watching" },
  { src: groupOverheadPressClass, alt: "Group overhead kettlebell press during class" },
  { src: classesGallery5, alt: "Two female members doing Turkish get-ups with kettlebells" },
  { src: classesGallery6, alt: "Group class performing kettlebell goblet squats with coach instruction" },
  { src: classesGallery7, alt: "Outdoor training session with women at Drake Fitness studio exterior" },
  { src: classesGallery8, alt: "Group photo outside Drake Fitness building with Strength Movement Purpose sign" },
  { src: classesGallery9, alt: "Large outdoor group photo with members, coaches, and dogs" },
  { src: classesGallery10, alt: "Studio training session with members and dog in background" },
];

const classFAQs = [
  { q: "Which fitness class is best for beginners in Charleston?", a: "Foundation Flow is our beginner-friendly class focusing on mobility and movement quality. No experience needed." },
  { q: "How big are fitness classes at Drake Fitness?", a: "We keep classes small with 6-12 people to ensure personalized coaching and form correction from David or Nick." },
  { q: "Do I need to bring my own equipment to class?", a: "No equipment needed. We provide all kettlebells, maces, mats, and tools. Just wear comfortable workout clothes." },
  { q: "How do I get started at Drake Fitness?", a: "Start with Reset Week — 7 days of unlimited classes for $50. It's the best way to experience our training style." },
  { q: "What should I expect in my first fitness class?", a: "Arrive 10 minutes early. We'll do a quick movement screen, then guide you through class with modifications as needed." },
];

const Schedule = () => {
  const faqSchema = buildFAQSchema(classFAQs);

  return (
    <>
      <SEO
        title="Class Schedule & Programs Charleston | Book Today | Drake Fitness"
        description="View our weekly class schedule and programs in Charleston. Foundation Flow, Functional Strength, KB Strong, and more. Morning and evening sessions available."
        canonical="https://drake.fitness/schedule"
      />
      <StructuredData data={faqSchema} />
      
      <main>
        {/* Compact Header */}
        <section className="pt-24 pb-8 md:pt-28 md:pb-12 bg-drake-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <p className="section-eyebrow text-drake-gold mb-2">CLASSES & SCHEDULE</p>
            <h1 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-4">
              Book Your <span className="text-drake-gold">Class</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              All classes are coach-led, mobility-first, and beginner-friendly. Click any class to book your spot.
            </p>
          </div>
        </section>

        {/* Weekly Schedule - Primary Focus */}
        <section className="py-8 md:py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="font-hero text-xl md:text-2xl font-bold uppercase">
                Weekly <span className="text-primary">Schedule</span>
              </h2>
              <p className="text-sm text-muted-foreground">Click any class to book your spot</p>
            </div>
            <NativeWeeklySchedule />
          </div>
        </section>

        {/* Class Types Grid */}
        <AnimatedSection animation="fadeInUp">
          <section className="py-12 md:py-16 lg:py-24 bg-muted section-slant-top">
            <div className="container mx-auto px-4">
              <p className="section-eyebrow text-primary text-center">OUR PROGRAMS</p>
              <h2 className="font-hero text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 uppercase">
                Class Types That Build <span className="text-primary">Strength & Mobility</span>
              </h2>
              <p className="text-base md:text-lg text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
                Every class is coached, structured, and designed for long-term, pain-free progress.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {classTypes.map((classItem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)" }}
                    className="bg-card rounded-xl overflow-hidden border border-border shadow-card transition-shadow"
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
                    <div className="p-5 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                        <h3 className="font-hero text-xl md:text-2xl font-bold uppercase">{classItem.name}</h3>
                        <Badge variant={classItem.badgeVariant} className="shrink-0 self-start sm:ml-2 text-xs">
                          {classItem.badge}
                        </Badge>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground mb-4">{classItem.description}</p>
                      <p className="text-xs md:text-sm text-foreground">{classItem.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Class Type Comparison Table */}
              <div className="mt-12 max-w-4xl mx-auto">
                <h3 className="font-hero text-xl md:text-2xl font-bold text-center mb-6 uppercase">
                  Quick Class <span className="text-primary">Comparison</span>
                </h3>
                <ComparisonTable>
                  <ComparisonTableHead>
                    <ComparisonTableRow>
                      <ComparisonTableHeaderCell>Class</ComparisonTableHeaderCell>
                      <ComparisonTableHeaderCell>Level</ComparisonTableHeaderCell>
                      <ComparisonTableHeaderCell>Focus</ComparisonTableHeaderCell>
                      <ComparisonTableHeaderCell>Duration</ComparisonTableHeaderCell>
                      <ComparisonTableHeaderCell>Best For</ComparisonTableHeaderCell>
                    </ComparisonTableRow>
                  </ComparisonTableHead>
                  <ComparisonTableBody>
                    <ComparisonTableRow highlighted>
                      <ComparisonTableCell className="font-bold">Foundation Flow™</ComparisonTableCell>
                      <ComparisonTableCell>Beginner</ComparisonTableCell>
                      <ComparisonTableCell>Mobility</ComparisonTableCell>
                      <ComparisonTableCell>45 min</ComparisonTableCell>
                      <ComparisonTableCell>New members</ComparisonTableCell>
                    </ComparisonTableRow>
                    <ComparisonTableRow>
                      <ComparisonTableCell className="font-bold">Functional Strength™</ComparisonTableCell>
                      <ComparisonTableCell>All Levels</ComparisonTableCell>
                      <ComparisonTableCell>Strength + Mobility</ComparisonTableCell>
                      <ComparisonTableCell>50 min</ComparisonTableCell>
                      <ComparisonTableCell>Core program</ComparisonTableCell>
                    </ComparisonTableRow>
                    <ComparisonTableRow>
                      <ComparisonTableCell className="font-bold">KB Strong™</ComparisonTableCell>
                      <ComparisonTableCell>Advanced</ComparisonTableCell>
                      <ComparisonTableCell>Kettlebell Power</ComparisonTableCell>
                      <ComparisonTableCell>50 min</ComparisonTableCell>
                      <ComparisonTableCell>Experienced</ComparisonTableCell>
                    </ComparisonTableRow>
                    <ComparisonTableRow>
                      <ComparisonTableCell className="font-bold">Mobility Reset™</ComparisonTableCell>
                      <ComparisonTableCell>All Levels</ComparisonTableCell>
                      <ComparisonTableCell>Recovery</ComparisonTableCell>
                      <ComparisonTableCell>45 min</ComparisonTableCell>
                      <ComparisonTableCell>Active recovery</ComparisonTableCell>
                    </ComparisonTableRow>
                    <ComparisonTableRow>
                      <ComparisonTableCell className="font-bold">Weekend Warrior™</ComparisonTableCell>
                      <ComparisonTableCell>All Levels</ComparisonTableCell>
                      <ComparisonTableCell>Community Strength</ComparisonTableCell>
                      <ComparisonTableCell>60 min</ComparisonTableCell>
                      <ComparisonTableCell>Weekend training</ComparisonTableCell>
                    </ComparisonTableRow>
                  </ComparisonTableBody>
                </ComparisonTable>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Class Level Guide */}
        <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">CLASS LEVELS</p>
            <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
              Class Type <span className="text-primary">Guide</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { badge: "Beginner Friendly", desc: "Perfect for newcomers. Gentle pacing with detailed instruction.", variant: "secondary" },
                { badge: "All Levels", desc: "Scalable for everyone. Modifications provided for all fitness levels.", variant: "default" },
                { badge: "Intermediate+", desc: "Some experience recommended. Higher intensity with complex movements.", variant: "destructive" }
              ].map((level, idx) => (
                <div key={idx} className="bg-card p-6 rounded-xl shadow-card text-center border border-border">
                  <Badge variant={level.variant as any} className="mb-4 text-sm px-4 py-1">{level.badge}</Badge>
                  <p className="text-muted-foreground">{level.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Videos */}
        <AnimatedSection animation="fadeIn">
          <section className="py-12 md:py-16 lg:py-24 bg-muted section-slant-top">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto mb-8 md:mb-12">
                <p className="section-eyebrow text-primary text-center">SEE IT IN ACTION</p>
                <h2 className="font-hero text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 uppercase">
                  How Our <span className="text-primary">Training Sessions</span> Work
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-center text-muted-foreground mb-6 md:mb-8">
                  Watch our training sessions
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <YouTubeEmbed
                    videoId="cHcFBxvLNaQ"
                    title="Drake Fitness Training Session"
                  />
                  <YouTubeEmbed
                    videoId="4ZdIqQdzzHI"
                    title="Drake Fitness Movement Training"
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Studio Gallery */}
        <AnimatedSection animation="fadeInUp">
          <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
            <div className="container mx-auto px-4">
              <p className="section-eyebrow text-primary text-center">THE EXPERIENCE</p>
              <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
                Inside Our Charleston <span className="text-primary">Fitness Studio</span>
              </h2>
              <p className="text-xl text-center text-muted-foreground mb-12">
                Experience the Drake Fitness atmosphere
              </p>
              <ImageGallery images={galleryImages} />
            </div>
          </section>
        </AnimatedSection>

        {/* Not Sure CTA */}
        <AnimatedSection animation="fadeInUp">
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
                Not Sure Which Class is <span className="text-primary">Right For You?</span>
              </h2>
              <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl shadow-card border border-border text-center">
                <p className="text-lg mb-6">
                  We recommend beginning with <strong>Foundation Flow™</strong> or <strong>Mobility Reset™</strong>. These classes build the groundwork for everything else we do.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link to="/reset-week">Start Reset Week — $50</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <a href="#top">Back to Schedule</a>
                  </Button>
                </div>
                
                {/* Internal Links to Local SEO Pages */}
                <div className="border-t border-border pt-6 mt-6">
                  <p className="text-sm text-muted-foreground mb-4">Explore our specialized programs:</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link to="/mobility-fitness-avondale" className="text-sm text-primary hover:text-primary/80 underline underline-offset-2">
                      Mobility Training
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link to="/strength-training-charleston" className="text-sm text-primary hover:text-primary/80 underline underline-offset-2">
                      Strength Training
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link to="/low-impact-fitness-charleston" className="text-sm text-primary hover:text-primary/80 underline underline-offset-2">
                      Low-Impact Fitness
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection animation="fadeInUp">
          <section className="py-16 md:py-24 bg-drake-dark section-slant-top">
            <div className="container mx-auto px-4">
              <p className="section-eyebrow text-drake-gold text-center">QUESTIONS</p>
              <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase text-white">
                Common Class <span className="text-drake-gold">Questions Answered</span>
              </h2>
              <div className="max-w-3xl mx-auto">
                <Accordion type="multiple" defaultValue={["item-0", "item-1", "item-2", "item-3", "item-4"]} className="space-y-4">
                  {classFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-white/5 border border-white/10 rounded-xl px-6">
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline text-drake-gold">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Full-width Training Video */}
        <AnimatedSection animation="fadeIn">
          <section className="py-0 bg-drake-dark">
            <div className="w-full">
              <YouTubeEmbed
                videoId="DZ_T9ROQlos"
                title="Drake Fitness Training Experience"
                className="w-full aspect-video rounded-none"
              />
            </div>
          </section>
        </AnimatedSection>

        <CTASection
          eyebrow="GET STARTED"
          title="Ready to Feel Stronger, Move Better, and Train Smarter?"
          subtitle="Start with Reset Week — 7 days of unlimited classes for just $50."
          ctaText="Start Reset Week — $50"
          ctaLink="/reset-week"
          variant="primary"
          slanted={true}
        />
      </main>
    </>
  );
};

export default Schedule;
