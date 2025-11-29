import VideoHero from "@/components/VideoHero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Target, Heart, TrendingUp, Users, CheckCircle2, Activity, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import davidImage from "@/assets/david-double-kb-storefront.jpg";
import davidImage2 from "@/assets/david-goblet-squat-kb-rack.jpg";
import nickImage from "@/assets/coach-nick-portrait.jpg";
import kbCollection from "@/assets/group-kettlebell-training.jpg";
import communityMoment from "@/assets/community-gym-moment.jpg";
import memberYoga from "@/assets/member-yoga-pose.jpg";
import outdoorKb from "@/assets/outdoor-kettlebell.jpg";
import coachingSession from "@/assets/coaching-session.jpg";
import studioKettlebells from "@/assets/studio-kettlebells.jpg";
import studioDavidStorefront from "@/assets/studio-david-storefront.jpg";
import studioDavidDogArt from "@/assets/studio-david-dog-art.jpg";
import studioBarbellPlatform from "@/assets/studio-barbell-platform.jpg";
import studioTeamPhoto from "@/assets/studio-team-photo.jpg";
import studioMobilityTraining from "@/assets/studio-mobility-training.jpg";
import studioFullView from "@/assets/studio-full-view.jpg";
import studioKettlebellClass from "@/assets/studio-kettlebell-class.jpg";
import studioFloorExercise from "@/assets/studio-floor-exercise.jpg";
import studioDavidDog from "@/assets/studio-david-dog.jpg";
import studioDualTraining from "@/assets/studio-dual-training.jpg";
import studioOutdoorBanner from "@/assets/studio-outdoor-banner.jpg";
import studioNickDavidTogether from "@/assets/studio-nick-david-together.jpg";
import studioLargeGroup from "@/assets/studio-large-group.jpg";
import studioTeamThree from "@/assets/studio-team-three.jpg";
import studioTrainingWithDog from "@/assets/studio-training-with-dog.jpg";
import studioGroupSquats from "@/assets/studio-group-squats.jpg";
import studioKbCloseup from "@/assets/studio-kb-closeup.jpg";
import studioGroupOverhead from "@/assets/studio-group-overhead.jpg";
import ImageGallery from "@/components/ImageGallery";

