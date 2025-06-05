import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';

const CheckoutScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  const handlePlaceOrder = () => {
    navigation.navigate('OrderPage', {
      name,
      phone,
      pincode,
      city,
      state,
      address,
      cashOnDelivery
    });
  };

  return (
      <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
         <View style={styles.headerContainer}>
        <Header isCart={true} />
      </View>
      <ScrollView>
    <View style={styles.fromContainer}>
      <Text style={styles.heading}>Delivery Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="number-pad"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Address (House No, Street, Area)"
        value={address}
        onChangeText={setAddress}
        multiline
        required
      />
      <TouchableOpacity
        style={[styles.codButton, cashOnDelivery && styles.codSelected]}
        onPress={() => setCashOnDelivery(!cashOnDelivery)}
      >
        <Text style={{ color: cashOnDelivery ? '#fff' : '#333' }}>
          Cash on Delivery
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: '#E96E6E', padding: 12, borderRadius: 8 }}
        onPress={handlePlaceOrder}>
      <Text title=""  style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>NOW BUY</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding:  10, },
  heading: { fontWeight: 'bold', fontSize: 20, marginVertical: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 15 },
  map: { width: '100%', height: 200, marginBottom: 16 },
  codButton: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E96E6E', marginBottom: 16, alignItems: 'center' },
  codSelected: { backgroundColor: '#E96E6E' },
});

export default CheckoutScreen;