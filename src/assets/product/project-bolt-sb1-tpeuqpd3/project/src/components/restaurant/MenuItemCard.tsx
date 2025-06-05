import { Plus, Minus, Info } from 'lucide-react';
import { useState } from 'react';
import { MenuItem } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import Button from '../ui/Button';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const handleAddToCart = () => {
    addToCart(item, quantity, specialInstructions);
    // Reset after adding to cart
    setQuantity(1);
    setSpecialInstructions('');
    setShowDetails(false);
  };
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  return (
    <div className="card p-4 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Item Image */}
        {item.image && (
          <div className="sm:w-1/3 h-32 sm:h-full rounded-lg overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Item Details */}
        <div className={`${item.image ? 'sm:w-2/3' : 'w-full'} flex flex-col`}>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
            <span className="text-primary-500 font-bold">${item.price.toFixed(2)}</span>
          </div>
          
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {item.popular && (
              <span className="badge bg-primary-100 text-primary-600">Popular</span>
            )}
            {item.vegetarian && (
              <span className="badge bg-secondary-100 text-secondary-600">Vegetarian</span>
            )}
            {item.vegan && (
              <span className="badge bg-secondary-100 text-secondary-600">Vegan</span>
            )}
            {item.glutenFree && (
              <span className="badge bg-blue-100 text-blue-600">Gluten-Free</span>
            )}
            {item.spicyLevel > 0 && (
              <span className="badge bg-red-100 text-red-600">
                Spicy {Array(item.spicyLevel).fill('🌶️').join('')}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center text-sm text-primary-500 hover:text-primary-600"
            >
              <Info className="w-4 h-4 mr-1" />
              {showDetails ? 'Hide details' : 'More details'}
            </button>
            
            <div className="flex items-center">
              <button 
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="mx-2 font-medium w-6 text-center">{quantity}</span>
              <button 
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
              <Button
                variant="primary"
                size="sm"
                className="ml-3"
                onClick={handleAddToCart}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded Details */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
          {/* Allergen Information */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Allergens:</h4>
              <div className="flex flex-wrap gap-1">
                {item.allergens.map((allergen, index) => (
                  <span 
                    key={index}
                    className="badge bg-gray-100 text-gray-700"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Special Instructions */}
          <div className="mb-3">
            <label htmlFor="instructions" className="text-sm font-medium text-gray-700 mb-1 block">
              Special Instructions:
            </label>
            <textarea
              id="instructions"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Any special requests for this item?"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={2}
            />
          </div>
          
          <Button
            variant="primary"
            fullWidth
            className="mt-2"
            onClick={handleAddToCart}
          >
            Add to Cart - ${(item.price * quantity).toFixed(2)}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;