import { Product } from "@/commons/types.interface"
import { AddToCartAction, RemoveFromCartAction } from "../commons/types.interface"

export const addToCart = (product: Product, quantity:number): AddToCartAction => ({
    type: 'ADD_TO_CART',
    payload: {
        ...product,
        quantity: quantity
      }
})

export const removeFromCart = (productId: string): RemoveFromCartAction => ({
    type: 'REMOVE_FROM_CART',
    payload: productId
})

