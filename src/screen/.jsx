import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('Payment');
  };

  return (
    <View>
      <Text>Checkout Page</Text>
      <TouchableOpacity onPress={handleNext} style={{ padding: 10, backgroundColor: 'black' }}>
        <Text style={{ color: 'white' }}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;
