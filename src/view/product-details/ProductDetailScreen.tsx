/* eslint-disable @typescript-eslint/no-unused-vars */
// src/screens/ProductDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
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
    'https://i.pinimg.com/736x/39/46/8a/39468ac90c926e50d1899a0f19315ef1.jpg',
    'https://m.media-amazon.com/images/I/61CxvgRkXJL._UF1000,1000_QL80_.jpg',
    'https://gamek.mediacdn.vn/133514250583805952/2021/9/4/image-1630774738048640107230.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz52XAlb5LVmOhXXfwjIelwfO7gJ53FdifpQ&s'
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
          <Icon name="arrow-left" size={28} color="#7c43bd" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="cart-outline" size={28} color="#7c43bd" />
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
