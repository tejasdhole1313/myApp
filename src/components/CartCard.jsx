import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../redux/cartSlice';
const CartCard = ({item, deleteItemFromCart}) => {
  const dispatch = useDispatch();
return (
 <View style={styles.container}>
  <Image source={{ uri: item.image }} style={styles.coverImage} />
  
  <View style={styles.cardContent}>
    
    {/* Title + Price + Delete Icon in One Row */}
    <View style={styles.topRow}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

     
    </View>

    {/* Color and Size */}
    <View style={styles.circleSizeContainer}>
      <View style={[styles.circle, { backgroundColor: item.color }]} />
      <View style={styles.sizeCircle}>
        <Text style={styles.sizetext}>{item.size}</Text>
      </View>
    </View>
  </View>
 <TouchableOpacity onPress={() => dispatch(deleteFromCart(item))}>
  <FontAwesome6 name="trash" color="#F68CB5" size={25} />
</TouchableOpacity>
</View>

)
}

export default CartCard

const styles = StyleSheet.create({
  container:{
padding:10,
flexDirection:"row",

  },
  coverImage:{
    height:125,
    width:"25%",
  },
  cardContent:{
   flex:1,
  paddingLeft:10,
  },
  title:{
    fontSize:18,
    color:"#4444444",
    fontWeight:"500",
  },
  price:{
    color:"#797979",
    marginHorizontal:10,
    fontSize:18,
    paddingTop:5,
  },
  circle:{
    height:32,
    width:32,
    borderRadius:16,
    backgroundColor:"#7094C1",
    
    
  },
  circleSizeContainer:{
    flexDirection:"row",
    marginHorizontal:10,
    paddingTop:10,
  },
  sizetext:{
    fontSize:18, 
    fontWeight:"500",
  },
  sizeCircle:{
    backgroundColor:"white",
    height:32,
    width:32,
    borderRadius:16,
    justifyContent:"center",
    alignItems:"center",
    marginLeft:10,
  },

})