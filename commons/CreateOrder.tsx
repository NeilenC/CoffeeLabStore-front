import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { CartState } from "./types.interface";
import { useSelector } from "react-redux";

const CreateOrder = () => {
  const cart = useSelector((state: CartState) => state.cart);

  useEffect(() => {
    const sendCartToBackend = async () => {
      if (cart.cart.length === 0 && !cart.userId) {
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:8000/cart/${cart.userId}`,
          {
            method: "POST",
          },
        );

      } catch (error) {
        console.error("Error al enviar el carrito al backend", error);
      }
    };

    sendCartToBackend();

  }, []);

  return (
    <Box>
      <Button sx={{ color: "black" }}>Crear orden</Button>
    </Box>
  );
};

export default CreateOrder;
