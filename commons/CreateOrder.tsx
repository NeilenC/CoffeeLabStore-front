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
          `${process.env.NEXT_PUBLIC_API_BASE}/cart/${cart.userId}`,
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
