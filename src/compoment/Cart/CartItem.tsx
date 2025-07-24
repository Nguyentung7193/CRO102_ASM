// src/components/CartItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  onQuantityChange: (id: string, newQty: number) => void;
}

const CartItem: React.FC<Props> = ({ product, onQuantityChange }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            onPress={() => onQuantityChange(product.id, Math.max(1, product.quantity - 1))}>
            <Text style={styles.qtyBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{product.quantity}</Text>
          <TouchableOpacity onPress={() => onQuantityChange(product.id, product.quantity + 1)}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    elevation: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    color: '#555',
    marginTop: 4,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#2E86DE',
  },
  qtyText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
});
