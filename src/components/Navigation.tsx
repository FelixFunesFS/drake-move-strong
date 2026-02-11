import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import drakeLogo from "@/assets/drake-fitness-logo-kettlebell.png?format=webp&w=268";

interface NavigationProps {
  transparent?: boolean;
  isScrolled?: boolean;
}

const Navigation = ({ transparent = false, isScrolled = false }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "About",
    path: "/about"
  }, {
    name: "Classes & Schedule",
    path: "/schedule"
  }, {
    name: "Pricing",
    path: "/pricing"
  }, {
    name: "1:1 Coaching",
    path: "/coaching"
  }, {
    name: "Insights",
    path: "/insights"
  }, {
    name: "Contact",
    path: "/contact"
  }];
  const isActive = (path: string) => location.pathname === path;
  
  // Conditional background: transparent over hero, solid with blur when scrolled
  const bgClass = transparent && !isScrolled 
    ? "bg-transparent" 
    : "bg-background/95 backdrop-blur-md border-b border-border/50";
    
  return <nav className={cn(bgClass, "transition-colors duration-300")}>
      <div className="container mx-auto px-4">
        <div className={cn("flex items-center justify-between transition-all duration-300", isScrolled ? "h-14" : "h-16")}>
          <Link to="/" className="flex-shrink-0">
            <img src={drakeLogo} alt="Drake Fitness" width={134} height={64} className={cn("w-auto transition-all duration-300", isScrolled ? "h-10 md:h-11" : "h-[52px] md:h-14")} style={{ aspectRatio: '134/64' }} />
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`px-4 py-2 rounded-md text-sm font-medium font-body transition-colors ${isActive(link.path) ? "text-primary" : "text-foreground hover:text-primary"}`}>
                {link.name}
              </Link>)}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2" aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map(link => <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 rounded-md text-sm font-medium ${isActive(link.path) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"}`}>
                {link.name}
              </Link>)}
          </div>
        </div>}
    </nav>;
};
export default Navigation;