import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { UserState } from "@/commons/types.interface";

type EditUserDataFormProps = {
  initialData: {
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;
    address: string;
    apartment: string;
    directionNum: string;
    codigo: string;
    localidad: string;
  };
  onSave: (updatedData: any) => void;
  onCancel: () => void;
};

const EditUserDataForm: React.FC<EditUserDataFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const user = useSelector((state: UserState) => state.user);

  //  const userData = localStorage.getItem('shippingData')

  useEffect(() => {
    const userData = localStorage.getItem("shippingData");

    console.log("userData", userData);
    if (userData) {
      const shippingData = JSON.parse(userData);

      shippingData.address = formData?.address;
      shippingData.apartment = formData?.apartment;
      shippingData.directionNum = formData?.directionNum;
      shippingData.codigo = formData?.codigo;
      shippingData.localidad = formData?.localidad;

      localStorage.setItem("shippingData", JSON.stringify(shippingData));
    } else {
      console.log("No se encontraron datos en el localStorage");
    }
  }, []);

  // ---------------------- PUT PARA MODIFICAR LOS DATOS ----------------------

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData?.email,
          phoneNumber: formData?.phoneNumber,
          password: formData?.password,
        }),
      });

      if (!response.ok) {
        console.error("Error al actualizar los datos del usuario");
        return;
      }
      onSave(formData);
    } catch (error) {
      console.error("Error en la solicitud PUT:", error);
    }
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Grid container spacing={2} sx={{ width: "60%", p: 5, m: "auto" }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ ml: "38%", py: 2 }}>
            MODIFICAR DATOS
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{}}>
          <TextField
            label="Email"
            value={formData?.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item sx={{}} xs={6}>
          <TextField
            label="Teléfono"
            value={formData?.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item sx={{}} xs={6}>
          <TextField
            label="Dirección"
            value={formData?.address}
            onChange={(e) => handleChange("address", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item sx={{}} xs={6}>
          <TextField
            label="Detarpamento"
            value={formData?.apartment}
            onChange={(e) => handleChange("apartment", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item sx={{}} xs={6}>
          <TextField
            label="Número de dirección"
            value={formData?.directionNum}
            onChange={(e) => handleChange("directionNum", e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item sx={{}} xs={6}>
          <TextField
            label="Código postal"
            value={formData?.codigo}
            onChange={(e) => handleChange("codigo", e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item sx={{}} xs={6}>
          <TextField
            label="Localidad"
            value={formData?.localidad}
            onChange={(e) => handleChange("localidad", e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item sx={{ pb: 3 }} xs={6}>
          <TextField
            label="password"
            value={formData?.password}
            onChange={(e) => handleChange("password", e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSaveClick}
            sx={{ p: 1.78 }}
          >
            Guardar
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            onClick={onCancel}
            sx={{ p: 1.78 }}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditUserDataForm;
