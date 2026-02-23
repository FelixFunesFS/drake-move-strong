import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Mail, Phone, Instagram, Facebook, Youtube, Clock, Car, Navigation, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { PUNCHPASS_URLS } from "@/data/pricing";
import { StructuredData, buildFAQSchema } from "@/components/StructuredData";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";
import davidStorefrontPortrait from "@/assets/david-kettlebell-storefront-portrait.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateFields = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (formData.phone && !/^[\d\s()+-]{7,20}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (honeypot) return; // Bot detected
    
    if (!validateFields()) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-form', {
        body: formData
      });
      
      if (error) throw error;
      
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again or call us at (843) 817-5420.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Drake Fitness Charleston | Start Today"
        description="Get in touch with Drake Fitness in Charleston, SC. Located at 2 Avondale Ave, Charleston, SC 29407. Call (843) 817-5420."
        canonical="https://drake.fitness/contact"
      />
      
      <main>
        {/* Condensed Header */}
        <section className="bg-drake-dark py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="section-eyebrow text-drake-gold mb-2 md:mb-4">GET IN TOUCH</p>
            <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-[0.95] mb-3 md:mb-5">
              We'd Love to Help You Move Better
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-xl mx-auto">
              Have questions about our classes, membership, or personal training? Fill out the form below and we'll reach out within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact Form Section - Split Layout */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-center">
              
              {/* Left: David Portrait */}
              <AnimatedSection animation="slideInLeft" className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={davidStorefrontPortrait}
                    alt="David Drake holding a kettlebell in front of Drake Fitness"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
              </AnimatedSection>
              
              {/* Right: Contact Form */}
              <AnimatedSection animation="slideInRight" delay={0.1}>
                <div className="mb-8">
                  <p className="section-eyebrow text-primary">SEND A MESSAGE</p>
                  <h2 className="font-hero text-2xl md:text-3xl font-bold uppercase">
                    Have a Question? <span className="text-primary">Reach Out</span>
                  </h2>
                </div>
                <div className="bg-white border border-border rounded-xl p-8 shadow-card">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot — hidden from humans, bots fill it */}
                    <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        autoComplete="off"
                        tabIndex={-1}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }); setFieldErrors(prev => ({ ...prev, firstName: "" })); }}
                          placeholder="Jane"
                          className={fieldErrors.firstName ? "border-destructive" : ""}
                        />
                        {fieldErrors.firstName && <p className="text-destructive text-xs mt-1">{fieldErrors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }); setFieldErrors(prev => ({ ...prev, lastName: "" })); }}
                          placeholder="Doe"
                          className={fieldErrors.lastName ? "border-destructive" : ""}
                        />
                        {fieldErrors.lastName && <p className="text-destructive text-xs mt-1">{fieldErrors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFieldErrors(prev => ({ ...prev, email: "" })); }}
                          placeholder="jane@example.com"
                          className={fieldErrors.email ? "border-destructive" : ""}
                        />
                        {fieldErrors.email && <p className="text-destructive text-xs mt-1">{fieldErrors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setFieldErrors(prev => ({ ...prev, phone: "" })); }}
                          placeholder="(555) 123-4567"
                          className={fieldErrors.phone ? "border-destructive" : ""}
                        />
                        {fieldErrors.phone && <p className="text-destructive text-xs mt-1">{fieldErrors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="interest">I'm Interested in...</Label>
                      <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reset-week">Reset Week ($50)</SelectItem>
                          <SelectItem value="membership">Monthly Membership</SelectItem>
                          <SelectItem value="coaching">1:1 Coaching</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setFieldErrors(prev => ({ ...prev, message: "" })); }}
                        placeholder="Tell us about your goals or questions..."
                        rows={6}
                        className={fieldErrors.message ? "border-destructive" : ""}
                      />
                      {fieldErrors.message && <p className="text-destructive text-xs mt-1">{fieldErrors.message}</p>}
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>
              
            </div>
          </div>
        </section>

        {/* Find Us Section - Map-Centric with ALL contact details */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp" className="text-center mb-12">
              <p className="section-eyebrow text-primary">FIND US</p>
              <h2 className="font-hero text-3xl md:text-4xl font-bold uppercase">
                Visit <span className="text-primary">Drake Fitness</span>
              </h2>
              <p className="text-muted-foreground mt-4">Located in the heart of Avondale, West Ashley</p>
            </AnimatedSection>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <AnimatedSection animation="slideInLeft" delay={0.1}>
                <GoogleMapEmbed height="400px" className="lg:h-full lg:min-h-[450px]" />
              </AnimatedSection>
              
              <AnimatedSection animation="slideInRight" delay={0.2}>
                <div className="bg-background p-8 rounded-2xl flex flex-col justify-center shadow-lg h-full">
                <h3 className="font-hero text-2xl font-bold mb-6 uppercase">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary h-5 w-5 flex-shrink-0 mt-0.5" />
                    <a href="https://maps.app.goo.gl/opeP6dqsbidbY9GZ6" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      2 Avondale Ave<br />Charleston, SC 29407
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary h-5 w-5 flex-shrink-0" />
                    <a href="mailto:david@drake.fitness" className="hover:text-primary transition-colors">
                      david@drake.fitness
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary h-5 w-5 flex-shrink-0" />
                    <a href="tel:8438175420" className="hover:text-primary transition-colors">
                      (843) 817-5420
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-primary h-5 w-5 flex-shrink-0" />
                    <span>Mon-Fri: 5:30 AM - 7:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="text-primary h-5 w-5 flex-shrink-0" />
                    <span>Free on-site parking</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">Follow Us</p>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/drakefitnesschs/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors" aria-label="Instagram">
                      <Instagram size={22} />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100063722011333" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors" aria-label="Facebook">
                      <Facebook size={22} />
                    </a>
                    <a href="https://www.youtube.com/@Drakefitness" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors" aria-label="YouTube">
                      <Youtube size={22} />
                    </a>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href="https://maps.app.goo.gl/opeP6dqsbidbY9GZ6" target="_blank" rel="noopener noreferrer">
                      <Navigation className="mr-2 h-4 w-4" />
                      Get Directions
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="tel:8438175420">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Us
                    </a>
                  </Button>
                </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {(() => {
          const contactFAQs = [
            {
              q: "Do I need experience to join Drake Fitness?",
              a: "No. Our Foundation Flow classes are specifically designed for beginners. We meet you where you are, regardless of your starting point.",
            },
            {
              q: "Will this help my joint pain?",
              a: "Yes. We are a mobility-first studio. We focus on safe, joint-friendly training that builds strength without aggravating existing issues.",
            },
            {
              q: "How do I get started at Drake Fitness?",
              a: "Start with Reset Week — 7 days of unlimited classes for $50. It's the best way to experience our training style and find the right class for you.",
            },
          ];
          const faqSchema = buildFAQSchema(contactFAQs);
          return <StructuredData data={faqSchema} />;
        })()}
        <section className="py-16 md:py-24 bg-muted section-slant-top">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
              <p className="section-eyebrow text-primary text-center">QUESTIONS</p>
              <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
                Common <span className="text-primary">Questions</span>
              </h2>
            </AnimatedSection>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: "Do I need experience to join Drake Fitness?",
                  a: "No. Our Foundation Flow classes are specifically designed for beginners. We meet you where you are, regardless of your starting point.",
                },
                {
                  q: "Will this help my joint pain?",
                  a: "Yes. We are a mobility-first studio. We focus on safe, joint-friendly training that builds strength without aggravating existing issues.",
                },
                {
                  q: "How do I get started at Drake Fitness?",
                  a: "Start with Reset Week — 7 days of unlimited classes for $50. It's the best way to experience our training style and find the right class for you.",
                  cta: { label: "Start Reset Week — $50", url: PUNCHPASS_URLS.resetWeek },
                },
              ].map((faq, index) => (
                <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.1}>
                  <div className="bg-white p-6 rounded-xl border border-border shadow-card">
                    <h3 className="font-hero font-bold text-lg mb-2 uppercase">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                    {'cta' in faq && faq.cta && (
                      <Button asChild size="sm" className="mt-3 bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold">
                        <a href={faq.cta.url} target="_blank" rel="noopener noreferrer">{faq.cta.label}</a>
                      </Button>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
