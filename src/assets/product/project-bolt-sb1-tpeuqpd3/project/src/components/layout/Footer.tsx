import { Utensils, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`bg-gray-900 text-white py-10 ${className}`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2">
              <Utensils className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold">Foodie</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Delivering happiness one meal at a time. 
              Find your favorite restaurants and enjoy delicious meals 
              delivered right to your doorstep.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@foodie.com" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-primary-500 transition-colors">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Help & Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Download App */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Get the App</h3>
            <p className="text-gray-400 text-sm mb-4">
              Download our mobile app for a better experience.
            </p>
            <div className="space-y-3">
              <a href="#" className="block w-36">
                <img src="https://www.pngmart.com/files/10/Download-On-The-App-Store-PNG-Clipart.png" alt="App Store" className="h-10" />
              </a>
              <a href="#" className="block w-36">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-10" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Foodie Delivery. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;