import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { Check, MapPin, ArrowRight, Star, Shield, Heart, Dumbbell, Clock, Car, Navigation } from "lucide-react";

import heroKettlebellTraining from "@/assets/hero-kettlebell-training.jpg";
import groupKettlebellTraining from "@/assets/group-kettlebell-training.jpg";
import studioMobilityTraining from "@/assets/studio-mobility-training.jpg";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Strength & Mobility Training in West Ashley",
  "description": "Reset Week at Drake Fitness in the Avondale neighborhood of West Ashley — Your Path to Pain-Free Movement.",
  "provider": localBusinessSchema,
  "areaServed": [
    {
      "@type": "Place",
      "name": "West Ashley"
    },
    {
      "@type": "Place",
      "name": "Avondale"
    },
    {
      "@type": "City",
      "name": "Charleston"
    }
  ],
  "serviceType": "Fitness Training"
};

const whatWeOffer = [
  { title: "Safe Strength Training", description: "Built on mobility first, not just heavy lifting" },
  { title: "A Gym That Understands Pain & Recovery", description: "We specialize in helping people move better, not just harder" },
  { title: "Coaching That Meets You Where You Are", description: "Personalized attention in every small group class" }
];

const whyResetWeek = [
  { icon: Shield, title: "Removes Guesswork", description: "You'll know exactly what to do, how to move, and why it matters — from day one." },
  { icon: Heart, title: "Removes Pressure", description: "No judgment. No comparison. Just you, your coach, and your progress." },
  { icon: Dumbbell, title: "Rebuilds Strength Right", description: "Mobility first, then strength — the foundation for lasting results." }
];

const faqs = [
  { question: "Where exactly is Drake Fitness located?", answer: "We're located at 2 Avondale Ave in the Avondale neighborhood of West Ashley, Charleston. We're right in the heart of the community — easy to access from anywhere in West Ashley, James Island, or downtown Charleston." },
  { question: "What is Reset Week?", answer: "Reset Week is our signature intro program — 7 days of unlimited classes designed to help you move better, build confidence, and see what makes Drake Fitness different." },
  { question: "Do I need experience?", answer: "Absolutely not. We specialize in helping beginners and people returning to fitness. Every movement is coached and scaled to your level." },
  { question: "What if I have pain or injuries?", answer: "That's our specialty. We work with people managing pain, recovering from injuries, or dealing with chronic tightness. Our mobility-first approach is designed for exactly that." }
];

