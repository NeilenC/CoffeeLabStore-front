import { setUserInfo } from "@/redux/UserReducer";
import theme from "@/styles/theme";
import { useMediaQuery } from "@mui/material";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function useLogin () {

    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 600px)')
    const isMediumScreen = useMediaQuery('(max-width: 1000px)')
  
    const handleSubmit = async (
      values: any,
      { setSubmitting, resetForm }: FormikHelpers<any>,
    ) => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.json();
  
          const { token, user } = data;
  
          localStorage.setItem("token", token);
          // localStorage.setItem("id", user._id);
  
          Swal.fire({
            icon: "success",
            title: `Sesión iniciada con éxito`,
            confirmButtonColor: theme.palette.primary.main,
          });
  
          dispatch(setUserInfo(user));
  
          router.push("/");
          resetForm();
        } else {
         Swal.fire({
          icon: "error",
          title: "No se ha podido iniciar sesión",
          text: "Verifica que los datos ingresados sean correctos",
          confirmButtonColor: theme.palette.primary.main,
        });
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      } finally {
        setSubmitting(false);
        resetForm();
      }
    };

    return {handleSubmit, isSmallScreen, isMediumScreen, showPassword, setShowPassword, router}
}