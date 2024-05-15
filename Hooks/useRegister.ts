import { FormikHelpers } from "formik"; // Import FormikHelpers
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useState } from "react";

export default function useRegister () {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const initialValues = {
      name: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    };
  
    const handleSubmit = async (
      values: any, 
      { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>, 
    ) => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        if (response.ok) {
          resetForm();
          router.push("/login");
        } else {
        toast.error("Hubo un error, por favor vuelva a intentar" ,{
          autoClose: 1500, 
        });
  
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      } finally {
        setSubmitting(false);
      }
    };

return {handleSubmit, showPassword, setShowPassword, initialValues, router}
}