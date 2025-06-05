import axios from 'axios';
import { getToken } from './auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add authentication token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Improve error handling with more specific messages
    const errorResponse = {
      message: error.response?.data?.message || 
               error.response?.status === 404 ? 'API endpoint not found' :
               error.response?.status === 500 ? 'Internal server error' :
               !error.response ? 'Network error - Unable to reach the server' :
               'Something went wrong',
      status: error.response?.status || 500,
    };
    return Promise.reject(errorResponse);
  }
);

export default api;