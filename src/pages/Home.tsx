import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Users, Trophy, Target, TrendingUp, Heart } from "lucide-react";
import heroImage from "@/assets/hero-main.jpg";
import outdoorTraining from "@/assets/outdoor-training.jpg";
import davidOutside from "@/assets/david-outside.jpg";
import coachNick from "@/assets/coach-nick.jpg";

const Home = () => {
  return (
    <main>
      <Hero
        title={
          <>
            Move Better. <span className="text-drake-gold">Live Stronger.</span> Stay Pain-Free.
          </>
        }
        subtitle="Mobility-first functional strength training in Charleston, SC — coached by experts with 20+ years of experience helping real people move better, feel stronger, and build bodies that last."
        primaryCTA={{ text: "Book Your Free Movement Assessment", link: "/contact" }}
        secondaryCTA={{ text: "See Class Schedule", link: "/schedule" }}
        backgroundImage={heroImage}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Not Just a Gym. A <span className="text-primary">Movement Studio</span> for Real Life.
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Drake Fitness helps adults build strong, mobile, pain-free bodies through a proven blend of mobility training, functional strength, corrective exercise, and expert coaching.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Every session is led by <strong>David Drake</strong> or <strong>Coach Nick</strong>, using a science-based method that improves how your body moves, how it feels, and how it performs — not just in the gym, but in daily life.
              </p>
              <p className="text-lg text-foreground font-semibold">
                This is fitness that respects your joints, your lifestyle, and your long-term health.
              </p>
              <Button asChild size="lg" className="mt-6 bg-primary hover:bg-primary/90">
                <Link to="/about">Meet the Team</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src={outdoorTraining}
                alt="Outdoor functional training"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-drake-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What Makes Us <span className="text-drake-gold">Different</span>
          </h2>
          <p className="text-xl text-center text-gray-300 mb-12">
            Mobility-First. Joint-Smart. Results You Can Feel.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: "Mobility before intensity",
                description: "We improve how your joints move before adding load — eliminating pain and preventing injury.",
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Functional strength that carries into daily life",
                description: "Lift, carry, bend, twist, and move with confidence.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Small classes with real coaching",
                description: "You get attention, guidance, and form corrections every time.",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Progress tracking that keeps you motivated",
                description: "Assessments every 4–8 weeks so you can see your progress.",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "A supportive, ego-free community",
                description: "We welcome beginners, busy adults, and anyone wanting sustainable results.",
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Expert coaching with 20+ years experience",
                description: "Learn from professionals who understand movement mechanics.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-drake-dark-muted p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors">
                <div className="text-drake-gold mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Who We <span className="text-primary">Help</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            If you feel stiff, achy, or out of shape… you're in the right place.
          </p>
          <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg border border-border">
            <p className="text-lg mb-6">We specialize in helping:</p>
            <ul className="space-y-3 mb-8">
              {[
                "Adults 30–65",
                "Desk workers with back/hip stiffness",
                "Busy parents",
                "Former athletes",
                "People with past injuries",
                "Anyone wanting long-term, pain-free strength",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-semibold text-center mb-6">
              No experience needed. We meet you where you are.
            </p>
            <div className="text-center">
              <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark">
                <Link to="/contact">Start Your 14-Day Intro Experience</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            The Drake Fitness <span className="text-primary">Method</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            A Simple, Expert-Guided System
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                number: "1",
                title: "Assess",
                description: "Start with a free movement assessment to understand your mobility, strength, and goals.",
              },
              {
                number: "2",
                title: "Train",
                description: "Join the right class track — Foundation Flow, Functional Strength, Mobility Reset, KB Strong, or Weekend Warrior.",
              },
              {
                number: "3",
                title: "Progress",
                description: "We check mobility and strength regularly so you can see and feel your improvements.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-lg text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Featured <span className="text-primary">Classes</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Classes Designed for Better Movement, Better Strength, Better Life.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { name: "Foundation Flow™", description: "Beginner-friendly, mobility-first" },
              { name: "Functional Strength™", description: "Our core program" },
              { name: "KB Strong™", description: "Advanced strength & kettlebell technique" },
              { name: "Mobility Reset™", description: "Recovery & joint health" },
              { name: "Weekend Warrior™", description: "Saturday strength & conditioning" },
              { name: "Functional Flow Online™", description: "Train live from anywhere" },
            ].map((classItem, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
                <p className="text-muted-foreground">{classItem.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/classes">Explore All Classes</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Meet Your <span className="text-primary">Coaches</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Coaching Rooted in Experience, Expertise & Care
          </p>
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
                With more than 25 years of training experience, a degree in Health and Exercise Science, and a career recognized early as Charleston's Best Personal Trainer, David is a master of movement and functional strength.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/about">Learn More About David</Link>
              </Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <img
                src={coachNick}
                alt="Coach Nick"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Coach Nick Poppa</h3>
              <p className="text-primary font-semibold mb-3">Holistic Movement Specialist</p>
              <p className="text-muted-foreground mb-4">
                Nick bridges the gap between rehabilitation and performance. His approach helps clients improve posture, stability, mobility, and strength through sustainable lifestyle and movement habits.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/about">Learn More About Nick</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Real People. <span className="text-primary">Real Results.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            {[
              {
                quote: "I used to wake up with back pain every day. Now I move better than I did in my 30s.",
                author: "Member, Charleston",
                rating: 5,
              },
              {
                quote: "The coaching here is next-level. It's not just a workout — it's education, support, and real progress.",
                author: "Member, Charleston",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-card p-8 rounded-lg shadow-lg border border-border">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-drake-gold text-xl">★</span>
                  ))}
                </div>
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" variant="outline">
              <Link to="/success-stories">See More Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="You Deserve a Body That Feels Strong, Mobile & Capable."
        ctaText="Book Your Free Movement Assessment"
        ctaLink="/contact"
        variant="gold"
      />
    </main>
  );
};

export default Home;
