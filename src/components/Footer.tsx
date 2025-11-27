import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";
import drakeLogo from "@/assets/drake-logo.png";
const Footer = () => {
  return <footer className="bg-drake-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img src={drakeLogo} alt="Drake Fitness" className="h-12 w-auto mb-4 brightness-200" />
            <p className="text-sm text-gray-300 mb-4">
              Mobility-first functional strength training in, Charleston. Move better, live stronger.     
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/drakefitnesschs/" target="_blank" rel="noopener noreferrer" className="text-drake-teal-light hover:text-drake-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100063722011333" target="_blank" rel="noopener noreferrer" className="text-drake-teal-light hover:text-drake-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.youtube.com/@drakefitnesschs" target="_blank" rel="noopener noreferrer" className="text-drake-teal-light hover:text-drake-gold transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-drake-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-drake-gold transition-colors">About Us</Link></li>
              <li><Link to="/classes" className="text-gray-300 hover:text-drake-gold transition-colors">Classes</Link></li>
              <li><Link to="/schedule" className="text-gray-300 hover:text-drake-gold transition-colors">Schedule</Link></li>
              <li><Link to="/success-stories" className="text-gray-300 hover:text-drake-gold transition-colors">Success Stories</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-drake-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Programs</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-300">Foundation Flow™</span></li>
              <li><span className="text-gray-300">Functional Strength™</span></li>
              <li><span className="text-gray-300">KB Strong™</span></li>
              <li><span className="text-gray-300">Mobility Reset™</span></li>
              <li><Link to="/coaching" className="text-gray-300 hover:text-drake-gold transition-colors">1:1 Coaching</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-drake-gold transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>2 Avondale Ave</li>
              <li>Charleston, SC 29407</li>
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