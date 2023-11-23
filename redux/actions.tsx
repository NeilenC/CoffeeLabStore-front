import { CartState, Product } from "@/commons/types.interface"
import { AddToCartAction, RemoveFromCartAction } from "../commons/types.interface"
import cart from "@/pages/cart"

export const addToCart = (product: Product, quantity:number, userId: string, totalPrice: number
    ): AddToCartAction => ({
    type: 'ADD_TO_CART',
    payload: {
        ...product,
        quantity: quantity
      },
    userId: userId,
    totalPrice: totalPrice
})

export const incrementCartItem = (product: Product) => ({
    type: 'INCREMENT_CART_ITEM',
    payload: product,
  });
  

export const removeFromCart = (product: Product): RemoveFromCartAction => ({
    type: 'REMOVE_FROM_CART',
    payload: product

})

export const decrementCartItem = (product: Product) => ({
    type: 'DECREMENT_CART_ITEM',
    payload: product
})
