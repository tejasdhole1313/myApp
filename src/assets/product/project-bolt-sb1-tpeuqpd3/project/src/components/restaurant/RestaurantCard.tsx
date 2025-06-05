import { Star, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  featured?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, featured = false }) => {
  const { id, name, image, logo, rating, cuisines, priceRange, deliveryTime, deliveryFee, isOpen } = restaurant;
  
  // Convert price range to dollar signs
  const priceDisplay = Array(priceRange).fill('$').join('');
  
  return (
    <Link to={`/restaurant/${id}`} className="block group">
      <div 
        className={`card relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 ${
          featured ? 'md:h-80' : 'h-64'
        }`}
      >
        {/* Restaurant Image */}
        <div className="h-36 overflow-hidden relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Logo */}
          <div className="absolute bottom-0 left-4 transform translate-y-1/2 w-12 h-12 bg-white rounded-full p-1 shadow-md">
            <img 
              src={logo} 
              alt={`${name} logo`} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              Featured
            </div>
          )}
          
          {/* Open/Closed Status */}
          <div className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-md ${
            isOpen ? 'bg-secondary-500 text-white' : 'bg-gray-800 text-white'
          }`}>
            {isOpen ? 'Open' : 'Closed'}
          </div>
        </div>
        
        {/* Restaurant Info */}
        <div className="p-4 pt-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
            <div className="flex items-center space-x-1 text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {cuisines.slice(0, 3).map((cuisine, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
              >
                {cuisine}
              </span>
            ))}
            {cuisines.length > 3 && (
              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                +{cuisines.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime} min</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>{priceDisplay}</span>
            </div>
            
            <div>
              {deliveryFee > 0 ? (
                <span>${deliveryFee.toFixed(2)} delivery</span>
              ) : (
                <span className="text-secondary-500 font-medium">Free delivery</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;