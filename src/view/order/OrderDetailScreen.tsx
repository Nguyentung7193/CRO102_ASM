/* eslint-disable @typescript-eslint/no-unused-vars */
// src/screens/OrderDetailScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import OrderProductItem from '../../compoment/Order/OrderProductItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetailScreen'>;

const OrderDetailScreen = ({ route, navigation }: Props) => {
  const { orderId } = route.params;

  const mockOrder = {
    id: 'DH123456',
    date: '2025-07-21',
    status: 'completed',
    shippingFee: 30000,
    products: [
      {
        id: 'P001',
        name: 'Thuốc A',
        price: 100000,
        quantity: 2,
      },
      {
        id: 'P002',
        name: 'Vitamin B',
        price: 250000,
        quantity: 1,
      },
    ],
  };

  const order = mockOrder; // Sau này sẽ gọi API lấy theo orderId

  const total = order.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const finalTotal = total + order.shippingFee;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn tất';
      case 'pending':
        return 'Đang xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không rõ';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#7c43bd" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Chi tiết đơn hàng</Text>
        </View>
      </View>

      <View style={styles.infoBlock}>
        <Text>Mã đơn hàng: {order.id}</Text>
        <Text>Ngày đặt: {order.date}</Text>
        <Text>Trạng thái: {getStatusLabel(order.status)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Sản phẩm</Text>
      <FlatList
        data={order.products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderProductItem product={item} />}
        contentContainerStyle={styles.list}
      />

      <View style={styles.summary}>
        <View style={styles.row}>
          <Text>Tạm tính:</Text>
          <Text>{total.toLocaleString()}đ</Text>
        </View>
        <View style={styles.row}>
          <Text>Phí vận chuyển:</Text>
          <Text>{order.shippingFee.toLocaleString()}đ</Text>
        </View>
        <View style={styles.rowTotal}>
          <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
          <Text style={styles.totalValue}>{finalTotal.toLocaleString()}đ</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7c43bd',
    textAlign: 'center',
  },
  infoBlock: {
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  list: { marginBottom: 16 },
  summary: { borderTopWidth: 1, borderTopColor: '#ccc', paddingTop: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalLabel: { fontSize: 16, fontWeight: 'bold' },
  totalValue: { fontSize: 16, fontWeight: 'bold', color: '#2ecc71' },
});
