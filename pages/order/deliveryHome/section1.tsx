import React, { useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  InputLabel,
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
  const user = useSelector((state: UserState) => state.user);
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

    if (storedUserData.name !== user.name) {
      setName(storedUserData.name || "");
      setLastName(storedUserData.lastName || "");
      setDni(storedUserData.dni || "");
      setPhoneNumber(storedUserData.phoneNumber || "");
      setEmail(storedUserData.email || "");
    }
  }, [user, setName, setLastName, setDni, setPhoneNumber, setEmail]);

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
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Apellido"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="DNI"
            fullWidth
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Teléfono"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Correo Electrónico"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box sx={{ pt: 2 }}>
        <Button
          onClick={() => {
            handleNextSection();
            handleSaveToLocalStorage();
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
