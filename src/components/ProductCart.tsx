import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";


 
interface ProductCartProps {
  item: {
    image: string;
    title: string;
    price: number;
  };
}

function ProductCart({ item }: ProductCartProps) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
 const navigation = useNavigation<any>();
  return (
    <TouchableOpacity  onPress={()=> {
      navigation.navigate("PRODUCT_DETAILS")
    }} style={styles.container}>
   <Image 
  source={{ uri: item.image }}  // Wrapped in { uri: ... } for ImageSourcePropType
  style={styles.coverImage}
/>

      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={toggleLike}
        style={styles.likeContainer}
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
    },
    price:
    {
        fontSize:18,
        color:"#9C9C9C",
fontWeight:"600",

    },
    content : {
        paddingLeft: 15,

    },
    likeContainer: {
        height:34,
        width:34,
        backgroundColor:"#FFFFFF",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 17,
        position:"absolute",
        top:10,
        right:15,
    }
})