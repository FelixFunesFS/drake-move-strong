import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";
import { StructuredData, buildFAQSchema } from "@/components/StructuredData";

const FAQ = () => {
  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "Do I need experience to join?",
          a: "No. Our Foundation Flow classes are specifically designed for beginners. We meet you where you are, regardless of your starting point. Everyone begins somewhere, and our coaches are experts at working with people of all fitness levels.",
        },
        {
          q: "How do I get started?",
          a: "The best way to begin is to book a Free Mobility Consultation or start our 14-Day Intro Experience ($49). This gives you unlimited classes for two weeks plus a mobility consultation, so you can experience our coaching style and find the right class schedule for you.",
        },
        {
          q: "What should I wear and bring?",
          a: "Wear comfortable athletic clothing you can move in. We train barefoot or in minimal shoes. Bring water and a towel. We provide all equipment including kettlebells, mats, and mobility tools.",
        },
      ],
    },
    {
      category: "Classes & Training",
      questions: [
        {
          q: "Will this help my joint pain?",
          a: "Yes. We are a mobility-first studio that focuses on safe, joint-friendly training. We improve how your joints move before adding load, which often eliminates pain and prevents injury. Many members come to us specifically because traditional gyms aggravated their pain.",
        },
        {
          q: "How big are the classes?",
          a: "We keep classes small (typically 6-12 people) to ensure everyone gets attention, coaching cues, and form corrections from David or Nick. You're never just a number in a crowded class.",
        },
        {
          q: "What if I have an injury?",
          a: "We modify movements for every individual. Our priority is keeping you safe while progressively building strength around your limitations. Every session can be adapted to your needs. If you have a serious injury, we recommend starting with 1:1 coaching.",
        },
        {
          q: "Do you offer online classes?",
          a: "Yes. Functional Flow Online classes let you train live with us via Zoom. Perfect if you travel frequently or can't make it to the studio. You'll get the same expert coaching remotely.",
        },
        {
          q: "What's the difference between the class types?",
          a: "Foundation Flow is beginner-friendly and mobility-focused. Functional Strength is our core program blending mobility, kettlebell work, and conditioning. KB Strong is advanced strength training. Mobility Reset focuses on recovery and flexibility. Weekend Warrior is our Saturday community class.",
        },
      ],
    },
    {
      category: "Membership & Pricing",
      questions: [
        {
          q: "Do you require long-term contracts?",
          a: "No. Our memberships are month-to-month with no long-term contracts. You can cancel anytime with 30 days notice. We believe you should stay because you love it, not because you're locked in.",
        },
        {
          q: "What membership should I choose?",
          a: "Foundation Membership (8 classes/month, $149) is great for beginners or busy schedules. Standard Unlimited ($199) is our most popular option for consistent training. VIP Unlimited ($249) includes unlimited classes plus one monthly 1:1 session.",
        },
        {
          q: "Can I pause my membership?",
          a: "Yes. We understand life happens. You can freeze your membership for up to 2 months per year for a small administrative fee.",
        },
        {
          q: "Do you offer drop-ins?",
          a: "Yes. Drop-in classes are $30 per session. We also offer a 10-Pack Flex Pass ($300) that's valid for 6 months, perfect for irregular schedules.",
        },
      ],
    },
    {
      category: "1:1 Coaching",
      questions: [
        {
          q: "Who is 1:1 coaching for?",
          a: "1:1 coaching is perfect if you're recovering from injury, have specific goals, feel intimidated by group classes, need individualized mobility work, or want accelerated progress with personalized attention.",
        },
        {
          q: "How much does 1:1 coaching cost?",
          a: "Contact us for current 1:1 coaching rates. We offer single sessions and discounted packages. VIP Unlimited members get one monthly 1:1 session included.",
        },
        {
          q: "Can I do both group classes and 1:1 coaching?",
          a: "Absolutely! Many members combine group classes for community and consistency with occasional 1:1 sessions for personalized programming and technique refinement.",
        },
      ],
    },
    {
      category: "Facility & Community",
      questions: [
        {
          q: "Where are you located?",
          a: "We're located at 123 West Ashley Blvd in Charleston, SC 29407. We have ample parking and are easily accessible from downtown Charleston and surrounding areas.",
        },
        {
          q: "What are your hours?",
          a: "Classes run Monday-Friday from 6:00 AM to 8:00 PM, and Saturday from 8:00 AM to 11:00 AM. Check our schedule page for specific class times.",
        },
        {
          q: "Is there childcare?",
          a: "We don't offer childcare, but we do have early morning and evening classes to help parents fit training into their schedules.",
        },
        {
          q: "What's the community like?",
          a: "Our community is supportive, non-judgmental, and ego-free. We attract busy adults, parents, former athletes, and people prioritizing long-term health over short-term intensity. Everyone cheers for each other's progress.",
        },
      ],
    },
  ];

  const allFAQs = faqCategories.flatMap(cat => cat.questions);
  const faqSchema = buildFAQSchema(allFAQs);

  return (
    <>
      <SEO
        title="10 Charleston Fitness FAQs Answered | 2026 Guide"
        description="Find answers to common questions about our training, memberships, and approach at Drake Fitness in Charleston, SC."
        canonical="https://drake.fitness/faq"
      />
      <StructuredData data={faqSchema} />
      
      <main>
      <Hero
        eyebrow="HELP CENTER"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Drake Fitness, our classes, and how to get started."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="font-hero text-2xl md:text-3xl font-bold mb-6 text-primary uppercase">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, qIndex) => (
                    <AccordionItem
                      key={qIndex}
                      value={`${catIndex}-${qIndex}`}
                      className="bg-white border border-border rounded-xl px-6 shadow-card"
                    >
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted section-slant-top">
        <div className="container mx-auto px-4 text-center">
          <p className="section-eyebrow text-primary">NEED MORE HELP?</p>
          <h2 className="font-hero text-3xl md:text-4xl font-bold mb-4 uppercase">
            Still Have <span className="text-primary">Questions?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're here to help. Reach out and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <CTASection
        eyebrow="GET STARTED"
        title="Ready to Get Started?"
        subtitle="Try Reset Week — 7 days of unlimited classes for just $49. No commitment."
        ctaText="Start Reset Week — $49"
        ctaLink="/reset-week"
        variant="primary"
        slanted={true}
      />
    </main>
    </>
  );
};

export default FAQ;
