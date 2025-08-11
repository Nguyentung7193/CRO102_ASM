// src/screens/OrderHistoryScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getOrders } from '../../action/order/orderAction';
import OrderCard from '../../compoment/Order/OrderCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { OrderCardItem } from '../../types/order';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderHistoryScreen'>;

const OrderHistoryScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.order.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#7c43bd" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.title}>Lịch sử đơn hàng</Text>
        </View>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const orderCardItem: OrderCardItem = {
            id: item.id,
            date: new Date(item.createdAt).toLocaleDateString('vi-VN'),
            total: item.total,
            status: item.status
          };
          
          return (
            <OrderCard
              order={orderCardItem}
              onPress={() => navigation.navigate('OrderDetailScreen', { orderId: item.id })}
            />
          );
        }}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7c43bd',
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 16,
  },
});
