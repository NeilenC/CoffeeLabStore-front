import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { UserState } from '@/commons/types.interface';
import { useSelector } from 'react-redux';

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const userId = useSelector((state: UserState) => state.user._id);

  const handleCurrentPasswordChange = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = () => {
    // Aquí puedes realizar la lógica para modificar la contraseña del usuario
    console.log('Contraseña actual:', currentPassword);
    console.log('Nueva contraseña:', newPassword);
    // Puedes enviar la información al servidor, realizar una petición API, etc.
  };

  return (
    <Container component="main" maxWidth="xs" sx={{height:"70vh"}}>

      <Box
        sx={{
          py: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Modificar Contraseña
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="currentPassword"
            label="Contraseña Actual"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="Nueva Contraseña"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Guardar Cambios
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Password;
