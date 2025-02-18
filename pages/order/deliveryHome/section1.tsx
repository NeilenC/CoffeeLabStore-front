import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { UserState } from "@/commons/types.interface";

const Section1 = ({
  name,
  setName,
  lastName,
  setLastName,
  dni,
  setDni,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  handleNextSection,
}: any) => {
  const user = useSelector((state: UserState) => state);
  const [nameError, setNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dniError, setDniError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSaveToLocalStorage = () => {
    const userData = {
      name,
      lastName,
      dni,
      phoneNumber,
      email,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (storedUserData.name !== user.user.name) {
      setName(storedUserData.name || "");
      setLastName(storedUserData.lastName || "");
      setDni(storedUserData.dni || "");
      setPhoneNumber(storedUserData.phoneNumber || "");
      setEmail(storedUserData.email || "");
    }
  }, [user, setName, setLastName, setDni, setPhoneNumber, setEmail]);

  const validateFields = () => {
    // Validar campos y establecer estados de error
    setNameError(!name);
    setLastNameError(!lastName);
    setDniError(!dni);
    setPhoneNumberError(!phoneNumber);
    setEmailError(!email);

    // Devolver verdadero si todos los campos obligatorios están completos
    return name && lastName && dni && phoneNumber && email;
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Datos Personales
      </Typography>
      <Grid container spacing={2}>
        {/* <InputLabel> </InputLabel> */}
        <Grid item xs={6}>
          <TextField
            label="Nombre"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false); // Limpiar el error cuando se escribe en el campo
            }}
            error={nameError}
            helperText={nameError && "Este campo es obligatorio"}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Apellido"
            fullWidth
            value={lastName}
            onChange={(e) =>{ setLastName(e.target.value);
              setLastNameError(false); 
          }}
          error={lastNameError}
          helperText={lastNameError && "Este campo es obligatorio"}
          required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="DNI"
            fullWidth
            value={dni}
            onChange={(e) => {setDni(e.target.value);
            setDniError(false)
          }}
          error={dniError}
          helperText={dniError && "Este campo es obligatorio"}
          required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Teléfono"
            fullWidth
            value={phoneNumber}
            onChange={(e) => {setPhoneNumber(e.target.value);
              setPhoneNumberError(false)
            }}
            error={phoneNumberError}
            helperText={phoneNumberError && "Este campo es obligatorio"}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Correo Electrónico"
            fullWidth
            value={email}
            onChange={(e) =>{ setEmail(e.target.value);
            setEmailError(false)
          }}
          error={emailError}
          helperText={emailError && "Este campo es obligatorio"}
          required
          />
        </Grid>
      </Grid>
      <Box sx={{ pt: 2 }}>
        <Button
         onClick={() => {
          if (validateFields()) {
            handleNextSection();
            handleSaveToLocalStorage();
          }
        }}
          sx={{ color: "black" }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
};

export default Section1;
