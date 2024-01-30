import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { UserState } from '@/commons/types.interface';
import { useRouter } from 'next/router';

const username = () => {
  const [newUserName, setNewUserName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const userId = useSelector((state: UserState) => state.user._id);
  const router = useRouter()
  
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
          Modificar Nombre Usuario
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="newUserName"
            label="Nombre"
            name="newUserName"
            autoComplete="tel"
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
                    autoComplete="tel"
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
        </Box>
      </Box>
    </Container>
  );
};

export default username;
