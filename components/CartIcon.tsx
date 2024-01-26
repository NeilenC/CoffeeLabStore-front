import React from 'react'
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Typography } from '@mui/material';
import { CartState, UserState } from '@/commons/types.interface';
import { useSelector } from 'react-redux';

const CartIcon = ({handleCartClick, cart}: any) => {
  const userId = useSelector((state: UserState) => state.user._id);
  const cartForUser = useSelector((state: CartState) => state.cart.carts[userId]);

  return (
    <>
    {userId != '' ? 
    <Box
    sx={{
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    onClick={handleCartClick}
  >
    <ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />
    <Box sx={{ pb: 3 }}>
      <Box
        sx={{
          width: 17,
          height: 17,
          p: 0.5,
          bgcolor: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 9,
            color: "black",
            fontWeight: "bold",
          }}
        >
          {cartForUser?.length}
        </Typography>
      </Box>
    </Box>
  </Box>
  : null} </>

  )
}

export default CartIcon