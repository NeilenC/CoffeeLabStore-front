import { Box, Button } from "@mui/material";
import React from "react";
import { Product } from "./types.interface";
import { useDispatch } from "react-redux";
import { setProductForPurchase } from "@/redux/actions";
import { useRouter } from "next/router";

const BuyButton = ({ product, quantity }: { product: Product; quantity: number }) => {
  const dispatch = useDispatch();
  const router = useRouter()

  const handleBuy = () => {
    dispatch(setProductForPurchase(product, quantity));
    if(product && quantity) {
      router.push('/order')
    }
    console.log("Producto listo para la compra:", product, quantity);
  };



  return (
    <Box sx={{ pt: 2 }}>
      <Button
        sx={{
          fontWeight: "bold",
          "&:hover": { color: "white", bgcolor: "black" },
        }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleBuy} 
      >
        comprar
      </Button>
    </Box>
  );
};

export default BuyButton;
