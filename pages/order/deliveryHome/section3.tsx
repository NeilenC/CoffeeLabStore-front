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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { UserState } from "@/commons/types.interface";
import * as datefns from "date-fns";

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
  const [payWithCashNumber, setPayWithCashNumber] = useState(0);

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
      setFormattedCardExpirationDate(
        datefns.format(
          datefns.parse(
            paymentData.cardExpirationDate || "",
            "MM-yyyy",
            new Date(),
          ),
          "MM/yyyy",
        ),
      );
    }
  }, [user]);
  console.log("setFormattedCardExpirationDate", formattedCardExpirationDate);

  const handleCardExpirationDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputDate = e.target.value;
    if (datefns.isValid(datefns.parse(inputDate, "MM/yyyy", new Date()))) {
      setCardExpirationDate(datefns.parse(inputDate, "MM/yyyy", new Date()));
      setFormattedCardExpirationDate(inputDate);
    }
  };

  return (
    <Box>
      <Box
        sx={{ color: "black", cursor: "pointer", py: 2 }}
        onClick={handleGoBack}
      >
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
        <Box>
          <TextField
            label="Número de Tarjeta"
            fullWidth
            style={{ marginBottom: "16px" }}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <TextField
            label="Código de Seguridad"
            fullWidth
            style={{ marginBottom: "16px" }}
            value={cardSecurityCode}
            onChange={(e) => setCardSecurityCode(e.target.value)}
          />
          <TextField
            label="Fecha de Vencimiento"
            fullWidth
            placeholder="MM/YYYY"
            style={{ marginBottom: "16px" }}
            value={formattedCardExpirationDate}
            // onChange={(e) => setFormattedCardExpirationDate(e.target.value)}
            onChange={(e) => handleCardExpirationDateChange(e)}
          />
        </Box>
      ) : null}

      {paymentMethod === "efectivo" ? (
        <Box>
          Aboná en el Pago fácil o Rapipago más cercano usando el código: #
          {Math.floor(Math.random() * 100000000)}
        </Box>
      ) : null}

      <Button
        onClick={() => {
          handlePlaceOrder();
          handleSaveToLocalStorage();
        }}
        sx={{ color: "black" }}
      >
        Confirmar
      </Button>
    </Box>
  );
};

export default Section3;
