import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Box,
  Grid, 
  IconButton, 
  InputAdornment
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik"; // Import FormikHelpers
import { useRouter } from "next/router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
       

const RegistrationForm = () => {
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
      const response = await fetch("http://localhost:8000/auth/register", {
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

  return (
    <Container component="main" maxWidth="sm" sx={{ pb: 10 }}>
      <CssBaseline />
      <Box sx={{ pt: 7 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ m: 2 }}>
            Registro
          </Typography>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Nombre"
                      name="name"
                      autoComplete="name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Apellido"
                      name="lastName"
                      autoComplete="lastName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Correo electrónico"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Número de teléfono"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      required
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      name="password"
                      label="Contraseña"
                      id="password"
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              sx={{bgcolor:"lightgrey", mr:0.5}}
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                     ),
                    }}
                  />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Repetir contraseña"
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              sx={{bgcolor:"lightgrey", mr:0.5}}
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                     ),
                    }}
                  />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: "black" }}
                  disabled={isSubmitting}
                >
                  Registrarse
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ color: "black" }}
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  login
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
