import { Product } from "@/commons/types.interface";

interface CartState {
  carts: Record<string, Product[]>; 
}

const initialState: CartState = {
  carts: {},
};

export const cartReducer = (state = initialState, action: any) => {
  if (!action.payload) {
    return state;
  }
  const { product, quantity, userId } = action.payload;
  const userCart: Product[] = state.carts[userId] || [];
  switch (action.type) {
    case "ADD_TO_CART":
    
      const existingProductIndex = userCart.findIndex(
        (item: Product) =>
          item._id === product._id &&
          item.productPreferences?.grind === product.productPreferences?.grind
      );
    
    
      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, sumar la cantidad
        const cart = [...userCart];
        const existingProduct = cart[existingProductIndex];
        const updatedQuantity = existingProduct.quantity + quantity;
    
        if (updatedQuantity <= product.stock) {
         
          cart[existingProductIndex] = {
            ...existingProduct,
            quantity: updatedQuantity,
          };
    
          return {
            ...state,
            carts: {
              ...state.carts,
              [userId]: cart,
            },
          };
        } else {
          console.error("La cantidad supera el stock disponible");
          return state;
        }
      } else {
        // Si el producto no está en el carrito, lo agrega
        const productWithQuantity = {
          ...product,
          quantity,
        };
    
        return {
          ...state,
          carts: {
            ...state.carts,
            [userId]: [...userCart, productWithQuantity],
          },
        };
      }
    
    

      case "INCREMENT_CART_ITEM":
        const updatedCartIncrement = userCart.map((item: Product) => {
          if (item._id === product._id) {
            const newQuantity = item.quantity + 1;
            if (newQuantity <= item.stock) {
              return { ...item, quantity: newQuantity };
            } else {
              console.error(
                `La cantidad supera el stock disponible para el producto ${item.name}`,
              );
              return item; // Mantener el producto sin cambios si la cantidad supera el stock
            }
          }
          return item;
        });
      
        return {
          ...state,
          carts: {
            ...state.carts,
            [userId]: updatedCartIncrement,
          },
        };
      


        case "DECREMENT_CART_ITEM":
          const updatedCartDecrement = userCart.map((item: Product) => {
            if (item._id === product._id) {
              const newQuantity = (item.quantity || 0) - 1;
              if (newQuantity >= 1) {
                return { ...item, quantity: newQuantity };
              }
              // Si la cantidad es menor o igual a 0, simplemente omite este producto
              return null;
            }
            return item;
          });
        
          return {
            ...state,
            carts: {
              ...state.carts,
              [userId]: updatedCartDecrement.filter((item) => item !== null) || state.carts[userId],
            },
          };
        

    case "UPDATE_CART_TOTAL":
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
      };


      case "REMOVE_FROM_CART":
        const updatedCart = userCart.filter((item: Product) => item._id !== product);
        return {
          ...state,
          carts: {
            ...state.carts,
            [userId]: updatedCart,
          },
        };


    case "CLEAR_CART":
      return {
        ...state,
        carts: {
          ...state.carts,
          [userId]: [],
        },
      };

    default:
      return state;
  }
};

// export const updateUserInfo = (userInfo: any) => {
//   return {
//     type: "UPDATE_USER_INFO",
//     payload: userInfo,
//   };
// };
// export const userInfo = () => {
//   return (dispatch: any) => {
//     dispatch(updateUserInfo(userInfo));
//   };
// };

//----------------------------------- ORDEN DE COMPRA -----------------------------------
