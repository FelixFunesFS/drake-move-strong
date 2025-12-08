import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, Send } from "lucide-react";

const Consultation = () => {
  const [formData, setFormData] = useState({
    // Contact Info
    name: "",
    email: "",
    
    // Section 1: Business Overview
    primaryGoals: [] as string[],
    primaryGoalsOther: "",
    currentMembershipCount: "",
    idealCapacity: "",
    milestones: "",
    
    // Section 2: Marketing Goals
    marketingGoal: [] as string[],
    targetAudience: [] as string[],
    marketingBudget: "",
    growthStyle: "",
    
    // Section 3: Must-Haves vs Nice-to-Haves
    marketingMustHaves: [] as string[],
    niceToHave: [] as string[],
    
    // Section 4: Website & Tech
    websiteGoals: [] as string[],
    websiteMustHaves: [] as string[],
    websiteNiceToHave: [] as string[],
    
    // Section 5: Content & Branding
    brandVoice: [] as string[],
    contentTypes: [] as string[],
    currentAssets: [] as string[],
    
    // Section 6: Leads & Sales
    dmResponder: "",
    responseTime: "",
    followUpFlow: "",
    showUpRate: "",
    
    // Section 7: Pain Points
    struggles: [] as string[],
    whatHasntWorked: "",
    successIn90Days: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(v => v !== value)
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatEmailBody = () => {
    const lines: string[] = [];
    
    lines.push("📝 DRAKE FITNESS — MARKETING & WEB DEVELOPMENT CONSULTATION");
    lines.push("═══════════════════════════════════════════════════════════");
    lines.push("");
    lines.push(`Submitted by: ${formData.name}`);
    lines.push(`Email: ${formData.email}`);
    lines.push(`Date: ${new Date().toLocaleString()}`);
    lines.push("");
    
    // Section 1
    lines.push("🔹 SECTION 1 — BUSINESS OVERVIEW");
    lines.push("─────────────────────────────────");
    lines.push(`Primary Goals: ${formData.primaryGoals.join(", ") || "None selected"}`);
    if (formData.primaryGoalsOther) lines.push(`Other Goal: ${formData.primaryGoalsOther}`);
    lines.push(`Current Membership Count: ${formData.currentMembershipCount || "Not provided"}`);
    lines.push(`Ideal Capacity: ${formData.idealCapacity || "Not provided"}`);
    lines.push(`Milestones: ${formData.milestones || "Not provided"}`);
    lines.push("");
    
    // Section 2
    lines.push("🔹 SECTION 2 — MARKETING GOALS & PRIORITIES");
    lines.push("────────────────────────────────────────────");
    lines.push(`Most Important Marketing Goal: ${formData.marketingGoal.join(", ") || "None selected"}`);
    lines.push(`Target Audience: ${formData.targetAudience.join(", ") || "None selected"}`);
    lines.push(`Marketing Budget: ${formData.marketingBudget || "Not selected"}`);
    lines.push(`Growth Style: ${formData.growthStyle || "Not selected"}`);
    lines.push("");
    
    // Section 3
    lines.push("🔹 SECTION 3 — MUST-HAVES VS NICE-TO-HAVES");
    lines.push("──────────────────────────────────────────");
    lines.push(`Marketing Must-Haves: ${formData.marketingMustHaves.join(", ") || "None selected"}`);
    lines.push(`Nice-to-Have: ${formData.niceToHave.join(", ") || "None selected"}`);
    lines.push("");
    
    // Section 4
    lines.push("🔹 SECTION 4 — WEBSITE & TECH NEEDS");
    lines.push("───────────────────────────────────");
    lines.push(`Website Goals: ${formData.websiteGoals.join(", ") || "None selected"}`);
    lines.push(`Must-Have Features: ${formData.websiteMustHaves.join(", ") || "None selected"}`);
    lines.push(`Nice-to-Have Features: ${formData.websiteNiceToHave.join(", ") || "None selected"}`);
    lines.push("");
    
    // Section 5
    lines.push("🔹 SECTION 5 — CONTENT & BRANDING");
    lines.push("─────────────────────────────────");
    lines.push(`Brand Voice: ${formData.brandVoice.join(", ") || "None selected"}`);
    lines.push(`Content Types: ${formData.contentTypes.join(", ") || "None selected"}`);
    lines.push(`Current Assets: ${formData.currentAssets.join(", ") || "None selected"}`);
    lines.push("");
    
    // Section 6
    lines.push("🔹 SECTION 6 — LEADS & SALES WORKFLOW");
    lines.push("─────────────────────────────────────");
    lines.push(`DM/Inquiry Responder: ${formData.dmResponder || "Not provided"}`);
    lines.push(`Response Time: ${formData.responseTime || "Not selected"}`);
    lines.push(`Follow-up Flow: ${formData.followUpFlow || "Not provided"}`);
    lines.push(`Show-up Rate: ${formData.showUpRate || "Not selected"}`);
    lines.push("");
    
    // Section 7
    lines.push("🔹 SECTION 7 — PAIN POINTS & CHALLENGES");
    lines.push("───────────────────────────────────────");
    lines.push(`Current Struggles: ${formData.struggles.join(", ") || "None selected"}`);
    lines.push(`What Hasn't Worked: ${formData.whatHasntWorked || "Not provided"}`);
    lines.push(`Success in 90 Days: ${formData.successIn90Days || "Not provided"}`);
    
    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Please provide your name and email");
      return;
    }
    
    setIsSubmitting(true);
    
    const subject = encodeURIComponent(`Drake Fitness Consultation - ${formData.name}`);
    const body = encodeURIComponent(formatEmailBody());
    const mailtoLink = `mailto:envision@mkqconsulting.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Email client opened! Please send the email to complete your submission.");
    }, 500);
  };

  const CheckboxGroup = ({ 
    field, 
    options, 
    columns = 2 
  }: { 
    field: string; 
    options: string[]; 
    columns?: number;
  }) => (
    <div className={`grid gap-3 ${columns === 3 ? 'md:grid-cols-3' : columns === 2 ? 'md:grid-cols-2' : ''}`}>
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-3">
          <Checkbox
            id={`${field}-${option}`}
            checked={(formData[field as keyof typeof formData] as string[]).includes(option)}
            onCheckedChange={(checked) => handleCheckboxChange(field, option, !!checked)}
          />
          <Label htmlFor={`${field}-${option}`} className="text-sm cursor-pointer">
            {option}
          </Label>
        </div>
      ))}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full text-center p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Email Client Opened!</h2>
          <p className="text-muted-foreground mb-6">
            Please send the email from your email client to complete your consultation submission.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Fill Out Another Form
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-drake-dark text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-drake-gold uppercase tracking-widest text-sm mb-4">
            Strategic Consultation
          </p>
          <h1 className="font-hero text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-4">
            Marketing & Web Development Assessment
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Prepared for David Drake & Coach Nick
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Contact Info */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl text-drake-primary">Your Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Your Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 1: Business Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="bg-drake-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <CardTitle className="text-xl text-drake-primary">Business Overview</CardTitle>
            </div>
            <p className="text-muted-foreground text-sm mt-2">Understand where you are today</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">What are your primary goals over the next 6–12 months?</Label>
              <CheckboxGroup
                field="primaryGoals"
                options={[
                  "Increase memberships",
                  "Increase long-term commitments (3–6 months)",
                  "Improve retention",
                  "Grow local brand awareness",
                  "Build a stronger digital presence",
                  "Streamline lead-to-sale pipeline"
                ]}
              />
              <div className="mt-3">
                <Label htmlFor="primaryGoalsOther" className="text-sm">Other:</Label>
                <Input
                  id="primaryGoalsOther"
                  value={formData.primaryGoalsOther}
                  onChange={(e) => handleInputChange("primaryGoalsOther", e.target.value)}
                  placeholder="Specify other goals..."
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentMembershipCount">Current monthly membership count</Label>
                <Input
                  id="currentMembershipCount"
                  value={formData.currentMembershipCount}
                  onChange={(e) => handleInputChange("currentMembershipCount", e.target.value)}
                  placeholder="e.g., 50"
                />
              </div>
              <div>
                <Label htmlFor="idealCapacity">Ideal membership capacity</Label>
                <Input
                  id="idealCapacity"
                  value={formData.idealCapacity}
                  onChange={(e) => handleInputChange("idealCapacity", e.target.value)}
                  placeholder="e.g., 150"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="milestones">What milestones do you want to reach this year?</Label>
              <Textarea
                id="milestones"
                value={formData.milestones}
                onChange={(e) => handleInputChange("milestones", e.target.value)}
                placeholder="Describe your key milestones..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Marketing Goals & Priorities */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="bg-drake-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <CardTitle className="text-xl text-drake-primary">Marketing Goals & Priorities</CardTitle>
            </div>
            <p className="text-muted-foreground text-sm mt-2">Clarifies must-haves, wants, and conversion targets</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">What is your most important marketing goal RIGHT NOW?</Label>
              <CheckboxGroup
                field="marketingGoal"
                options={[
                  "Book more Free Consultations",
                  "Increase class attendance",
                  "Grow long-term memberships",
                  "Promote 1:1 Training",
                  "Grow visibility in Charleston",
                  "Strengthen brand identity (mobility-first)"
                ]}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Target audience (select all that apply):</Label>
              <CheckboxGroup
                field="targetAudience"
                options={[
                  "Adults 30–65",
                  "Desk workers",
                  "Injury recovery",
                  "Former athletes",
                  "Busy parents",
                  "Beginners",
                  "Corporate / workplace wellness"
                ]}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">What monthly marketing budget are you comfortable with?</Label>
              <RadioGroup
                value={formData.marketingBudget}
                onValueChange={(value) => handleInputChange("marketingBudget", value)}
                className="space-y-2"
              >
                {["$500–$1,000", "$1,000–$2,500", "$2,500+", "Not sure yet"].map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={`budget-${option}`} />
                    <Label htmlFor={`budget-${option}`} className="cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Preferred growth style:</Label>
              <RadioGroup
                value={formData.growthStyle}
                onValueChange={(value) => handleInputChange("growthStyle", value)}
                className="space-y-2"
              >
                {["Organic-focused", "Paid ads + organic", "Paid-heavy for rapid growth", "Not sure"].map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={`growth-${option}`} />
                    <Label htmlFor={`growth-${option}`} className="cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Must-Haves vs Nice-to-Haves */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="bg-drake-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <CardTitle className="text-xl text-drake-primary">Must-Haves vs Nice-to-Haves</CardTitle>
            </div>
            <p className="text-muted-foreground text-sm mt-2">Helps prioritize immediately</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">Marketing Must-Haves (Top 3):</Label>
              <CheckboxGroup
                field="marketingMustHaves"
                options={[
                  "Consistent social posting",
                  "Reel production",
                  "Paid ads (local)",
                  "Local FB group posting",
                  "Lead follow-up + DM management",
                  "Analytics",
                  "Email sequences",
                  "Referral system",
                  "Seasonal promotions",
                  "Workshops / challenges"
                ]}
                columns={2}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Nice-to-Have (Future Items):</Label>
              <CheckboxGroup
                field="niceToHave"
                options={[
                  "Event coverage",
                  "Weekly live Q&As",
                  "Specialty video series",
                  "Merchandise campaigns",
                  "YouTube long-form content"
                ]}
                columns={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Website & Tech Needs */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="bg-drake-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <CardTitle className="text-xl text-drake-primary">Website & Tech Needs</CardTitle>
            </div>
            <p className="text-muted-foreground text-sm mt-2">Clarify direction for website additions</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">Your website should:</Label>
              <CheckboxGroup
                field="websiteGoals"
                options={[
                  "Convert more Free Consultations",
                  "Showcase classes clearly",
                  "Improve SEO ranking",
                  "Capture more leads",
                  "Highlight coaches + testimonials",
                  "Offer online programs",
                  "Simplify visitor journey",
                  "Add landing pages for offers"
                ]}
                columns={2}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Must-Have Website Features:</Label>
              <CheckboxGroup
                field="websiteMustHaves"
                options={[
                  "Clear CTA (\"Book Free Consultation\")",
                  "Integrated schedule",
                  "Landing page for Intro Offers",
                  "Lead funnels",
                  "Analytics/tracking",
                  "Video integration",
                  "Class explanation pages"
                ]}
                columns={2}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Nice-to-Have Features:</Label>
              <CheckboxGroup
                field="websiteNiceToHave"
                options={[
                  "Blog (movement education)",
                  "Online training library",
                  "Member login portal",
                  "Team/coach videos",
                  "FAQ expansion"
                ]}
                columns={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Content & Branding */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="bg-drake-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
              <CardTitle className="text-xl text-drake-primary">Content & Branding</CardTitle>
            </div>
            <p className="text-muted-foreground text-sm mt-2">Define style & tone you will create</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">Brand Voice Preferences:</Label>
              <CheckboxGroup
                field="brandVoice"
                options={[
                  "Educational",
                  "Motivational",
                  "Friendly and supportive",
                  "Expert & authoritative",
                  "Calm & confident",
                  "All of the above"
                ]}
                columns={2}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Preferred Content Types:</Label>
              <CheckboxGroup
                field="contentTypes"
                options={[
                  "Mobility fixes",
                  "Pain-free training tips",
                  "Corrective exercise demos",
                  "Class previews",
                  "Coach explanations",
                  "Testimonials",
                  "Local Charleston lifestyle"
                ]}
                columns={2}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Current Assets Available:</Label>
              <CheckboxGroup
                field="currentAssets"
                options={[
                  "Brand photos/videos",
                  "Testimonials",
                  "Coach clips",
                  "Raw training footage",
                  "Logo/colors/fonts",
                  "Not much yet"
                ]}
                columns={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 6: Leads & Sales Workflow */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="bg-drake-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">6</span>
              <CardTitle className="text-xl text-drake-primary">Leads & Sales Workflow</CardTitle>
            </div>
            <p className="text-muted-foreground text-sm mt-2">How the studio handles incoming opportunities</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="dmResponder">Who currently responds to DMs & inquiries?</Label>
              <Input
                id="dmResponder"
                value={formData.dmResponder}
                onChange={(e) => handleInputChange("dmResponder", e.target.value)}
                placeholder="e.g., David, Nick, Office Manager..."
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Average response time right now:</Label>
              <RadioGroup
                value={formData.responseTime}
                onValueChange={(value) => handleInputChange("responseTime", value)}
                className="space-y-2"
              >
                {["Within 30 mins", "1–3 hours", "Same day", "Next day", "Varies"].map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={`response-${option}`} />
                    <Label htmlFor={`response-${option}`} className="cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="followUpFlow">What happens after someone expresses interest? Describe your current follow-up flow:</Label>
              <Textarea
                id="followUpFlow"
                value={formData.followUpFlow}
                onChange={(e) => handleInputChange("followUpFlow", e.target.value)}
                placeholder="Describe your follow-up process..."
                rows={3}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Show-up rate for Free Consultations:</Label>
              <RadioGroup
                value={formData.showUpRate}
                onValueChange={(value) => handleInputChange("showUpRate", value)}
                className="space-y-2"
              >
                {["90–100%", "70–89%", "50–69%", "Under 50%"].map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={`showup-${option}`} />
                    <Label htmlFor={`showup-${option}`} className="cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Section 7: Pain Points & Challenges */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="bg-drake-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">7</span>
              <CardTitle className="text-xl text-drake-primary">Pain Points & Challenges</CardTitle>
            </div>
            <p className="text-muted-foreground text-sm mt-2">These will guide recommendations</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">What do you struggle with the most?</Label>
              <CheckboxGroup
                field="struggles"
                options={[
                  "Low online visibility",
                  "Inconsistent posting",
                  "Weak lead flow",
                  "Leads not converting",
                  "No time for marketing",
                  "Difficulty explaining value",
                  "Website isn't converting",
                  "Lack of structured plan"
                ]}
                columns={2}
              />
            </div>

            <div>
              <Label htmlFor="whatHasntWorked">What hasn't worked before?</Label>
              <Textarea
                id="whatHasntWorked"
                value={formData.whatHasntWorked}
                onChange={(e) => handleInputChange("whatHasntWorked", e.target.value)}
                placeholder="Describe past efforts that didn't work..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="successIn90Days">What does success look like in 90 days?</Label>
              <Textarea
                id="successIn90Days"
                value={formData.successIn90Days}
                onChange={(e) => handleInputChange("successIn90Days", e.target.value)}
                placeholder="Describe your vision of success..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-8">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="bg-drake-gold hover:bg-drake-gold/90 text-drake-dark font-semibold px-12 py-6 text-lg"
          >
            {isSubmitting ? (
              "Opening Email..."
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit Consultation Form
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-muted-foreground text-sm">
          Clicking submit will open your email client with the form data pre-filled.
        </p>
      </form>
    </div>
  );
};

export default Consultation;
