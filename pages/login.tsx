import React from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/userInfo";
import { useRouter } from "next/router";
import theme from "@/styles/theme";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikHelpers<any>,
  ) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
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
        localStorage.setItem("id", user._id);

        alert("Inicio de sesión exitoso");

        dispatch(setUserInfo(user));

        router.push("/");
        resetForm();
      } else {
        alert("ERROR");
        console.error("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "57vh" }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
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
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                sx={{ mt: 3, mb: 2, color: "black" }}
                disabled={isSubmitting}
              >
                Iniciar Sesión
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default LoginForm;
