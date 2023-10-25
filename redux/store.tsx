import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './reducers';
import  userReducer  from './userInfo';

const store = configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
    },
  });

export default store