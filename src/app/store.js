import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice.js";
import authReducer from "../features/auth/authSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import orderReducer from "../features/order/orderSlice.js";
import userReducer from "../features/user/userSlice.js";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});

export default store;
