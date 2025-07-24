// src/screens/CartScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import CartItem from '../../compoment/Cart/CartItem';
import CartTotal from '../../compoment/Cart/CartTotal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<Product[]>([
    {
      id: '1',
      name: 'Giày Sneaker Nike',
      price: 1500000,
      quantity: 1,
      image: 'https://i.imgur.com/UGRyo0p.jpg',
    },
    {
      id: '2',
      name: 'Áo Thun Local Brand',
      price: 350000,
      quantity: 2,
      image: 'https://i.imgur.com/dz2fEMV.jpg',
    },
  ]);

  const handleQuantityChange = (id: string, newQty: number) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleCheckout = () => {
    Alert.alert('Thông báo', 'Chuyển đến màn hình thanh toán...');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#7c43bd" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.title}>Giỏ hàng</Text>
        </View>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CartItem product={item} onQuantityChange={handleQuantityChange} />
        )}
        contentContainerStyle={styles.list}
      />

      <CartTotal total={total} onCheckout={handleCheckout} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7c43bd',
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 16,
  },
});
