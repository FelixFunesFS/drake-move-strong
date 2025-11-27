import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Users, Trophy, Target, TrendingUp, Heart } from "lucide-react";
import heroImage from "@/assets/david-double-kb-storefront.jpg";
import heroImage2 from "@/assets/david-plank-row-outdoor.jpg";
import heroImage3 from "@/assets/kettlebell-artistic-floor.jpg";
import outdoorTraining from "@/assets/david-outdoor-dumbbell.jpg";
import davidCoach from "@/assets/david-goblet-squat-kb-rack.jpg";
import coachNick from "@/assets/nick-sandbag-lunge.jpg";
import kbCollection from "@/assets/kettlebell-collection.jpg";
import maceTraining from "@/assets/david-mace-training.jpg";
import communityMoment from "@/assets/community-gym-moment.jpg";
import memberYoga from "@/assets/member-yoga-pose.jpg";
import Marquee from "@/components/Marquee";
import OptimizedImage from "@/components/OptimizedImage";
import AnimatedSection from "@/components/AnimatedSection";
const Home = () => {
  return <main>
      <Hero title={<>Move Better. <span className="text-accent">Live Stronger.</span> Stay Pain-Free.</>} subtitle="Mobility-first functional strength training in Charleston, SC — coached by experts with 20+ years of experience helping real people move better, feel stronger, and build bodies that last." primaryCTA={{
      text: "Book Your Free Movement Assessment",
      link: "/contact"
    }} secondaryCTA={{
      text: "See Class Schedule",
      link: "/schedule"
    }} backgroundImages={[heroImage, heroImage2, heroImage3]} autoRotate={true} />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-eyebrow text-primary">WHY JUST A GYM</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
                A <span className="text-primary">Movement Studio</span> for Real Life
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
            <AnimatedSection animation="scaleIn" delay={0.2}>
              <OptimizedImage src={outdoorTraining} alt="Outdoor functional training with kettlebells" className="rounded-lg shadow-2xl h-full min-h-[500px]" aspectRatio="auto" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <p className="section-eyebrow text-primary text-center">WHAT MAKES US DIFFERENT</p>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
              We Focus on <span className="text-primary">What Matters</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              This isn't a gym. It's a studio built around joint health, mobility, and sustainable strength.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[{
            icon: <CheckCircle2 className="w-6 h-6" />,
            title: "Mobility before intensity",
            description: "We improve how your joints move before adding load — eliminating pain and preventing injury."
          }, {
            icon: <Target className="w-6 h-6" />,
            title: "Functional strength that carries into daily life",
            description: "Lift, carry, bend, twist, and move with confidence."
          }, {
            icon: <Users className="w-6 h-6" />,
            title: "Small classes with real coaching",
            description: "You get attention, guidance, and form corrections every time."
          }, {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Progress tracking that keeps you motivated",
            description: "Assessments every 4–8 weeks so you can see your progress."
          }, {
            icon: <Heart className="w-6 h-6" />,
            title: "A supportive, ego-free community",
            description: "We welcome beginners, busy adults, and anyone wanting sustainable results."
          }, {
            icon: <Trophy className="w-6 h-6" />,
            title: "Expert coaching with 20+ years experience",
            description: "Learn from professionals who understand movement mechanics."
          }].map((feature, index) => <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                <div className="bg-white p-8 rounded-xl shadow-card border border-border h-full hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-drake-cool-gray rounded-xl flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </AnimatedSection>)}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="bg-card p-8 md:p-10 rounded-lg shadow-card border border-border">
              <p className="section-eyebrow text-primary mb-4">START HERE</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase leading-tight">
                If You Feel Stiff, Achy, or Out of Shape...<br />
                <span className="text-primary">You're in the Right Place.</span>
              </h2>
              <p className="text-lg mb-6 text-muted-foreground">We specialize in helping:</p>
              <ul className="space-y-3 mb-8">
                {["Adults 30–65 with limited time", "Desk workers with back/hip stiffness", "Busy parents who need flexibility & results", "Former athletes seeking longevity", "People returning from injury", "Anyone wanting long-term, pain-free strength"].map((item, index) => <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>)}
              </ul>
              <p className="text-base font-semibold mb-6">
                No experience needed. No assessments. No pressure.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                <Link to="/contact">Start Your 14-Day Intro Experience</Link>
              </Button>
            </div>
            <AnimatedSection animation="scaleIn" delay={0.2}>
              <OptimizedImage 
                src={coachNick} 
                alt="Personal coaching session at Drake Fitness" 
                className="rounded-lg shadow-2xl h-full min-h-[500px]" 
                aspectRatio="auto" 
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">THE METHOD</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
            A Simple System That <span className="text-primary">Delivers Real Results</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Expert-Guided Training That Works
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[{
            number: "1",
            title: "Assess",
            description: "Start with a free movement assessment to understand your mobility, strength, and goals."
          }, {
            number: "2",
            title: "Train",
            description: "Join the right class track — Foundation Flow, Functional Strength, Mobility Reset, KB Strong, or Weekend Warrior."
          }, {
            number: "3",
            title: "Progress",
            description: "We check mobility and strength regularly so you can see and feel your improvements."
          }].map((step, index) => <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-lg text-muted-foreground">{step.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-drake-dark text-white section-slant-top">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div className="text-left">
              <p className="section-eyebrow text-drake-gold mb-2">OUR PROGRAMS</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 uppercase">
                Classes Designed to Help You <span className="text-drake-gold">Move and Feel Your Best</span>
              </h2>
              <p className="text-xl text-gray-300">
                Better Movement. Better Strength. Better Life.
              </p>
            </div>
            <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark shrink-0">
              <Link to="/classes">Explore All Classes</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
            name: "Foundation Flow™",
            description: "Beginner-friendly, mobility-first"
          }, {
            name: "Functional Strength™",
            description: "Our core program"
          }, {
            name: "KB Strong™",
            description: "Advanced strength & kettlebell technique"
          }, {
            name: "Mobility Reset™",
            description: "Recovery & joint health"
          }, {
            name: "Weekend Warrior™",
            description: "Saturday strength & conditioning"
          }, {
            name: "Functional Flow Online™",
            description: "Train live from anywhere"
          }].map((classItem, index) => <div key={index} className="bg-drake-dark-muted p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
                <p className="text-gray-300">{classItem.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">MEET THE TEAM</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
            <span className="text-primary">Coaching You Can Trust</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Experience, Expertise & Care
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="bg-white p-6 rounded-xl shadow-card border border-border hover:shadow-xl transition-shadow">
                <OptimizedImage src={davidCoach} alt="David Drake coaching kettlebell technique" className="w-full rounded-lg mb-4" aspectRatio="video" />
                <h3 className="text-2xl font-bold mb-2">David Drake</h3>
                <p className="text-primary font-semibold mb-3">Owner & Head Coach</p>
                <p className="text-muted-foreground mb-4">
                  With more than 25 years of training experience, a degree in Health and Exercise Science, and a career recognized early as Charleston's Best Personal Trainer, David is a master of movement and functional strength.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/about">Learn More About David</Link>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="bg-white p-6 rounded-xl shadow-card border border-border hover:shadow-xl transition-shadow">
                <OptimizedImage src={coachNick} alt="Coach Nick Poppa demonstrating sandbag training" className="w-full rounded-lg mb-4" aspectRatio="video" />
                <h3 className="text-2xl font-bold mb-2">Coach Nick Poppa</h3>
                <p className="text-primary font-semibold mb-3">Holistic Movement Specialist</p>
                <p className="text-muted-foreground mb-4">
                  Nick bridges the gap between rehabilitation and performance. His approach helps clients improve posture, stability, mobility, and strength through sustainable lifestyle and movement habits.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/about">Learn More About Nick</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">RESULTS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
            Real People. <span className="text-primary">Real Results.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            {[{
            quote: "I used to wake up with back pain every day. Now I move better than I did in my 30s.",
            author: "Member, Charleston",
            rating: 5
          }, {
            quote: "The coaching here is next-level. It's not just a workout — it's education, support, and real progress.",
            author: "Member, Charleston",
            rating: 5
          }].map((testimonial, index) => <div key={index} className="bg-white p-8 rounded-xl shadow-card border border-border">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <span key={i} className="text-drake-gold text-xl">★</span>)}
                </div>
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold">— {testimonial.author}</p>
              </div>)}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" variant="outline">
              <Link to="/success-stories">See More Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted overflow-hidden">
        <div className="container mx-auto px-4 mb-8">
          <p className="section-eyebrow text-primary text-center">THE STUDIO</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 uppercase">
            Inside <span className="text-primary">Drake Fitness</span>
          </h2>
          <p className="text-center text-muted-foreground">Real training. Real results. Real community.</p>
        </div>
        <Marquee speed="slow" pauseOnHover={true}>
          <OptimizedImage src={kbCollection} alt="Kettlebell collection at Drake Fitness" className="h-64 w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={maceTraining} alt="David Drake demonstrating mace training" className="h-64 w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={communityMoment} alt="Community training moment at Drake Fitness" className="h-64 w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={memberYoga} alt="Member practicing yoga pose" className="h-64 w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={davidCoach} alt="David coaching kettlebell technique" className="h-64 w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={outdoorTraining} alt="Outdoor kettlebell training session" className="h-64 w-96 rounded-lg mx-2" aspectRatio="auto" />
        </Marquee>
      </section>

      <CTASection eyebrow="GET STARTED" title="You Deserve a Body That Feels Strong, Mobile & Capable." ctaText="Book Your Free Movement Assessment" ctaLink="/contact" variant="gold" slanted={true} />
    </main>;
};
export default Home;