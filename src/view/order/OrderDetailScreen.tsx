/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/screens/OrderDetailScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAppDispatch } from '../../hook';
import { getOrderDetail, updateOrderDetail, deleteOrderById } from '../../action/order/orderAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { Order } from '../../reducers/order/orderReducer';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetailScreen'>;

const OrderDetailScreen = ({ route, navigation }: Props) => {
  const { orderId } = route.params;
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderDetail();
  }, [orderId]);

  const loadOrderDetail = async () => {
    try {
      setLoading(true);
      const data = await dispatch(getOrderDetail(orderId));
      if (data) {
        setOrder(data);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải thông tin đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy đơn hàng</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#7c43bd" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết đơn hàng</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          <Text style={styles.text}>Mã đơn: {order.id}</Text>
          <Text style={styles.text}>
            Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
          </Text>
          <Text style={styles.text}>Trạng thái: {order.status}</Text>
          <Text style={styles.text}>Tổng tiền: {order.total.toLocaleString()}đ</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text>Sản phẩm: {item.productId}</Text>
              <Text>Số lượng: {item.quantity}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={async () => {
              try {
                await dispatch(updateOrderDetail(order.id, {
                  ...order,
                  status: order.status === 'pending' ? 'completed' : 'pending'
                }));
                loadOrderDetail();
              } catch (error) {
                Alert.alert('Lỗi', 'Không thể cập nhật đơn hàng');
              }
            }}
          >
            <Text style={styles.buttonText}>
              {order.status === 'pending' ? 'Xác nhận đơn hàng' : 'Đánh dấu chờ'}
            </Text>
          </TouchableOpacity>

          {/* New Edit Button */}
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => navigation.navigate('EditOrderScreen', { order })}
          >
            <Text style={styles.buttonText}>Sửa đơn hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => {
              Alert.alert(
                'Xác nhận',
                'Bạn có chắc muốn xóa đơn hàng này?',
                [
                  { text: 'Hủy', style: 'cancel' },
                  {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: async () => {
                      try {
                        await dispatch(deleteOrderById(order.id));
                        navigation.goBack();
                      } catch (error) {
                        Alert.alert('Lỗi', 'Không thể xóa đơn hàng');
                      }
                    },
                  },
                ]
              );
            }}
          >
            <Text style={styles.buttonText}>Xóa đơn hàng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ede7f6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7c43bd',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c43bd',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actions: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 24,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#7c43bd',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrderDetailScreen;
