import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Users, Trophy, Target, TrendingUp, Heart } from "lucide-react";
import { SEO } from "@/components/SEO";
import { StructuredData, localBusinessSchema } from "@/components/StructuredData";
import heroImage2 from "@/assets/hero-barbell-deadlift.jpg";
import heroImage3 from "@/assets/hero-coaching-session.jpg";
import outdoorTraining from "@/assets/david-outdoor-dumbbell.jpg";
import davidCoach from "@/assets/david-goblet-squat-kb-rack.jpg";
import coachNick from "@/assets/nick-holistic-coaching.jpg";
import startHereImage from "@/assets/outdoor-sandbag-training.jpg";
import kbCollection from "@/assets/kettlebell-collection.jpg";
import maceTraining from "@/assets/david-mace-training.jpg";
import communityMoment from "@/assets/community-gym-moment.jpg";
import memberYoga from "@/assets/member-yoga-pose.jpg";
import coachingSession from "@/assets/coaching-session.jpg";
import oneOnOneCoaching from "@/assets/one-on-one-coaching.jpg";
import kettlebellFormCheck from "@/assets/kettlebell-form-check.jpg";
import groupTraining from "@/assets/group-training.jpg";
import mobilityClass from "@/assets/mobility-class.jpg";
import outdoorTrainingNew from "@/assets/outdoor-training.jpg";
import davidOutside from "@/assets/david-outside.jpg";
import oneOnOne from "@/assets/one-on-one.jpg";
import Marquee from "@/components/Marquee";
import OptimizedImage from "@/components/OptimizedImage";
import AnimatedSection from "@/components/AnimatedSection";
const Home = () => {
  return (
    <>
      <SEO
        title="Drake Fitness - Mobility-First Functional Strength Training in Charleston, SC"
        description="Expert-led functional strength and mobility training in Charleston, SC. Join David Drake and Coach Nick for small-group classes, personal training, and sustainable results. 25+ years of coaching experience."
        canonical="https://drake.fitness"
      />
      <StructuredData data={localBusinessSchema} />
      
      <main>
      <Hero title={<>Move Better.<span className="hidden sm:inline"><br /></span> <span className="text-accent">Live Stronger.</span><span className="hidden sm:inline"><br /></span> Stay Pain-Free.</>} subtitle="Mobility-first functional strength training in Charleston, SC — coached by experts with 20+ years of experience helping real people move better, feel stronger, and build bodies that last." primaryCTA={{
      text: "BOOK FREE MOBILITY CONSULTATION",
      link: "/contact"
    }} secondaryCTA={{
      text: "SEE CLASS SCHEDULE",
      link: "/schedule"
    }} backgroundImages={[heroImage2, heroImage3]} autoRotate={true} />

      {/* Brand Values Marquee */}
      <section className="py-4 md:py-6 bg-drake-dark overflow-hidden border-y border-drake-gold/20">
        <Marquee speed="slow" gradient={false} pauseOnHover={false}>
          {["SMALL GROUP COACHING", "KETTLEBELL & MACE SPECIALISTS", "CORRECTIVE EXERCISE", "JOINT-FRIENDLY TRAINING", "25+ YEARS EXPERIENCE", "AVONDALE, CHARLESTON"].map((text, i) => (
            <span key={i} className="text-2xl md:text-4xl font-hero font-bold text-drake-gold uppercase px-6 md:px-8 whitespace-nowrap flex items-center">
              {text}
              <span className="text-white/40 mx-4 md:mx-6">•</span>
            </span>
          ))}
        </Marquee>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="scaleIn" delay={0.2} className="relative overflow-hidden rounded-lg">
              <OptimizedImage src={outdoorTraining} alt="Outdoor functional training with kettlebells" className="shadow-2xl w-full" aspectRatio="square" transparent={true} hideLoadingPlaceholder={true} priority={true} />
              <div className="absolute inset-0 bg-gradient-to-t from-drake-dark/90 via-drake-dark/50 to-transparent flex items-end p-6 md:p-8">
                <p className="font-hero text-white md:text-2xl font-bold leading-tight text-base">"NOT JUST A GYM. A MOVEMENT STUDIO."</p>
              </div>
            </AnimatedSection>
            <div>
              <p className="section-eyebrow text-primary">WHO WE ARE</p>
              <h2 className="font-hero text-3xl md:text-4xl font-bold mb-6 uppercase">
                A <span className="text-primary">Movement Studio</span> for Real Life
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Drake Fitness helps adults build strong, mobile, pain-free bodies through a proven blend of mobility training, functional strength, corrective exercise, and expert coaching.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Every session is led by <strong>David Drake</strong> or <strong>Coach Nick</strong>, using a science-based method that improves how your body moves, how it feels, and how it performs — not just in the gym, but in daily life.
              </p>
              <div className="border-l-4 border-drake-gold bg-drake-gold/10 p-6 rounded-r-lg mb-6">
                <p className="text-lg text-foreground font-semibold">Our Mission</p>
                <p className="text-base text-foreground italic">Build bodies that move well, feel great, and last a lifetime.</p>
              </div>
              <Button asChild size="lg" className="mt-6 bg-primary hover:bg-primary/90 whitespace-nowrap">
                <Link to="/about">Meet the Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-drake-dark text-white section-slant-bottom">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <p className="section-eyebrow text-drake-gold text-center">WHAT MAKES US DIFFERENT</p>
            <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
              We Focus on <span className="text-drake-gold">What Matters</span>
            </h2>
            <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
              This isn't a gym. It's a studio built around joint health, mobility, and sustainable strength.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
          }].map((feature, index) => <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                <div className="bg-white/5 border border-white/10 p-8 rounded-xl h-full hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 bg-drake-teal rounded-xl flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-hero text-xl font-bold mb-3 uppercase">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </AnimatedSection>)}
            <AnimatedSection animation="fadeInUp" delay={0.4} className="md:col-span-2">
              <div className="bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-drake-teal rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-hero text-xl font-bold mb-3 uppercase">Expert coaching in a supportive, ego-free community</h3>
                    <p className="text-gray-300">20+ years of experience helping real people achieve sustainable results. We welcome beginners, busy adults, and anyone wanting to move better and feel stronger.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-none shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <p className="section-eyebrow text-primary mb-4">START HERE</p>
                <h2 className="font-hero text-3xl md:text-4xl font-bold mb-6 uppercase leading-tight">
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
                  No experience needed. No pressure. Just expert guidance.
                </p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 w-full md:w-auto text-balance">
                  <Link to="/contact" className="text-center">Start Your 14-Day Intro Experience</Link>
                </Button>
              </div>
              <div className="relative h-full min-h-[400px] md:min-h-[600px]">
              <OptimizedImage src={startHereImage} alt="Personal coaching session at Drake Fitness" className="h-full w-full" aspectRatio="auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">THE METHOD</p>
          <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
            A Simple System That <span className="text-primary">Delivers Real Results</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Expert-Guided Training That Works
          </p>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-0.5 bg-primary/30" style={{
            width: '66.67%',
            left: '16.67%'
          }} />
            
            {[{
            number: "1",
            title: "Assess",
            description: "Start with a free mobility consultation to understand your mobility, strength, and goals.",
            bgColor: "bg-drake-dark"
          }, {
            number: "2",
            title: "Train",
            description: "Join the right class track — Foundation Flow, Functional Strength, Mobility Reset, KB Strong, or Weekend Warrior.",
            bgColor: "bg-drake-gold"
          }, {
            number: "3",
            title: "Progress",
            description: "We check mobility and strength regularly so you can see and feel your improvements.",
            bgColor: "bg-drake-teal"
          }].map((step, index) => <div key={index} className="text-center relative z-10">
                <div className={`w-24 h-24 ${step.bgColor} rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg`}>
                  {step.number}
                </div>
                <h3 className="font-hero text-2xl font-bold mb-3 uppercase">{step.title}</h3>
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
              <h2 className="font-hero text-3xl md:text-4xl font-bold mb-2 uppercase">
                Classes Designed to Help You <span className="text-drake-gold">Move and Feel Your Best</span>
              </h2>
              <p className="text-xl text-gray-300">
                Better Movement. Better Strength. Better Life.
              </p>
            </div>
            <Button asChild size="lg" className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark shrink-0 whitespace-nowrap">
              <Link to="/classes">Explore All Classes</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
            name: "Foundation Flow™",
            description: "Beginner-friendly, mobility-first."
          }, {
            name: "Functional Strength™",
            description: "Our core program for sustainable strength and better movement."
          }, {
            name: "KB Strong™",
            description: "Advanced strength & kettlebell training."
          }, {
            name: "Mobility Reset™",
            description: "Recovery-based mobility and flexibility work."
          }, {
            name: "Weekend Warrior™",
            description: "Saturday full body strength & conditioning."
          }, {
            name: "Functional Flow Online™",
            description: "Train live from anywhere."
          }].map((classItem, index) => <div key={index} className="bg-drake-dark-muted p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors">
                <h3 className="font-hero text-xl font-bold mb-2 text-drake-gold uppercase">{classItem.name}</h3>
                <p className="text-gray-300">{classItem.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted section-slant-top-reverse">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">MEET THE TEAM</p>
          <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
            <span className="text-primary">Coaching You Can Trust</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Experience, Expertise & Care
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div className="bg-gray-50 p-6 rounded-xl shadow-card hover:shadow-xl transition-shadow">
                <div className="h-96 mb-4 overflow-hidden rounded-lg">
                  <OptimizedImage src={davidCoach} alt="David Drake coaching kettlebell technique" className="w-full h-full" aspectRatio="auto" />
                </div>
                <h3 className="font-hero text-2xl font-bold mb-2 uppercase">David Drake</h3>
                <p className="text-primary font-semibold mb-3 uppercase text-sm tracking-wide">Owner & Head Coach</p>
                <p className="text-muted-foreground mb-4">
                  With more than 25 years of training experience, a degree in Health and Exercise Science, and a career recognized early as Charleston's Best Personal Trainer, David is a master of movement and functional strength.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/about">Learn More About David</Link>
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <div className="bg-gray-50 p-6 rounded-xl shadow-card hover:shadow-xl transition-shadow">
                <div className="h-96 mb-4 overflow-hidden rounded-lg">
                  <OptimizedImage src={coachNick} alt="Coach Nick Poppa demonstrating sandbag training" className="w-full h-full" aspectRatio="auto" />
                </div>
                <h3 className="font-hero text-2xl font-bold mb-2 uppercase">Coach Nick Poppa</h3>
                <p className="text-primary font-semibold mb-3 uppercase text-sm tracking-wide">Holistic Movement Specialist</p>
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
          <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
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
          }].map((testimonial, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-card border border-border">
                <div className="flex gap-1 mb-4">
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
          <h2 className="font-hero text-2xl md:text-3xl font-bold text-center mb-2 uppercase">
            Inside <span className="text-primary">Drake Fitness</span>
          </h2>
          <p className="text-center text-muted-foreground">Real training. Real results. Real community.</p>
        </div>
        <Marquee speed="slow" pauseOnHover={true}>
          <OptimizedImage src={coachingSession} alt="Battle rope training with personal coaching" className="h-80 w-72 sm:w-80 md:w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={oneOnOneCoaching} alt="One-on-one coaching session at Drake Fitness" className="h-80 w-72 sm:w-80 md:w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={kettlebellFormCheck} alt="Form check during sled training" className="h-80 w-72 sm:w-80 md:w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={groupTraining} alt="Group training class at Drake Fitness studio" className="h-80 w-72 sm:w-80 md:w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={mobilityClass} alt="Mobility and recovery equipment at Drake Fitness" className="h-80 w-72 sm:w-80 md:w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={outdoorTrainingNew} alt="Outdoor group training session" className="h-80 w-72 sm:w-80 md:w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={davidOutside} alt="David Drake outdoor functional training" className="h-80 w-72 sm:w-80 md:w-96 rounded-lg mx-2" aspectRatio="auto" />
          <OptimizedImage src={oneOnOne} alt="Member with kettlebells at Drake Fitness" className="h-80 w-72 sm:w-80 md:w-96 rounded-lg mx-2" aspectRatio="auto" />
        </Marquee>
      </section>

      <CTASection eyebrow="GET STARTED" title="You Deserve a Body That Feels Strong, Mobile & Capable." ctaText="Book Your Free Movement Assessment" ctaLink="/contact" variant="primary" slanted={true} />
    </main>
    </>
  );
};
export default Home;