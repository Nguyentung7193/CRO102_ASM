/* eslint-disable @typescript-eslint/no-unused-vars */
// src/screens/ProductDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import ProductImageCarousel from '../../compoment/Item/ProductImageCarousel';
import AddToCartButton from '../../compoment/Button/AddToCartButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ProductDetailRouteProp = RouteProp<{ params: { id: string } }, 'params'>
type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetailScreen'>;

const fakeProduct = {
  id: '1',
  name: 'Áo thun Anime',
  price: 199000,
  description: 'Áo thun chủ đề Anime, chất liệu cotton, thiết kế trẻ trung, năng động.',
  images: [
    'https://via.placeholder.com/300x300?text=Anime+1',
    'https://via.placeholder.com/300x300?text=Anime+2',
  ],
};

const ProductDetailScreen = ({navigation} : Props) => {
  const route = useRoute<ProductDetailRouteProp>();
  const { id } = route.params;

  // Lấy thông tin fake theo id (ở đây luôn trả về fakeProduct)
  const product = fakeProduct;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#b39ddb" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={28} color="#b39ddb" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <ProductImageCarousel images={product.images} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price.toLocaleString()} ₫</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <AddToCartButton productId={product.id} />
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#18122B',
    // marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 8,
    backgroundColor: '#18122B',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2d2250',
  },
  headerTitle: {
    color: '#b39ddb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#18122B',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b39ddb',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#7c43bd',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#ede7f6',
  },
});
