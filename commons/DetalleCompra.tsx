import React, { useEffect, useState } from "react";
import { CartState, Product, UserState } from "./types.interface";
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
import { calculateTotalProducts, calculateTotalQuantity } from "@/functions";


const DetalleCompra = () => {
  const userId = useSelector((state: UserState) => state.user._id);
  const cartForUser = useSelector((state: CartState) => state.cart.carts[userId]);
  const totalPrice = calculateTotalQuantity(cartForUser);
  const totalProducts = calculateTotalProducts(cartForUser)
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const router = useRouter();


  const handleButtonClick = async () => {
    
    try {
      const productDetails = cartForUser.map((product: any) => ({
        productId: product._id,
        quantity: product.quantity,
      }));
      console.log("product", productDetails)

      
      const response = await fetch(
        `http://localhost:8000/cart/${userId}`,
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

  return (
    <Box 
 
      sx={{ 
      width: isSmallScreen ? "100%" : "40%", 
      ml: isSmallScreen ? 0 : 5,
      mt: isSmallScreen ? 2 : 0
      }}>
      {cartForUser && cartForUser.length > 0 && (
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
              Productos {totalProducts}
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
