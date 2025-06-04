import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import categoryReducer from './categoryReducer';

const store = configureStore({
  reducer: {
    cartState: cartReducer,
    auth: authReducer,
    category: categoryReducer, 
  },
});

export default store;