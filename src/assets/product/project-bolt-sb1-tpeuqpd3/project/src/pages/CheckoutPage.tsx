import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check, MapPin, Plus, Info } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuth } from '../contexts/AuthContext';
import { createOrder } from '../services/orders';
import { Address } from '../types';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const CheckoutPage = () => {
  const { cart, clearCart } = useCartStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Form states
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('credit-card');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: 'home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  
  // Checkout states
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/');
    }
  }, [cart.items.length, navigate]);
  
  // Tip calculation
  const tipAmount = (cart.subtotal * (tipPercentage / 100));
  const totalWithTip = cart.total + tipAmount;
  
  // Get user's default address
  useEffect(() => {
    if (user?.addresses && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      } else {
        setSelectedAddress(user.addresses[0].id);
      }
    }
  }, [user]);
  
  // Handle new address submission
  const handleAddNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to save the address
    // For this example, we'll just show how it would look
    setShowNewAddressForm(false);
  };
  
  // Handle order submission
  const handlePlaceOrder = async () => {
    if (!user) {
      navigate('/login?redirect=checkout');
      return;
    }
    
    if (!selectedAddress) {
      setError('Please select a delivery address');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Find the selected address object
      const deliveryAddress = user.addresses.find(addr => addr.id === selectedAddress);
      
      if (!deliveryAddress) {
        throw new Error('Selected address not found');
      }
      
      // Create order
      await createOrder(
        cart,
        deliveryAddress,
        selectedPayment,
        tipAmount,
        specialInstructions
      );
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/orders');
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container-custom py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-7/12">
          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
              <MapPin className="mr-2 text-primary-500" size={20} />
              Delivery Address
            </h2>
            
            {user?.addresses && user.addresses.length > 0 ? (
              <div className="space-y-3">
                {user.addresses.map((address) => (
                  <label 
                    key={address.id} 
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAddress === address.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex">
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={() => setSelectedAddress(address.id)}
                        className="mr-3 text-primary-500 focus:ring-primary-500 mt-1"
                      />
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-gray-900 capitalize">{address.type}</span>
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm">
                          {address.street}, {address.city}, {address.state} {address.zipCode}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
                
                {!showNewAddressForm && (
                  <button
                    onClick={() => setShowNewAddressForm(true)}
                    className="flex items-center text-primary-500 hover:text-primary-600 mt-2"
                  >
                    <Plus size={16} className="mr-1" />
                    Add New Address
                  </button>
                )}
              </div>
            ) : (
              <div>
                <p className="text-gray-500 mb-4">You don't have any saved addresses yet.</p>
                {!showNewAddressForm && (
                  <Button
                    onClick={() => setShowNewAddressForm(true)}
                    variant="primary"
                    leftIcon={<Plus size={16} />}
                  >
                    Add New Address
                  </Button>
                )}
              </div>
            )}
            
            {/* New Address Form */}
            {showNewAddressForm && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg animate-fadeIn">
                <h3 className="font-medium mb-3">Add New Address</h3>
                <form onSubmit={handleAddNewAddress}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Type
                      </label>
                      <select
                        className="input"
                        value={newAddress.type}
                        onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as 'home' | 'work' | 'other' })}
                        required
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="123 Main St"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Zip Code"
                        value={newAddress.zipCode}
                        onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id="default-address"
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <label htmlFor="default-address" className="ml-2 text-sm text-gray-700">
                        Set as default address
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      Save Address
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewAddressForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
              <CreditCard className="mr-2 text-primary-500" size={20} />
              Payment Method
            </h2>
            
            <div className="space-y-3">
              <label 
                className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedPayment === 'credit-card' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex">
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={selectedPayment === 'credit-card'}
                    onChange={() => setSelectedPayment('credit-card')}
                    className="mr-3 text-primary-500 focus:ring-primary-500 mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Credit / Debit Card</div>
                    <p className="text-gray-500 text-sm">Pay with your card securely</p>
                  </div>
                </div>
              </label>
              
              <label 
                className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedPayment === 'cash' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={selectedPayment === 'cash'}
                    onChange={() => setSelectedPayment('cash')}
                    className="mr-3 text-primary-500 focus:ring-primary-500 mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Cash on Delivery</div>
                    <p className="text-gray-500 text-sm">Pay when your order arrives</p>
                  </div>
                </div>
              </label>
            </div>
            
            {/* Credit Card Form (shown only when credit card is selected) */}
            {selectedPayment === 'credit-card' && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="MM/YY"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="123"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="save-card"
                    className="text-primary-500 focus:ring-primary-500"
                  />
                  <label htmlFor="save-card" className="ml-2 text-sm text-gray-700">
                    Save this card for future orders
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-5/12">
          <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b text-gray-800">
              Order Summary
            </h2>
            
            {/* Order Items */}
            <div className="max-h-48 overflow-y-auto mb-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <div className="flex items-start">
                    <span className="text-gray-700 font-medium mr-2">
                      {item.quantity}x
                    </span>
                    <span className="text-gray-800">{item.menuItem.name}</span>
                  </div>
                  <span className="font-medium text-gray-800">
                    ${(item.menuItem.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Order Totals */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                {cart.deliveryFee > 0 ? (
                  <span className="font-medium">${cart.deliveryFee.toFixed(2)}</span>
                ) : (
                  <span className="text-secondary-500 font-medium">Free</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${cart.tax.toFixed(2)}</span>
              </div>
              
              {/* Tip Selection */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-gray-600 mb-2">Add a tip</p>
                <div className="flex space-x-2 mb-2">
                  {[0, 10, 15, 20, 25].map((percent) => (
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
                  <span className="text-gray-600">Tip Amount</span>
                  <span className="font-medium">${tipAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between text-base">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-lg">${totalWithTip.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Special Instructions */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Info className="w-4 h-4 mr-1 text-gray-500" />
                Special Instructions (Optional)
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg text-sm min-h-20"
                placeholder="Any instructions for the restaurant or driver..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-error-100 text-error-500 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            {/* Place Order Button */}
            <Button
              variant="primary"
              fullWidth
              className="mt-6"
              onClick={handlePlaceOrder}
              isLoading={isSubmitting}
              rightIcon={<Check size={16} />}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;