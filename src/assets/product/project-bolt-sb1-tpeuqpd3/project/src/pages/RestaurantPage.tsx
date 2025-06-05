import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, DollarSign, MapPin, Phone, ChevronLeft, Filter } from 'lucide-react';
import { Restaurant, MenuItem, Category } from '../types';
import { getRestaurantById, getRestaurantMenu, getRestaurantCategories } from '../services/restaurants';
import MenuItemCard from '../components/restaurant/MenuItemCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showVegetarian, setShowVegetarian] = useState(false);
  const [showVegan, setShowVegan] = useState(false);
  const [showGlutenFree, setShowGlutenFree] = useState(false);
  
  // Fetch restaurant data
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch restaurant details
        const restaurantData = await getRestaurantById(id);
        setRestaurant(restaurantData);
        
        // Fetch menu categories
        const categoriesData = await getRestaurantCategories(id);
        setCategories(categoriesData);
        
        // Fetch menu items
        const menuData = await getRestaurantMenu(id);
        setMenu(menuData);
      } catch (err: any) {
        setError('Failed to load restaurant data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  // Apply filters
  const filteredMenu = menu.filter((item) => {
    // Category filter
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    
    // Dietary filters
    if (showVegetarian && !item.vegetarian) return false;
    if (showVegan && !item.vegan) return false;
    if (showGlutenFree && !item.glutenFree) return false;
    
    return true;
  });
  
  // Group menu items by category for display
  const menuByCategory = filteredMenu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);
  
  // Convert price range to dollar signs
  const getPriceDisplay = (range: number) => {
    return Array(range).fill('$').join('');
  };
  
  if (loading) {
    return (
      <div className="h-64 w-full flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (error || !restaurant) {
    return (
      <div className="container-custom py-8 text-center">
        <div className="bg-error-100 text-error-500 p-4 rounded-lg mb-4">
          {error || 'Restaurant not found'}
        </div>
        <Link to="/" className="btn-primary">
          <ChevronLeft className="mr-1" size={16} /> Back to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container-custom pb-6 text-white">
            <Link to="/" className="inline-flex items-center text-white/90 hover:text-white mb-4">
              <ChevronLeft className="mr-1" size={16} /> Back to restaurants
            </Link>
            
            <div className="flex items-center gap-4 mb-2">
              <img 
                src={restaurant.logo} 
                alt={`${restaurant.name} logo`} 
                className="w-16 h-16 rounded-full bg-white p-1 shadow-lg"
              />
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{restaurant.name}</h1>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span>{restaurant.rating.toFixed(1)}</span>
                    <span className="text-white/70 ml-1">({restaurant.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{restaurant.deliveryTime} min</span>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>{getPriceDisplay(restaurant.priceRange)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-white/90 max-w-2xl">{restaurant.description}</p>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 shrink-0">
            <div className="bg-white rounded-lg shadow-card p-4 mb-6">
              <h2 className="text-lg font-bold mb-3 text-gray-900">Restaurant Info</h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary-500 mt-0.5 mr-2 shrink-0" />
                  <p className="text-gray-700">{restaurant.address}</p>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary-500 mr-2 shrink-0" />
                  <p className="text-gray-700">
                    {restaurant.isOpen ? (
                      <span className="text-secondary-500 font-medium">Open now</span>
                    ) : (
                      <span className="text-gray-500">Closed</span>
                    )} · 
                    <span className="ml-1">Delivery: {restaurant.deliveryTime} min</span>
                  </p>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-primary-500 mr-2 shrink-0" />
                  <p className="text-gray-700">(123) 456-7890</p>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-700">
                    <span className="font-medium">Delivery Fee:</span>
                    {restaurant.deliveryFee > 0 ? (
                      <span className="ml-1">${restaurant.deliveryFee.toFixed(2)}</span>
                    ) : (
                      <span className="ml-1 text-secondary-500 font-medium">Free</span>
                    )}
                  </p>
                  
                  <p className="text-gray-700">
                    <span className="font-medium">Minimum Order:</span>
                    <span className="ml-1">${restaurant.minOrder.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Dietary Filters */}
            <div className="bg-white rounded-lg shadow-card p-4">
              <h2 className="text-lg font-bold mb-3 text-gray-900 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-primary-500" />
                Dietary Filters
              </h2>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                    checked={showVegetarian}
                    onChange={() => setShowVegetarian(!showVegetarian)}
                  />
                  <span className="ml-2 text-gray-700">Vegetarian</span>
                </label>
                
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                    checked={showVegan}
                    onChange={() => setShowVegan(!showVegan)}
                  />
                  <span className="ml-2 text-gray-700">Vegan</span>
                </label>
                
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                    checked={showGlutenFree}
                    onChange={() => setShowGlutenFree(!showGlutenFree)}
                  />
                  <span className="ml-2 text-gray-700">Gluten Free</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Menu Content */}
          <div className="lg:w-3/4">
            {/* Category Navigation */}
            <div className="mb-6 overflow-x-auto pb-2">
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    activeCategory === 'all'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory('all')}
                >
                  All Items
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeCategory === category.name
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory(category.name)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* No Results */}
            {filteredMenu.length === 0 && (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">No menu items match your filters</p>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setActiveCategory('all');
                    setShowVegetarian(false);
                    setShowVegan(false);
                    setShowGlutenFree(false);
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
            
            {/* Menu Items */}
            {activeCategory === 'all' ? (
              // Display items grouped by category
              Object.entries(menuByCategory).map(([category, items]) => (
                <div key={category} className="mb-8">
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b">{category}</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Display filtered items without category headers
              <div className="space-y-4">
                {filteredMenu.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;