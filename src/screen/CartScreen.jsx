import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import CartCard from '../components/CartCard';
import { CartContext } from '../context/CartContext';
const CartScreen = () => {
  const {carts, totalprice, deleteItemFromCart} = useContext(CartContext);

  return (
   <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
<View style={styles.headercontainer}>
<Header  isCart={true}/>
</View>

<FlatList data={carts} renderItem={({item}) => <CartCard item={item} 
deleteItemFromCart= {deleteItemFromCart}/>}


ListFooterComponent={<><View style={styles.priceContainer
}>
  <View style={styles.priceTitle
  }>
    <Text style={styles.text}>Total :</Text>
    <Text style={styles.text}>${totalprice}</Text>
  </View>
   <View style={styles.priceTitle}>
    <Text style={styles.text}>Shopping :</Text>
    <Text style={styles.text}>$0.0</Text>
  </View>
</View>
<View style={styles.divider}/>
  
 <View style={styles.priceTitle}>
    <Text style={styles.text}>Grand Total :</Text>
    <Text style={[styles.text, { color: "black" }]}>${totalprice}</Text>
  </View></>}
  showsVerticalScrollIndicator=
  {false}
  contentContainerStyle={{
    paddingBottom:"100"
  }}
  ></FlatList>

  <TouchableOpacity style={styles.button}>
   <Text style={styles.btnTitle}>Checkout</Text>
  </TouchableOpacity>
 
   </LinearGradient>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  headercontainer:{
    marginBottom:20,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  matchText: {
    fontSize: 28,
    color: "black",
    marginTop: 25,


  },
  priceContainer:{
   marginTop:40,
    
  },
  priceTitle:{
    justifyContent:"space-between",
    marginHorizontal:20,
     flexDirection:"row",
     marginVertical:10
  },
  text:{
    fontSize:18,
    fontWeight:"500",
    color:"#757575"
  },
  divider:{
    borderWidth:2,
    borderColor:"#C0C0C0",
  },
  button:{
    backgroundColor:"#E96E6E",
    padding:10,
    borderRadius:10,
  },
  btnTitle:{
    fontSize:25,
    color:"white",
    textAlign:"center"
  }
})