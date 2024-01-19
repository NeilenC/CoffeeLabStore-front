import React from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik"; // Import FormikHelpers
import { useRouter } from "next/router";

const RegistrationForm = () => {
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
    values: any, // Provide a type for values if not using TypeScript's type inference
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>, // Use FormikHelpers
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
        alert("Hubo un error, por favor vuelva a intentar");
        console.error("Error en el registro");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ pb: 10 }}>
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
                      name="password"
                      label="Contraseña"
                      type="password"
                      id="password"
                      autoComplete="new-password"
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
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
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
