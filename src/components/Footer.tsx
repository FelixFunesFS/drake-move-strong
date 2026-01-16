import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";
import drakeLogo from "@/assets/drake-logo-new.png?format=webp&w=268";
import { GoogleReviewsBadge } from "@/components/GoogleReviewsBadge";
import MicroTrustBadges from "@/components/MicroTrustBadges";

const Footer = () => {
  return <footer className="bg-drake-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img src={drakeLogo} alt="Drake Fitness" width={134} height={64} className="h-12 md:h-16 w-auto mb-4 brightness-200" style={{ aspectRatio: '134/64' }} />
            <p className="text-sm text-gray-300 mb-4">
              Mobility-first functional strength training in Charleston. Move better, live stronger.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/drakefitnesschs/" target="_blank" rel="noopener noreferrer" className="text-drake-teal-light hover:text-drake-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100063722011333" target="_blank" rel="noopener noreferrer" className="text-drake-teal-light hover:text-drake-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.youtube.com/@Drakefitness" target="_blank" rel="noopener noreferrer" className="text-drake-teal-light hover:text-drake-gold transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-hero font-bold text-lg mb-4 uppercase text-accent">Start Here</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/reset-week-charleston" className="text-drake-gold hover:text-drake-gold/80 transition-colors font-semibold">→ Reset Week ($50)</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-drake-gold transition-colors">About Us</Link></li>
              <li><Link to="/schedule" className="text-gray-300 hover:text-drake-gold transition-colors">Classes & Schedule</Link></li>
              <li><Link to="/coaching" className="text-gray-300 hover:text-drake-gold transition-colors">1:1 Coaching</Link></li>
              <li><Link to="/insights" className="text-gray-300 hover:text-drake-gold transition-colors">Insights & Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-hero font-bold text-lg mb-4 text-accent uppercase">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mobility-fitness-avondale" className="text-gray-300 hover:text-drake-gold transition-colors">Mobility Training</Link></li>
              <li><Link to="/strength-training-charleston" className="text-gray-300 hover:text-drake-gold transition-colors">Strength Training</Link></li>
              <li><Link to="/west-ashley-fitness" className="text-gray-300 hover:text-drake-gold transition-colors">West Ashley Fitness</Link></li>
              <li><Link to="/reset-week-charleston" className="text-gray-300 hover:text-drake-gold transition-colors">Reset Week Charleston</Link></li>
              <li><Link to="/coaching" className="text-gray-300 hover:text-drake-gold transition-colors">1:1 Coaching</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-drake-gold transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-hero font-bold text-lg mb-4 text-accent uppercase">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a 
                  href="https://maps.app.goo.gl/opeP6dqsbidbY9GZ6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-drake-gold transition-colors"
                >
                  2 Avondale Ave<br />Charleston, SC 29407
                </a>
              </li>
              <li className="pt-2">
                <a href="mailto:ddrake311@gmail.com" className="hover:text-drake-gold transition-colors">
                  ddrake311@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:8438175420" className="hover:text-drake-gold transition-colors">
                  (843) 817-5420
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          {/* Trust Badges Row */}
          <div className="mb-4">
            <MicroTrustBadges 
              badges={['local', 'experience', 'safe']} 
              variant="row"
              className="text-gray-300"
            />
          </div>
          {/* Micro Trust Line */}
          <div className="mb-4">
            <GoogleReviewsBadge variant="micro" className="text-gray-400 hover:text-white" />
          </div>
          <p>© {new Date().getFullYear()} Drake Fitness. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-drake-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-drake-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;