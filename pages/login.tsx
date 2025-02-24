import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/UserReducer";
import { useRouter } from "next/router";
import theme from "@/styles/theme";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import Image from "next/image";
import logo from "../public/chemexvector.png";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery("(max-width: 1000px)");

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikHelpers<any>
  ) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/login`, {
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

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: "url('/background1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container
        component="main"
        sx={{
          bgcolor: "rgba(247, 247, 250, 0.8)",
          width: isSmallScreen ? "90%" : isMediumScreen ? "80%" : "400px", // Ajusta el ancho para pantallas pequeñas
          p: 3,
          borderRadius: "8px",
          maxWidth: "100%", // Para asegurar que no se desborde
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src={logo} alt={"logo"} height={50} width={50}></Image>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  label="Contraseña"
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{ bgcolor: "lightgrey", mr: 0.5 }}
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Typography variant="body1">¿No tenés cuenta?</Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      ml: 1,
                      "&:hover": {
                        color: theme.palette.primary.main,
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => {
                      router.push("/register");
                    }}
                  >
                    Registrate acá
                  </Typography>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    color: "black",
                    fontSize: isSmallScreen ? "0.9rem" : "1rem", // Ajusta el tamaño del texto
                    padding:  "5px", // Ajusta el padding
                  }}
                  disabled={isSubmitting}
                >
                  Iniciar Sesión
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginForm;
