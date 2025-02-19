import { Product } from "@/commons/types.interface";
import { SET_PRODUCT_FOR_PURCHASE, RESET_PRODUCT_FOR_PURCHASE } from "./actions";

export interface PurchaseState {
  product: Product | null;
  quantity: number;
}

const initialState: PurchaseState = {
  product: null,
  quantity: 0,
};

const purchaseReducer = (state = initialState, action: any): PurchaseState => {
  switch (action.type) {
    case SET_PRODUCT_FOR_PURCHASE:
      return {
        ...state,
        product: action.payload.product,
        quantity: action.payload.quantity,
      };
    case RESET_PRODUCT_FOR_PURCHASE:
      return initialState;
    default:
      return state;
  }
};

export default purchaseReducer;
