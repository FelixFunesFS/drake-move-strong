import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Target, Heart, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/david-mace-training.jpg";
import davidImage from "@/assets/david-double-kb-storefront.jpg";
import davidImage2 from "@/assets/david-goblet-squat-kb-rack.jpg";
import nickImage from "@/assets/nick-sandbag-lunge.jpg";
import kbCollection from "@/assets/kettlebell-collection.jpg";
import communityMoment from "@/assets/community-gym-moment.jpg";
import memberYoga from "@/assets/member-yoga-pose.jpg";
import outdoorKb from "@/assets/outdoor-kettlebell.jpg";
import coachingSession from "@/assets/coaching-session.jpg";
import ImageGallery from "@/components/ImageGallery";

const About = () => {
  return (
    <main>
      <Hero
        eyebrow="Our Purpose"
        title={
          <>
            Why Drake Fitness <span className="text-drake-gold">Exists</span>
          </>
        }
        subtitle="To help adults move better, feel stronger, and stay pain-free for life."
        backgroundImage={heroImage}
      />

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                Our <span className="text-primary">Philosophy</span>
              </h2>
              <h3 className="text-2xl font-bold text-center mb-8 text-primary">
                Movement First. Strength for Life.
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  We don't chase intensity, trends, or exhaustion.<br />
                  We chase <strong>movement quality</strong>, <strong>joint health</strong>, and <strong>sustainable strength</strong>.
                </p>
                <p className="text-lg mb-6">Everything we do is grounded in:</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Mobility",
                    "Functional movement patterns",
                    "Kettlebell and calisthenic strength",
                    "Longevity",
                    "Injury prevention",
                    "Smart coaching",
                    "Real-world performance",
                  ].map((principle, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-lg"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {principle}
                    </motion.li>
                  ))}
                </ul>
                <p className="text-xl font-semibold text-center text-primary mt-8">
                  If you can move better, you can live better.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn">
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                See Our <span className="text-primary">Coaching Philosophy</span> in Action
              </h2>
              <p className="text-xl text-center text-muted-foreground mb-12">
                Watch how we help clients move better
              </p>
              <YouTubeEmbed
                title="Drake Fitness Coaching Philosophy"
                placeholder="Add a video showcasing your coaching approach and training methodology"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Meet Your <span className="text-primary">Coaches</span>
            </h2>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto space-y-16">
            <AnimatedSection animation="fadeInUp">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <OptimizedImage
                      src={davidImage}
                      alt="David Drake in front of Drake Fitness studio"
                      aspectRatio="portrait"
                      className="shadow-2xl rounded-lg"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <OptimizedImage
                      src={davidImage2}
                      alt="David Drake demonstrating goblet squat with kettlebells"
                      aspectRatio="video"
                      className="shadow-2xl rounded-lg"
                    />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">David Drake</h3>
                  <p className="text-xl text-primary font-semibold mb-4">
                    Owner • Head Coach • Mobility & Strength Specialist
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    B.S. Health & Exercise Science, Furman University<br />
                    Charleston's Best Personal Trainer (City Paper)
                  </p>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      For more than <strong>25 years</strong>, David has been helping people rediscover proper movement, reduce pain, and build functional strength that lasts. With a strong educational foundation and deep experience in corrective exercise, mobility training, and StrongFirst-inspired kettlebell work, David has developed a coaching style that is rooted in precision, progression, and sustainable results.
                    </p>
                    <p>
                      He describes himself as a <strong>body mechanic</strong> — someone who understands how the human body is built to move and how to restore that movement when life, injuries, or habits disrupt it.
                    </p>
                    <p>
                      David believes strength is a skill, mobility is the foundation, and proper movement unlocks lasting health. Whether coaching beginners or advanced clients, David helps every member move better, feel better, and train smarter.
                    </p>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-bold mb-2">Specialties:</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Mobility & joint restoration",
                        "Corrective exercise",
                        "Kettlebell training (StrongFirst influence)",
                        "Movement mechanics",
                        "Holistic wellness (mental, physical, nutritional)",
                        "1:1 & small-group coaching",
                      ].map((specialty, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <span>{specialty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild className="mt-6">
                    <Link to="/coaching">1:1 Personal Training with David</Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="md:order-2">
                  <OptimizedImage
                    src={nickImage}
                    alt="Coach Nick Poppa demonstrating sandbag training"
                    aspectRatio="portrait"
                    className="shadow-2xl rounded-lg"
                  />
                </motion.div>
                <div className="md:order-1">
                  <h3 className="text-3xl font-bold mb-2">Nick Poppa</h3>
                  <p className="text-xl text-primary font-semibold mb-4">
                    Holistic Health & Movement Specialist
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Posture • Stability • Mobility • Strength
                  </p>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Originally from Long Island, Nick's own journey through football injuries, a torn labrum, concussions, chronic back pain, and gut issues led him to discover a deeper world of human movement, lifestyle balance, and functional wellness.
                    </p>
                    <p>
                      His approach bridges the gap between <strong>rehabilitation and performance</strong>, helping clients improve posture, stability, mobility, and functional strength through corrective exercise and holistic lifestyle coaching.
                    </p>
                    <p>
                      Nick's philosophy centers on meeting clients exactly where they are, helping them fine-tune their body, habits, and movement patterns to support their <strong>Functional Lifestyle of Wellness (FLOW)</strong>.
                    </p>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-bold mb-2">Specialties:</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Corrective exercise",
                        "Functional training",
                        "Posture & stability",
                        "Mobility restoration",
                        "Lifestyle coaching",
                        "Bridging rehab → performance",
                      ].map((specialty, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          <span>{specialty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild className="mt-6">
                    <Link to="/coaching">1:1 Personal Training with Nick</Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Inside the <span className="text-primary">Studio</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              See where the magic happens — authentic training, expert coaching, and a supportive community.
            </p>
            <ImageGallery
              images={[
                { src: kbCollection, alt: "Drake Fitness kettlebell collection" },
                { src: communityMoment, alt: "Community training moment at Drake Fitness" },
                { src: memberYoga, alt: "Member practicing mobility and yoga" },
                { src: outdoorKb, alt: "Outdoor kettlebell training session" },
                { src: coachingSession, alt: "Personal coaching session at Drake Fitness" },
                { src: davidImage2, alt: "David Drake coaching kettlebell technique" },
                { src: davidImage, alt: "Drake Fitness studio front" },
                { src: nickImage, alt: "Coach Nick demonstrating functional training" },
              ]}
            />
          </div>
        </section>
      </AnimatedSection>

      <CTASection
        title="Ready to Experience the Drake Fitness Difference?"
        subtitle="Book a free movement assessment and discover how we can help you move better, feel stronger, and live pain-free."
        ctaText="Book Free Assessment"
        ctaLink="/contact"
        variant="gold"
      />
    </main>
  );
};

export default About;
