import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../view/auth/sign-up/SignUpScreen';
import SignInScreen from '../view/auth/sign-in/SignInScreen';
import BottomTabNavigator from './BottomTabNavigator';
import HomeScreen from '../view/home/HomeScreen';
import ProductDetailScreen from '../view/product-details/ProductDetailScreen';
import CartScreen from '../view/cart/CartScreen';
import ProfileScreen from '../view/profile/ProfileScreen';
import OrderHistoryScreen from '../view/order/OrderHistoryScreen';
import OrderDetailScreen from '../view/order/OrderDetailScreen';

export type RootStackParamList = {
  Main: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  HomeScreen: undefined;
  ProductDetailScreen: { productId: string };
  CartScreen: undefined;
  ProfileScreen: undefined;
  OrderHistoryScreen: undefined;
  OrderDetailScreen: { orderId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
