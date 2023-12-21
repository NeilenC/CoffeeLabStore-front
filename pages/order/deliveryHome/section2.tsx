import React, { useEffect } from "react";
import { Typography, Grid, TextField, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { UserState } from "@/commons/types.interface";

const Section2 = ({
  handleGoBack,
  address,
  setAddress,
  apartment,
  setApartment,
  directionNum,
  setDirectionNum,
  codigo,
  setCodigo,
  localidad,
  setLocalidad,
  handleNextSection,
}: any) => {
  const user = useSelector((state: UserState) => state.user);

  const handleSaveToLocalStorage = () => {
    const shippingData = {
      address,
      apartment,
      directionNum,
      codigo,
      localidad,
    };
    localStorage.setItem("shippingData", JSON.stringify(shippingData));
  };

  useEffect(() => {
    const shippingData = JSON.parse(
      localStorage.getItem("shippingData") || "{}",
    );
    const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (storedUserData.name !== user.name) {
      setAddress(shippingData.address || "");
      setApartment(shippingData.apartment || "");
      setDirectionNum(shippingData.directionNum || "");
      setCodigo(shippingData.codigo || "");
      setLocalidad(shippingData.localidad || "");
    }
  }, []);

  return (
    <Box>
      <Box
        sx={{ color: "black", cursor: "pointer", py: 2 }}
        onClick={handleGoBack}
      >
        <ArrowBackIcon />
      </Box>
      <Typography variant="h5" gutterBottom>
        Detalles de envío
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8} md={4}>
          <TextField
            label="Calle"
            fullWidth
            value={address}
            style={{ marginBottom: "16px" }}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={2} md={4}>
          <TextField
            label="Número"
            value={directionNum}
            fullWidth
            style={{ marginBottom: "16px" }}
            onChange={(e) => setDirectionNum(e.target.value)}
          />
        </Grid>
        <Grid item xs={5} md={4}>
          <TextField
            label="Departamento (opcional)"
            value={apartment}
            fullWidth
            style={{ marginBottom: "16px" }}
            onChange={(e) => setApartment(e.target.value)}
          />
        </Grid>
        <Grid item xs={5} md={4}>
          <TextField
            label="Código postal"
            value={codigo}
            fullWidth
            style={{ marginBottom: "16px" }}
            onChange={(e) => setCodigo(parseInt(e.target.value, 10))}
          />
        </Grid>
        <Grid item xs={5} md={4}>
          <TextField
            label="Localidad"
            value={localidad}
            fullWidth
            style={{ marginBottom: "16px" }}
            onChange={(e) => setLocalidad(e.target.value)}
          />
        </Grid>
      </Grid>
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
  );
};

export default Section2;
