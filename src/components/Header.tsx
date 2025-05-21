import { useNavigation, NavigationProp } from '@react-navigation/core';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

type RootStackParamList = {
  Home_Stack: undefined;
  // add other routes here if needed
};

type HeaderProps = {
  isCart: boolean;
};

function Header({isCart}: HeaderProps) {
 const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
   <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate("Home_Stack")} style={styles.appIconContainer}>
      {
        isCart? (<Ionicons name={"chevron-back"} color={"#E96E6E"}  size={24}/>
        ):(
          <Image source={require("../assets/apps.png")} 
      style={styles.appIcon}
      />
        )
      }
      
    </TouchableOpacity>
    {
      isCart && <Text  style={styles.myCart}>My Cart</Text>
    }
    
    <Image source={require("../assets/profile.png")}
    style={styles.dp}
    />
   </View>
  )
}

export default Header
const styles = StyleSheet.create({
  container:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
paddingBottom:5,
  },
  appIconContainer:{
  backgroundColor:"#FFFFFF",
  width:44,
  height:44,
  borderRadius: 22,
  justifyContent:'center',
  alignItems:"center",
  },
  appIcon:{
    height:28,
    width:28,
  },
  dp: {
    height:44,
    width:44,
    borderRadius:22,
  },
  myCart:{
    fontSize:28,
    color:"black",

  }
})