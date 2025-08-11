/* eslint-disable @typescript-eslint/no-unused-vars */
import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../reducers/product/productReducer';
import cartReducer from '../reducers/cart/cartReducer';
import orderReducer from '../reducers/order/orderReducer';

const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer, // Assuming you have a cartReducer
        order: orderReducer, // Assuming you have an orderReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;