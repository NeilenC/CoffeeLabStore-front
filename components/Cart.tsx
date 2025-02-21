import React from "react";
import {
  Box,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CartState, UserState } from "@/commons/types.interface";
import {
  clearCart,
} from "@/redux/actions";
import OrderDetail from "@/commons/OrderDetail";
import NotFound from "@/commons/NotFound";
import CartCard from "@/commons/CartCard";

const CartItems = () => {
    const isMediumScreen = useMediaQuery('(max-width: 950px)')
    const isMinScreen = useMediaQuery('(max-width: 400)')
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
      pt: isSmallScreen ? "45%" : (isMediumScreen || isMidScreen ? "35%" : (isMinScreen ? "100%" : null))

      }}>
     
    <Box 
    display="flex" 
    flexDirection={isSmallScreen ? "column" : "row"} 
    sx={{ pb:5,
    }}>
      <Box
       width={isSmallScreen || isMediumScreen ? "100%" : "100%"} 
       >
            {cartForUser && cartForUser.length ? (
        <Grid container 
         width={isSmallScreen || isMediumScreen ? "100%" : "68%"}
        >
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
          </Grid>

            ) : (
               <NotFound> No hay productos en el carrito </NotFound>
            )}
        </Box>

        {/* DETALLES DE COMPRA */}
       <OrderDetail />
      </Box>
 
    </Box>
  );
};

export default CartItems;
