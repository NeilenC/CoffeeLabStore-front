import { CartState, Product } from "@/commons/types.interface";
import {
  AddToCartAction,
  RemoveFromCartAction,
} from "../commons/types.interface";
import cart from "@/pages/cart";

//----------------------------------- CARRITO DE COMPRA -----------------------------------

export const addToCart = (
  product: Product,
  quantity: number,
  userId: string,
): AddToCartAction => ({
  type: "ADD_TO_CART",
  payload: {
    ...product,
    quantity: quantity,
  },
  userId: userId,
});

export const incrementCartItem = (product: Product) => ({
  type: "INCREMENT_CART_ITEM",
  payload: product,
});

export const removeFromCart = (product: Product): RemoveFromCartAction => ({
  type: "REMOVE_FROM_CART",
  payload: product,
});

export const decrementCartItem = (product: Product) => ({
  type: "DECREMENT_CART_ITEM",
  payload: product,
});

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};

//----------------------------------- CARRITO DE COMPRA -----------------------------------

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const RESET_STATE = "RESET_STATE";

export const addToFavorites = (producto: Product) => ({
  type: ADD_TO_FAVORITES,
  payload: producto,
});

export const removeFromFavorites = (productoId: string) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: productoId,
});

export const resetState = () => ({
  type: RESET_STATE,
});
