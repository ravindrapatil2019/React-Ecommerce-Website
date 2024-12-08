
import { configureStore } from "@reduxjs/toolkit";
import productSlice from './productsSlice';

const store = configureStore({
  reducer: {
    allProducts: productSlice
  }
});

export default store;