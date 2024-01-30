// Importa los componentes de Material-UI que necesitas
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { UserState } from '@/commons/types.interface';
import { useSelector } from 'react-redux';

const Email = () => {
  const [newEmail, setNewEmail] = useState('');
  const userId = useSelector((state: UserState) => state.user._id);

  const handleEmailChange = (e: any) => {
    setNewEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newEmail,
        }),
      });

      if (response.ok) {
        console.log('Email modificado con éxito');
        // Puedes realizar acciones adicionales si es necesario
      } else {
        console.error('Error al modificar el email');
      }
    } catch (error) {
      console.error('Error de red', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{height:"70vh"}}>
      <Box
        sx={{
          py: 10,
          m:"auto",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Modificar Email
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newEmail"
            label="Nuevo Email"
            name="newEmail"
            autoComplete="email"
            autoFocus
            value={newEmail}
            onChange={handleEmailChange}
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

export default Email;