const About = () => {
  return (
    <main>
      <VideoHero
        videoId="RX9zOxhayFk"
        eyebrow="OUR PURPOSE"
        title={
          <>
            Why We <span className="text-primary">Exist</span>
          </>
        }
        subtitle="To help adults move better and build strong, mobile, pain-free bodies that support their everyday lives."
        accentedSubtitle={true}
      />

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left Column - Text Content */}
                <div>
                  <p className="section-eyebrow text-primary">THE DRAKE FITNESS PHILOSOPHY</p>
                  <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase leading-tight">
                    Movement First.<span className="hidden sm:inline"><br /></span> Strength For <span className="text-primary">Life</span>.
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground mb-8 border-l-4 border-drake-gold pl-6">
                    We don't chase intensity, trends, or exhaustion. We chase <strong>movement quality</strong>, <strong>joint health</strong>, and <strong>sustainable strength</strong> that helps you feel better and perform better in real life.
                  </p>
                  
                  {/* Info Boxes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Feel Better</h3>
                      <p className="text-sm text-muted-foreground">
                        Reduce pain and stiffness through intelligent movement and mobility work
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Activity className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Move Better</h3>
                      <p className="text-sm text-muted-foreground">
                        Restore natural range of motion and functional movement patterns
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Right Column - Image with Gold Accent */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute -top-8 -left-8 w-full h-full bg-drake-gold/20 rounded-lg transform rotate-3 -z-10 hidden lg:block"></div>
                  <OptimizedImage
                    src={kbCollection}
                    alt="Drake Fitness kettlebell collection and training equipment"
                    aspectRatio="square"
                    className="shadow-lg rounded-lg"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn">
        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="section-eyebrow text-primary text-center">SEE IT IN ACTION</p>
              <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
                Our <span className="text-primary">Coaching Philosophy</span>
              </h2>
              <p className="text-xl text-center text-muted-foreground mb-12">
                Watch how we help clients move better
              </p>
              <YouTubeEmbed
                videoId="wDtDMNnrF00"
                title="Drake Fitness Coaching Philosophy"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Meet David Section - Dark Theme with Clip Slant */}
      <section className="py-16 md:py-24 bg-drake-dark text-white section-slant-top">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp">
            <p className="section-eyebrow text-drake-gold text-center">THE TEAM</p>
            <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 uppercase">
              Meet Your <span className="text-primary">Coaches</span>
            </h2>
          </AnimatedSection>

          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fadeInUp">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Image Column with Overlay */}
                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden rounded-lg border-4 border-primary shadow-2xl">
                      <OptimizedImage
                        src={davidImage}
                        alt="David Drake - Owner and Head Coach at Drake Fitness"
                        aspectRatio="portrait"
                        className=""
                      />
                      {/* Gradient Overlay with Name */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-drake-dark via-drake-dark/80 to-transparent p-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">David Drake</h3>
                        <p className="text-drake-gold font-semibold">Owner & Head Coach</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-7 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <p className="text-xs md:text-sm text-drake-gold mb-4">
                      B.S. Health & Exercise Science, Furman University<br />
                      Charleston's Best Personal Trainer (City Paper)
                    </p>
                    <div className="space-y-4 text-sm md:text-base text-gray-300">
                      <p>
                        For more than <strong className="text-white">25 years</strong>, David has been helping people rediscover proper movement, reduce pain, and build functional strength that lasts. With a strong educational foundation and deep experience in corrective exercise, mobility training, and StrongFirst-inspired kettlebell work, David has developed a coaching style that is rooted in precision, progression, and sustainable results.
                      </p>
                      <p>
                        He describes himself as a <strong className="text-white">body mechanic</strong> — someone who understands how the human body is built to move and how to restore that movement when life, injuries, or habits disrupt it.
                      </p>
                    </div>

                    {/* Specialties Card - Semi-transparent */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm mt-6">
                      <h4 className="font-bold text-white mb-4 text-lg">Specialties</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          "Mobility & joint restoration",
                          "Corrective exercise",
                          "Kettlebell training (StrongFirst)",
                          "Movement mechanics",
                          "Holistic wellness",
                          "1:1 & small-group coaching",
                        ].map((specialty, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-drake-gold mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Blockquote */}
                    <blockquote className="border-l-4 border-drake-gold pl-6 py-4 mt-6 italic text-gray-300">
                      "Strength is a skill, mobility is the foundation, and proper movement unlocks lasting health."
                    </blockquote>

                    <Button asChild className="mt-6 bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold">
                      <Link to="/coaching">1:1 Personal Training with David</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Meet Nick Section - Gray Theme with Decorative Skew */}
      <section className="py-16 md:py-24 bg-muted relative overflow-hidden section-slant-top-reverse">
        {/* Decorative Skewed Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/50 transform skew-x-12 translate-x-1/2 hidden lg:block"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fadeInUp">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Content Column - LEFT on desktop */}
                <div className="lg:col-span-7 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Nick Poppa</h3>
                    <p className="text-lg md:text-xl text-primary font-semibold mb-4">
                      Holistic Health & Movement Specialist
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground mb-4">
                      Posture • Stability • Mobility • Strength
                    </p>
                    <div className="space-y-4 text-sm md:text-base text-muted-foreground">
                      <p>
                        Originally from Long Island, Nick's own journey through football injuries, a torn labrum, concussions, chronic back pain, and gut issues led him to discover a deeper world of human movement, lifestyle balance, and functional wellness.
                      </p>
                      <p>
                        His approach bridges the gap between <strong className="text-foreground">rehabilitation and performance</strong>, helping clients improve posture, stability, mobility, and functional strength through corrective exercise and holistic lifestyle coaching.
                      </p>
                    </div>

                    {/* Team Callout Box */}
                    <div className="bg-white border-l-4 border-primary rounded-lg p-6 shadow-sm mt-6">
                      <p className="text-sm md:text-base text-muted-foreground">
                        <strong className="text-foreground">David and Nick work together</strong> to create personalized training programs that combine mobility, corrective movement, and functional strength — meeting you exactly where you are and guiding you toward sustainable results.
                      </p>
                    </div>

                    <Button asChild className="mt-6">
                      <Link to="/schedule">Try a Class This Week</Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Image Column - RIGHT on desktop */}
                <div className="lg:col-span-5 lg:order-last">
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-xl">
                      <OptimizedImage
                        src={nickImage}
                        alt="Coach Nick Poppa demonstrating functional training"
                        aspectRatio="portrait"
                        className=""
                      />
                      {/* White/Frosted Bottom Overlay with Name */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-6 border-t border-gray-200">
                        <h3 className="text-xl md:text-2xl font-bold text-drake-dark">Coach Nick</h3>
                        <p className="text-primary font-semibold text-sm">Group & 1:1 Trainer</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <p className="section-eyebrow text-primary text-center">OUR VALUES</p>
              <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
                What We <span className="text-primary">Stand For</span>
              </h2>
              <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Our commitment to quality coaching, safe training environments, and real results.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Community Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
                >
                  <div className="w-16 h-16 bg-drake-gold rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-hero text-xl md:text-2xl font-bold text-center mb-4 uppercase">Community</h3>
                  <p className="text-sm md:text-base text-muted-foreground text-center">
                    We foster a supportive, ego-free environment where everyone is welcomed, encouraged, and celebrated for their progress.
                  </p>
                </motion.div>

                {/* Safety Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-hero text-xl md:text-2xl font-bold text-center mb-4 uppercase">Safety</h3>
                  <p className="text-sm md:text-base text-muted-foreground text-center">
                    Proper form, intelligent programming, and injury prevention guide every movement and every session we coach.
                  </p>
                </motion.div>

                {/* Results Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
                >
                  <div className="w-16 h-16 bg-drake-dark rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-hero text-xl md:text-2xl font-bold text-center mb-4 uppercase">Results</h3>
                  <p className="text-sm md:text-base text-muted-foreground text-center">
                    We deliver measurable improvements in mobility, strength, and quality of life through proven methods and expert coaching.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection animation="fadeInUp">
        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <p className="section-eyebrow text-primary text-center">THE SPACE</p>
            <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
              Inside the <span className="text-primary">Studio</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              See where the magic happens — authentic training, expert coaching, and a supportive community.
            </p>
            <ImageGallery
              images={[
                { src: studioFullView, alt: "Wide view of Drake Fitness training studio interior" },
                { src: studioNickDavidTogether, alt: "David Drake and Nick Poppa coaching team" },
                { src: studioLargeGroup, alt: "Large training group with studio dog inside Drake Fitness" },
                { src: studioTeamThree, alt: "Drake Fitness coaching team of three" },
                { src: studioDavidStorefront, alt: "David Drake with sandbag outside Drake Fitness studio" },
                { src: studioOutdoorBanner, alt: "Outdoor training with Drake Fitness banner" },
                { src: studioTeamPhoto, alt: "Drake Fitness training group outside the studio" },
                { src: studioGroupSquats, alt: "Group kettlebell squats with studio dog watching" },
                { src: studioGroupOverhead, alt: "Group overhead kettlebell training session" },
                { src: studioDualTraining, alt: "Dual kettlebell training session in progress" },
                { src: studioKettlebellClass, alt: "Kettlebell training class demonstration" },
                { src: studioTrainingWithDog, alt: "Training session with studio dog supervising" },
                { src: studioKettlebells, alt: "Professional kettlebell collection at Drake Fitness" },
                { src: studioBarbellPlatform, alt: "Barbell platform and weight training area" },
                { src: studioMobilityTraining, alt: "Mobility and flexibility training session" },
                { src: studioFloorExercise, alt: "Floor-based kettlebell training exercise" },
                { src: studioKbCloseup, alt: "Close-up of kettlebell exercise form" },
                { src: studioDavidDogArt, alt: "David Drake with studio dog and custom artwork" },
                { src: studioDavidDog, alt: "David Drake with his dog at the studio" },
                { src: kbCollection, alt: "Group kettlebell training session" },
                { src: communityMoment, alt: "Community training moment at Drake Fitness" },
                { src: memberYoga, alt: "Member practicing mobility and yoga" },
                { src: outdoorKb, alt: "Outdoor kettlebell training session" },
                { src: coachingSession, alt: "Personal coaching session at Drake Fitness" },
                { src: davidImage2, alt: "David Drake coaching kettlebell technique" },
                { src: davidImage, alt: "Drake Fitness storefront with kettlebells" },
                { src: nickImage, alt: "Coach Nick demonstrating functional training" },
              ]}
            />
          </div>
        </section>
      </AnimatedSection>

      <CTASection
        eyebrow="GET STARTED"
        title="Ready to Experience the Drake Fitness Difference?"
        subtitle="Book a free movement assessment and discover how we can help you move better, feel stronger, and live pain-free."
        ctaText="Book Free Assessment"
        ctaLink="/contact"
        variant="primary"
        slanted={true}
      />
    </main>
  );
};

export default About;
