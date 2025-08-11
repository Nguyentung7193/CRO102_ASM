import axios from 'axios';
import { AppDispatch } from '../../store';
import { createOrder, setOrders, updateOrder, deleteOrder } from '../../reducers/order/orderReducer';

const API_URL = 'http://10.0.2.2:3000/orders';

export const createNewOrder = (items: { productId: string; quantity: number }[], total: number) => async (dispatch: AppDispatch) => {
  try {
    const order = {
      id: Date.now().toString(),
      items,
      total,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    const response = await axios.post(API_URL, order);
    dispatch(createOrder(response.data));
    
    // Clear cart after successful order
    await axios.delete('http://10.0.2.2:3000/carts');
    
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

// Get all orders
export const getOrders = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch(setOrders(response.data));
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

// Get single order
export const getOrderDetail = (orderId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order detail:', error);
    return null;
  }
};

// Update order
export const updateOrderDetail = (orderId: string, orderData: any) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}`, orderData);
    dispatch(updateOrder(response.data));
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// Delete order
export const deleteOrderById = (orderId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/${orderId}`);
    dispatch(deleteOrder(orderId));
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};