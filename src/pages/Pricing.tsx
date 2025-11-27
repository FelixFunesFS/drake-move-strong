import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2, Calendar, Users, Laptop } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Pricing = () => {
  const membershipOptions = [
    {
      name: "Foundation Membership",
      price: "$149",
      period: "/mo",
      description: "Perfect for beginners or busy schedules",
      features: [
        "8 classes per month",
        "Movement assessment included",
        "Access to all class types",
        "Progress tracking",
      ],
      cta: "Choose Foundation",
      link: "/contact",
      popular: false,
    },
    {
      name: "Standard Unlimited",
      price: "$199",
      period: "/mo",
      description: "Our most popular option — train as often as you like",
      features: [
        "Unlimited classes",
        "Priority booking window",
        "Quarterly goal reviews",
        "Guest pass per month",
      ],
      cta: "Choose Unlimited",
      link: "/contact",
      popular: true,
    },
    {
      name: "VIP Unlimited",
      price: "$249",
      period: "/mo",
      description: "Unlimited group classes + weekly 1:1 coaching",
      features: [
        "Unlimited classes",
        "1 monthly 1:1 session",
        "Personalized programming notes",
        "Nutritional guidance",
      ],
      cta: "Choose VIP",
      link: "/contact",
      popular: false,
    },
  ];

  const otherOptions = [
    {
      icon: <Laptop className="w-8 h-8" />,
      name: "Hybrid Online/Studio",
      price: "$129",
      period: "/mo",
      description: "Great for travelers or remote workers who want to stay connected.",
      features: [
        "Unlimited Zoom classes",
        "2 studio visits per month",
      ],
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      name: "10-Pack Flex Pass",
      price: "$300",
      description: "Perfect for flexible schedules or frequent travelers.",
      features: [
        "10 class credits",
        "6-month expiration",
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      name: "Single Drop-In",
      price: "$30",
      period: "/class",
      description: "Just visiting or want to try a specific class?",
      features: [
        "No commitment required",
      ],
    },
  ];

  const faqs = [
    {
      question: "Do I need experience to join?",
      answer: "No. Foundation Flow is specifically designed for beginners. We meet you where you are, regardless of your starting point.",
    },
    {
      question: "Will this help my joint pain?",
      answer: "Yes. We are a mobility-first studio that focuses on safe, joint-friendly training that builds strength without aggravating existing issues.",
    },
    {
      question: "How big are the classes?",
      answer: "We keep classes small to ensure everyone gets attention, coaching cues, and form correction from David or Nick. Typical class size is 6-12 people.",
    },
    {
      question: "What if I have an injury?",
      answer: "We modify movements for every individual. Our priority is keeping you safe while progressively building strength around your limitations. Every session can be adapted to your needs.",
    },
  ];

  return (
    <main>
      <Hero
        eyebrow="PRICING"
        title="Simple Memberships. Real Results."
        subtitle="No hidden fees. No long-term contracts. Just straightforward options designed to help you commit to your health."
      />

      <section className="py-16 md:py-24 bg-primary text-white section-slant-top">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-eyebrow text-drake-gold">BEGIN HERE</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">Start Here</h2>
            <Card className="bg-drake-gold text-drake-dark border-0">
              <CardHeader>
                <CardTitle className="text-3xl">14-Day Intro Experience</CardTitle>
                <CardDescription className="text-drake-dark/80 text-lg">
                  Try unlimited classes for 14 days + get a free movement assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold mb-4">$49</div>
                <p className="text-sm uppercase tracking-wide font-semibold">One-Time Payment</p>
                <p className="mt-4">The best way to begin. No commitment required.</p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button asChild size="lg" className="bg-drake-dark hover:bg-drake-dark/90 text-white">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">MEMBERSHIPS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
            Choose Your <span className="text-primary">Path</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Monthly Memberships
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipOptions.map((option, index) => (
              <Card key={index} className={`relative ${option.popular ? "border-primary border-2 shadow-card" : "shadow-card"}`}>
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{option.name}</CardTitle>
                  <CardDescription className="text-base">{option.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{option.price}</span>
                    <span className="text-muted-foreground">{option.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className={`w-full ${option.popular ? "bg-primary hover:bg-primary/90" : ""}`}>
                    <Link to={option.link}>{option.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted section-slant-top">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">FLEXIBLE OPTIONS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Other Ways to <span className="text-primary">Train</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {otherOptions.map((option, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <div className="text-primary mb-2">{option.icon}</div>
                  <CardTitle className="text-xl">{option.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{option.price}</span>
                    {option.period && <span className="text-muted-foreground">{option.period}</span>}
                  </div>
                  <CardDescription className="text-base mt-2">{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Select Plan</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">QUESTIONS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Common <span className="text-primary">Questions</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-border rounded-xl px-6 shadow-card">
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

      <CTASection
        eyebrow="GET STARTED"
        title="Ready to Feel Stronger?"
        subtitle="Join us for a free movement assessment and start your journey to better movement."
        ctaText="Book Now"
        ctaLink="/contact"
        variant="gold"
        slanted={true}
      />
    </main>
  );
};

export default Pricing;
