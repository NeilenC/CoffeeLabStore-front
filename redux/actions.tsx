import { ClearCartAction, Product } from "@/commons/types.interface";
import {
  AddToCartAction,
  RemoveFromCartAction,
} from "../commons/types.interface";

//----------------------------------- CARRITO DE COMPRA -----------------------------------

export const addToCart = (
  product: Product,
  quantity: number,
  userId: string,
): AddToCartAction => ({
  type: "ADD_TO_CART",
  payload: { product, quantity, userId },
});

export const incrementCartItem = (product: Product, userId:string) => ({
  type: "INCREMENT_CART_ITEM",
  payload: {product, userId},
});

export const removeFromCart = (product: Product, userId:string): RemoveFromCartAction => ({
  type: "REMOVE_FROM_CART",
  payload: {product, userId},
});

export const decrementCartItem = (product: Product, userId:string) => ({
  type: "DECREMENT_CART_ITEM",
  payload: {product, userId},

});

export const clearCart = (userId:string): ClearCartAction => ({
    type: "CLEAR_CART",
    payload: {userId}
})

//----------------------------------- CARRITO DE COMPRA -----------------------------------

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const RESET_STATE = "RESET_STATE";

export const addToFavorites = (userId: string, productId: string) => ({
  type: ADD_TO_FAVORITES,
  payload: { userId, productId },
});

export const removeFromFavorites = (userId: string, productId: string) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: { userId, productId },
});

export const resetState = () => ({
  type: RESET_STATE,
});
