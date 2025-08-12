/* eslint-disable react-native/no-inline-styles */
// src/screens/CartScreen.tsx
import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hook';
import { updateCartItemQuantity, removeProductFromCart, clearAllCart } from '../../action/cart/cartAction';
import { createNewOrder } from '../../action/order/orderAction';
import CartItem from '../../compoment/Cart/CartItem';
import CartTotal from '../../compoment/Cart/CartTotal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { CartItemProduct } from '../../types/product';
type Props = NativeStackScreenProps<RootStackParamList, 'CartScreen'>;
const CartScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const listProducts = useAppSelector(state => state.product.listProducts);

  // Tính tổng tiền
  const total = cartItems.reduce((sum, item) => {
    const product = listProducts.find(p => p.id === item.productId);
    const price = product ? Number(product.price.toString().replace(/\D/g, '')) : 0;
    return sum + price * item.quantity;
  }, 0);

  // Sửa số lượng
  const handleQuantityChange = async (productId: string, newQty: number) => {
    if (newQty < 1) {
      dispatch(removeProductFromCart(productId));
    } else {
      dispatch(updateCartItemQuantity(productId, newQty));
    }
  };

  // Xóa toàn bộ giỏ hàng
  const handleClearCart = () => {
    dispatch(clearAllCart());
  };

  // Thanh toán
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Giỏ hàng trống', 'Vui lòng thêm sản phẩm vào giỏ hàng!');
      return;
    }

    try {
      await dispatch(createNewOrder(cartItems, total));
      Alert.alert('Thành công', 'Đơn hàng đã được tạo!');
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tạo đơn hàng. Vui lòng thử lại!');
    }
  };

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
        keyExtractor={item => item.productId}
        renderItem={({ item }) => {
          const product = listProducts.find(p => p.id === item.productId);
          if (!product) return null;
          
          const cartItemProduct: CartItemProduct = {
            ...product,
            name: product.title,  // Map title to name
            quantity: item.quantity
          };
          
          return (
            <CartItem
              product={cartItemProduct}
              onQuantityChange={(newQty) => handleQuantityChange(item.productId, newQty)}
              onRemove={() => dispatch(removeProductFromCart(item.productId))}
            />
          );
        }}
        contentContainerStyle={styles.list}
      />
      <CartTotal total={total} onCheckout={handleCheckout} />
      <TouchableOpacity onPress={handleClearCart} style={{ margin: 16 }}>
        <Text style={{ color: '#7c43bd', fontWeight: 'bold', textAlign: 'center' }}>Xóa giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
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
