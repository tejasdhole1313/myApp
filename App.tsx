import { createStaticNavigation, NavigationContainer } from '@react-navigation/native'
import React from 'react'
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
    }>
      <Stack.Screen name="HOME" component={HomeScreen} />
     <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
 };
function App() {
  return (
   <NavigationContainer>
<Tab.Navigator
screenOptions={{
  headerShown:false,
  tabBarShowLabel: false,
  
}}
>
  <Tab.Screen name='Home' component={HomeScreen}
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
  <Tab.Screen name='CART' component={Home}
  options={{
    tabBarIcon:({size,focused,color})=>{
      return <MaterialCommunityIcons name={"cart"} size={size} color={color} />
    },
  }}/>
  <Tab.Screen name='ACCOUNT' component={Home}
  options={{
    tabBarIcon:({size,focused,color})=>{
      return <Entypo name={"user"} size={size} color={color} />
    },
  }}/>
</Tab.Navigator>
   </NavigationContainer>
   
  )
}

export default App

