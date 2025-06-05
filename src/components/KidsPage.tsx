import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import ProductCart from '../components/ProductCart';
import data from '../data/data.json';

const KidsPage = () => {
  const kidsProducts = data.products.filter((p: any) => p.gender === "kids");

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <Header isCart={false} />
      <Text style={styles.heading}>Kids' Collection</Text>
      <FlatList
        data={kidsProducts}
        renderItem={({ item }) => <ProductCart item={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 150 }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', marginVertical: 16, textAlign: 'center' },
});

export default KidsPage;
