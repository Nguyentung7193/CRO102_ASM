// src/components/OrderCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { OrderCardItem } from '../../types/order';

interface OrderCardProps {
  order: OrderCardItem;
  onPress?: () => void; // thêm option onPress
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return '#2ecc71'; // xanh lá
    case 'pending':
      return '#f1c40f'; // vàng
    case 'cancelled':
      return '#e74c3c'; // đỏ
    default:
      return '#ccc';
  }
};

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress ? onPress : () => console.log('Xem chi tiết:', order.id)}>
      <View style={styles.row}>
        <Text style={styles.label}>Mã đơn:</Text>
        <Text style={styles.value}>{order.id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ngày đặt:</Text>
        <Text style={styles.value}>{order.date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tổng tiền:</Text>
        <Text style={styles.value}>{order.total.toLocaleString()}đ</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Trạng thái:</Text>
        <Text style={[styles.status, { color: getStatusColor(order.status) }]}>
          {order.status === 'completed'
            ? 'Hoàn tất'
            : order.status === 'pending'
            ? 'Đang xử lý'
            : 'Đã hủy'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    width: 100,
  },
  value: {
    flex: 1,
    color: '#333',
  },
  status: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
