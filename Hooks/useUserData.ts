// import React, { useCallback, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserInfo } from "../redux/userInfo";
// import { UserState } from "@/commons/types.interface";

// export default function useUserData() {
//   const dispatch = useDispatch();

//   const getUser = async (id: any) => {
//     try {
//       if (id) {
//         const response = await fetch(`${process.env.BASE_URL}/users/${id}`, {
//           method: "GET",
//         });
//         const data = await response.json();
//         dispatch(setUserInfo(data));
//       }
//     } catch (e) {
//       console.log("ERROR USUARIO", e);
//     }
//   };

//   useEffect(() => {
//     const id = localStorage.getItem("id");
//     if (id) {
//       getUser(id);
//     }
//   }, []);
// }
