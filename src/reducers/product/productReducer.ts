import {createSlice} from '@reduxjs/toolkit';

 export interface Product {
  category: string;
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
};
interface ProductState {
  listProducts: Product[];
};
const initialState: ProductState = {
  listProducts: [],
};
const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.listProducts = action.payload;
        },
        setProductDetails: (state, action) => {
          const productIndex = state.listProducts.findIndex(product => product.id === action.payload.id);
          if (productIndex !== -1) {
            state.listProducts[productIndex] = action.payload;
          }
        },
        addProduct: (state, action) => {
          state.listProducts.push(action.payload);
        },
        updateproduct: (state, action) => {
          const index = state.listProducts.findIndex(product => product.id === action.payload.id);
          if (index !== -1) {
            state.listProducts[index] = action.payload;
          }
        },
        deleteProduct: (state, action) => {
          state.listProducts = state.listProducts.filter(product => product.id !== action.payload);
        },
    }
});
export const {setProducts, addProduct,updateproduct, setProductDetails} = ProductSlice.actions;
export default ProductSlice.reducer;