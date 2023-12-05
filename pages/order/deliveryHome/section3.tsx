import React, {useEffect} from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Section3 = ({ handleGoBack , paymentMethod, setPaymentMethod, cardNumber, setCardNumber, cardSecurityCode, setCardSecurityCode, cardExpirationDate, setCardExpirationDate, handlePlaceOrder }:any) => {
 
  const handleSaveToLocalStorage = () => {
    const paymentData = {
      paymentMethod,
      cardNumber,
      cardSecurityCode,
      cardExpirationDate,
    };
    localStorage.setItem('paymentData', JSON.stringify(paymentData));
  };
 
useEffect(()=> {
  const paymentData = JSON.parse(localStorage.getItem('paymentData') || '{}');
  setPaymentMethod(paymentData.paymentMethod || '');
  setCardNumber(paymentData.cardNumber || '');
  setCardSecurityCode(paymentData.cardSecurityCode || '');
  setCardExpirationDate(paymentData.cardExpirationDate || '');
},[])

  return ( 
 <Box>
         <Box sx={{ color: "black" , cursor:'pointer', py:2}} onClick={handleGoBack}>
        <ArrowBackIcon/> 
      </Box>
    <Typography variant="h5" gutterBottom>
      Método de Pago
    </Typography>
    <FormControl fullWidth style={{ marginBottom: '16px' }}>
      <InputLabel id="paymentMethodLabel">Método de Pago</InputLabel>
      <Select
        labelId="paymentMethodLabel"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value as string)}
      >
        <MenuItem value="tarjeta debito">Tarjeta de Débito</MenuItem>
        <MenuItem value="tarjeta credito">Tarjeta de Crédito</MenuItem>
        <MenuItem value="efectivo">Efectivo</MenuItem>
      </Select>
    </FormControl>

    {paymentMethod === 'tarjeta debito' || paymentMethod === 'tarjeta credito' ? (
      <Box>
        <TextField
          label="Número de Tarjeta"
          fullWidth
          style={{ marginBottom: '16px' }}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <TextField
          label="Código de Seguridad"
          fullWidth
          style={{ marginBottom: '16px' }}
          value={cardSecurityCode}
          onChange={(e) => setCardSecurityCode(e.target.value)}
        />
        <TextField
          label="Fecha de Vencimiento"
          fullWidth
          style={{ marginBottom: '16px' }}
          value={cardExpirationDate}
          onChange={(e) => setCardExpirationDate(e.target.value)}
        />
      </Box>
    ) : null}


    <Button onClick={() => { handlePlaceOrder(); handleSaveToLocalStorage(); }} sx={{ color: "black" }}>Confirmar</Button>
  </Box>)
}

export default Section3;