import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { UserState } from '@/commons/types.interface';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const PhoneNumber = () => {
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);
  const userId = useSelector((state: UserState) => state.user._id);
  const router = useRouter()
  const handlePhoneNumberChange = (e:any) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: newPhoneNumber,
        }),
      });

      if (response.ok) {
        console.log('Número de teléfono modificado con éxito');
        setNewPhoneNumber(null)
        router.push('/userData')
      } else {
        console.error('Error al modificar el número de teléfono');
      }
    } catch (error) {
      console.error('Error de red', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "70vh" }}>
      <Box
        sx={{
          py: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Modificar Número de Teléfono
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPhoneNumber"
            label="Nuevo Número de Teléfono"
            name="newPhoneNumber"
            autoComplete="tel"
            autoFocus
            value={newPhoneNumber}
            onChange={handlePhoneNumberChange}
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

export default PhoneNumber;
