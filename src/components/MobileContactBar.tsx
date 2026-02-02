import { Phone, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileContactBar = () => {
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary border-t border-primary-foreground/20 pb-safe">
      <div className="flex">
        <a 
          href="tel:8438175420" 
          className="flex-1 flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold hover:bg-primary/90 active:bg-primary/80 transition-colors"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
        <div className="w-px bg-primary-foreground/20" />
        <a 
          href="sms:8438175420" 
          className="flex-1 flex items-center justify-center gap-2 py-4 text-primary-foreground font-semibold hover:bg-primary/90 active:bg-primary/80 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          Text Us
        </a>
      </div>
    </div>
  );
};

export default MobileContactBar;
