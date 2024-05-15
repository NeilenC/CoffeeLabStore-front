import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, useMediaQuery } from '@mui/material';
import { UserState } from '@/commons/types.interface';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PhoneNumber = () => {
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);
  const userId = useSelector((state: UserState) => state.user._id);
  const isMediumScreen = useMediaQuery('(min-width: 400px, max-width: 1000px)')
  const router = useRouter()
  const handlePhoneNumberChange = (e:any) => {
    setNewPhoneNumber(e.target.value);
  };

   function handleGoBack () {
    router.push('/userData')
};

  const handleSubmit = async () => {
    try {
      if(newPhoneNumber) {

        const response = await fetch(`${process.env.BASE_URL}/users/${userId}`, {
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
      }
    } catch (error) {
      console.error('Error de red', error);
    }
  };


  return (
    <Container
    component="main"
    maxWidth="xs"
    sx={{
      height: "70vh",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      bgcolor: "#f0f0f0f0",
      pt: isMediumScreen ? 12 : 5,
      width: "100%"
    }}
  >
    <Box
      sx={{
        p: 4,
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ArrowBackIcon fontSize="large" onClick={handleGoBack} />
        <Typography variant="h5" component="h1" 
        sx={{ ml:1, fontSize:"20px" }}>
          Número de Teléfono
        </Typography>
      </Box>
      <form noValidate onSubmit={handleSubmit}>
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
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          Guardar Cambios
        </Button>
      </form>
    </Box>
  </Container>
  );
};

export default PhoneNumber;
