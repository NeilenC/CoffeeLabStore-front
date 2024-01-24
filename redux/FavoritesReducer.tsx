import { Product } from "@/commons/types.interface";
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  RESET_STATE,
} from "./actions";

interface FavoritesState {
  users: Record<string, Product[]>;
}

const initialState: FavoritesState = {
  users: {},
};

export const removeFromFavorites = (userId: string, productId: string) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: { userId, productId },
});

const favoritesReducer = (state: FavoritesState = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      const { userId, productId } = action.payload;
      const userFavorites = state.users[userId] || [];
      return {
        ...state,
        users: {
          ...state.users,
          [userId]: [...userFavorites, productId],
        },
      };

    case REMOVE_FROM_FAVORITES:
      const { userId: removeUserId, productId: removeProductId } = action.payload;
      const updatedUserFavorites = (state.users[removeUserId] || []).filter(
        (productId: any) => productId !== removeProductId
      );
      return {
        ...state,
        users: {
          ...state.users,
          [removeUserId]: updatedUserFavorites,
        },
      };

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

export default favoritesReducer;


// const initialState = {
//   favorites: [] as Product[],
// };

// const favoritesReducer = (state = initialState, action: any) => {

//   switch (action.type) {
//     case ADD_TO_FAVORITES:
//       return {
//         ...state,
//         favorites: [...state.favorites, action.payload],
//       };

//     case REMOVE_FROM_FAVORITES:
//       return {
//         ...state,
//         favorites: state.favorites.filter((product: Product | null) => {
//           return product?._id !== action.payload;
//         }),
//       };

//     case RESET_STATE:
//       return initialState;

//     default:
//       return state;
//   }
// };