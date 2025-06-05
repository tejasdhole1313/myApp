import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto";
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from '../components/Header';
import Voice from '@react-native-voice/voice'; 
import Category from '../components/Category';
import ProductCart from '../components/ProductCart';
import data from '../data/data.json';


const categories = ["Trending Now", "All", "New", "Mens", "Ladies", "Kids"];

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  gender: string;
};

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>(data.products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchQuery]);

  const filterProducts = () => {
    let result = [];

    switch (selectedCategory) {
      case "Trending Now":
        result = products.slice(0, 10);
        break;
      case "All":
        result = [...products];
        break;
      case "New":
        result = products.slice(10, 30);
        break;
      case "Mens":
        result = products.filter(p => p.gender === "male");
        break;
      case "Womens":
        result = products.filter(p => p.gender === "female");
        break;
      default:
        result = [...products];
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  };
  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <Header isCart={false} />
      <FlatList
        numColumns={2}
        ListHeaderComponent={
          <>
            <Text style={styles.matchText}>Match Your Style</Text>
         

          <View style={styles.inputContainer}>
  <View style={styles.iconContainer}>
    <Fontisto name={'search'} size={20} color={"black"} />
  </View>
  <TextInput
    style={styles.textInput}
    placeholder='Search'
    value={searchQuery}
    onChangeText={text => setSearchQuery(text)}
  />
  <TouchableOpacity onPress={() => {}}>
    <MaterialIcons name="keyboard-voice" size={24} color="#ccc" />
  </TouchableOpacity>
</View>

            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <Category
                  item={item}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              )}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryList}
            />
          </>
        }
        data={filteredProducts}
        renderItem={({ item }) => <ProductCart item={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      />
    </LinearGradient>
  );
};
export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  matchText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  categoryList: {
    marginBottom: 16,
  },
});
