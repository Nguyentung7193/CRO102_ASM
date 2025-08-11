import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../../reducers/product/productReducer';


type Props = {
  product: Product;
  onPress?: () => void;
  onedit?: (product: Product) => void;
  ondelete?: (id: string) => void;
};

const ProductFeatureItem = ({ product, onPress, onedit, ondelete }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>
      </View>
      <TouchableOpacity onPress={() => {onedit && onedit(product)}} style={{ padding: 8 }}>
        <Text style={{ color: '#FF0000' }}>edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {ondelete && ondelete(product.id)}} style={{ padding: 8 }}>
        <Text style={{ color: '#00FF00' }}>delete</Text>
      </TouchableOpacity>
    
    </TouchableOpacity>
  );
};

export default ProductFeatureItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 8,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  price: {
    marginTop: 4,
    color: '#007bff',
    fontWeight: 'bold',
  },
});
