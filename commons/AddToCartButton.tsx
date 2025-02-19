import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartState, Product, UserState } from "./types.interface";
import { addToCart, removeFromCart } from "@/redux/actions";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import theme from "@/styles/theme";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCartButtom = ({ product, quantity }: any) => {
  const cart = useSelector((state: CartState) => state.cart);
  const userId = useSelector((state: UserState) => state.user._id);
  const dispatch = useDispatch();

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
      }}
      variant="contained"
      color="primary"
      fullWidth
    >
      Agregar al &nbsp;
      <ShoppingCartOutlinedIcon />
    </Button>

        </>
  );
};

export default AddToCartButtom;
