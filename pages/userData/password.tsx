import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, useMediaQuery } from '@mui/material';
import { UserState } from '@/commons/types.interface';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const userId = useSelector((state: UserState) => state.user._id);
  const router = useRouter()
  const isMediumScreen = useMediaQuery('(max-width: 900px)')
   
    function handleGoBack () {
       router.push('/userData')
   };

  const handleCurrentPasswordChange = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if(newPassword) {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/users/modifyPassword/${userId}`, {
          method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updateUserDTO: {
            password: newPassword,
          },
          currentPassword,
        }),
      });
      
      if (response.ok) {
        router.push('/userData')
       }
      } else {
        console.error('Error al modificar la contraseña');
        // Agregar toast
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
        <Typography variant="h5" component="h1" sx={{ ml: 5 }}>Modificar Contraseña</Typography>
      </Box>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="currentPassword"
          label="Contraseña Actual"
          name="currentPassword"
          type={showCurrentPassword ? "text" : "password"}
          autoComplete="current-password"
          autoFocus
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  edge="end"
                >
                  {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="newPassword"
          label="Nueva Contraseña"
          name="newPassword"
          type={showNewPassword ? "text" : "password"}
          autoComplete="new-password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  edge="end"
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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

export default Password;