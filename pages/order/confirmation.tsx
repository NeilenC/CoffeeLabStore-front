import React, { useState, ChangeEvent } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { CartState, UserState } from '@/commons/types.interface';
import { useRouter } from 'next/router';

const Order = () => {
  const user = useSelector((state: UserState) => state.user);
  const cart = useSelector((state: CartState) => state.cart);
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState<number | null>(null);
  const [directionNum, setDirectionNum] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handlePlaceOrder = async () => {
    if (!address || !paymentMethod) {
      console.error('La dirección y el método de pago son obligatorios.');
      return;
    }

    const orderData = {
      userId: user._id,
      address,
      apartment,
      directionNum,
      paymentMethod,
      phoneNumber,
      cart
    };

    try {
      const response = await fetch(`http://localhost:8000/order/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log('Orden creada con éxito.');
        router.push('/order/confirmation');
      } else {
        console.error('Error al crear la orden:', response.statusText);
      }
    } catch (error) {
      console.error('Error al comunicarse con el backend:', error);
    }
  };

  const handleDirectionNumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Intenta convertir el valor a un número, o establece null si no se puede convertir
    setDirectionNum(value === '' ? null : Number(value));
  };

  const handleApartmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Intenta convertir el valor a un número, o establece null si no se puede convertir
    setApartment(value === '' ? null : Number(value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection:"column",
        alignItems: 'center',
        padding: '16px',
        backgroundColor: 'white',
        m: "auto",
        mt:10,
        px:80
      }}
    >
   
      <Typography variant="h5" gutterBottom>
        Detalles de Envío
      </Typography>
          {/* Contenedor de Grid para los campos de dirección */}
          <Grid container spacing={2}  sx={{width:"61%"}}>
        <Grid item xs={8} md={4}>
          <TextField
            label="Calle"
            fullWidth
            style={{ marginBottom: '16px' }}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={2} md={4}>
          <TextField
            label="Número"
            fullWidth
            style={{ marginBottom: '16px'}}
            onChange={handleDirectionNumChange}
          />
        </Grid>
        <Grid item xs={5} md={4}>
          <TextField
            label="Departamento (opcional)"
            fullWidth
            style={{ marginBottom: '16px' }}
            onChange={handleApartmentChange}
          />
        </Grid>
      </Grid>

      {/* Otros campos de texto */}
      <TextField
        label="Método de Pago"
        // fullWidth
        style={{ marginBottom: '16px' , width:"60%" }}
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />
      <TextField
        label="Número de Teléfono"
        // fullWidth
        style={{ marginBottom: '16px' , width:"60%" }}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button
        style={{
          marginTop: '16px',
          backgroundColor: 'white',
          color: 'black',
          // '&:hover': {
          //   backgroundColor: 'black',
          //   color: 'white',
          // },
        }}
        onClick={handlePlaceOrder}
        // fullWidth
      >
        Confirmar compra
      </Button>
      </Box>
  );
};

export default Order;

