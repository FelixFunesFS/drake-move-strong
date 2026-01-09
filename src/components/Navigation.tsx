import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import drakeLogo from "@/assets/drake-logo-new.png";
const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "About",
    path: "/about"
  }, {
    name: "Classes",
    path: "/classes"
  }, {
    name: "Schedule",
    path: "/schedule"
  }, {
    name: "Pricing",
    path: "/pricing"
  }, {
    name: "Contact",
    path: "/contact"
  }];
  const isActive = (path: string) => location.pathname === path;
  return <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            <img src={drakeLogo} alt="Drake Fitness" width={134} height={64} className="h-12 md:h-16 w-auto" style={{ aspectRatio: '134/64' }} />
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`px-4 py-2 rounded-md text-sm font-medium font-body transition-colors ${isActive(link.path) ? "text-primary" : "text-foreground hover:text-primary"}`}>
                {link.name}
              </Link>)}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Button asChild size="lg" variant="gold">
              <Link to="/reset-week" className="bg-primary text-primary-foreground px-[16px] py-0 text-sm whitespace-nowrap">Start Reset Week</Link>
            </Button>
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
            <Button asChild variant="gold" className="w-full mt-4">
              <Link to="/reset-week" onClick={() => setMobileMenuOpen(false)}>
                Start Reset Week
              </Link>
            </Button>
          </div>
        </div>}
    </nav>;
};
export default Navigation;