import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
    });
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Drake Fitness in Charleston, SC. Book your free mobility consultation today. Located at 2 Avondale Ave, Charleston, SC 29407."
        canonical="https://drake.fitness/contact"
      />
      
      <main>
      <Hero
        eyebrow="GET IN TOUCH"
        title="We'd Love to Help You Move Better"
        subtitle="Have questions about our classes, membership, or personal training? Fill out the form below and we'll reach out within 24 hours."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-primary text-white p-6 rounded-lg">
                <h3 className="font-hero text-xl font-bold mb-6 uppercase">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Visit Us</p>
                      <p className="text-sm">2 Avondale Ave<span className="hidden sm:inline"><br /></span><span className="sm:hidden"> </span>Charleston, SC 29407</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Email Us</p>
                      <a href="mailto:ddrake311@gmail.com" className="text-sm hover:text-drake-gold transition-colors">
                        ddrake311@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Call Us</p>
                      <a href="tel:8438175420" className="text-sm hover:text-drake-gold transition-colors">
                        (843) 817-5420
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="font-semibold mb-3">Follow Us</p>
                  <div className="flex space-x-4">
                    <a href="https://www.instagram.com/drakefitnesschs/" target="_blank" rel="noopener noreferrer" className="hover:text-drake-gold transition-colors" aria-label="Instagram">
                      <Instagram size={24} />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100063722011333" target="_blank" rel="noopener noreferrer" className="hover:text-drake-gold transition-colors" aria-label="Facebook">
                      <Facebook size={24} />
                    </a>
                    <a href="https://www.youtube.com/@drakefitnesschs" target="_blank" rel="noopener noreferrer" className="hover:text-drake-gold transition-colors" aria-label="YouTube">
                      <Youtube size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white border border-border rounded-xl p-8 shadow-card">
                <h3 className="font-hero text-2xl font-bold mb-6 uppercase">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Jane"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="interest">I'm Interested in...</Label>
                    <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reset-week">Reset Week ($49)</SelectItem>
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
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your goals or questions..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted section-slant-top">
        <div className="container mx-auto px-4">
          <p className="section-eyebrow text-primary text-center">QUESTIONS</p>
          <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Common <span className="text-primary">Questions</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "Do I need experience to join?",
                a: "No. Our Foundation Flow classes are specifically designed for beginners. We meet you where you are.",
              },
              {
                q: "Will this help my joint pain?",
                a: "Yes. We are a mobility-first studio. We focus on safe, joint-friendly training that builds strength without aggravating existing issues.",
              },
              {
                q: "How do I get started?",
                a: "The best way is to book a Free Mobility Consultation or start our 14-Day Intro Experience.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-border shadow-card">
                <h3 className="font-hero font-bold text-lg mb-2 uppercase">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Contact;
