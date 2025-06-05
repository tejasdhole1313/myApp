import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeScreen from './src/screen/HomeScreen';
import CategoryPage from './src/screen/CategoryPage';
import ProfileScreen from './src/components/ProfileScreen';
import Contact from './src/components/Contact';
import ProductDetailsScreen from './src/screen/ProductDetailsScreen';
import CartScreen from './src/screen/CartScreen';
import CheckoutScreen from './src/screen/CheckoutScreen';
import OrderPage from './src/screen/OrderPage';
import CartIconWithBadge from './src/components/CartIconWithBadge';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DrawerListPage from './src/screen/DrawerListPage'; 
import MenPage from './src/components/MenPage'
import LadiesPage from './src/components/LadiesPage'



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MyHomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HOME" component={HomeScreen} />
    <Stack.Screen name="CategoryPage" component={CategoryPage} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="Contact" component={Contact} />
    <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
    <Stack.Screen name="CHECKOUT_SCREEN" component={CheckoutScreen} />
    <Stack.Screen name="OrderPage" component={OrderPage} />
    <Stack.Screen name="MenPage" component={MenPage} />
<Stack.Screen name="LadiesPage" component={LadiesPage} />

  </Stack.Navigator>
);

const MyTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name='Home_Stack'
      component={MyHomeStack}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Entypo name={"home"} size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name='CategoryPage'
      component={CategoryPage}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name={"reorder"} size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name='CART_SCREEN'
      component={CartScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <CartIconWithBadge size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name='ACCOUNT'
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Entypo name={'user'} size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{ headerShown: false }}
          drawerContent={props => <DrawerListPage {...props} />}
        >
          <Drawer.Screen name="MainTabs" component={MyTabs} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;