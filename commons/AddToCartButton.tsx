import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartState, Product, UserState } from "./types.interface";
import { addToCart, removeFromCart } from "@/redux/actions";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Swal from "sweetalert2";
import theme from "@/styles/theme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCartButtom = ({ product, quantity }: any) => {
  const cart = useSelector((state: CartState) => state.cart);
  const userId = useSelector((state: UserState) => state.user._id);
  const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");
    const isMediumScreen = useMediaQuery("(max-width: 1000px)");

    
function addItemToCart(product: Product, quantity: number) {
  if (!userId) {
    toast.error("¡Debes iniciar sesión para agregar productos al carrito!", {
      autoClose: 2000,
    });
    return;
  }

  if (product.stock > 0) {
    dispatch(addToCart(product, quantity, userId));
    toast.success("Producto agregado al carrito", {
      autoClose: 1000,
    });
  } else {
    toast.error("No se encuentra stock para este producto", {
      autoClose: 1000,
    });
  }
}

return (
  <>
    <Button
  onClick={() => addItemToCart(product, quantity)}
  sx={{
    fontWeight: "bold",
    "&:hover": { color: "white", bgcolor: "black" },
    fontSize: { xs: "10px", sm: "12px", md: "14px" }, 
    p: { xs: "6px", sm: "8px", md: "10px" },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
  variant="contained"
  color="primary"
  fullWidth
  disabled={product.stock <= 0}
>
  {product.stock <= 0 ? (
    <Typography variant="body2" sx={{ fontSize: { xs: "13px", sm: "15px" } }}>
      Sin Stock
    </Typography>
  ) : (
    <Box
      display="flex"
      alignItems="center"
      gap={{ xs: 0.3, sm: 0.5, md: 1 }} 
    >
      <Typography variant="body2" sx={{ fontSize: { xs: "13px", sm: "15px" } }}>
        Agregar al
      </Typography>
      <ShoppingCartOutlinedIcon
        sx={{ fontSize: { xs: "20px", sm: "18px", md: "20px" } }} 
      />
    </Box>
  )}
</Button>

  </>
);
};

export default AddToCartButtom;
