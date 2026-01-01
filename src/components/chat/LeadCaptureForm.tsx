import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, X } from "lucide-react";

interface LeadCaptureFormProps {
  onSubmit: (data: { name: string; email: string; phone?: string }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const LeadCaptureForm = ({ onSubmit, onCancel, isSubmitting }: LeadCaptureFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit({ 
        name: name.trim(), 
        email: email.trim(), 
        phone: phone.trim() || undefined 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-accent/50 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">
          Let us help you get started!
        </p>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={onCancel}
          className="h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <div>
          <Label htmlFor="lead-name" className="text-xs text-muted-foreground">
            Your Name
          </Label>
          <Input
            id="lead-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="h-9 text-sm"
          />
        </div>
        
        <div>
          <Label htmlFor="lead-email" className="text-xs text-muted-foreground">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lead-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="h-9 text-sm"
          />
        </div>
        
        <div>
          <Label htmlFor="lead-phone" className="text-xs text-muted-foreground">
            Phone (optional)
          </Label>
          <Input
            id="lead-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(843) 555-0123"
            className="h-9 text-sm"
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        size="sm" 
        className="w-full"
        disabled={!email.trim() || isSubmitting}
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Get in Touch
          </>
        )}
      </Button>
    </form>
  );
};

export default LeadCaptureForm;
