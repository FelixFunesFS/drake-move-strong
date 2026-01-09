import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { 
  Check, MapPin, ArrowRight, Star, 
  Footprints, ShieldCheck, TrendingUp, Clock,
  Briefcase, RotateCcw, HeartPulse, Users, Baby, GraduationCap,
  Phone, Mail, Car, Calendar, Shield
} from "lucide-react";

import studioMobilityTraining from "@/assets/studio-mobility-training.jpg";
import davidMaceTraining from "@/assets/david-mace-training.jpg";
import studioDavidStorefront from "@/assets/studio-david-storefront.jpg";
import groupKettlebellTraining from "@/assets/group-kettlebell-training.jpg";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mobility-Focused Fitness in Avondale",
  "description": "Safe, coach-led training for adults restarting fitness in Avondale, Charleston. Mobility-focused fitness that actually works.",
  "provider": localBusinessSchema,
  "areaServed": {
    "@type": "Place",
    "name": "Avondale, Charleston, SC"
  },
  "serviceType": "Fitness Training"
};

const whyMobilityMatters = [
  { icon: Footprints, title: "Daily Movement Gets Harder", description: "After 30, stiffness and discomfort creep in. Simple movements like getting off the floor, reaching overhead, or bending down become challenging." },
  { icon: ShieldCheck, title: "Injury Risk Increases", description: "Without proper mobility, your body compensates in ways that lead to pain, strains, and chronic issues that keep you out of the gym." },
  { icon: TrendingUp, title: "Strength Training Stalls", description: "You can't build strength on a foundation of poor movement. Mobility unlocks your ability to get stronger safely." },
  { icon: Clock, title: "Recovery Takes Longer", description: "Poor mobility means more soreness, longer recovery, and less consistency in your training." }
];

const whoWeHelp = [
  { icon: Briefcase, title: "Busy Professionals", description: "Avondale residents with demanding careers who need efficient, effective training that fits their schedule." },
  { icon: RotateCcw, title: "Fitness Restarters", description: "Adults over 30 who used to be active but need a safe, guided path back to training." },
  { icon: HeartPulse, title: "Pain Survivors", description: "Those dealing with chronic back, knee, or shoulder issues who need movement-first training." },
  { icon: Users, title: "Community Seekers", description: "Avondale neighbors looking for a supportive, non-intimidating fitness community." },
  { icon: Baby, title: "New Parents", description: "Moms and dads rebuilding strength and energy after having kids." },
  { icon: GraduationCap, title: "Complete Beginners", description: "Never worked out before? Perfect. We teach everything from scratch." }
];

const firstClassSteps = [
  { step: "1", title: "Welcome & Assessment", description: "Your coach greets you, learns about your goals and concerns, and watches how you move. No judgment — just information." },
  { step: "2", title: "Movement Prep", description: "We start with breathing and mobility drills that prepare your body to move safely. This is where most gyms skip ahead." },
  { step: "3", title: "Guided Training", description: "You'll learn foundational movements with coaching at every step. We scale everything to your level — no pressure to keep up." },
  { step: "4", title: "Cool Down & Debrief", description: "We finish with recovery work and answer your questions. You leave feeling energized, not destroyed." }
];

const resetWeekIncludes = [
  { title: "7 Days of Unlimited Classes", description: "Small groups, maximum attention" },
  { title: "Coach-Guided Introduction", description: "Learn the fundamentals properly" },
  { title: "Mobility-Focused Workouts", description: "Joint-friendly training that works" },
  { title: "No Pressure Environment", description: "Go at your own pace" },
  { title: "Community Access", description: "Connect with other Avondale members" }
];

const testimonials = [
  { 
    name: "Jennifer R.", 
    location: "Verified Google Review",
    quote: "As a lifelong fitness enthusiast and career bodyworker, I have a high standard for instructors. David brings the knowledge, technique, and vibe every single time. This is the only true strength training I've stuck with long term.",
    featured: false
  },
  { 
    name: "Felix F.", 
    location: "Verified Google Review",
    quote: "The coaches are incredibly attentive, they watch your form, make adjustments, and explain why certain movements matter... you feel confident in every exercise.",
    featured: false
  },
  { 
    name: "D. Ramos", 
    location: "Verified Google Review",
    quote: "I wasn't comfortable in this new body and didn't know how to move it correctly... He really assesses your needs and makes sure you don't get hurt.",
    featured: false
  },
  { 
    name: "Aaron Q.", 
    location: "Verified Google Review",
    quote: "I'm stronger in my 40s than ever before... His knowledge and adaptability have made a significant impact.",
    featured: false
  },
  { 
    name: "Caitlin P.", 
    location: "Verified Google Review",
    quote: "I have had 3 lower back surgeries - was in constant pain... David and his team helped me get back to working out consistently and build strength.",
    featured: false
  },
  { 
    name: "Vanessa H.", 
    location: "Verified Google Review",
    quote: "I have been working with David for about 3 years. His knowledge about the way the body mechanically works has helped me continue to exercise after multiple surgeries.",
    featured: true
  }
];

