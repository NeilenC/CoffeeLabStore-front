import React, { useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { UserState } from "@/commons/types.interface";

const Section3 = ({
  handleGoBack,
  paymentMethod,
  setPaymentMethod,
  cardNumber,
  setCardNumber,
  cardSecurityCode,
  setCardSecurityCode,
  cardExpirationDate,
  setCardExpirationDate,
  handlePlaceOrder,
}: any) => {
  const [formattedCardExpirationDate, setFormattedCardExpirationDate] =
  useState("");
  const user = useSelector((state: UserState) => state.user);
  const [cardNumberError, setCardNumberError] = useState(false)
  const [cardSecurityCodeError, setCardSecurityCodeError] = useState(false)
  const [cardExpirationDateError, setCardExpirationDateError] = useState(false)

  const handleSaveToLocalStorage = () => {
    const paymentData = {
      paymentMethod,
      cardNumber,
      cardSecurityCode,
      cardExpirationDate: formattedCardExpirationDate,
    };
    localStorage.setItem("paymentData", JSON.stringify(paymentData));
  };

  useEffect(() => {
    const paymentData = JSON.parse(localStorage.getItem("paymentData") || "{}");
    const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (storedUserData.name === user.name) {
      setPaymentMethod(paymentData.paymentMethod || "");
      setCardNumber(paymentData.cardNumber || "");
      setCardSecurityCode(paymentData.cardSecurityCode || "");
      setCardExpirationDate(paymentData.cardExpirationDate || "");
      setFormattedCardExpirationDate(paymentData.cardExpirationDate || "")
    }
  }, [user]);


  const validatePaymentFields = () => {
    // Validar campos y establecer estados de error
    setCardNumberError(paymentMethod === "tarjeta debito" || paymentMethod === "tarjeta credito" ? !cardNumber : false);
    setCardSecurityCodeError(paymentMethod === "tarjeta debito" || paymentMethod === "tarjeta credito" ? !cardSecurityCode : false);
    setCardExpirationDateError(paymentMethod === "tarjeta debito" || paymentMethod === "tarjeta credito" ? !cardExpirationDate : false);
  
    // Devolver verdadero si todos los campos obligatorios están completos
    return !(paymentMethod === "tarjeta debito" || paymentMethod === "tarjeta credito") ||
           (cardNumber && cardSecurityCode && cardExpirationDate);
  };
  
  return (
    <Box >
      <Box sx={{ color: "black", py: 2 }} onClick={handleGoBack}>
        <ArrowBackIcon />
      </Box>
      <Typography variant="h5" gutterBottom>
        Método de Pago
      </Typography>
      <FormControl fullWidth style={{ marginBottom: "16px" }}>
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

      {paymentMethod === "tarjeta debito" ||
      paymentMethod === "tarjeta credito" ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Número de Tarjeta"
              fullWidth
              style={{ marginBottom: "16px" }}
              value={cardNumber}
              onChange={(e) => {setCardNumber(e.target.value);
                setCardNumberError(false);
              }}
              error={cardNumberError}
              helperText={cardNumberError && "Este campo es obligatorio"}
            />
          </Grid>
          <Grid item xs={6}>
              <TextField
                label="Código de Seguridad"
                fullWidth
                style={{ marginBottom: "16px" }}
                value={cardSecurityCode}
                onChange={(e) => {
                  setCardSecurityCode(e.target.value);
                  setCardSecurityCodeError(false);
                }}
                error={cardSecurityCodeError}
                helperText={cardSecurityCodeError && "Este campo es obligatorio"}
              />

          </Grid>
          <Grid item xs={6}>
              <TextField
                label="Fecha de Vencimiento"
                fullWidth
                placeholder="MM/YYYY"
                style={{ marginBottom: "16px" }}
                value={formattedCardExpirationDate}
                onChange={(e) => {
                  setFormattedCardExpirationDate(e.target.value);
                  setCardExpirationDateError(false);
                }}
                error={cardExpirationDateError}
                helperText={cardExpirationDateError && "Este campo es obligatorio"}
              />

          </Grid>
        </Grid>
      ) : null}

      {paymentMethod === "efectivo" ? (
        <Box>
          Aboná en el Pago fácil o Rapipago más cercano usando el código: #
          {Math.floor(Math.random() * 1000)}
        </Box>
      ) : null}

      <Button
        onClick={() => {
          if(validatePaymentFields()){
            handlePlaceOrder();
            handleSaveToLocalStorage();
          }
        }}
        sx={{ color: "black" }}
      >
        Confirmar
      </Button>
    </Box>
  );
};

export default Section3;
