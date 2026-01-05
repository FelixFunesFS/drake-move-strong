import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { Check, MapPin, ArrowRight, Star } from "lucide-react";

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
  { title: "Daily Movement Gets Harder", description: "After 30, stiffness and discomfort creep in. Simple movements like getting off the floor, reaching overhead, or bending down become challenging." },
  { title: "Injury Risk Increases", description: "Without proper mobility, your body compensates in ways that lead to pain, strains, and chronic issues that keep you out of the gym." },
  { title: "Strength Training Stalls", description: "You can't build strength on a foundation of poor movement. Mobility unlocks your ability to get stronger safely." },
  { title: "Recovery Takes Longer", description: "Poor mobility means more soreness, longer recovery, and less consistency in your training." }
];

const whoWeHelp = [
  { title: "Busy Professionals", description: "Avondale residents with demanding careers who need efficient, effective training that fits their schedule." },
  { title: "Fitness Restarters", description: "Adults over 30 who used to be active but need a safe, guided path back to training." },
  { title: "Pain Survivors", description: "Those dealing with chronic back, knee, or shoulder issues who need movement-first training." },
  { title: "Community Seekers", description: "Avondale neighbors looking for a supportive, non-intimidating fitness community." },
  { title: "New Parents", description: "Moms and dads rebuilding strength and energy after having kids." },
  { title: "Complete Beginners", description: "Never worked out before? Perfect. We teach everything from scratch." }
];

const firstClassSteps = [
  { step: "1", title: "Welcome & Assessment", description: "Your coach greets you, learns about your goals and concerns, and watches how you move. No judgment — just information." },
  { step: "2", title: "Movement Prep", description: "We start with breathing and mobility drills that prepare your body to move safely. This is where most gyms skip ahead." },
  { step: "3", title: "Guided Training", description: "You'll learn foundational movements with coaching at every step. We scale everything to your level — no pressure to keep up." },
  { step: "4", title: "Cool Down & Debrief", description: "We finish with recovery work and answer your questions. You leave feeling energized, not destroyed." }
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
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-primary-foreground uppercase tracking-tight">
                Safe, Coach-Led Training for Adults Restarting Fitness in Avondale
              </h1>
              <p className="text-2xl md:text-3xl text-primary-foreground/90 mb-4 font-semibold">
                Mobility-Focused Fitness That Actually Works
              </p>
              <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
                Join your Avondale neighbors who train smarter, move better, and build strength without pain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-lg font-bold uppercase tracking-wide">
                  <Link to="/reset-week">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Start Reset Week — $49
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20 px-10 py-6 text-lg font-bold uppercase tracking-wide">
                  <Link to="/contact">
                    <MapPin className="mr-2 h-5 w-5" />
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
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fadeInUp">
              <div>
                <span className="section-eyebrow text-primary">THE FOUNDATION</span>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-8 uppercase leading-tight">
                  Why Mobility Matters <span className="text-primary">As We Age</span>
                </h2>
                
                <div className="space-y-6 mb-10">
                  {whyMobilityMatters.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 bg-secondary rounded-xl border-l-4 border-primary">
                      <div>
                        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-accent/10 border-l-4 border-accent p-8 rounded-r-2xl">
                  <h3 className="font-heading text-2xl font-bold mb-3 uppercase">The Solution</h3>
                  <p className="text-foreground leading-relaxed font-medium">At Drake Fitness, we prioritize mobility first — so strength training actually works and lasts.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="relative">
                <div className="h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src={davidMaceTraining}
                    alt="Coach demonstrating proper mobility movement technique"
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground p-8 rounded-xl shadow-xl max-w-sm">
                  <p className="font-heading text-4xl font-bold mb-2">92%</p>
                  <p className="font-semibold text-lg">of our Avondale members report less pain within 3 weeks</p>
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
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">Who Drake Fitness Helps in Avondale</h2>
              <p className="text-xl text-muted-foreground">We specialize in helping local adults restart their fitness journey the right way.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {whoWeHelp.map((person, index) => (
                <div key={index} className={`p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${index === 5 ? 'bg-accent' : 'bg-background'}`}>
                  <h3 className={`font-heading text-2xl font-bold mb-4 uppercase text-center ${index === 5 ? 'text-accent-foreground' : ''}`}>{person.title}</h3>
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
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">What Your First Class Feels Like</h2>
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
                      <h3 className="font-heading text-2xl font-bold mb-3 uppercase">{item.title}</h3>
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
              <p className="text-2xl font-medium mb-6 leading-relaxed italic">"I was nervous about my first class, but the coach made me feel comfortable immediately. I knew exactly what to do and never felt lost."</p>
              <p className="font-bold text-lg text-accent">— Lisa R., Avondale Member</p>
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
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase leading-tight">
                  Start With Reset Week
                </h2>
                <p className="text-2xl mb-8 leading-relaxed text-primary-foreground/90">
                  A full week of coached training designed specifically for adults restarting fitness.
                </p>

                <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-8 mb-10">
                  <h3 className="font-heading text-3xl font-bold mb-6 uppercase">What's Included:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Check className="text-accent h-6 w-6 mt-1" />
                      <div>
                        <p className="font-bold text-lg mb-1">7 Days of Unlimited Classes</p>
                        <p className="text-primary-foreground/80">Small groups, maximum attention</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Check className="text-accent h-6 w-6 mt-1" />
                      <div>
                        <p className="font-bold text-lg mb-1">Coach-Guided Introduction</p>
                        <p className="text-primary-foreground/80">Learn the fundamentals properly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Check className="text-accent h-6 w-6 mt-1" />
                      <div>
                        <p className="font-bold text-lg mb-1">Mobility-Focused Workouts</p>
                        <p className="text-primary-foreground/80">Joint-friendly training that works</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Check className="text-accent h-6 w-6 mt-1" />
                      <div>
                        <p className="font-bold text-lg mb-1">No Pressure Environment</p>
                        <p className="text-primary-foreground/80">Go at your own pace</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-lg font-bold uppercase tracking-wide">
                  <Link to="/reset-week">
                    Start Reset Week — $49
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
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

      {/* Location Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="section-eyebrow text-primary">VISIT US</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase">Find Us in Avondale</h2>
              <p className="text-xl text-muted-foreground">Conveniently located in the heart of Avondale, West Ashley, Charleston</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <div className="bg-background p-10 rounded-2xl shadow-lg max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-primary h-6 w-6 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-1">Address</p>
                      <p className="text-muted-foreground">2 Avondale Ave<br />Charleston, SC 29407</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Star className="text-primary h-6 w-6 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-1">Parking</p>
                      <p className="text-muted-foreground">Free parking available on-site</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link to="/contact">
                      <MapPin className="mr-2 h-5 w-5" />
                      Get Directions
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
