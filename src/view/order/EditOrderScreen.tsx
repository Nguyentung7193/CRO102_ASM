import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { useAppDispatch } from '../../hook';
import { updateOrderDetail } from '../../action/order/orderAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Order } from '../../reducers/order/orderReducer';

type Props = NativeStackScreenProps<RootStackParamList, 'EditOrderScreen'>;

const EditOrderScreen = ({ route, navigation }: Props) => {
  const { order } = route.params;
  const dispatch = useAppDispatch();
  const [total, setTotal] = useState(order.total.toString());
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedOrder = {
        ...order,
        total: Number(total),
        status,
      };

      await dispatch(updateOrderDetail(order.id, updatedOrder));
      Alert.alert('Thành công', 'Đã cập nhật đơn hàng');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#7c43bd" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sửa đơn hàng</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Mã đơn hàng:</Text>
          <Text style={styles.text}>{order.id}</Text>

          <Text style={styles.label}>Tổng tiền:</Text>
          <TextInput
            style={styles.input}
            value={total}
            onChangeText={setTotal}
            keyboardType="numeric"
            placeholder="Nhập tổng tiền"
          />

          <Text style={styles.label}>Trạng thái:</Text>
          <View style={styles.statusContainer}>
            {['pending', 'completed', 'cancelled'].map((statusOption) => (
              <TouchableOpacity
                key={statusOption}
                style={[
                  styles.statusButton,
                  status === statusOption && styles.statusButtonActive,
                ]}
                onPress={() => setStatus(statusOption as Order['status'])}
              >
                <Text
                  style={[
                    styles.statusText,
                    status === statusOption && styles.statusTextActive,
                  ]}
                >
                  {statusOption === 'pending' ? 'Chờ xử lý' : 
                   statusOption === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Text>
        </TouchableOpacity>
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
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statusButtonActive: {
    backgroundColor: '#7c43bd',
    borderColor: '#7c43bd',
  },
  statusText: {
    color: '#666',
    fontSize: 14,
  },
  statusTextActive: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#7c43bd',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditOrderScreen;