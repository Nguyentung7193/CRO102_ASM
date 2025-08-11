/* eslint-disable @typescript-eslint/no-unused-vars */
// src/screens/ProductDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import ProductImageCarousel from '../../compoment/Item/ProductImageCarousel';
import AddToCartButton from '../../compoment/Button/AddToCartButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getProductDetail } from '../../action/product/productAction';
import { useAppDispatch, useAppSelector } from '../../hook';
import { addProductToCart, clearAllCart } from '../../action/cart/cartAction';

type ProductDetailRouteProp = RouteProp<{ params: { id: string } }, 'params'>
type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetailScreen'>;

const ProductDetailScreen = ({navigation} : Props) => {
  const route = useRoute<ProductDetailRouteProp>();
  const { id } = route.params;
  const dispatch = useAppDispatch();
  console.log('Product ID:', id);

  // Lấy product detail từ redux state
  const product = useAppSelector(state =>
    state.product.listProducts.find(p => p.id === id)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      await dispatch(getProductDetail(id));
      setLoading(false);
    };
    fetchDetail();
  }, [id, dispatch]);

  // Thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (product) {
      dispatch(addProductToCart(product.id, 1));
      Alert.alert('Thành công', 'Đã thêm sản phẩm vào giỏ hàng!');
    }
  };

  if (loading || !product) {
    return (
      <View style={[styles.wrapper, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#7c43bd" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#7c43bd" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={28} color="#7c43bd" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <ProductImageCarousel images={[product.image]} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.title}</Text>
          <Text style={styles.price}>{product.price.toLocaleString()} ₫</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <AddToCartButton onPress={handleAddToCart}/>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 8,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ede7f6',
  },
  headerTitle: {
    color: '#7c43bd',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#7c43bd',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7c43bd',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#b39ddb',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#7c43bd',
  },
});
