import AsyncStorage from "@react-native-async-storage/async-storage";
import { Children, createContext, useEffect, useState } from "react";

 export const CartContext = createContext();
 export const CartProvider = ({children}) => {
  const [carts, setCarts ] = useState([]);
  const totalprice = carts.reduce((sum, item) => sum + item.price * item.quantity, 0);

//  const [totalPrice , SetTotalPrice] = useState(0);
//   useEffect(() => {
//     loadCartItems();
//   }, []);

  const loadCartItems = async () => {
    let carts = await AsyncStorage.getItem("carts");
    carts = carts ? JSON.parse(carts) : [];
    setCarts(carts)
    totalSum(carts);
  }

  const addToCart = async (item ) => {
    const itemExist = carts.findIndex((cart) => cart.id ===item.id);
    if(itemExist=== -1) {
     const newCartItems = [...carts, item]
     await AsyncStorage.setItem("carts", JSON.stringify(newCartItems));
     setCarts(newCartItems);
     totalSum(newCartItems);

    } 
  }

  const deleteItemFromCart = async (item) => {
    const newItems = carts.filter((cart) => cart.id !== item.id);
    await AsyncStorage.setItem("carts", JSON.stringify( newItems));
    setCarts(newItems);
    totalSum(newItems);
  }
  const totalSum = () => {
    return carts.reduce((amount, item) => amount + item.price, 0);
    console.log("totalSum", totalSum);
    totalprice(totalSum);
  }
const value = {
  carts,
  addToCart,
  totalprice,
  deleteItemFromCart
}
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>
 }
