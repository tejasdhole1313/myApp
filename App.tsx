import { createStaticNavigation, NavigationContainer } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screen/HomeScreen';
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from './src/screen/ProductDetailsScreen';
import CartScreen from './src/screen/CartScreen';
import SinglePageAuth from './src/components/SinglePageAuth';
import { CartContext, CartProvider } from './src/context/CartContext';

const Tab = createBottomTabNavigator();
const Stack  = createNativeStackNavigator();
 function  Home() {
  return (
    <View>
      <Text  style={{color:"black"}}>Home</Text>
    </View>
  );
 }

 const MyHomeStack = () => {
  return(
    <Stack.Navigator  screenOptions={{
      headerShown: false,
    }
    }

    >
      <Stack.Screen name="HOME" component={HomeScreen} />
     <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
 };
function App() {
  return (
   <CartProvider>
   <NavigationContainer>
<Tab.Navigator
screenOptions={{
  headerShown:false,
  tabBarShowLabel: false,
  
}}
>
  <Tab.Screen name='Home_Stack' component={MyHomeStack}
  options={{
    tabBarIcon:({size,focused,color})=>{
      return <Entypo name={"home"} size={size} color={color} />
    },
  }}
  />
  <Tab.Screen name='REORDER' component={Home}
  options={{
    tabBarIcon:({size,color})=>{
      return <MaterialIcons name={"reorder"} size={size} color={color} />
    },
  }}
  />
  <Tab.Screen name='CART' component={CartScreen}
  options={{
    tabBarIcon:({size,color })=>{
      const {cart} = useContext(CartContext);
      
  return (
    <View style={{position:"relative"}}>
  <MaterialCommunityIcons name={"cart"} size={size} color={color} />
   <View style={{
    height:14,
    width:14,
    borderRadius:7,
    backgroundColor:"#E96E6E",
    justifyContent:"center",
    position:"absolute",
    top:-10,
    right:-5,
   }}>
<Text style={{
  fontSize:10,
  color:"white",
  fontWeight:"500" ,
  textAlign:"center"
}}>{cart?.length}</Text>
   </View>
    </View>
  );
},
  }}/>
  <Tab.Screen
  name='ACCOUNT'
  component={SinglePageAuth}
  options={{
    tabBarIcon: ({ size, focused, color }) => (
      <Entypo name={'user'} size={size} color={color} />
    ),
  }}
/>
</Tab.Navigator>
   </NavigationContainer>
 </CartProvider>
  )
}

export default App

