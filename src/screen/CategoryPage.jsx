import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

const categories = [
  { title: 'Mobiles & Accessories', icon: 'mobile', iconSet: 'Entypo' },
  { title: 'Laptops', icon: 'laptop', iconSet: 'Entypo' },
  { title: 'Headphones', icon: 'headphones', iconSet: 'Feather' },
  { title: 'Camera', icon: 'camera', iconSet: 'Feather' },
  { title: 'Watch', icon: 'watch', iconSet: 'Entypo' },
  { title: 'Game Controller', icon: 'game-controller', iconSet: 'Entypo' },
  { title: 'Clothes', icon: 'shopping-bag', iconSet: 'Feather' },     
  { title: 'Television',
     icon: 'tv', iconSet: 'Feather' },             
  { title: 'Shoes', icon: 'shoe', iconSet: 'Entypo' },               
];

const mobileBrands = [

  "Apple", "Samsung", "Nokia",  "LG", "HTC", "Motorola", "Lenovo", "Xiaomi", "Google",  "Oppo", "Realme", "OnePlus", "Nothing", "vivo",    "ZTE",  "Oscal", "Sharp", "Micromax", "Infinix", "Ulefone", "Tecno", "Doogee", "Blackview", "Cubot", "Oukitel", "Itel", "TCL"
];

const laptopBrands = [
  "Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "MSI", "Samsung", "Razer", "Microsoft"
];

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <ScrollView>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={styles.boxContainer}>
            {categories.map((cat, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.categoryItem,
                  selectedCategory === cat.title && { backgroundColor: "#ffeaea" }
                ]}
                onPress={() => setSelectedCategory(cat.title)}
              >
                {cat.iconSet === 'Entypo' ? (
                  <Entypo name={cat.icon} size={20} color="#E96E6E" />
                ) : (
                  <Feather name={cat.icon} size={20} color="#E96E6E" />
                )}
                <Text style={styles.categoryText}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
    
<View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1, padding: 16 }}>
  {selectedCategory === "Mobiles & Accessories" ? (
    <View>
      <Text style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 16 }}></Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {mobileBrands.map((brand, i) => (
          <View
            key={i}
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 14,
              margin: 5,
              borderWidth: 1,
              borderColor: '#eee',
              elevation: 2,
              fontWeight:"bold",
            }}
          >
            <Text style={{ color: "#333", fontSize: 13 }}>{brand}</Text>
          </View>
        ))}
      </View>
    </View>
  ) : (
    <Text style={{ color: "#333" }}></Text>
  )}
</View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default CategoryPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 10,
  },
  boxContainer: {
    width: '25%',
    height: "100%",
    justifyContent: 'center',
  },
  categoryItem: {
    marginTop: 0,
    paddingVertical: 25,
    alignItems: 'center',
  },
  categoryText: {
    marginTop: 10,
    fontSize: 10,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
});