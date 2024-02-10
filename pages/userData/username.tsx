import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { UserState } from '@/commons/types.interface';
import { useRouter } from 'next/router';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const username = () => {
  const [newUserName, setNewUserName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const userId = useSelector((state: UserState) => state.user._id);
  const router = useRouter()
  const isMediumScreen = useMediaQuery('( max-width: 900px)')
  
   function handleGoBack () {
      router.push('/userData')
  };
  
  const handleChangeUserName = (e:any) => {
    setNewUserName(e.target.value);
  };
  const handleChangeUserLastName = (e:any) => {
    setNewLastName(e.target.value);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = async () => {
      try {
        const updateData: Record<string, string> = {};
        
        if (newUserName) {
            updateData.name = capitalizeFirstLetter(newUserName);
          }
      
          if (newLastName) {
            updateData.lastName = capitalizeFirstLetter(newLastName);
          }


      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        router.push('/userData')
      } else {
        console.error('Error al modificar el nombre de usuario');
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
        height: "80vh",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: "#f0f0f0f0",
        width: "100%",
      pt: isMediumScreen ? "10%" : "2%",

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
          <Typography variant="h5" component="h1" sx={{ ml: 7 }}> Nombre Usuario</Typography>
        </Box>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="newUserName"
            label="Nombre"
            name="newUserName"
            autoComplete="given-name"
            autoFocus
            value={newUserName}
            onChange={handleChangeUserName}
          />
          <TextField
            margin="normal"
            fullWidth
            id="newLastName"
            label="Apellido"
            name="newLastName"
            autoComplete="family-name"
            autoFocus
            value={newLastName}
            onChange={handleChangeUserLastName}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Guardar Cambios
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default username;
