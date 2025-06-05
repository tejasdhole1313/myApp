import api from './api';
import { Restaurant, MenuItem, Category, Review } from '../types';

// Get all restaurants
export const getRestaurants = async (params?: {
  search?: string;
  cuisine?: string;
  priceRange?: string;
  sortBy?: 'rating' | 'deliveryTime' | 'deliveryFee';
  page?: number;
  limit?: number;
}): Promise<{ restaurants: Restaurant[]; totalCount: number }> => {
  return await api.get('/restaurants', { params });
};

// Get featured restaurants
export const getFeaturedRestaurants = async (limit = 5): Promise<Restaurant[]> => {
  return await api.get('/restaurants/featured', { params: { limit } });
};

// Get restaurant by id
export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  return await api.get(`/restaurants/${id}`);
};

// Get restaurant menu
export const getRestaurantMenu = async (
  id: string,
  params?: {
    category?: string;
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
  }
): Promise<MenuItem[]> => {
  return await api.get(`/restaurants/${id}/menu`, { params });
};

// Get restaurant categories
export const getRestaurantCategories = async (id: string): Promise<Category[]> => {
  return await api.get(`/restaurants/${id}/categories`);
};

// Get restaurant reviews
export const getRestaurantReviews = async (
  id: string,
  params?: {
    page?: number;
    limit?: number;
    sortBy?: 'date' | 'rating';
  }
): Promise<{ reviews: Review[]; totalCount: number }> => {
  return await api.get(`/restaurants/${id}/reviews`, { params });
};

// Submit restaurant review
export const submitReview = async (
  restaurantId: string,
  orderId: string,
  rating: number,
  comment: string
): Promise<Review> => {
  return await api.post(`/restaurants/${restaurantId}/reviews`, {
    orderId,
    rating,
    comment,
  });
};