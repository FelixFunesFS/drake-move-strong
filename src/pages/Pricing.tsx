import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2, Star, ExternalLink } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";
import { StructuredData, buildFAQSchema } from "@/components/StructuredData";
import { GoogleReviewsBadge } from "@/components/GoogleReviewsBadge";

const Pricing = () => {
  const faqs = [{
    question: "Do I need experience to join?",
    answer: "No. Foundation Flow is specifically designed for beginners. We meet you where you are, regardless of your starting point."
  }, {
    question: "Will this help my joint pain?",
    answer: "Yes. We are a mobility-first studio that focuses on safe, joint-friendly training that builds strength without aggravating existing issues."
  }, {
    question: "How big are the classes?",
    answer: "We keep classes small to ensure everyone gets attention, coaching cues, and form correction from David or Nick. Typical class size is 6-12 people."
  }, {
    question: "What if I have an injury?",
    answer: "We modify movements for every individual. Our priority is keeping you safe while progressively building strength around your limitations. Every session can be adapted to your needs."
  }];
  
  const faqSchema = buildFAQSchema(faqs.map(faq => ({ q: faq.question, a: faq.answer })));
  
  return (
    <>
      <SEO
        title="Gym Membership Charleston | From $50 | Simple Plans 2026"
        description="Simple, transparent membership options. Reset Week $50, Foundation $180/mo, Longevity Unlimited $225/mo. No contracts, real results at Drake Fitness Charleston."
        canonical="https://drake.fitness/pricing"
      />
      <StructuredData data={faqSchema} />
      
      <main>
        {/* SECTION HEADER */}
        <section className="pt-32 pb-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-hero text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-6">
              Start Moving Better—<span className="text-primary">Without Guesswork</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple memberships. Clear coaching. A safe path to long-term strength and mobility.
            </p>
          </div>
        </section>

        {/* STEP 1: MOVEMENT RESET WEEK (VISUAL PRIORITY #1) */}
        <section className="py-12 md:py-16 bg-muted">
          <div className="container mx-auto px-4">
            {/* Trust Signal - Above Reset Week Card */}
            <div className="text-center mb-8">
              <GoogleReviewsBadge variant="compact" />
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="bg-primary/5 border-2 border-primary/20 shadow-lg overflow-hidden">
                <CardHeader className="pb-4">
                  <span className="inline-block bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full w-fit mb-4">
                    Best Place to Start
                  </span>
                  <h2 className="font-hero text-3xl md:text-4xl font-bold uppercase text-foreground">
                    Movement Reset Week
                  </h2>
                  <p className="text-lg text-muted-foreground mt-2">
                    A guided, no-pressure way to restart your body and see if Drake Fitness is right for you.
                  </p>
                </CardHeader>
                <CardContent className="pb-6">
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                      <span className="text-foreground">Unlimited classes for 7 days</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                      <span className="text-foreground">Movement-first, joint-friendly coaching</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                      <span className="text-foreground">Go at your own pace</span>
                    </li>
                  </ul>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="text-center sm:text-left">
                      <span className="text-5xl md:text-6xl font-bold text-foreground">$50</span>
                      <span className="text-muted-foreground ml-2">/ 7 days</span>
                    </div>
                    <div className="flex-1 w-full sm:w-auto">
                      <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold w-full sm:w-auto">
                        <a href="https://app.punchpass.com/org/9942/buy?passes=1023628" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                          Start Reset Week
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-primary/5 border-t border-primary/10 py-4">
                  <p className="text-sm text-muted-foreground text-center w-full">
                    No commitment. Choose a membership only if it feels right.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* STEP 2: CORE MEMBERSHIPS (SIDE-BY-SIDE) */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <p className="text-sm uppercase tracking-widest text-muted-foreground text-center mb-8">
              Ongoing Memberships
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {/* LEFT CARD — FOUNDATION MEMBERSHIP */}
              <Card className="shadow-card relative">
                <CardHeader className="pb-4">
                  <h3 className="font-hero text-2xl uppercase text-foreground">
                    Foundation Membership
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Build strength and consistency—without overdoing it.
                  </p>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-foreground">$180</span>
                    <span className="text-muted-foreground ml-1">/ month</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                      <span>2 coached classes per week</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                      <span>Safe, structured progression</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-primary" />
                      <span>Ideal for beginners & restarters</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground italic mb-6">
                    Feel stronger, move better, and stay consistent week to week.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Choose Foundation</Link>
                  </Button>
                </CardContent>
                <CardFooter className="pt-0">
                  <p className="text-xs text-muted-foreground text-center w-full">
                    Most members start here after Reset Week.
                  </p>
                </CardFooter>
              </Card>

              {/* RIGHT CARD — LONGEVITY UNLIMITED (ANCHOR) */}
              <Card className="shadow-lg relative bg-drake-dark text-white border-2 border-drake-gold md:-translate-y-2">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-drake-gold text-drake-dark px-4 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-current" />
                    Best Value
                  </span>
                </div>
                <CardHeader className="pb-4 pt-8">
                  <h3 className="font-hero text-2xl uppercase text-drake-gold">
                    Longevity Unlimited
                  </h3>
                  <p className="text-gray-300 mt-1">
                    Train without limits. Protect your body for the long run.
                  </p>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-white">$225</span>
                    <span className="text-gray-400 ml-1">/ month</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-drake-gold" />
                      <span className="text-gray-200">Unlimited classes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-drake-gold" />
                      <span className="text-gray-200">Maximum flexibility & consistency</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-drake-gold" />
                      <span className="text-gray-200">Best option for long-term results</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-400 italic mb-4">
                    The easiest way to stay strong, mobile, and pain-free.
                  </p>
                  {/* Testimonial Snippet */}
                  <div className="text-sm italic text-gray-300 border-t border-white/10 pt-4 mb-4">
                    "I'm stronger in my 40s than ever before." — Aaron Q.
                  </div>
                  <Button asChild className="w-full bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold">
                    <a href="https://drakefitness.punchpass.com/org/5950/catalogs/purchase/membership/219877" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                      Go Unlimited
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
                <CardFooter className="pt-0">
                  <p className="text-xs text-gray-400 text-center w-full">
                    Most popular choice for lasting results.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* STEP 3: OTHER OPTIONS (DE-EMPHASIZED) */}
        <section className="py-12 md:py-16 bg-muted border-t border-border">
          <div className="container mx-auto px-4">
            <h3 className="text-lg font-medium text-muted-foreground text-center mb-10">
              Other Ways to Train
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Foundation Plus */}
              <div className="text-center">
                <h4 className="font-semibold text-foreground mb-2">Foundation Plus</h4>
                <p className="text-2xl font-bold text-foreground mb-2">$200<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                <p className="text-sm text-muted-foreground mb-3">
                  For members who want more structure without going unlimited.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>3 classes per week</li>
                  <li>Same coaching and programming</li>
                </ul>
                <Link to="/contact" className="text-primary hover:text-primary/80 text-sm font-medium underline underline-offset-2">
                  Learn About Foundation Plus
                </Link>
              </div>

              {/* Remote Movement Support */}
              <div className="text-center">
                <h4 className="font-semibold text-foreground mb-2">Remote Movement Support</h4>
                <p className="text-2xl font-bold text-foreground mb-2">$100<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                <p className="text-sm text-muted-foreground mb-3">
                  Live Zoom sessions to support your in-studio training.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>Active membership required</li>
                  <li>Designed for travel or continuity</li>
                </ul>
                <Link to="/contact" className="text-primary hover:text-primary/80 text-sm font-medium underline underline-offset-2">
                  Add Remote Support
                </Link>
              </div>

              {/* 10-Class Pack */}
              <div className="text-center">
                <h4 className="font-semibold text-foreground mb-2">10-Class Pack</h4>
                <p className="text-2xl font-bold text-foreground mb-4">$200</p>
                <p className="text-sm text-muted-foreground mb-3">
                  For occasional training or maintenance.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>Expires in 6 months</li>
                  <li>No weekly structure</li>
                </ul>
                <a 
                  href="https://drakefitness.punchpass.com/org/5950/catalogs/purchase/pass/219932" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm font-medium underline underline-offset-2"
                >
                  Buy Class Pack
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SEO COMPARISON TABLE */}
        <section className="py-12 md:py-16 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <p className="text-muted-foreground text-center mb-4 max-w-2xl mx-auto">
              All Drake Fitness memberships are coached in Charleston, SC and designed for adults who want safe, sustainable strength and mobility.
            </p>
            <h2 className="font-hero text-2xl md:text-3xl font-bold uppercase text-center mb-8">
              Compare Drake Fitness <span className="text-primary">Membership Options</span>
            </h2>
            
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-4 py-3 text-left font-semibold">Membership</th>
                    <th className="px-4 py-3 text-left font-semibold">Weekly Access</th>
                    <th className="px-4 py-3 text-left font-semibold">Best For</th>
                    <th className="px-4 py-3 text-left font-semibold">Commitment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-primary/5">
                    <td className="px-4 py-3 font-medium text-foreground">Movement Reset Week</td>
                    <td className="px-4 py-3 text-muted-foreground">Unlimited (7 days)</td>
                    <td className="px-4 py-3 text-muted-foreground">Safest place to start</td>
                    <td className="px-4 py-3 text-muted-foreground">None</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">Foundation</td>
                    <td className="px-4 py-3 text-muted-foreground">2x per week</td>
                    <td className="px-4 py-3 text-muted-foreground">Steady, manageable progress</td>
                    <td className="px-4 py-3 text-muted-foreground">Month-to-month</td>
                  </tr>
                  <tr className="border-b border-border bg-drake-gold/10">
                    <td className="px-4 py-3 font-medium text-foreground">Longevity Unlimited</td>
                    <td className="px-4 py-3 text-muted-foreground">Unlimited</td>
                    <td className="px-4 py-3 text-muted-foreground">Long-term results & flexibility</td>
                    <td className="px-4 py-3 text-muted-foreground">Month-to-month</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground">10-Class Pack</td>
                    <td className="px-4 py-3 text-muted-foreground">Pay per class</td>
                    <td className="px-4 py-3 text-muted-foreground">Occasional or maintenance</td>
                    <td className="px-4 py-3 text-muted-foreground">Expires in 6 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Trust Reinforcement - Below Table */}
            <div className="text-center mt-10 mb-4">
              <GoogleReviewsBadge variant="compact" />
              <p className="text-sm text-muted-foreground mt-2">
                Real people. Real results. No gimmicks.
              </p>
            </div>
            
            {/* Tier-Mapped Testimonials */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
              <div className="bg-muted p-6 rounded-xl border border-border">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-drake-gold text-lg">★</span>)}
                </div>
                <p className="text-foreground italic mb-4">"Even in the group classes, if you're a beginner, he will make sure you are comfortable and learn proper form."</p>
                <p className="font-semibold text-foreground">— Turner W.</p>
                <p className="text-sm text-primary">Foundation member</p>
              </div>
              <div className="bg-drake-dark p-6 rounded-xl border-2 border-drake-gold">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-drake-gold text-lg">★</span>)}
                </div>
                <p className="text-gray-200 italic mb-4">"I'm stronger in my 40s than ever before… His knowledge and adaptability have made a significant impact."</p>
                <p className="font-semibold text-white">— Aaron Q.</p>
                <p className="text-sm text-drake-gold">Longevity Unlimited member</p>
              </div>
            </div>
            
            <p className="text-center text-muted-foreground mt-10">
              Still unsure? <Link to="/reset-week" className="text-primary hover:text-primary/80 font-medium underline underline-offset-2">Start with the Reset Week</Link> — it's designed to help you decide with confidence.
            </p>
          </div>
        </section>

        {/* REASSURANCE BLOCK */}
        <section className="py-12 md:py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Not sure which option fits you?<br />
              Start with the Reset Week—we'll help you choose after.
            </p>
            <Button asChild variant="outline" size="lg">
              <a href="https://app.punchpass.com/org/9942/buy?passes=1023628" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                Start Reset Week
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 md:py-24 bg-drake-dark">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-drake-gold text-center">QUESTIONS</p>
            <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase text-white">
              Common Membership <span className="text-drake-gold">Questions Answered</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="multiple" defaultValue={["item-0", "item-1", "item-2", "item-3"]} className="space-y-4">
                {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-white/5 border border-white/10 rounded-xl px-6">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline text-drake-gold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>)}
              </Accordion>
              
              {/* Internal Links to Local SEO Pages */}
              <div className="mt-12 text-center">
                <p className="text-gray-400 mb-4">Learn more about our specialized programs:</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/mobility-fitness-avondale" className="text-drake-gold hover:text-drake-gold/80 underline underline-offset-2">
                    Mobility Training
                  </Link>
                  <Link to="/strength-training-charleston" className="text-drake-gold hover:text-drake-gold/80 underline underline-offset-2">
                    Strength Training
                  </Link>
                  <Link to="/low-impact-fitness-charleston" className="text-drake-gold hover:text-drake-gold/80 underline underline-offset-2">
                    Low-Impact Fitness
                  </Link>
                  <Link to="/west-ashley-fitness" className="text-drake-gold hover:text-drake-gold/80 underline underline-offset-2">
                    West Ashley Fitness
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection 
          eyebrow="GET STARTED" 
          title="Ready to Reset How You Move?" 
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

export default Pricing;
