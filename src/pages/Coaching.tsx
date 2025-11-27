import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Heart, Dumbbell, TrendingUp, User } from "lucide-react";
import oneOnOneCoaching from "@/assets/one-on-one-coaching.jpg";
import davidCoach from "@/assets/david-double-kb-storefront.jpg";
import nickCoach from "@/assets/nick-sandbag-lunge.jpg";

const Coaching = () => {
  const reasons = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Are recovering from injury",
      description: "Safe, modified movements to bridge the gap between rehab and fitness.",
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Feel intimidated jumping into class",
      description: "Build confidence and learn basics in private setting first.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Want faster progress",
      description: "More focused attention accelerates your goals and technique.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Need individualized mobility work",
      description: "Targeted mobility addressing your specific limitations and pain points.",
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Have specific performance goals",
      description: "Training for a race, sport, or life event that requires structured preparation.",
    },
  ];

  const whatToExpect = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Assessment & Goals",
      description: "Every session starts with a check-in and targeted mobility assessment to evaluate what your body needs that day based on your body's mobility, strength, and your goals.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mobility & Strength",
      description: "A blend of targeted mobility work to open up your joints, functional strength training focused on real-world movement patterns that support your daily life and longevity.",
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Coaching & Homework",
      description: "Learn deeply from form corrections and technique refinement with optional homework exercises for recovery days to keep you progressing between sessions.",
    },
  ];

  return (
    <main>
      <Hero
        eyebrow="INDIVIDUAL ATTENTION"
        title="Personal Training Tailored to You"
        subtitle="Experience expert coaching designed specifically for your body, your history, and your goals. Move better and get stronger with 100% focus on you."
        primaryCTA={{ text: "Book a 1:1 Consultation", link: "/contact" }}
        backgroundImage={oneOnOneCoaching}
      />

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">WHY 1:1</p>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
              Why Choose <span className="text-primary">Personal Training?</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Because your body, history, and goals are unique.
            </p>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-center mb-12">1:1 coaching is perfect if you:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-3 md:space-x-4 p-5 md:p-6 bg-white rounded-xl border border-border shadow-card"
                >
                  <div className="text-primary flex-shrink-0">{reason.icon}</div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-2">{reason.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn">
        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-12">
              <p className="section-eyebrow text-primary text-center">SEE IT IN ACTION</p>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
                <span className="text-primary">1:1 Coaching</span> in Action
              </h2>
              <p className="text-xl text-center text-muted-foreground mb-8">
                Watch a personal training session
              </p>
              <YouTubeEmbed
                title="Drake Fitness 1:1 Coaching Demo"
                placeholder="Add a video showcasing your personalized coaching approach"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">YOUR SESSION</p>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
              What to <span className="text-primary">Expect</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {whatToExpect.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className="text-center p-5 md:p-6 bg-white rounded-xl border border-border shadow-card"
                >
                  <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="text-lg md:text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 max-w-3xl mx-auto bg-white p-8 rounded-xl border border-border shadow-card"
            >
              <h3 className="text-2xl font-bold text-center mb-4">Additional Benefits</h3>
              <ul className="space-y-3">
                {[
                  "Movement assessment",
                  "Corrective mobility work",
                  "Functional strength training",
                  "Technique refinement",
                  "Lifestyle + recovery guidance",
                  "Optional homework exercises",
                ].map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    <span className="text-lg">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">THE TEAM</p>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
              Your <span className="text-primary">Coaches</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-xl shadow-card border border-border"
              >
                <OptimizedImage
                  src={davidCoach}
                  alt="David Drake in front of Drake Fitness studio"
                  aspectRatio="video"
                  className="mb-4 rounded-lg"
                />
                <h3 className="text-2xl font-bold mb-2">David Drake</h3>
                <p className="text-primary font-semibold mb-3">Owner & Head Coach</p>
                <p className="text-muted-foreground mb-4">
                  Specializing in mobility, corrective exercise, and functional strength training strategies.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/about">Read Bio</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-xl shadow-card border border-border"
              >
                <OptimizedImage
                  src={nickCoach}
                  alt="Coach Nick Poppa demonstrating sandbag training"
                  aspectRatio="video"
                  className="mb-4 rounded-lg"
                />
                <h3 className="text-2xl font-bold mb-2">Coach Nick</h3>
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

      <section className="py-16 md:py-24 bg-primary text-white section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="scaleIn">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-eyebrow text-drake-gold">YOUR TURN</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8">
                Book a consultation to discuss your goals, assess your movement, and build a plan that works for you. No pressure, just a conversation about your health.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold text-lg px-8 py-6">
                  <Link to="/contact">Book a 1:1 Consultation</Link>
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default Coaching;
