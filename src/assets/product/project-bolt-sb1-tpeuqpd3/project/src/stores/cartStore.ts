import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, MenuItem } from '../types';

interface CartStore {
  cart: Cart;
  addToCart: (item: MenuItem, quantity: number, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateSpecialInstructions: (itemId: string, instructions: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

// Initial cart state
const initialState: Cart = {
  items: [],
  restaurantId: null,
  subtotal: 0,
  deliveryFee: 0,
  tax: 0,
  total: 0,
};

// Create cart store with persistence
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: { ...initialState },
      
      addToCart: (menuItem: MenuItem, quantity: number, specialInstructions?: string) => {
        const { cart } = get();
        
        // If adding item from a different restaurant, clear cart first
        if (cart.restaurantId && cart.restaurantId !== menuItem.restaurantId) {
          if (!window.confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
            return;
          }
          get().clearCart();
        }
        
        const existingItemIndex = cart.items.findIndex(item => item.menuItem.id === menuItem.id);
        
        if (existingItemIndex > -1) {
          // Update quantity if item already exists
          const updatedItems = [...cart.items];
          updatedItems[existingItemIndex].quantity += quantity;
          
          if (specialInstructions) {
            updatedItems[existingItemIndex].specialInstructions = specialInstructions;
          }
          
          set({ cart: { ...cart, items: updatedItems, restaurantId: menuItem.restaurantId } });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${menuItem.id}-${Date.now()}`,
            menuItem,
            quantity,
            specialInstructions,
          };
          
          set({ 
            cart: { 
              ...cart, 
              items: [...cart.items, newItem], 
              restaurantId: menuItem.restaurantId 
            } 
          });
        }
        
        get().calculateTotals();
      },
      
      removeFromCart: (itemId: string) => {
        const { cart } = get();
        const updatedItems = cart.items.filter(item => item.id !== itemId);
        
        set({ 
          cart: { 
            ...cart, 
            items: updatedItems,
            restaurantId: updatedItems.length > 0 ? cart.restaurantId : null 
          } 
        });
        
        get().calculateTotals();
      },
      
      updateQuantity: (itemId: string, quantity: number) => {
        const { cart } = get();
        
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }
        
        const updatedItems = cart.items.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        );
        
        set({ cart: { ...cart, items: updatedItems } });
        get().calculateTotals();
      },
      
      updateSpecialInstructions: (itemId: string, instructions: string) => {
        const { cart } = get();
        const updatedItems = cart.items.map(item => 
          item.id === itemId ? { ...item, specialInstructions: instructions } : item
        );
        
        set({ cart: { ...cart, items: updatedItems } });
      },
      
      clearCart: () => {
        set({ cart: { ...initialState } });
      },
      
      calculateTotals: () => {
        const { cart } = get();
        const subtotal = cart.items.reduce(
          (sum, item) => sum + (item.menuItem.price * item.quantity), 
          0
        );
        
        // Calculate delivery fee based on subtotal
        let deliveryFee = 0;
        if (subtotal > 0) {
          deliveryFee = subtotal < 20 ? 4.99 : (subtotal < 50 ? 2.99 : 0);
        }
        
        // Calculate tax (8.5%)
        const tax = subtotal * 0.085;
        
        // Calculate total
        const total = subtotal + deliveryFee + tax;
        
        set({
          cart: {
            ...cart,
            subtotal,
            deliveryFee,
            tax,
            total,
          }
        });
      },
    }),
    {
      name: 'foodie-cart-storage',
    }
  )
);