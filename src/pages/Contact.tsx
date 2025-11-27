import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
    <main>
      <Hero
        eyebrow="Get in Touch"
        title={
          <>
            We'd Love to Help You <span className="text-drake-gold">Move Better</span>
          </>
        }
        subtitle="Have questions about our classes, membership, or personal training? Fill out the form below and we'll reach out within 24 hours."
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="md:col-span-1 space-y-8">
              <div className="bg-primary text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-6">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Visit Us</p>
                      <p className="text-sm">123 West Ashley Blvd<br />Charleston, SC 29407</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Email Us</p>
                      <a href="mailto:hello@drakefitness.com" className="text-sm hover:text-drake-gold transition-colors">
                        hello@drakefitness.com
                      </a>
                      <br />
                      <a href="mailto:support@drakefitness.com" className="text-sm hover:text-drake-gold transition-colors">
                        support@drakefitness.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Call Us</p>
                      <a href="tel:8435550199" className="text-sm hover:text-drake-gold transition-colors">
                        (843) 555-0199
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="font-semibold mb-3">Follow Us</p>
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-drake-gold transition-colors" aria-label="Instagram">
                      <Instagram size={24} />
                    </a>
                    <a href="#" className="hover:text-drake-gold transition-colors" aria-label="Facebook">
                      <Facebook size={24} />
                    </a>
                    <a href="#" className="hover:text-drake-gold transition-colors" aria-label="YouTube">
                      <Youtube size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
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

                  <div className="grid md:grid-cols-2 gap-4">
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
                        <SelectItem value="assessment">Free Movement Assessment</SelectItem>
                        <SelectItem value="intro">14-Day Intro Experience</SelectItem>
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

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
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
                a: "The best way is to book a Free Movement Assessment or start our 14-Day Intro Experience.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
