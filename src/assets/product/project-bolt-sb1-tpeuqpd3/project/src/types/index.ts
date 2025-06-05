export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  logo: string;
  rating: number;
  reviewCount: number;
  cuisines: string[];
  priceRange: 1 | 2 | 3; // $ to $$$
  deliveryTime: number; // in minutes
  deliveryFee: number;
  minOrder: number;
  address: string;
  distance: number; // in km
  isOpen: boolean;
  featured: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  popular: boolean;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  spicyLevel: 0 | 1 | 2 | 3; // 0: Not Spicy, 3: Very Spicy
  allergens?: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Cart {
  items: CartItem[];
  restaurantId: string | null;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  tip: number;
  total: number;
  deliveryAddress: Address;
  paymentMethod: string;
  createdAt: string;
  estimatedDeliveryTime: string;
  deliveredAt?: string;
  driverName?: string;
  driverPhone?: string;
  specialInstructions?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  restaurantId: string;
  rating: number;
  comment: string;
  date: string;
  orderId: string;
}

export interface ApiError {
  message: string;
  status: number;
}