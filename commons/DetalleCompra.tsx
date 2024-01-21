import React, { useEffect, useState } from "react";
import { CartState } from "./types.interface";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";

const calculateTotalQuantity = (cart: any) => {
  return cart.reduce((total: any, product: any) => {
    return total + product.quantity;
  }, 0);
};

const DetalleCompra = () => {
  const cart = useSelector((state: CartState) => state.cart);
  const totalQuantity = calculateTotalQuantity(cart.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const router = useRouter();

  const handleButtonClick = async () => {
    const productDetails = cart.cart.map((product: any) => ({
      productId: product._id,
      quantity: product.quantity,
    }));

    try {
      const response = await fetch(
        `http://localhost:8000/cart/${cart.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productDetails }),
        },
      );
      if (response.ok) {
        router.push("/order");
      }
    } catch (error) {
      console.error("Error al enviar el carrito al backend", error);
    }
  };

  useEffect(() => {
    function totalPriceCounter() {
      let newTotalPrice = 0;
      cart.cart.forEach((product: any) => {
        const productTotal = product.price * product.quantity;
        newTotalPrice += productTotal;
      });
      setTotalPrice(newTotalPrice);
    }

    totalPriceCounter();
  }, [cart]);

  return (
    <Box sx={{ 
      width: isSmallScreen ? "100%" : "40%", 
      ml: isSmallScreen ? 0 : 5,
      mt: isSmallScreen ? 2 : 0
      }}>
      {cart.cart.length > 0 && (
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              width: "100%",
              ml: "auto",
              mr: 0,
              bgcolor: "white",
              boxShadow: "0px 1.5px 3px -1px rgba(0,0,0,0.4)",
            }}
          >
            <Typography variant="h6">Resumen de compra</Typography>
            <Divider />

            <Typography variant="body2" sx={{ py: 1 }}>
              Productos {totalQuantity}
            </Typography>

            <Typography variant="body2">Total ${totalPrice}</Typography>

            <Button
              sx={{ color: "black", mt: 3, mx: "auto", width: "100%" }}
              onClick={handleButtonClick}
            >
              Continuar compra
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DetalleCompra;
