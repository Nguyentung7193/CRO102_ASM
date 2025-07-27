// src/components/CartTotal.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  total: number;
  onCheckout: () => void;
}

const CartTotal: React.FC<Props> = ({ total, onCheckout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Tổng cộng:</Text>
      <Text style={styles.totalPrice}>{total.toLocaleString()}đ</Text>
      <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
        <Text style={styles.checkoutText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartTotal;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 16,
    color: '#333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  checkoutBtn: {
    backgroundColor: '#3d2483ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
