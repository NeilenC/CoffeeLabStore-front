import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Grid, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { UserState } from "@/commons/types.interface";
import { useRouter } from "next/router";

import Swal from 'sweetalert2';
import theme from "@/styles/theme";
type EditUserDataFormProps = {
  initialData: {
    email: "";
    phoneNumber: "";
    password: "";
  };
};

const EditUserDataForm: React.FC<EditUserDataFormProps> = ({
  initialData,
}) => {
  const [formData, setFormData] = useState(initialData);
  const router = useRouter()
  const handleChange = (fieldName: string, value: string) => {
    console.log("fieldName", fieldName)
    console.log("value", value)
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const user = useSelector((state: UserState) => state.user);


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
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Cambios realizados con éxito',
          confirmButtonColor: theme.palette.primary.main,
        });
        setFormData(initialData);
        
      }
    } catch (error) {
      console.error("Error en la solicitud PUT:", error);
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error al procesar la solicitud',
        confirmButtonColor: theme.palette.error.main,
      });
    }
  };

  console.log("formData", formData)
  console.log("initialData", initialData)

  return (
    <Box>
      <Grid container spacing={2} sx={{ width: "35%", p: 5, m: "auto" }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ }}>
            MODIFICAR DATOS
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{}}>
          <InputLabel> Email </InputLabel>
          <TextField
            value={formData?.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{}}>
          <InputLabel> Teléfono </InputLabel>
          <TextField
            value={formData?.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item  xs={12} sx={{pb:3}}>
        <InputLabel> Contraseña </InputLabel>
          <TextField
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
            onClick={() => {router.push('/')}}
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
