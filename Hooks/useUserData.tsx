// import React, { useCallback, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserInfo } from "../redux/userInfo";
// import { UserState } from "@/commons/types.interface";

// export default function useUserData() {
//   const dispatch = useDispatch();

//   const getUser = async (id: any) => {
//     try {
//       if (id) {
//         const response = await fetch(`http://localhost:8000/users/${id}`, {
//           method: "GET",
//         });
//         const data = await response.json();
//         dispatch(setUserInfo(data));
//       }
//     } catch (e) {
//     }
//   };

//   useEffect(() => {
//     const id = localStorage.getItem("id");
//     if (id) {
//       getUser(id);
//     }
//   }, []);
// }
