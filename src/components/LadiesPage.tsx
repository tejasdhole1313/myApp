import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import ProductCart from '../components/ProductCart';
import data from '../data/data.json';

const LadiesPage = () => {
  const ladiesProducts = data.products.filter((p: any) => p.gender === "female");

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <Header isCart={true} />
      <Text style={styles.heading}>Ladies' Collection</Text>
      <FlatList
        data={ladiesProducts}
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

export default LadiesPage;
