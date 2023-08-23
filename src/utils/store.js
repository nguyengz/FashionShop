import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '~/slices/cartSlice';
import { productApi } from '~/slices/productApi';
import productReducer from '~/slices/productSlice';
import authReducer from "~/utils/auth";
import messageReducer from "~/utils/message";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  products: productReducer,
  [productApi.reducerPath]: productApi.reducer,
  cart:cartReducer,
}

const store = configureStore({
  reducer: reducer,

    

  
  
  devTools: true,
  middleware:(getDefaulMiddleware)=>
    getDefaulMiddleware().concat(productApi.middleware),

});

export default store;
