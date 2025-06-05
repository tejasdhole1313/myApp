import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Filter, ShoppingBag } from 'lucide-react';
import { Order } from '../types';
import { getUserOrders } from '../services/orders';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params: any = {};
        if (activeFilter !== 'all') {
          params.status = activeFilter;
        }
        
        const { orders } = await getUserOrders(params);
        setOrders(orders);
      } catch (err: any) {
        setError('Failed to load orders. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [activeFilter]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      'confirmed': { bg: 'bg-blue-100', text: 'text-blue-800' },
      'preparing': { bg: 'bg-indigo-100', text: 'text-indigo-800' },
      'ready': { bg: 'bg-purple-100', text: 'text-purple-800' },
      'out-for-delivery': { bg: 'bg-primary-100', text: 'text-primary-800' },
      'delivered': { bg: 'bg-secondary-100', text: 'text-secondary-800' },
      'cancelled': { bg: 'bg-gray-100', text: 'text-gray-800' },
    };
    
    const style = statusMap[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
    
    return (
      <span className={`badge ${style.bg} ${style.text} capitalize`}>
        {status.replace(/-/g, ' ')}
      </span>
    );
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="container-custom py-8 text-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  // Empty state
  if (!loading && orders.length === 0) {
    return (
      <div className="container-custom py-12 max-w-3xl mx-auto">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">No orders found</h2>
          <p className="text-gray-500 mb-6">
            {activeFilter !== 'all' 
              ? `You don't have any ${activeFilter.replace(/-/g, ' ')} orders` 
              : "You haven't placed any orders yet"}
          </p>
          <Link to="/">
            <Button variant="primary">Browse Restaurants</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <ShoppingBag className="w-7 h-7 mr-2 text-primary-500" />
        My Orders
      </h1>
      
      {error && (
        <div className="bg-error-100 text-error-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {/* Filter tabs */}
      <div className="flex items-center mb-6 overflow-x-auto pb-2">
        <div className="flex items-center mr-4">
          <Filter className="w-5 h-5 text-gray-500 mr-1" />
          <span className="text-gray-700 font-medium">Filter:</span>
        </div>
        
        {['all', 'pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-lg whitespace-nowrap mx-1 transition-colors ${
              activeFilter === filter
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter === 'all' ? 'All Orders' : filter.replace(/-/g, ' ')}
          </button>
        ))}
      </div>
      
      {/* Orders list */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Link 
            key={order.id}
            to={`/orders/${order.id}`}
            className="block bg-white rounded-lg shadow-card overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center">
              {/* Restaurant Info */}
              <div className="flex items-center mb-4 md:mb-0 md:mr-6 md:w-1/4">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img 
                    src={order.restaurantImage} 
                    alt={order.restaurantName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900">{order.restaurantName}</h3>
                  <p className="text-sm text-gray-500">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              
              {/* Order Status and Details */}
              <div className="flex flex-col md:flex-row md:flex-1 md:items-center justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 gap-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                    <span className="font-medium">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  {order.status === 'out-for-delivery' && (
                    <span className="text-primary-500 font-medium text-sm">Arriving soon</span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-3"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;