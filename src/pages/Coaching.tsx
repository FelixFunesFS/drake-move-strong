import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Heart, Dumbbell, TrendingUp, User } from "lucide-react";
import { SEO } from "@/components/SEO";
import { StructuredData, buildFAQSchema } from "@/components/StructuredData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import oneOnOneCoaching from "@/assets/one-on-one-coaching.jpg";
import davidCoach from "@/assets/david-double-kb-storefront.jpg";
import nickCoach from "@/assets/coach-nick-new.jpg";
import coachingSession from "@/assets/coaching-session.jpg";
import TestimonialHero from "@/components/TestimonialHero";
import { FEATURED_REVIEWS } from "@/data/reviews";
import Footer from "@/components/Footer";
const Coaching = () => {
  const reasons = [{
    icon: Heart,
    title: "Are recovering from injury",
    description: "Safe, modified movements to bridge the gap between rehab and fitness."
  }, {
    icon: User,
    title: "Feel intimidated jumping into class",
    description: "Build confidence and learn basics in private setting first."
  }, {
    icon: TrendingUp,
    title: "Want faster progress",
    description: "More focused attention accelerates your goals and technique."
  }, {
    icon: Target,
    title: "Need individualized mobility work",
    description: "Targeted mobility addressing your specific limitations and pain points."
  }, {
    icon: Dumbbell,
    title: "Have specific performance goals",
    description: "Training for a race, sport, or life event that requires structured preparation."
  }];
  const whatToExpect = [{
    icon: <Target className="w-8 h-8" />,
    title: "Assessment & Goals",
    description: "Every session starts with a check-in and targeted mobility assessment to evaluate what your body needs that day based on your body's mobility, strength, and your goals."
  }, {
    icon: <Heart className="w-8 h-8" />,
    title: "Mobility & Strength",
    description: "A blend of targeted mobility work to open up your joints, functional strength training focused on real-world movement patterns that support your daily life and longevity."
  }, {
    icon: <Dumbbell className="w-8 h-8" />,
    title: "Coaching & Homework",
    description: "Learn deeply from form corrections and technique refinement with optional homework exercises for recovery days to keep you progressing between sessions."
  }];

  const coachingFAQs = [
    { q: "How much does personal training cost in Charleston?", a: "Contact us for current rates. Sessions include mobility assessment, strength training, and personalized programming." },
    { q: "How long are personal training sessions?", a: "Sessions are typically 60 minutes including warm-up, mobility work, strength training, and cooldown." },
    { q: "Can I combine personal training with group classes?", a: "Yes! Many members do both. Personal training accelerates progress while group classes build community and consistency." },
    { q: "What's the difference between coaching and group classes?", a: "Personal training is 100% focused on you with custom programming. Group classes are coached but follow a shared format." },
    { q: "Do you offer online personal training?", a: "Yes, we offer virtual coaching via Zoom with personalized programming and real-time form feedback." },
  ];

  const faqSchema = buildFAQSchema(coachingFAQs);

  return (
    <>
      <SEO
        title="1:1 Personal Training Charleston | Complete Guide 2026"
        description="Personalized coaching with David Drake or Coach Nick. Custom programs for mobility, strength, and injury recovery. Expert one-on-one training in Charleston, SC."
        canonical="https://drake.fitness/coaching"
      />
      <StructuredData data={faqSchema} />
      
      <main>
<Hero eyebrow="INDIVIDUAL ATTENTION" title={<>
            <span>PERSONAL TRAINING WITH</span><br />
            <span className="text-primary">DAVID OR NICK</span><br />
            TAILORED TO YOU
          </>} subtitle="Experience expert coaching designed specifically for your body, your history, and your goals. Move better and get stronger with 100% focus on you." primaryCTA={{
      text: "Book 1:1 Consultation",
      link: "/contact"
    }} backgroundImage={oneOnOneCoaching} />

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Left Column - Text Content */}
              <div>
                <p className="section-eyebrow text-primary">WHY CHOOSE PERSONAL TRAINING?</p>
                <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase leading-tight">
                  5 Reasons to Choose <span className="text-primary">1:1 Personal Training</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  While our group classes are coached intensively, sometimes you need a program built entirely around your unique needs. 1:1 training is ideal if you:
                </p>
                
                <div className="space-y-6">
                  {reasons.map((reason, index) => {
                  const Icon = reason.icon;
                  return <motion.div key={index} initial={{
                    opacity: 0,
                    x: -20
                  }} whileInView={{
                    opacity: 1,
                    x: 0
                  }} viewport={{
                    once: true
                  }} transition={{
                    delay: index * 0.1
                  }} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-cool-gray rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-hero font-bold text-lg text-foreground mb-1 uppercase">
                            {reason.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {reason.description}
                          </p>
                        </div>
                      </motion.div>;
                })}
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative lg:sticky lg:top-8">
                <motion.div initial={{
                opacity: 0,
                scale: 0.95
              }} whileInView={{
                opacity: 1,
                scale: 1
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.6
              }} className="relative">
                  <OptimizedImage src={coachingSession} alt="David and Nick coaching at Drake Fitness" className="rounded-2xl shadow-lg" aspectRatio="square" />
                  
                  {/* Caption Badge Overlay */}
                  <motion.div initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  delay: 0.3,
                  duration: 0.6
                }} className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-3">
                      <span className="text-drake-gold font-semibold text-sm uppercase tracking-wide">
                        Expert Focus
                      </span>
                      <span className="text-white/50">|</span>
                      <span className="text-white text-sm">
                        David & Nick Coaching
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonial Hero - Before Video */}
      <TestimonialHero
        quote={FEATURED_REVIEWS[1].quote}
        author={FEATURED_REVIEWS[1].name}
        result={FEATURED_REVIEWS[1].result}
        backgroundImage={coachingSession}
      />

      <AnimatedSection animation="fadeIn">
        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12">
              <p className="section-eyebrow text-primary text-center">SEE IT IN ACTION</p>
              <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
                <span className="text-primary">1:1 Coaching</span> in Action
              </h2>
              <p className="text-xl text-center text-muted-foreground mb-8">
                Watch a personal training session
              </p>
              <YouTubeEmbed title="Drake Fitness 1:1 Coaching Demo" placeholder="Add a video showcasing your personalized coaching approach" />
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 section-slant-top-reverse bg-secondary-foreground">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">YOUR SESSION</p>
            <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase text-primary-foreground">
              What Happens in a <span className="text-primary">Personal Training Session</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {whatToExpect.map((item, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.2
            }} whileHover={{
              y: -5
            }} className="text-center p-5 md:p-6 rounded-xl border bg-secondary-foreground shadow border-primary">
                  <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="font-hero text-lg md:text-xl font-bold mb-3 text-accent uppercase">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{item.description}</p>
                </motion.div>)}
            </div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.6
          }} className="mt-12 max-w-3xl mx-auto bg-white p-8 rounded-xl border border-border shadow-card">
              <h3 className="font-hero text-2xl font-bold text-center mb-4 uppercase">Additional Benefits</h3>
              <ul className="space-y-3">
                {["Movement assessment", "Corrective mobility work", "Functional strength training", "Technique refinement", "Lifestyle + recovery guidance", "Optional homework exercises"].map((benefit, index) => <motion.li key={index} initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: index * 0.1
              }} className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span className="text-lg">{benefit}</span>
                  </motion.li>)}
              </ul>
              
              {/* Internal Links to Local SEO Pages */}
              <div className="border-t border-border pt-6 mt-6">
                <p className="text-sm text-muted-foreground mb-3 text-center">Looking for a specific focus?</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/mobility-fitness-avondale" className="text-sm text-primary hover:text-primary/80 underline underline-offset-2">
                    Mobility Training
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link to="/low-impact-fitness-charleston" className="text-sm text-primary hover:text-primary/80 underline underline-offset-2">
                    Joint-Friendly Fitness
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link to="/west-ashley-fitness" className="text-sm text-primary hover:text-primary/80 underline underline-offset-2">
                    West Ashley Fitness
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">THE TEAM</p>
            <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
              Your <span className="text-primary">Coaches</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div whileHover={{
              y: -8
            }} className="bg-white p-6 rounded-xl shadow-card border border-border">
                <OptimizedImage src={davidCoach} alt="David Drake in front of Drake Fitness studio" aspectRatio="video" className="mb-4 rounded-lg" sizes="(max-width: 768px) 100vw, 576px" />
                <h3 className="font-hero text-2xl font-bold mb-2 uppercase">David Drake</h3>
                <p className="text-primary font-semibold mb-3">Owner & Head Coach</p>
                <p className="text-muted-foreground mb-4">
                  Specializing in mobility, corrective exercise, and functional strength training strategies.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/about">Read Bio</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{
              y: -8
            }} className="bg-white p-6 rounded-xl shadow-card border border-border">
                <OptimizedImage src={nickCoach} alt="Coach Nick Poppa demonstrating sandbag training" aspectRatio="video" className="mb-4 rounded-lg" sizes="(max-width: 768px) 100vw, 576px" />
                <h3 className="font-hero text-2xl font-bold mb-2 uppercase">Coach Nick</h3>
                <p className="text-primary font-semibold mb-3">Holistic Movement Specialist</p>
                <p className="text-muted-foreground mb-4">
                  Expert in bridging rehabilitation and performance. Patience and results can coexist.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/about">Read Bio</Link>
                </Button>
              </motion.div>
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
              Personal Training <span className="text-drake-gold">FAQs</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="multiple" defaultValue={["item-0", "item-1", "item-2", "item-3", "item-4"]} className="space-y-4">
                {coachingFAQs.map((faq, index) => (
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

      <section className="py-16 md:py-24 bg-primary text-white section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="scaleIn">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-eyebrow text-drake-gold">YOUR TURN</p>
              <h2 className="font-hero text-3xl md:text-4xl font-bold mb-6 uppercase">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8">
                Book a consultation to discuss your goals, assess your movement, and build a plan that works for you. No pressure, just a conversation about your health.
              </p>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold text-lg px-8 py-6 text-balance">
                  <Link to="/contact">Book 1:1 Consultation</Link>
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
};
export default Coaching;