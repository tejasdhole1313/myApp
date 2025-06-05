import { Home, Search, ShoppingCart, Clock, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';

interface MobileNavbarProps {
  className?: string;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ className = '' }) => {
  const location = useLocation();
  const { cart } = useCartStore();
  
  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-6 h-6" /> },
    { path: '/search', label: 'Search', icon: <Search className="w-6 h-6" /> },
    { path: '/cart', label: 'Cart', icon: <ShoppingCart className="w-6 h-6" />, badge: cartItemCount > 0 ? cartItemCount : undefined },
    { path: '/orders', label: 'Orders', icon: <Clock className="w-6 h-6" /> },
    { path: '/profile', label: 'Profile', icon: <User className="w-6 h-6" /> },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 ${className}`}>
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive ? 'text-primary-500' : 'text-gray-500'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavbar;