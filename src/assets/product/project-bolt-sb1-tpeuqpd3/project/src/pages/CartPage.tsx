import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, updateSpecialInstructions, clearCart } = useCartStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  
  // Custom tip amount
  const tipAmount = (cart.subtotal * (tipPercentage / 100)).toFixed(2);
  const totalWithTip = (cart.total + parseFloat(tipAmount)).toFixed(2);
  
  // Handle proceed to checkout
  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };
  
  // Empty cart state
  if (cart.items.length === 0) {
    return (
      <div className="container-custom py-12 max-w-3xl mx-auto">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add items from restaurants to get started</p>
          <Link to="/">
            <Button variant="primary">Browse Restaurants</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <ShoppingCart className="w-7 h-7 mr-2 text-primary-500" />
        Your Cart
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-7/12">
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-lg text-gray-800">
                Items from Restaurant
              </h2>
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                  }
                }}
                className="text-gray-500 hover:text-error-500 flex items-center text-sm"
              >
                <Trash2 size={16} className="mr-1" />
                Clear Cart
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {cart.items.map((item) => (
                <div key={item.id} className="p-4 flex animate-enter">
                  {/* Item Image */}
                  {item.menuItem.image && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img 
                        src={item.menuItem.image} 
                        alt={item.menuItem.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Item Details */}
                  <div className={`${item.menuItem.image ? 'ml-4' : ''} flex-1`}>
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{item.menuItem.name}</h3>
                      <span className="font-medium text-gray-900">
                        ${(item.menuItem.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.menuItem.description}</p>
                    
                    {/* Special Instructions */}
                    {item.specialInstructions && (
                      <p className="text-xs text-gray-500 mt-1 italic">
                        "{item.specialInstructions}"
                      </p>
                    )}
                    
                    {/* Actions */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="mx-2 font-medium w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-gray-500 hover:text-error-500"
                      >
                        Remove
                      </button>
                    </div>
                    
                    {/* Edit Special Instructions */}
                    <button
                      onClick={() => {
                        const instructions = prompt('Special instructions:', item.specialInstructions || '');
                        if (instructions !== null) {
                          updateSpecialInstructions(item.id, instructions);
                        }
                      }}
                      className="text-xs text-primary-500 hover:text-primary-600 mt-2"
                    >
                      {item.specialInstructions ? 'Edit' : 'Add'} special instructions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-5/12">
          <div className="bg-white rounded-lg shadow-card p-4">
            <h2 className="font-semibold text-lg mb-4 pb-2 border-b text-gray-800">
              Order Summary
            </h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Fee</span>
                {cart.deliveryFee > 0 ? (
                  <span className="font-medium">${cart.deliveryFee.toFixed(2)}</span>
                ) : (
                  <span className="text-secondary-500 font-medium">Free</span>
                )}
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium">${cart.tax.toFixed(2)}</span>
              </div>
              
              {/* Tip Selection */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-gray-700 font-medium mb-2">Add a tip</p>
                <div className="flex space-x-2 mb-3">
                  {[0, 10, 15, 20].map((percent) => (
                    <button
                      key={percent}
                      className={`flex-1 py-2 px-1 text-sm rounded-lg border transition-colors ${
                        tipPercentage === percent
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setTipPercentage(percent)}
                    >
                      {percent === 0 ? 'No Tip' : `${percent}%`}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Tip Amount</span>
                  <span className="font-medium">${tipAmount}</span>
                </div>
              </div>
              
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="text-gray-800 font-bold">Total</span>
                <span className="font-bold text-lg">${totalWithTip}</span>
              </div>
            </div>
            
            <Button
              variant="primary"
              fullWidth
              className="mt-6"
              onClick={handleCheckout}
              rightIcon={<ArrowRight size={16} />}
            >
              Proceed to Checkout
            </Button>
            
            <div className="mt-4">
              <Link to="/" className="text-primary-500 hover:text-primary-600 text-sm flex justify-center">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;