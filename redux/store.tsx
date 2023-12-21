import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartReducer";
import userReducer from "./userInfo";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
