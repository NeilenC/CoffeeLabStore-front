import { createAction, createReducer } from "@reduxjs/toolkit";
import counterReducer from "@reduxjs/toolkit"

export interface UserInfo {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phoneNumber: number;
  role: string;
  address: string;
}

export const setUserInfo = createAction<UserInfo>("SET_USERINFO");
export const clearUserInfo = createAction("CLEAR_USER_INFO");

const initialState = {
  id: "",
  name: "",
  lastname: "",
  email: "",
  phoneNumber: 0,
  role: "",
  address: "",
  
};

const userReducer = createReducer(initialState, {
  [setUserInfo.type]: (state, action) => {
    return action.payload;
  },
  [clearUserInfo.type]: (state) => {
    return initialState;
  },
});

export default userReducer;
