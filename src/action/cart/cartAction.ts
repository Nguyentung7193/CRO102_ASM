import axios from 'axios';
import { AppDispatch } from '../../store';
import { addToCart, updateQuantity, removeFromCart, clearCart } from '../../reducers/cart/cartReducer';

const API_URL = 'http://10.0.2.2:3000/carts';

export const addProductToCart = (productId: string, quantity: number = 1) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, { productId, quantity });
    dispatch(addToCart(response.data));
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

export const updateCartItemQuantity = (productId: string, quantity: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, { quantity });
    dispatch(updateQuantity({ productId, quantity: response.data.quantity }));
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};

export const removeProductFromCart = (productId: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/${productId}`);
    dispatch(removeFromCart(productId));
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

export const clearAllCart = () => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(API_URL);
    dispatch(clearCart());
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};