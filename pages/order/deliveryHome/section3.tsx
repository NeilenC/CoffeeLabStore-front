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
  InputBaseComponentProps,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { UserState } from "@/commons/types.interface";
import Cleave from 'cleave.js/react';

interface CleaveInputProps extends InputBaseComponentProps {
  options: any; 
}

const isExpirationYearExpired = (expirationYear: number) => {
  const currentYear = new Date().getFullYear();
  return expirationYear < currentYear;
};

const getCardImage = (cardType: string) => {
  switch (cardType) {
    case "visa":
      return "https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo-1976.png";
    case "mastercard":
      return "https://www.pngfind.com/pngs/m/333-3331248_deja-un-comentario-cancelar-respuesta-mastercard-logo-hd.png";
    case "amex":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png";
    default:
      return "https://upload.wikimedia.org/wikipedia/commons/e/e5/Graukarte.svg"; // Devolver una imagen por defecto o una cadena vacía si el tipo de tarjeta no es reconocido
  }
};
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
  const [formattedCardExpirationDate, setFormattedCardExpirationDate] = useState("");
  const user = useSelector((state: UserState) => state.user);
  const [cardNumberError, setCardNumberError] = useState(false)
  const [cardSecurityCodeError, setCardSecurityCodeError] = useState(false)
  const [cardExpirationDateError, setCardExpirationDateError] = useState(false)
  const [cardType, setCardType] = useState("");

console.log("paymentMethod",paymentMethod )
console.log("cardNumber", cardNumber)
console.log("cardSecurityCode", cardSecurityCode)
console.log("cardExpirationDate",cardExpirationDate )

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


  function onCreditCardChange(event: any) {
    const value = event.target.value;
    if (/^4/.test(value)) {
      setCardType("visa");
    } else if (/^5[1-5]/.test(value)) {
      setCardType("mastercard");
    } else if (/^3[47]/.test(value)) {
      setCardType("amex");
    } else {
      setCardType("");
    }
  }

  const validatePaymentFields = () => {
    // Validar campos y establecer estados de error
    const isCreditCardPayment = paymentMethod === "Tarjeta de Débito" || paymentMethod === "Tarjeta de Crédito";
    setCardNumberError(isCreditCardPayment ? !cardNumber : false);
    setCardSecurityCodeError(isCreditCardPayment ? !cardSecurityCode : false);
    
    // Validar fecha de vencimiento
// Validar fecha de vencimiento
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearLastTwoDigits = Number(currentYear.toString().slice(-2));
    const currentMonth = currentDate.getMonth() + 1; // Los meses son 0-indexados
    const expirationDateParts = formattedCardExpirationDate.split('/');
    const expirationMonth = parseInt(expirationDateParts[0], 10);
    const expirationYear = parseInt(expirationDateParts[1], 10);

    // Verificar si la fecha de vencimiento es anterior al año actual
    const isExpirationDateInvalid = expirationYear < currentYearLastTwoDigits || (expirationYear === currentYearLastTwoDigits && expirationMonth <= currentMonth);

    setCardExpirationDateError(isCreditCardPayment ? isExpirationDateInvalid : false);
    // Devolver verdadero si todos los campos obligatorios están completos y la fecha de vencimiento no está vencida
    return !isCreditCardPayment || (cardNumber && cardSecurityCode && formattedCardExpirationDate && !isExpirationDateInvalid);
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
      <Select
  labelId="paymentMethodLabel"
  value={paymentMethod}
  onChange={(e) => setPaymentMethod(e.target.value as string)}
  displayEmpty
  renderValue={(value) => value || "Selecciona un método de pago"} 
  // inputProps={{ inputComponent: Cleave as any }}
>
  <MenuItem value="" disabled>
    <em>Selecciona un método de pago</em>
  </MenuItem>
  <MenuItem value="Tarjeta de Débito">Tarjeta de Débito</MenuItem>
  <MenuItem value="Tarjeta de Crédito">Tarjeta de Crédito</MenuItem>
  <MenuItem value="Efectivo">Efectivo</MenuItem>
</Select>

</FormControl>



{paymentMethod === "Tarjeta de Débito" || paymentMethod === "Tarjeta de Crédito" ? (
  <>
    <Grid container spacing={2}>
    <Grid item xs={12}>
  <TextField
    label="Número de Tarjeta"
    fullWidth
    style={{ marginBottom: "16px" }}
    value={cardNumber}
    onChange={(e) => {
      setCardNumber(e.target.value);
      onCreditCardChange(e); // Identificar el tipo de tarjeta
    }}
    InputProps={{
      inputComponent: Cleave as any,
      inputProps: {
        options: { creditCard: true },
        id: "probando8",
        placeholder: "Número de tarjeta",
      },
      endAdornment: cardType && (
        <Box component="img"
          src={getCardImage(cardType)} 
          alt={cardType.toUpperCase()}
          sx={{ maxWidth: "100px", maxHeight: "50px",}} 
        />
      ),
    }}
  />
</Grid>
  <Grid item xs={6}>
      <TextField
        label="Código de Seguridad"
        fullWidth
        style={{ marginBottom: "16px" }}
        value={cardSecurityCode}
        onChange={(e) => {
          // Verifica y actualiza el valor del código de seguridad
          const inputValue = e.target.value.replace(/\D/g, '').slice(0, 3); // Solo permitir dígitos y máximo tres caracteres
          setCardSecurityCode(inputValue);
          setCardSecurityCodeError(false);
        }}
        error={cardSecurityCodeError}
        helperText={cardSecurityCodeError && "Este campo es obligatorio"}
        inputProps={{ maxLength: 3 }} // Longitud máxima de tres carácteres
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
          const newValue: any = e.target.value;
          console.log(newValue); // Verifica qué valor se está pasando
          setFormattedCardExpirationDate(newValue);
          setCardExpirationDateError(false);
        }}
        
        error={cardExpirationDateError}
        helperText={cardExpirationDateError ? "Este campo es obligatorio" : ""}
        InputProps={{
          inputComponent: Cleave as any,
          inputProps: {
            options: {
              date: true,
              datePattern: ['m', 'y']
            }
          }
        }}
      />
</Grid>
    </Grid>
  </>
) : null}


      {paymentMethod === "Efectivo" ? (
        <Box>
          Aboná en el Pago fácil o Rapipago más cercano usando el código: #
          {Math.floor(Math.random() * 1000)}
        </Box>
      ) : null}

      <Button
        onClick={() => {
          if (validatePaymentFields()) {
            console.log("VALIDO")
            handlePlaceOrder();
            handleSaveToLocalStorage();
            
          }
          console.log(" NO VALIDO")
        }}
        sx={{ color: "black" }}
      >
        Confirmar
      </Button>
    </Box>
  );
};

export default Section3;