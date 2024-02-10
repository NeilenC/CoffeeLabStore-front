// Importa los componentes de Material-UI que necesitas
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, useMediaQuery } from '@mui/material';
import { UserState } from '@/commons/types.interface';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Email = () => {

  const [newEmail, setNewEmail] = useState('');
  const userId = useSelector((state: UserState) => state.user._id);
  const router = useRouter()
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const isMediumScreen = useMediaQuery('(min-width: 400px, max-width: 1000px)')

  const handleEmailChange = (e: any) => {
    setNewEmail(e.target.value);
  };

 function handleGoBack () {
    router.push('/userData')
};
  const handleSubmit = async () => {
    try {
      if(newEmail) {

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
        router.push('/userData')

      } else {
        console.error('Error al modificar el email');
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
      justifyContent: 'center' , 
      bgcolor:"#f0f0f0f0",
      pt: isMediumScreen ? 12 : null,
      width:"100%"
      }}>
      <Box 
      sx={{ 
        p: 4, 
        bgcolor: 'background.paper', 
        boxShadow: 1, 
        borderRadius: 2 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ArrowBackIcon fontSize="large" onClick={handleGoBack} />
          <Typography variant="h5" component="h1" sx={{ ml: 7 }}>Modificar Email</Typography>
        </Box>
        <form noValidate onSubmit={handleSubmit}>
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

export default Email;
