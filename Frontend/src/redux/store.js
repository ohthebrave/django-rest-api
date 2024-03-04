import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/carts/cartSlice';
import { productApi } from '../features/animalsApi';

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    carts: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export default store;
