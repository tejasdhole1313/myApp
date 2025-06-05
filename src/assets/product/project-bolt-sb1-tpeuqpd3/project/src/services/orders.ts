import api from './api';
import { Order, Cart, Address } from '../types';

// Get user orders
export const getUserOrders = async (params?: {
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{ orders: Order[]; totalCount: number }> => {
  return await api.get('/orders', { params });
};

// Get order details
export const getOrderDetails = async (id: string): Promise<Order> => {
  return await api.get(`/orders/${id}`);
};

// Create new order
export const createOrder = async (
  cart: Cart,
  deliveryAddress: Address,
  paymentMethod: string,
  tip: number,
  specialInstructions?: string
): Promise<Order> => {
  return await api.post('/orders', {
    restaurantId: cart.restaurantId,
    items: cart.items,
    deliveryAddress,
    paymentMethod,
    tip,
    specialInstructions,
  });
};

// Cancel order
export const cancelOrder = async (id: string): Promise<void> => {
  await api.put(`/orders/${id}/cancel`);
};

// Track order status
export const trackOrder = async (id: string): Promise<{
  status: Order['status'];
  currentLocation?: { lat: number; lng: number };
  estimatedDeliveryTime: string;
}> => {
  return await api.get(`/orders/${id}/track`);
};