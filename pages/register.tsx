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
  InputAdornment,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import theme from "@/styles/theme";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const initialValues = {
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    lastName: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo es obligatorio"),
    phoneNumber: Yup.string().required("El número de teléfono es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("Confirma tu contraseña"),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        resetForm();
        Swal.fire({
          icon: "success",
          title: `Registro exitoso`,
          confirmButtonColor: theme.palette.primary.main,
        });
        router.push("/login");
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData?.message || "Hubo un error, por favor vuelva a intentar";
        toast.error(errorMessage, {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error(
        "Hubo un problema de conexión. Por favor, inténtalo más tarde.",
        {
          autoClose: 1500,
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ paddingBlock: 2.5, paddingInline:'20px' }}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            p: 2,
            bgcolor: "rgba(247, 247, 250, 0.8)",
            borderRadius: "8px",
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
            <Typography component="h1" variant="h5" sx={{ pb: '1rem ' }}>
              Regístrate
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
                        error={touched.name && Boolean(errors.name)}
                        helperText={
                          <Box
                            sx={{
                              minHeight: "1.5em",
                              visibility: errors.name ? "visible" : "hidden",
                            }}
                          >
                            <ErrorMessage name="name" />
                          </Box>
                        }
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        id="lastName"
                        label="Apellido"
                        name="lastName"
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={
                          <Box
                            sx={{
                              minHeight: "1.5em",
                              visibility: errors.lastName
                                ? "visible"
                                : "hidden",
                            }}
                          >
                            <ErrorMessage name="lastName" />
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        error={touched.email && Boolean(errors.email)}
                        helperText={
                          <Box
                            sx={{
                              minHeight: "1.5em",
                              visibility: errors.email ? "visible" : "hidden",
                            }}
                          >
                            <ErrorMessage name="email" />
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        id="phoneNumber"
                        label="Teléfono"
                        name="phoneNumber"
                        error={
                          touched.phoneNumber && Boolean(errors.phoneNumber)
                        }
                        helperText={
                          <Box
                            sx={{
                              minHeight: "1.5em",
                              visibility: errors.phoneNumber
                                ? "visible"
                                : "hidden",
                            }}
                          >
                            <ErrorMessage name="phoneNumber" />
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        id="password"
                        label="Contraseña"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        error={touched.password && Boolean(errors.password)}
                        helperText={
                          <Box
                            sx={{
                              minHeight: "1.5em",
                              visibility: errors.password
                                ? "visible"
                                : "hidden",
                            }}
                          >
                            <ErrorMessage name="password" />
                          </Box>
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        fullWidth
                        id="confirmPassword"
                        label="Repetir Contraseña"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={
                          <Box
                            sx={{
                              minHeight: "1.5em",
                              visibility: errors.confirmPassword
                                ? "visible"
                                : "hidden",
                            }}
                          >
                            <ErrorMessage name="confirmPassword" />
                          </Box>
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
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
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: "black",
                    }}
                    disabled={isSubmitting}
                  >
                    Registrarse
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
