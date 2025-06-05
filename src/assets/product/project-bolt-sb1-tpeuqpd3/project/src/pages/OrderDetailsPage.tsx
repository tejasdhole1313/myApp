import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Phone, Package, Check, X, Star } from 'lucide-react';
import { Order } from '../types';
import { getOrderDetails, trackOrder } from '../services/orders';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [trackingInfo, setTrackingInfo] = useState<{
    status: Order['status'];
    currentLocation?: { lat: number; lng: number };
    estimatedDeliveryTime: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const orderData = await getOrderDetails(id);
        setOrder(orderData);
        
        // If order is in an active status, get tracking info
        if (['confirmed', 'preparing', 'ready', 'out-for-delivery'].includes(orderData.status)) {
          const tracking = await trackOrder(id);
          setTrackingInfo(tracking);
        }
      } catch (err: any) {
        setError('Failed to load order details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
    
    // Set up polling for active orders
    let interval: number | null = null;
    
    if (order && ['confirmed', 'preparing', 'ready', 'out-for-delivery'].includes(order.status)) {
      interval = setInterval(async () => {
        try {
          const tracking = await trackOrder(id!);
          setTrackingInfo(tracking);
          
          // If status changed, refresh order details
          if (tracking.status !== order.status) {
            const updatedOrder = await getOrderDetails(id!);
            setOrder(updatedOrder);
          }
        } catch (error) {
          console.error('Error polling order status:', error);
        }
      }, 30000) as unknown as number; // Poll every 30 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [id, order?.status]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  // Get status steps
  const getStatusSteps = () => {
    const steps = [
      { key: 'pending', label: 'Order Placed' },
      { key: 'confirmed', label: 'Confirmed' },
      { key: 'preparing', label: 'Preparing' },
      { key: 'ready', label: 'Ready' },
      { key: 'out-for-delivery', label: 'Out for Delivery' },
      { key: 'delivered', label: 'Delivered' }
    ];
    
    // Find current step index
    const currentIndex = order 
      ? steps.findIndex(step => step.key === order.status)
      : -1;
    
    // Handle cancelled orders
    if (order?.status === 'cancelled') {
      return steps.map(step => ({ ...step, status: 'cancelled' }));
    }
    
    // Map status for each step
    return steps.map((step, index) => {
      if (currentIndex === -1) return { ...step, status: 'pending' };
      
      if (index < currentIndex) return { ...step, status: 'completed' };
      if (index === currentIndex) return { ...step, status: 'current' };
      return { ...step, status: 'pending' };
    });
  };
  
  if (loading) {
    return (
      <div className="container-custom py-8 text-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="container-custom py-8 text-center">
        <div className="bg-error-100 text-error-500 p-4 rounded-lg mb-4">
          {error || 'Order not found'}
        </div>
        <Link to="/orders">
          <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
            Back to Orders
          </Button>
        </Link>
      </div>
    );
  }
  
  const orderStatus = getStatusSteps();
  
  return (
    <div className="container-custom py-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/orders" className="text-gray-600 hover:text-primary-500 mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Order #{order.id.slice(-6)}</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Order Details */}
        <div className="lg:w-7/12">
          {/* Order Status */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Status</h2>
            
            {order.status === 'cancelled' ? (
              <div className="bg-error-50 text-error-500 p-4 rounded-lg mb-4 flex items-center">
                <X className="w-5 h-5 mr-2" />
                <span>This order was cancelled</span>
              </div>
            ) : (
              <div className="mb-6">
                <div className="relative">
                  <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200">
                    <div 
                      className={`animate-pulse bg-primary-500 rounded h-full`} 
                      style={{ 
                        width: `${(orderStatus.findIndex(step => step.status === 'current') + 1) * 100 / orderStatus.length}%` 
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    {orderStatus.map((step, index) => (
                      <div 
                        key={step.key} 
                        className="flex flex-col items-center"
                        style={{ width: `${100 / orderStatus.length}%` }}
                      >
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                            step.status === 'completed' 
                              ? 'bg-primary-500 text-white' 
                              : step.status === 'current' 
                                ? 'bg-primary-200 border border-primary-500 text-primary-500' 
                                : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {step.status === 'completed' ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <span className={`text-xs text-center ${
                          step.status === 'completed' || step.status === 'current'
                            ? 'text-gray-800 font-medium' 
                            : 'text-gray-500'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Estimated Delivery */}
            {['confirmed', 'preparing', 'ready', 'out-for-delivery'].includes(order.status) && (
              <div className="bg-primary-50 p-4 rounded-lg flex items-center">
                <Clock className="w-5 h-5 text-primary-500 mr-3" />
                <div>
                  <p className="text-gray-800 font-medium">Estimated Delivery Time</p>
                  <p className="text-primary-500 font-bold">{trackingInfo?.estimatedDeliveryTime || order.estimatedDeliveryTime}</p>
                </div>
              </div>
            )}
            
            {/* Driver Info */}
            {order.status === 'out-for-delivery' && order.driverName && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-2 text-gray-800">Your Driver</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-3">
                    <span className="text-xl font-bold">{order.driverName.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.driverName}</p>
                    {order.driverPhone && (
                      <a 
                        href={`tel:${order.driverPhone}`} 
                        className="text-primary-500 text-sm flex items-center mt-1"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        {order.driverPhone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Delivery Address */}
            <div className="mt-4">
              <h3 className="font-medium mb-2 text-gray-800 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                Delivery Address
              </h3>
              <div className="text-gray-700">
                <p className="capitalize">{order.deliveryAddress.type}</p>
                <p>{order.deliveryAddress.street}</p>
                <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}</p>
              </div>
            </div>
          </div>
          
          {/* Restaurant & Items */}
          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                <img 
                  src={order.restaurantImage} 
                  alt={order.restaurantName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900">{order.restaurantName}</h3>
                <p className="text-sm text-gray-500">
                  Order placed on {formatDate(order.createdAt)}
                </p>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="mt-4 divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex justify-between">
                  <div>
                    <div className="flex items-baseline">
                      <span className="font-medium mr-2">
                        {item.quantity}x
                      </span>
                      <span>{item.menuItem.name}</span>
                    </div>
                    {item.specialInstructions && (
                      <p className="text-xs text-gray-500 mt-1 italic">
                        "{item.specialInstructions}"
                      </p>
                    )}
                  </div>
                  <span className="font-medium">
                    ${(item.menuItem.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Special Instructions */}
            {order.specialInstructions && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="font-medium mb-2 text-gray-800">Special Instructions</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg italic">
                  "{order.specialInstructions}"
                </p>
              </div>
            )}
            
            {/* Review Order */}
            {order.status === 'delivered' && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<Star className="text-yellow-400\" size={16} />}
                >
                  Write a Review
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Payment Summary */}
        <div className="lg:w-5/12">
          <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b text-gray-800 flex items-center">
              <Package className="w-5 h-5 mr-2 text-primary-500" />
              Payment Summary
            </h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                {order.deliveryFee > 0 ? (
                  <span className="font-medium">${order.deliveryFee.toFixed(2)}</span>
                ) : (
                  <span className="text-secondary-500 font-medium">Free</span>
                )}
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${order.tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tip</span>
                <span className="font-medium">${order.tip.toFixed(2)}</span>
              </div>
              
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="font-medium mb-2 text-gray-800 flex items-center">
                <CreditCard className="w-4 h-4 mr-1 text-gray-500" />
                Payment Method
              </h3>
              <p className="text-gray-700 capitalize">{order.paymentMethod.replace('-', ' ')}</p>
            </div>
            
            {/* Order Actions */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="font-medium mb-3 text-gray-800">Need Help?</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" fullWidth>
                  Contact Support
                </Button>
                <Button variant="outline" fullWidth>
                  Help Center
                </Button>
              </div>
              
              {/* Reorder Button */}
              {order.status === 'delivered' && (
                <Button
                  variant="primary"
                  fullWidth
                  className="mt-3"
                >
                  Reorder
                </Button>
              )}
              
              {/* Cancel Order Button */}
              {['pending', 'confirmed'].includes(order.status) && (
                <Button
                  variant="outline"
                  fullWidth
                  className="mt-3 text-error-500 hover:bg-error-50"
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;