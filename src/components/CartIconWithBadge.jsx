// src/components/CartIconWithBadge.js

import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartIconWithBadge = ({ size , color }) => {
 const carts = useSelector(state => state.cartState.cart);


  return (
    <View style={{ position: "relative" }}>
      <MaterialCommunityIcons name="cart" size={size} color={color} />
      {carts.length > 0 && (
        <View style={{
          height: 14,
          width: 14,
          borderRadius: 7,
          backgroundColor: "#E96E6E",
          justifyContent: "center",
          position: "absolute",
          top: -10,
          right: -5,
        }}>
          <Text style={{
            fontSize: 10,
            color: "white",
            fontWeight: "500",
            textAlign: "center"
          }}>
            {carts.length}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CartIconWithBadge;
