import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Heart, Dumbbell, TrendingUp, User } from "lucide-react";
import oneOnOne from "@/assets/one-on-one.jpg";
import davidOutside from "@/assets/david-outside.jpg";
import coachNick from "@/assets/coach-nick.jpg";

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
      description: "A blend of targeted mobility work to open up your joints, functional strength training focused on real-world movement patterns and patterns that support your daily life and longevity over heavy weights and ego.",
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
        eyebrow="Individual Attention"
        title={
          <>
            Personal Training With <span className="text-drake-gold">David or Nick</span><br />
            Tailored to You
          </>
        }
        subtitle="Experience expert coaching designed specifically for your body, your history, and your goals. Move better and get stronger with 100% focus on you."
        primaryCTA={{ text: "Book a 1:1 Consultation", link: "/contact" }}
        backgroundImage={oneOnOne}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose <span className="text-primary">Personal Training?</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Because your body, history, and goals are unique.
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-center mb-12">1:1 coaching is perfect if you:</p>
            <div className="grid md:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-card rounded-lg border border-border">
                  <div className="text-primary flex-shrink-0">{reason.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What to <span className="text-primary">Expect</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whatToExpect.map((item, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-lg border border-border">
                <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 max-w-3xl mx-auto bg-card p-8 rounded-lg border border-border">
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
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Your <span className="text-primary">Coaches</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <img
                src={davidOutside}
                alt="David Drake"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">David Drake</h3>
              <p className="text-primary font-semibold mb-3">Owner & Head Coach</p>
              <p className="text-muted-foreground mb-4">
                Specializing in mobility, corrective exercise, and functional strength training strategies.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/about">Read Bio</Link>
              </Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <img
                src={coachNick}
                alt="Coach Nick"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Coach Nick</h3>
              <p className="text-primary font-semibold mb-3">Holistic Movement Specialist</p>
              <p className="text-muted-foreground mb-4">
                Expert in bridging rehabilitation and performance. Patience and muscle can coexist.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/about">Read Bio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8">
              Book a consultation to discuss your goals, assess your movement, and build a plan that works for you. No pressure, just a conversation about your health.
            </p>
            <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold text-lg px-8 py-6">
              <Link to="/contact">Book a 1:1 Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Coaching;
