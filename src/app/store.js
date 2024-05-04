import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice.js";
import authReducer from "../features/auth/authSlice.js";
import cartReducer from "../features/cart/cartSlice.js";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
