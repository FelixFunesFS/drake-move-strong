import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import ImageGallery from "@/components/ImageGallery";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Button } from "@/components/ui/button";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, buildFAQSchema } from "@/components/StructuredData";
import { NativeWeeklySchedule } from "@/components/schedule/NativeWeeklySchedule";
import { getStaggerDelay } from "@/lib/motionConfig";

// Gallery images
import classesGallery1 from "@/assets/classes-gallery-1.jpg?format=webp&w=768";
import classesGallery2 from "@/assets/classes-gallery-2.jpg?format=webp&w=768";
import classesGallery3 from "@/assets/classes-gallery-3.jpg?format=webp&w=768";
import classesGallery4 from "@/assets/classes-gallery-4.jpg?format=webp&w=768";
import classesGallery5 from "@/assets/classes-gallery-5.jpg?format=webp&w=768";
import classesGallery6 from "@/assets/classes-gallery-6.jpg?format=webp&w=768";
import classesGallery7 from "@/assets/classes-gallery-7.jpg?format=webp&w=768";
import classesGallery8 from "@/assets/classes-gallery-8.jpg?format=webp&w=768";
import classesGallery9 from "@/assets/classes-gallery-9.jpg?format=webp&w=768";
import classesGallery10 from "@/assets/classes-gallery-10.jpg?format=webp&w=768";
import communityGroupPhotoLarge from "@/assets/community-group-photo-large.jpg?format=webp&w=768";
import groupOverheadPressClass from "@/assets/group-overhead-press-class.jpg?format=webp&w=768";

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
        title="Group Fitness Classes Charleston | Weekly Schedule | Drake Fitness"
        description="Book group fitness and workout classes in Charleston. Morning & evening sessions: Foundation Flow, Functional Strength, KB Strong. Small groups, expert coaching."
        canonical="https://drake.fitness/schedule"
      />
      <StructuredData data={faqSchema} />
      
      <main>
        {/* Weekly Schedule - Primary Focus */}
        <section className="pt-14 pb-8 md:pt-[70px] md:pb-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-3">
              <h1 className="font-hero text-xl md:text-2xl font-bold uppercase">
                Weekly <span className="text-primary">Schedule</span>
              </h1>
              <p className="text-sm text-muted-foreground">Click any class to book your spot</p>
            </div>
            <NativeWeeklySchedule />
          </div>
        </section>

        {/* OUR PROGRAMS - Simple compact version */}
        <section className="py-12 md:py-16 lg:py-24 bg-drake-dark text-white section-slant-top">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
                <div className="text-left">
                  <p className="section-eyebrow text-drake-gold mb-2">OUR PROGRAMS</p>
                  <h2 className="font-hero text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">
                    Class Types That Build <span className="text-drake-gold">Strength & Mobility</span>
                  </h2>
                  <p className="text-base md:text-lg text-gray-300">
                    Every class is coached, structured, and designed for long-term, pain-free progress.
                  </p>
                </div>
                <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark shrink-0 whitespace-nowrap">
                  <a href="https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219" target="_blank" rel="noopener noreferrer">Start Reset Week — $50</a>
                </Button>
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{
                name: "Foundation Flow™",
                description: "Beginner-friendly, mobility-first."
              }, {
                name: "Functional Strength™",
                description: "Our core program for sustainable strength and better movement."
              }, {
                name: "KB Strong™",
                description: "Advanced strength & kettlebell training."
              }, {
                name: "Mobility Reset™",
                description: "Recovery-based mobility and flexibility work."
              }, {
                name: "Weekend Warrior™",
                description: "Saturday full body strength & conditioning."
              }, {
                name: "Functional Flow Online™",
                description: "Train live from anywhere."
              }].map((classItem, index) => (
                <AnimatedSection key={index} animation="fadeInUp" delay={getStaggerDelay(index)}>
                  <div className="bg-drake-dark-muted p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors bg-gray-800 h-full">
                    <h3 className="font-hero text-xl font-bold mb-2 text-drake-gold uppercase">{classItem.name}</h3>
                    <p className="text-gray-300">{classItem.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Training Videos */}
        <AnimatedSection animation="fadeIn">
          <section className="pt-16 pb-8 md:pt-24 md:pb-8 lg:pt-28 lg:pb-12 bg-muted section-slant-top">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto mb-0">
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

        <CTASection
          eyebrow="GET STARTED"
          title="Ready to Feel Stronger, Move Better, and Train Smarter?"
          subtitle="Start with Reset Week — 7 days of unlimited classes for just $50."
          ctaText="Start Reset Week — $50"
          ctaLink="https://drakefitness.punchpass.com/catalogs/purchase/pass/46002?check=1538140219"
          variant="primary"
          slanted={true}
        />
      </main>
    </>
  );
};

export default Schedule;
