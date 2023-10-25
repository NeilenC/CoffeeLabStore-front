import { createAction, createReducer } from "@reduxjs/toolkit";

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

const initialState = {
  id: "",
  name: "",
  lastname: "",
  email: "",
  phoneNumber: 0,
  role: "",
  address: ""
};

const userReducer = createReducer(initialState, {
    [setUserInfo.type]: (state, action: { payload: UserInfo }) => {
      return action.payload;
    },
  });
  
  

export default userReducer;
