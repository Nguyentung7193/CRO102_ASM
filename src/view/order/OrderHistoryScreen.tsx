// src/screens/OrderHistoryScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import OrderCard from '../../compoment/Order/OrderCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderHistoryScreen'>;

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}

const OrderHistoryScreen = ({ navigation }: Props) => {
  const orders: Order[] = [
    {
      id: 'DH123456',
      date: '2025-07-21',
      total: 1200000,
      status: 'completed',
    },
    {
      id: 'DH123457',
      date: '2025-07-20',
      total: 750000,
      status: 'pending',
    },
    {
      id: 'DH123458',
      date: '2025-07-15',
      total: 500000,
      status: 'cancelled',
    },
  ];

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
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => navigation.navigate('OrderDetailScreen', { orderId: item.id })}
          />
        )}
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
