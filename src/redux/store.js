import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
  cartState: cartReducer,
  auth: authReducer,
}
});

export default store;
