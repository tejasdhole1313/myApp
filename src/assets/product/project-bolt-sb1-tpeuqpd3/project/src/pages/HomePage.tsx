import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, Utensils } from 'lucide-react';
import { Restaurant } from '../types';
import { getRestaurants, getFeaturedRestaurants } from '../services/restaurants';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

const HomePage = () => {
  const [featured, setFeatured] = useState<Restaurant[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rating' | 'deliveryTime' | 'deliveryFee'>('rating');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const location = useLocation();
  
  // Parse search params from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    const cuisine = searchParams.get('cuisine');
    const price = searchParams.get('price');
    const sort = searchParams.get('sort') as 'rating' | 'deliveryTime' | 'deliveryFee' | null;
    
    if (search) setSearchQuery(search);
    if (cuisine) setSelectedCuisine(cuisine);
    if (price) setPriceRange(price);
    if (sort) setSortBy(sort);
  }, [location]);
  
  // Fetch restaurants
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get featured restaurants (doesn't apply filters)
        const featuredData = await getFeaturedRestaurants(5);
        setFeatured(featuredData);
        
        // Get filtered restaurants
        const params: any = {
          search: searchQuery,
          sortBy,
        };
        
        if (selectedCuisine) params.cuisine = selectedCuisine;
        if (priceRange) params.priceRange = priceRange;
        
        const { restaurants } = await getRestaurants(params);
        setRestaurants(restaurants);
      } catch (err: any) {
        console.error('Error fetching restaurants:', err);
        setError(err?.message || 'Failed to load restaurants. Please try again.');
        setRestaurants([]);
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [searchQuery, selectedCuisine, priceRange, sortBy]);
  
  // Available cuisines (would come from API in a real app)
  const cuisines = [
    'All',
    'Italian',
    'Chinese',
    'Mexican',
    'Indian',
    'Japanese',
    'Thai',
    'American',
    'Middle Eastern',
  ];
  
  // Handle filter submit
  const applyFilters = () => {
    setIsFilterOpen(false);
    // URL params will trigger the useEffect
  };
  
  // Render loading skeleton
  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="h-64 w-full flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Delicious Food, Delivered to Your Door
            </h1>
            <p className="text-lg mb-8 text-white/90">
              Order from your favorite restaurants and get it delivered fast
            </p>
            
            <div className="relative">
              <form onSubmit={(e) => {
                e.preventDefault();
                setSearchQuery(searchQuery);
              }}>
                <input
                  type="text"
                  placeholder="Search for restaurants or cuisines..."
                  className="w-full py-3 px-5 pl-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cuisine Filters */}
      <section className="bg-white py-4 shadow-sm sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  (selectedCuisine === cuisine.toLowerCase() || (cuisine === 'All' && !selectedCuisine))
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCuisine(cuisine === 'All' ? '' : cuisine.toLowerCase())}
              >
                {cuisine}
              </button>
            ))}
            
            <button
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1 whitespace-nowrap text-sm font-medium ml-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} />
              Filters
            </button>
          </div>
          
          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-medium mb-2 text-gray-700">Price Range</h3>
                  <div className="flex gap-2">
                    {['$', '$$', '$$$'].map((price, index) => (
                      <button
                        key={price}
                        className={`px-4 py-2 rounded-lg ${
                          priceRange === String(index + 1)
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setPriceRange(String(index + 1))}
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-gray-700">Sort By</h3>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        sortBy === 'rating'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSortBy('rating')}
                    >
                      Top Rated
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        sortBy === 'deliveryTime'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSortBy('deliveryTime')}
                    >
                      Fastest Delivery
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        sortBy === 'deliveryFee'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSortBy('deliveryFee')}
                    >
                      Lowest Fees
                    </button>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={applyFilters} 
                    variant="primary" 
                    fullWidth
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <div className="container-custom py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-error-100 text-error-500 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}
        
        {/* Featured Restaurants */}
        {!searchQuery && featured.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
              <Utensils className="w-6 h-6 mr-2 text-primary-500" />
              Featured Restaurants
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} featured={true} />
              ))}
            </div>
          </section>
        )}
        
        {/* All Restaurants */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {searchQuery 
              ? `Search Results for "${searchQuery}"`
              : "All Restaurants"
            }
          </h2>
          
          {restaurants.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">No restaurants found</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCuisine('');
                  setPriceRange('');
                  setSortBy('rating');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;