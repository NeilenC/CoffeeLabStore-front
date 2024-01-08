import { CartState, Product } from "@/commons/types.interface";
import Swal from "sweetalert2";

const initialState: CartState = {
  cart: [],
};

export const updateUserInfo = (userInfo: any) => {
  return {
    type: "UPDATE_USER_INFO",
    payload: userInfo,
  };
};

export const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const quantityToAdd = action.payload.quantity || 1;
      const existingProductIndex = state.cart.findIndex(
        (item: Product) => item._id === action.payload._id && item.productPreferences.grind === action.payload.productPreferences.grind
      );
    
      if (existingProductIndex !== -1) {
        const cart = [...state.cart];
        const existingProduct = cart[existingProductIndex];
        const updatedQuantity = existingProduct.quantity + quantityToAdd;
    
        if (updatedQuantity <= action.payload.stock) {
          cart[existingProductIndex] = {
            ...existingProduct,
            quantity: updatedQuantity,
          };
          return {
            ...state,
            cart: cart,
          };
        } else {
          console.error("La cantidad supera el stock disponible");
          return state;
        }
      } else {
        const productWithQuantity = {
          ...action.payload,
          quantity: quantityToAdd,
        };
        return {
          ...state,
          cart: [...state.cart, productWithQuantity],
          userId: action.userId,
        };
      }
    
    case "INCREMENT_CART_ITEM":
      const updatedCart = state.cart.map((item: Product) => {
        if (item._id === action.payload._id) {
          const newQuantity = item.quantity + 1;

          if (newQuantity <= item.stock) {
            return { ...item, quantity: newQuantity };
          } else {
            Swal.fire({
              icon: "warning",
              title: "¡Alerta!",
              text: `La cantidad supera el stock disponible para el producto ${item.name}`,
            });
          }
        }
        return item;
      });

      return {
        ...state,
        cart: updatedCart,
      };

    case "DECREMENT_CART_ITEM":
      const decrementItem = state.cart
        .map((item: Product) => {
          if (item._id === action.payload._id) {
            const newQuantity = (item.quantity || 0) - 1;
            if (newQuantity >= 1) {
              return { ...item, quantity: newQuantity };
            }

            return null;
          }
          return item;
        })
        .filter(Boolean);

      return {
        ...state,
        cart: decrementItem,
      };

    case "UPDATE_CART_TOTAL":
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item: Product) => item._id !== action.payload),
      };

    case "LOAD_CART_FROM_LOCAL_STORAGE":
      return {
        ...state,
        cart: action.payload,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export const userInfo = () => {
  return (dispatch: any) => {
    dispatch(updateUserInfo(userInfo));
  };
};

//----------------------------------- ORDEN DE COMPRA -----------------------------------
