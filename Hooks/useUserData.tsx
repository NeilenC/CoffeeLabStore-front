import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../redux/userInfo";
import { UserState } from "@/commons/types.interface";

export default function useUserData() {
  const dispatch = useDispatch();
  const user = useSelector((state: UserState) => state.user);
  const getUser = async () => {
    
    try {
        if(user.id) {
        const response = await fetch(`http://localhost:8000/users/${user.id}`,{method:"GET"});
        const data = await response.json()
        dispatch(setUserInfo({ id: data._id,
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          address: data.address,
          phoneNumber: data.phoneNumber,
          role: data.role
        }));
      } 
    } catch (e) {
      console.log("ERROR USUARIO", e);
      throw e;
    }
  };

  useEffect(() => {
    // const id = JSON.parse(localStorage.getItem("id"));
    // if (id) {
    //   getUser(id);
    // }
    getUser()
  }, []);
}