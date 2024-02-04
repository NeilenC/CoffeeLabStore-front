import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CartState, Product, UserState } from "@/commons/types.interface";
import Link from "next/link";
import Image from "next/image";
import {
  clearCart,
} from "@/redux/actions";
import DetalleCompra from "@/commons/DetalleCompra";
import NotFound from "@/commons/NotFound";
import CartCard from "@/commons/CartCard";

const CartItems = () => {
    const isMediumScreen = useMediaQuery('(max-width: 950px)')
    const isMidScreen = useMediaQuery('(max-width: 800px)')
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const userId = useSelector((state: UserState) => state.user._id);
  const cartForUser = useSelector((state: CartState) => state.cart.carts[userId]);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart(userId));
  }

  return (
    <Box sx={{ 
      bgcolor: "whitesmoke", 
      px: isSmallScreen || isMediumScreen ? 1 : 5, 
      pt:  isSmallScreen ? "45%" : (isMediumScreen || isMidScreen ? "35%"  : null),
      }}>
     
    <Box 
    display="flex" 
    flexDirection={isSmallScreen ? "column" : "row"} 
    sx={{ p: isSmallScreen || isMediumScreen ? 2 : 5,
    }}>
      <Box
       width={isSmallScreen || isMediumScreen ? "100%" : "100%"} 
       >
        <Grid container 
         width={isSmallScreen || isMediumScreen ? "100%" : "68%"}
        >
            {cartForUser && cartForUser.length ? (
              <>
            { cartForUser.map((product: any) => (
             // CARD DEL CARRITO 
              <CartCard product={product}/>
              ))}

               <Box sx={{pt: isSmallScreen || isMediumScreen ? 1 : 2}}>
                <Button sx={{p:2, color:"black", bgcolor:"#f0f0f0f0", '&:hover': {bgcolor:"lightgrey"}}} 
                  onClick={() => handleClearCart()
                }>
             vaciar carrito
            </Button>
          </Box>
                </>
            ) : (
               <NotFound> No hay productos en el carrito </NotFound>
            )}
          </Grid>
        </Box>

        {/* DETALLES DE COMPRA */}
       {/* <DetalleCompra /> */}
      </Box>
 
    </Box>
  );
};

export default CartItems;
