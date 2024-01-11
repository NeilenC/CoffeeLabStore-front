import { Product } from "@/commons/types.interface";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, RESET_STATE } from "./actions";


const initialState = {
    favorites: [],
  };
  
  const favoritesReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case ADD_TO_FAVORITES:
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
  
      case  REMOVE_FROM_FAVORITES:
        return {
          ...state,
          favorites: state.favorites.filter((product: Product | null) => product?._id !== action.payload),
        };

        case RESET_STATE:
          return initialState;

          
      default:
        return state;
    }
  };
  
  export default favoritesReducer;