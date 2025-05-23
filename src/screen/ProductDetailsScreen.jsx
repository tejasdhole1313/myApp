import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/core';
import { CartContext } from '../context/CartContext';
const sizes =["S","M", "L", "XL"];
const colorArray = [
  "#91A1B0",
  "#B11D1D",
  "#1F44A3",
  "#9F632A",
  "#1D752B",
  "#000000",
];
const imageurl = 'https://t4.ftcdn.net/jpg/02/98/73/27/360_F_298732797_ayt6MgF0tTgXRCnLxqXaURS6ZCWztvRJ.jpg';
const ProductDetailsScreen = () => {
  const navigation = useNavigation("PRODUCT_DETAILS", { item: selectedSize });
  const {addToCart} = useContext(CartContext);
  const route = useRoute();
  const item = route.params?.item;
   const[selectedSize, setSelecetedSize] = useState(null);
    const[selectedColor, setSelecetedColor] = useState(null);
    const handleAddToCart = (item) => {
  if (!item) return;
  item.size = selectedSize;
  item.color = selectedColor;
  addToCart(item);
  navigation.navigate(("PRODUCT_DETAILS", { item }));
};

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <ScrollView>
        <Image source={require("../assets/first.png")} style={styles.coverImage} />


      <View style={styles.contentContainer}>
        <Text style={styles.title} >jacket</Text>
        <Text style={styles.price} >$19.00</Text>
      </View>
      {/* size container */}
      <Text style={[styles.title, styles.sizeText]}>
        Size
      </Text>
      <View style={styles.sizeContainer}>

        {sizes.map((size) => {
          return (
            <TouchableOpacity style={styles.sizeValueContainer}
              onPress={() => {

                setSelecetedSize(size);
              }}>
              <Text style={[styles.sizeValue, selectedSize == size && { color: "#E55B5B" },]}>{size}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={[styles.title, styles.colorText]}>
        Color
      </Text>
      <View style={styles.colorContainer}>
        {
          colorArray.map((color) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelecetedColor(color);
                }}
                style={[styles.circleBorder,
                selectedColor === color && {
                  borderColor: color,
                  borderWidth: 2,
                }
                ]} >
                <View style={[styles.circle, { backgroundColor: color }]} />
              </TouchableOpacity>
            )
          })
        }
      </View>
      {/*  button container */}
      <TouchableOpacity style={styles.button}
      onPress={() => {
        handleAddToCart(item);
      }}
      >
        <Text style={styles.buttonText
        }>Add to Cart</Text>
      </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  )
}

 
export default ProductDetailsScreen

const styles = StyleSheet.create({

  container:{
    flex: 1,
   
  },
  headerContainer:{
    padding:10,
    
  },
  coverImage: {
    width:"100%",
    height:400,
  },
  contentContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:20,
    marginVertical:20,
  },
  title:{
    fontSize:20,
    color:"#444444",
    fontWeight:"500",
  },
  price:{
    color:"#4D4C4C"
  },
  sizeText: {
    marginHorizontal:20,
  },
  sizeContainer:{
   flexDirection:"row",
   marginHorizontal:20,
  },
 sizeValueContainer:{
  height:36,
  width:36,
  borderRadius:18,
  backgroundColor:"#FFFFFF",
  justifyContent:"center",
  alignItems:"center",
  marginHorizontal:10,
  marginTop:10,
  marginBottom:10,
 },
 sizeValue:{
  fontSize:18,

 },
 colorText:{
  marginHorizontal:20,
 
 },
 colorContainer:{
  flexDirection:"row",
  marginHorizontal:20,
 },
 circle:{
  height:36,
  width:36,
  borderRadius:20,
 
 },
 circleBorder:{
  
  height:48,
  width:48,
  borderRadius:24,
  alignItems:"center",
  justifyContent:"center",
  marginHorizontal:2,
  
 },
 button: {
  backgroundColor:"#E96E6E",
  padding:10,
  margin:10,
  borderRadius:20,
 },
 buttonText: {
  fontSize:24,
  fontWeight:"600",
  color:"white",
  textAlign:"center"
 }
})













 