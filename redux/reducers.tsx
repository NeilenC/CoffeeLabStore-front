import { CartState } from "@/commons/types.interface";

const initialState: CartState = {
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
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter((item) => item._id !== action.payload)
            }
        default:
            return state;
    }
}

export const userInfo = () => {
    return (dispatch: any) => {
        dispatch(updateUserInfo(userInfo));
    };
}