export default function WestAshleyFitness() {
  return (
    <>
      <SEO
        title="Strength & Mobility Training in West Ashley | Avondale | Drake Fitness"
        description="Located in Avondale, West Ashley — Reset Week at Drake Fitness is your path to pain-free movement. Safe, coach-led training for adults."
        canonical="https://drake.fitness/west-ashley-fitness"
      />
      <StructuredData data={serviceSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <OptimizedImage
            src={heroKettlebellTraining}
            alt="Strength training at Drake Fitness in West Ashley, Charleston"
            className="w-full h-full"
            priority
            transparent
            hideLoadingPlaceholder
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-accent h-6 w-6" />
                <span className="text-accent font-bold uppercase tracking-wider text-sm">Avondale, West Ashley, Charleston</span>
              </div>
              <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-primary-foreground uppercase tracking-tight">
                Strength & Mobility Training <br className="hidden sm:block" />
                <span className="text-accent">In West Ashley</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 md:mb-8 leading-relaxed">
                Reset Week at Drake Fitness — Your Path to Pain-Free Movement
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 md:px-10 py-4 md:py-6 text-base md:text-lg font-bold uppercase tracking-wide whitespace-normal text-center">
                  <Link to="/reset-week">
                    Start Reset Week — $50
                    <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20 px-6 md:px-10 py-4 md:py-6 text-base md:text-lg font-bold uppercase tracking-wide whitespace-normal text-center">
                  <Link to="/contact">
                    View Location & Hours
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Local Intro Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <AnimatedSection animation="fadeInUp">
              <div>
                <span className="section-eyebrow text-primary">YOUR NEIGHBORHOOD GYM</span>
                <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 uppercase leading-tight">
                  Located in <span className="text-primary">Avondale</span>, Serving West Ashley
                </h2>
                <ul className="space-y-4 md:space-y-5 mb-6 md:mb-8">
                  {whatWeOffer.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center mr-3 md:mr-4 mt-1">
                        <Check className="text-primary-foreground h-3.5 w-3.5 md:h-4 md:w-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm md:text-base">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="bg-secondary border-l-4 border-accent p-4 md:p-6 rounded-r-lg">
                  <p className="font-semibold text-base md:text-lg">Drake Fitness is in Avondale — and Reset Week is the best place to start.</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={groupKettlebellTraining}
                  alt="West Ashley members training at Drake Fitness"
                  className="w-full h-full"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Reset Week Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block">WHY RESET WEEK?</span>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">Our West Ashley Members Choose Reset Week Because It:</h2>
              <p className="text-xl text-primary-foreground/80">Removes guesswork, pressure, and fear while rebuilding strength the right way.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyResetWeek.map((item, index) => (
                <div key={index} className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-xl border border-primary-foreground/10 hover:border-accent/50 transition-all group">
                  <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-hero text-2xl font-bold mb-4 uppercase">{item.title}</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Location Info Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection animation="fadeInUp">
              <div>
                <span className="section-eyebrow text-primary">CONVENIENT LOCATION</span>
                <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">Right in the Heart of Avondale</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Drake Fitness is located in Avondale, the vibrant neighborhood in West Ashley. We're easily accessible from anywhere in Charleston — whether you're coming from work, home, or errands.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="text-primary-foreground h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Address</h3>
                      <a href="https://maps.app.goo.gl/opeP6dqsbidbY9GZ6" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors block">
                        2 Avondale Ave<br />Charleston, SC 29407
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                      <Clock className="text-primary-foreground h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 5:30 AM - 7:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 8:00 AM - 12:00 PM</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                      <Car className="text-primary-foreground h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Parking</h3>
                      <p className="text-muted-foreground">Free parking available on-site</p>
                    </div>
                  </div>
                </div>

                <Button asChild className="mt-2">
                  <a href="https://maps.app.goo.gl/opeP6dqsbidbY9GZ6" target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <GoogleMapEmbed height="600px" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <span className="section-eyebrow text-primary">WEST ASHLEY MEMBERS</span>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold uppercase">What Your Neighbors Are Saying</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="bg-background p-5 md:p-10 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-current" />)}
                  </div>
                </div>
                <p className="text-muted-foreground text-base md:text-lg italic mb-4 md:mb-6 leading-relaxed break-words">"I had a bad back injury that was not getting better with physical therapy... Dave was BETTER than all physical therapists I've ever had. Moreover, I have had multiple different personal trainers and group classes, and he was better than them too!"</p>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold">Cara S.</p>
                    <p className="text-muted-foreground text-sm">Verified Google Review</p>
                  </div>
                </div>
              </div>

              <div className="bg-background p-5 md:p-10 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-current" />)}
                  </div>
                </div>
                <p className="text-muted-foreground text-base md:text-lg italic mb-4 md:mb-6 leading-relaxed break-words">"Coming out of the pandemic, my head and body were in a bad place. 30 lbs heavier and feeling hyper unmotivated. David's training has taken exercise from something I did off and on into something I look forward to every single day."</p>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold">Paul B.</p>
                    <p className="text-muted-foreground text-sm">Verified Google Review</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Reset Week CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 uppercase leading-tight">Ready to Move Better?</h2>
              <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-3 md:mb-4">Reset Week starts you off right — with coaching, community, and confidence.</p>
              <p className="text-base md:text-lg lg:text-xl text-primary-foreground/70 mb-8 md:mb-10">Avondale's choice for pain-free strength training.</p>
              
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 md:px-12 py-4 md:py-6 text-base md:text-xl font-bold uppercase tracking-wide whitespace-normal text-center">
                <Link to="/reset-week">
                  Start Reset Week — $50
                  <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
                </Link>
              </Button>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 md:mt-8 text-primary-foreground/80 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-4 w-4 md:h-5 md:w-5" />
                  <span>No Commitment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-4 w-4 md:h-5 md:w-5" />
                  <span>Expert Coaching</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-4 w-4 md:h-5 md:w-5" />
                  <span>Small Groups</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <span className="section-eyebrow text-primary">QUESTIONS?</span>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold uppercase">West Ashley FAQs</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-secondary p-8 rounded-xl">
                  <h3 className="font-bold text-xl mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Local Trust Section */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-12">
              <h3 className="font-heading text-2xl font-bold mb-2 uppercase">Proudly Serving Charleston</h3>
              <p className="text-muted-foreground">West Ashley | Avondale | James Island | Downtown Charleston | Johns Island</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center text-center">
              <div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground text-sm">Members Coached</p>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">5★</div>
                <p className="text-muted-foreground text-sm">Google Rating</p>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">8+</div>
                <p className="text-muted-foreground text-sm">Years in Charleston</p>
              </div>
              <div>
                <div className="text-4xl font-heading font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground text-sm">Coached Sessions</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
