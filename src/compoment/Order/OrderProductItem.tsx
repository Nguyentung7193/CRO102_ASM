// src/components/OrderProductItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const OrderProductItem: React.FC<{ product: Product }> = ({ product }) => {
  const total = product.price * product.quantity;

  return (
    <View style={styles.item}>
      <Text style={styles.name}>{product.name}</Text>
      <View style={styles.detailRow}>
        <Text>Số lượng: {product.quantity}</Text>
        <Text>Đơn giá: {product.price.toLocaleString()}đ</Text>
        <Text>Thành tiền: {total.toLocaleString()}đ</Text>
      </View>
    </View>
  );
};

export default OrderProductItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: 'column',
    gap: 4,
  },
});