const locationDetails = [
  { icon: MapPin, title: "Address", description: "2 Avondale Ave\nCharleston, SC 29407", link: "https://maps.app.goo.gl/opeP6dqsbidbY9GZ6" },
  { icon: Clock, title: "Hours", description: "Monday - Friday: 5:30 AM - 8:00 PM\nSaturday: 7:00 AM - 12:00 PM\nSunday: Closed" },
  { icon: Phone, title: "Contact", description: "Phone: (843) 817-5420\nEmail: ddrake311@gmail.com" },
  { icon: Car, title: "Parking", description: "Free parking available on-site\nStreet parking also available" }
];

const nearbyAreas = [
  { area: "Downtown Avondale", time: "2 minutes" },
  { area: "West Ashley", time: "5 minutes" },
  { area: "James Island", time: "12 minutes" },
  { area: "Downtown CHS", time: "15 minutes" }
];

const finalCTAFeatures = [
  { icon: Calendar, title: "Next Reset Week Starts Monday", description: "Multiple time slots available" },
  { icon: Users, title: "Limited to 12 Participants", description: "Small groups for maximum coaching" },
  { icon: Shield, title: "No Pressure, No Contracts", description: "Try it risk-free" },
  { icon: MapPin, title: "5 Minutes From You", description: "Right in Avondale" }
];

