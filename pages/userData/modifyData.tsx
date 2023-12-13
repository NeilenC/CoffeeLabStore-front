import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { UserState } from '@/commons/types.interface';

type EditUserDataFormProps = {
  initialData: {
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
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
 const user = useSelector((state:UserState) => state.user)

 // ---------------------- PUT PARA MODIFICAR LOS DATOS ----------------------

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error('Error al actualizar los datos del usuario');
        return;
      }
      onSave(formData);
    } catch (error) {
      console.error('Error en la solicitud PUT:', error);
    }
  };

  return (
    <Box sx={{p:5}}>
    <Grid container spacing={2} sx={{width: "60%",p:2, m:"auto"}}>

     <Grid item sx={{}} xs={6}>
      <TextField
        label="Nombre"
        value={formData?.name}
        onChange={(e) => handleChange('name', e.target.value)}
        fullWidth
        />
    </Grid>
    <Grid item sx={{}} xs={6}>

      <TextField
        label="Apellido"
        value={formData?.lastname}
        onChange={(e) => handleChange('lastname', e.target.value)}
        fullWidth
        />
        </Grid>

   <Grid item sx={{}} xs={6}>

      <TextField
        label="Email"
        value={formData?.email}
        onChange={(e) => handleChange('email', e.target.value)}
        fullWidth
      />
    </Grid>

    <Grid item sx={{}} xs={6}>
      <TextField
        label="Teléfono"
        value={formData?.phoneNumber}
        onChange={(e) => handleChange('phoneNumber', e.target.value)}
        fullWidth
      />
    </Grid>
    <Grid item sx={{}} xs={6}>

      <TextField
        label="Dirección"
        value={formData?.address}
        onChange={(e) => handleChange('address', e.target.value)}
        fullWidth
      />
    </Grid>
    <Grid item sx={{}} xs={6}>

      <TextField
        label="Número de apartamento"
        value={formData?.apartment}
        onChange={(e) => handleChange('apartment', e.target.value)}
        fullWidth
      />
    </Grid>
    <Grid item sx={{}} xs={6}>

      <TextField
        label="Número de dirección"
        value={formData?.directionNum}
        onChange={(e) => handleChange('directionNum', e.target.value)}
        fullWidth
      />
    </Grid>
    <Grid item sx={{}} xs={6}>

      <TextField
        label="Código"
        value={formData?.codigo}
        onChange={(e) => handleChange('codigo', e.target.value)}
        fullWidth
      />
    </Grid>
    <Grid item sx={{}} xs={6}>

      <TextField
        label="Localidad"
        value={formData?.localidad}
        onChange={(e) => handleChange('localidad', e.target.value)}
        fullWidth
      />
    </Grid>
    <Grid item sx={{}} xs={6}>

      <Button variant="contained" onClick={handleSaveClick} sx={{ marginTop: 2 }}>
        Guardar
      </Button>

      <Button variant="outlined" onClick={onCancel} sx={{ marginTop: 2, marginLeft: 2 }}>
        Cancelar
      </Button>
    </Grid>

    </Grid>
    </Box>
  );
};

export default EditUserDataForm;
