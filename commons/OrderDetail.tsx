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


const OrderDetail = () => {
  const userId = useSelector((state: UserState) => state.user._id);
  const cartForUser = useSelector((state: CartState) => state.cart.carts[userId]);
  const totalPrice = calculateTotalQuantity(cartForUser);
  const totalProducts = calculateTotalProducts(cartForUser)
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMediumScreen = useMediaQuery('(max-width: 1000px)')
  const isMidScreen = useMediaQuery('(max-width: 800px)')

  const router = useRouter();


  const handleButtonClick = async () => {
    
    try {
      const productDetails = cartForUser.map((product: any) => ({
        productId: product._id,
        quantity: product.quantity,
      }));
      console.log("product", productDetails)

      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/cart/${userId}`,
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
        position:  'fixed',
        top: isSmallScreen ? "12%" : ( isMediumScreen || isMidScreen ? "20%" :  "auto"),
        right: 1,
      width: isSmallScreen || isMediumScreen ? "93%" : "30%", 
      // mr: isSmallScreen ? 0.7 : 5 && isMediumScreen ? 1.6 : 5 ,
      }}>
      {cartForUser && cartForUser.length > 0 && (
        <Box sx={{ width: isSmallScreen || isMediumScreen  ? "96%" : "100%" }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              width: "100%",
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
              sx={{ color: "black", mt: 3, mx: "auto", width: "100%", bgcolor:"whitesmoke",  '&:hover': {bgcolor:"lightgrey"} }}
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

export default OrderDetail;
