import api from './api';
import { User } from '../types';

// Get token from local storage
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Set token to local storage
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Remove token from local storage
export const removeToken = (): void => {
  localStorage.removeItem('token');
};

// Login user
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.token) {
    setToken(response.token);
  }
  return response;
};

// Register user
export const register = async (name: string, email: string, password: string, phone?: string) => {
  const response = await api.post('/auth/register', { name, email, password, phone });
  if (response.token) {
    setToken(response.token);
  }
  return response;
};

// Logout user
export const logout = (): void => {
  removeToken();
};

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  return await api.get('/auth/me');
};

// Update user profile
export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  return await api.put('/auth/profile', userData);
};

// Add new address
export const addAddress = async (address: Omit<Omit<Omit<Address, 'id'>, 'userId'>, 'isDefault'>): Promise<Address> => {
  return await api.post('/auth/addresses', address);
};

// Update address
export const updateAddress = async (id: string, address: Partial<Address>): Promise<Address> => {
  return await api.put(`/auth/addresses/${id}`, address);
};

// Delete address
export const deleteAddress = async (id: string): Promise<void> => {
  await api.delete(`/auth/addresses/${id}`);
};

// Set default address
export const setDefaultAddress = async (id: string): Promise<void> => {
  await api.put(`/auth/addresses/${id}/default`);
};