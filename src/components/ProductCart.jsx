import { useNavigation, NavigationProp } from '@react-navigation/core';
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
/**
 * @typedef {Object} ProductCartProps
 * @property {{ image: string; title: string; price: number }} item
 */

/**
 * @typedef {Object} RootStackParamList
 * @property {{ item: { image: string; title: string; price: number } }} PRODUCT_DETAILS
 */

function ProductCart({ item }) {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <TouchableOpacity  onPress={() => navigation.navigate("PRODUCT_DETAILS", { item })} 
    style={styles.container}>
  <Image source={{ uri: item.image }} style={styles.coverImage} />

      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
       <TouchableOpacity
      style={styles.likeContainer}
      onPress={() => setIsLiked(!isLiked)}
    >
      {isLiked ? (
        <AntDesign name="heart" size={20} color="#E55B5B" />
      ) : (
        <AntDesign name="hearto" size={20} color="#E55B5B" />
      )}
    </TouchableOpacity>
    </TouchableOpacity>
  );
}

   
export default ProductCart


const styles = StyleSheet.
create ({
    container:{
       flex: 1,
    marginTop:10,
    position:"relative"
    
    },
    coverImage:{
        height:256,
        width:150,
        borderRadius:20,
       
        
        

    },
    title: {
fontSize:18,
color:"#444444",
fontWeight:"600",
textAlign:"start",
paddingLeft:5,
    },
    price:
    {
        fontSize:18,
        color:"#9C9C9C",
fontWeight:"600",
textAlign:"start",
paddingLeft:5,

    },
    content : {
        paddingLeft: 15,

    },
    likeContainer: {
        height:32,
        width:32,
        backgroundColor:"#FFFFFF",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 17,
        position:"absolute",
        top:10,
        right:20,
    }
})