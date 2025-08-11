/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { AppDispatch } from '../../store';
import { addProduct, Product, setProducts, updateproduct, setProductDetails } from '../../reducers/product/productReducer';


const API_URL = 'http://10.0.2.2:3000/products';

export const getListProduct = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch(setProducts(response.data));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
export const add1Product = (product: Product) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(API_URL, product);
    dispatch(addProduct(response.data));
  } catch (error) {
    console.error('Error adding product:', error);
  }
};
export const updateProduct = (product: Product) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${product.id}`, product);
    dispatch(updateproduct(response.data));
  } catch (error) {
    console.error('Error updating product:', error);
  }
};
export const deleteProduct = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch(deleteProduct(id));
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};
export const getProductDetail = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    dispatch(setProductDetails(response.data));
  } catch (error) {
    console.error('Error fetching product detail:', error);
    return null;
  }
};