export default function MobilityFitnessAvondale() {
  return (
    <>
      <SEO
        title="Mobility-Focused Fitness in Avondale | Charleston, SC | Drake Fitness"
        description="Safe, coach-led training for adults restarting fitness in Avondale, Charleston. Join your neighbors who train smarter, move better, and build strength without pain."
        canonical="https://drake.fitness/mobility-fitness-avondale"
      />
      <StructuredData data={serviceSchema} />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <OptimizedImage
            src={studioMobilityTraining}
            alt="Mobility-focused fitness training at Drake Fitness in Avondale, Charleston"
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
              <span className="inline-block px-4 py-2 bg-accent/20 border border-accent rounded-full mb-6">
                <span className="text-accent font-bold uppercase tracking-wider text-sm">Serving Avondale, Charleston</span>
              </span>
              <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-primary-foreground uppercase tracking-tight">
                Safe, Coach-Led Training for Adults Restarting Fitness in Avondale
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-primary-foreground/90 mb-4 font-semibold">
                Mobility-Focused Fitness That Actually Works
              </p>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 md:mb-10 leading-relaxed">
                Join your Avondale neighbors who train smarter, move better, and build strength without pain.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 md:px-10 py-4 md:py-6 text-base md:text-lg font-bold uppercase tracking-wide whitespace-normal text-center">
                  <Link to="/reset-week">
                    <ArrowRight className="mr-2 h-5 w-5 flex-shrink-0" />
                    Start Reset Week — $50
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20 px-6 md:px-10 py-4 md:py-6 text-base md:text-lg font-bold uppercase tracking-wide whitespace-normal text-center">
                  <Link to="/contact">
                    <MapPin className="mr-2 h-5 w-5 flex-shrink-0" />
                    Get Directions
                  </Link>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-5 w-5" />
                  <span>Located in Avondale</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-5 w-5" />
                  <span>Beginner-Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-accent h-5 w-5" />
                  <span>Small Group Coaching</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Mobility Matters Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-background overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <AnimatedSection animation="fadeInUp">
              <div>
                <span className="section-eyebrow text-primary">THE FOUNDATION</span>
                <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 uppercase leading-tight">
                  Why Mobility Matters <span className="text-primary">As We Age</span>
                </h2>
                
                <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                  {whyMobilityMatters.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-secondary rounded-xl border-l-4 border-primary">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center">
                        <item.icon className="text-primary-foreground h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg md:text-xl mb-1 md:mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-accent/10 border-l-4 border-accent p-5 md:p-8 rounded-r-2xl">
                  <h3 className="font-hero text-xl md:text-2xl font-bold mb-3 uppercase">The Solution</h3>
                  <p className="text-foreground leading-relaxed font-medium text-sm md:text-base">At Drake Fitness, we prioritize mobility first — so strength training actually works and lasts.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="relative">
                <div className="h-[350px] sm:h-[450px] md:h-[550px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src={davidMaceTraining}
                    alt="Coach demonstrating proper mobility movement technique"
                    className="w-full h-full"
                  />
                </div>
                <div className="lg:absolute lg:-bottom-8 lg:-left-8 mt-6 lg:mt-0 bg-primary text-primary-foreground p-5 md:p-8 rounded-xl shadow-xl max-w-sm mx-auto lg:mx-0">
                  <p className="font-heading text-3xl md:text-4xl font-bold mb-2">92%</p>
                  <p className="font-semibold text-base md:text-lg">of our Avondale members report less pain within 3 weeks</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-eyebrow text-primary">OUR COMMUNITY</span>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">Who Drake Fitness Helps in Avondale</h2>
              <p className="text-xl text-muted-foreground">We specialize in helping local adults restart their fitness journey the right way.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {whoWeHelp.map((person, index) => (
                <div key={index} className={`p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${index === 5 ? 'bg-accent' : 'bg-background'}`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${index === 5 ? 'bg-foreground' : 'bg-primary'}`}>
                    <person.icon className={`h-7 w-7 ${index === 5 ? 'text-accent' : 'text-primary-foreground'}`} />
                  </div>
                  <h3 className={`font-hero text-2xl font-bold mb-4 uppercase text-center ${index === 5 ? 'text-accent-foreground' : ''}`}>{person.title}</h3>
                  <p className={`leading-relaxed text-center ${index === 5 ? 'text-accent-foreground font-medium' : 'text-muted-foreground'}`}>{person.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="bg-background p-12 rounded-3xl shadow-xl max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="font-heading text-5xl font-bold text-primary mb-2">78%</p>
                  <p className="text-muted-foreground font-semibold">Are Over 35</p>
                </div>
                <div>
                  <p className="font-heading text-5xl font-bold text-primary mb-2">91%</p>
                  <p className="text-muted-foreground font-semibold">Are Beginners</p>
                </div>
                <div>
                  <p className="font-heading text-5xl font-bold text-primary mb-2">100%</p>
                  <p className="text-muted-foreground font-semibold">Get Personalized Coaching</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* First Class Experience Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-eyebrow text-primary">YOUR FIRST SESSION</span>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">What Your First Class Feels Like</h2>
              <p className="text-xl text-muted-foreground">No intimidation. No confusion. Just clear, supportive coaching.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="space-y-8">
                {firstClassSteps.map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-heading text-2xl font-bold">{item.step}</div>
                    </div>
                    <div>
                      <h3 className="font-hero text-2xl font-bold mb-3 uppercase">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="relative h-full min-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={groupKettlebellTraining}
                  alt="Small group fitness class with coach demonstrating proper form"
                  className="w-full h-full"
                />
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <div className="bg-primary text-primary-foreground p-12 rounded-3xl max-w-4xl mx-auto text-center">
              <p className="text-2xl font-medium mb-6 leading-relaxed italic">"The coaches are incredibly attentive, they watch your form, make adjustments, and explain why certain movements matter... you feel confident in every exercise."</p>
              <p className="font-bold text-lg text-accent">— Felix F., Verified Google Review</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-eyebrow text-primary">MEMBER STORIES</span>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">What Your Avondale Neighbors Say</h2>
              <p className="text-xl text-muted-foreground">Real results from real people in your community.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`p-8 rounded-2xl shadow-lg ${testimonial.featured ? 'bg-accent' : 'bg-background'}`}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 fill-current ${testimonial.featured ? 'text-accent-foreground' : 'text-accent'}`} />
                    ))}
                  </div>
                  <p className={`mb-6 leading-relaxed italic ${testimonial.featured ? 'text-accent-foreground' : 'text-muted-foreground'}`}>"{testimonial.quote}"</p>
                  <div>
                    <p className={`font-bold ${testimonial.featured ? 'text-accent-foreground' : ''}`}>{testimonial.name}</p>
                    <p className={`text-sm ${testimonial.featured ? 'text-accent-foreground/80' : 'text-muted-foreground'}`}>{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <div className="bg-primary text-primary-foreground p-10 rounded-3xl max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary-foreground rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-2xl">G</span>
                </div>
                <div className="text-left">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-accent" />
                    ))}
                  </div>
                  <p className="font-bold text-lg">4.9 / 5 on Google</p>
                </div>
              </div>
              <p className="text-2xl font-bold">Join 200+ Avondale Members</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Reset Week CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fadeInUp">
              <div>
                <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2 block">SPECIAL OFFER FOR AVONDALE</span>
                <h2 className="font-hero text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase leading-tight">
                  Start With Reset Week
                </h2>
                <p className="text-2xl mb-8 leading-relaxed text-primary-foreground/90">
                  A full week of coached training designed specifically for adults restarting fitness.
                </p>

                <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-8 mb-10">
                  <h3 className="font-hero text-3xl font-bold mb-6 uppercase">What's Included:</h3>
                  <div className="space-y-4">
                    {resetWeekIncludes.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <Check className="text-accent h-6 w-6 mt-1" />
                        <div>
                          <p className="font-bold text-lg mb-1">{item.title}</p>
                          <p className="text-primary-foreground/80">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-lg font-bold uppercase tracking-wide">
                    <Link to="/reset-week">
                      Start Reset Week — $49
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20 px-10 py-6 text-lg font-bold uppercase tracking-wide">
                    <a href="tel:8438175420">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Us
                    </a>
                  </Button>
                </div>
                <p className="text-primary-foreground/60 text-sm mt-4">Limited spots per week • No commitment required</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="relative">
                <div className="h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src={studioDavidStorefront}
                    alt="Drake Fitness studio in Avondale, Charleston"
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-accent text-accent-foreground p-8 rounded-xl shadow-xl max-w-sm">
                  <p className="font-heading text-4xl font-bold mb-2">$49</p>
                  <p className="font-semibold text-lg">For Your Full Reset Week</p>
                  <p className="text-sm mt-2 opacity-80">(Regular value: $199)</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Expanded Location Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-eyebrow text-primary">VISIT US</span>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">Find Us in Avondale</h2>
              <p className="text-xl text-muted-foreground">Conveniently located in the heart of Avondale, West Ashley, Charleston</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="bg-background p-10 rounded-2xl shadow-lg h-full">
                <h3 className="font-hero text-2xl font-bold mb-8 uppercase">Location Details</h3>
                <div className="space-y-6">
                  {locationDetails.map((detail, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center">
                        <detail.icon className="text-primary-foreground h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">{detail.title}</p>
                        {'link' in detail && detail.link ? (
                          <a href={detail.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line">
                            {detail.description}
                          </a>
                        ) : (
                          <p className="text-muted-foreground whitespace-pre-line">{detail.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3352.7234!2d-79.9876!3d32.7876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe7a5c5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2s2%20Avondale%20Ave%2C%20Charleston%2C%20SC%2029407!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Drake Fitness Location Map"
                />
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <div className="bg-background p-10 rounded-2xl shadow-lg max-w-4xl mx-auto">
              <h3 className="font-hero text-2xl font-bold mb-8 uppercase text-center">Easy Access From</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {nearbyAreas.map((area, index) => (
                  <div key={index} className="text-center p-4 bg-secondary rounded-xl">
                    <Car className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="font-bold">{area.area}</p>
                    <p className="text-muted-foreground text-sm">{area.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="font-hero text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase leading-tight">
                Train With Your Avondale Neighbors
              </h2>
              <p className="text-2xl mb-12 leading-relaxed text-primary-foreground/90">
                Join the community that's building strength, improving mobility, and feeling better every day.
              </p>

              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-3xl p-12 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  {finalCTAFeatures.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 text-left">
                      <div className="w-12 h-12 bg-accent rounded-lg flex-shrink-0 flex items-center justify-center">
                        <item.icon className="text-accent-foreground h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-primary-foreground/70">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-12 py-7 text-xl font-bold uppercase tracking-wide">
                  <Link to="/reset-week">
                    Start Your Reset Week — $49
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg">
                <a href="tel:8438175420" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Phone className="h-5 w-5" />
                  (843) 817-5420
                </a>
                <span className="hidden sm:block text-primary-foreground/40">|</span>
                <a href="mailto:ddrake311@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Mail className="h-5 w-5" />
                  ddrake311@gmail.com
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
