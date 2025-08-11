import { createSlice } from '@reduxjs/toolkit';

export interface Order {
  id: string;
  items: { productId: string; quantity: number }[];
  total: number;
  createdAt: string;
  status: 'pending' | 'completed' | 'cancelled';
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    createOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { setOrders, createOrder, updateOrder, deleteOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;