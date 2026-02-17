import { Calendar, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const MobileContactBar = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isMobile) return null;
  
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-primary border-t border-primary/80 pb-safe transition-transform duration-300 ease-out",
      isVisible ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="flex">
        <Link 
          to="/schedule" 
          className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-semibold hover:bg-primary/80 active:bg-primary/70 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          View Schedule
        </Link>
        <div className="w-px bg-white/20" />
        <a 
          href="sms:8438175420" 
          className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-semibold hover:bg-primary/80 active:bg-primary/70 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          Text Us
        </a>
      </div>
    </div>
  );
};

export default MobileContactBar;
