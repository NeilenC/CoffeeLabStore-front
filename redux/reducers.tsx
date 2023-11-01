import { CartState, Product } from "@/commons/types.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartState = {
    // userId: null,
    cart:[]
}
export const updateUserInfo = (userInfo: any) => {
    return {
        type: 'UPDATE_USER_INFO',
        payload: userInfo,
    };
};

export const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        if (state.cart.find(item => item._id === action.payload._id)) {
          const cart = state.cart.filter(obj => obj._id !== action.payload._id);
          const toUpdateObj = state.cart.find(obj => obj._id === action.payload._id) as Product;
          const updatedObj = { ...action.payload, quantity: toUpdateObj.quantity + 1 };
  
          if (updatedObj.quantity <= action.payload.stock) {
            return {
              ...state, cart: [...cart, updatedObj]
            };
          } else {
            console.error('La cantidad supera el stock disponible');
            return state; 
          }
        } else {
          const productWithQuantity = { ...action.payload, quantity: 1 };
          return {
            ...state, cart: [...state.cart, productWithQuantity]
          };
        }
  
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cart: state.cart.filter(item => item._id !== action.payload)
        };
  
      default:
        return state;
    }
  };
  

export const userInfo = () => {
    return (dispatch: any) => {
        dispatch(updateUserInfo(userInfo));
    };
}