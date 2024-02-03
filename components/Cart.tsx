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
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
} from "@/redux/actions";
import { useRouter } from "next/router";
import DetalleCompra from "@/commons/DetalleCompra";
import NotFound from "@/commons/NotFound";

const CartItems = () => {
    const isMediumScreen = useMediaQuery('(max-width: 1000px)')
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const userId = useSelector((state: UserState) => state.user._id);
  const cartForUser = useSelector((state: CartState) => state.cart.carts[userId]);
  const dispatch = useDispatch();
  const router = useRouter();

  function incrementItem(product: Product) {
    dispatch(incrementCartItem(product, userId));
  }

  function decrementItem(product: Product) {
    dispatch(decrementCartItem(product, userId));
  }

  function deleteFromCart(product: Product) {
    dispatch(removeFromCart(product, userId));
  }

  function handleClearCart() {
    dispatch(clearCart(userId));
  }

  return (
    <Box sx={{ 
      bgcolor: "whitesmoke", 
      px: isSmallScreen || isMediumScreen ? 1 : 5, 
      pt: isSmallScreen || isMediumScreen ? "30%" : null }}>

    <Box 
    display="flex" 
    flexDirection={isSmallScreen ? "column" : "row"} 
    sx={{ p: isSmallScreen ? 1 : 5 }}>
      <Box
       width={isSmallScreen || isMediumScreen ? "100%" : "100%"} 
       >
        <Grid container spacing={2}
         width={isSmallScreen || isMediumScreen ? "100%" : "68%"}
        >
            {cartForUser && cartForUser.length ? (
             cartForUser.map((product: any) => (
                <Grid item key={product._id} xs={12}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "row", 
                      maxHeight: isSmallScreen || isMediumScreen ? "68%" : "97%",
                       maxWidth: "100%",
                    }}
                  >
                      <Link href={`/products/${product._id}`}>
                        <Image  
                          src={product.imageURL[0]}
                          width={220}
                          height={220}
                          alt={product.name}
                        />
                      </Link>

                    {/* Detalles del producto */}
                    <Box sx={{ width: "50%", pl: 2, m: "auto" }}>
                      <CardContent>
                        <Typography variant="h6" color="initial" sx={{ pb: 2 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: 0.5 }}>
                          Precio por unidad: ${product.price}
                        </Typography>
                        <Typography variant="body2" sx={{ pb: 0.5 }}>
                          Cantidad seleccionada: {product.quantity}
                        </Typography>

                        {product.category.name === "Café" && product.productPreferences?.grind ? (
                          <Typography variant="body2">
                            {" "}
                            Molido para: {product.productPreferences?.grind}
                          </Typography>
                        ) : <Box>
                           <Typography variant="body2">
                            {" "}
                            Café en grano
                          </Typography>
                          </Box>}

                        <Grid
                          container
                          spacing={2}
                          sx={{ pt: 2, color: "black"  }}
                        >
                          <Grid item xs={6}>
                            <Button
                              sx={{ color: "black",  '&:hover': {bgcolor:"whitesmoke"} }}
                              onClick={() => deleteFromCart(product._id)}
                            >
                              eliminar
                            </Button>
                          </Grid>
                          {/* ESPACIO POR SI QUIERO AGREGAR OTRO GRID CON BOTON  */}
                        </Grid>
                      </CardContent>
                    </Box>
                    <Grid container sx={{ flexDirection: "row", m: "auto" }}>
                      <Grid item xs={1}>
                        <Button
                          sx={{ color: "black" }}
                          onClick={() => incrementItem(product)}
                        >
                          <Box sx={{ fontSize: "25px" }}> +</Box>
                        </Button>
                      </Grid>
                      <Grid item xs={5}>
                        <Button
                          sx={{ color: "black", ml: 3 }}
                          onClick={() => decrementItem(product)}
                        >
                          <Box sx={{ fontSize: "25px" }}>-</Box>
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6">
                          $ {product.price * product.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))
            ) : (
               <NotFound> No hay productos en el carrito </NotFound>
            )}
          </Grid>
       { cartForUser.lenght != 0 && 
         <Box sx={{pt:2}}>
           <Button sx={{p:2, color:"black", bgcolor:"#f0f0f0f0", '&:hover': {bgcolor:"lightgrey"}}} 
            onClick={() => handleClearCart()
           }> vaciar carrito</Button>
          </Box>
       }
        </Box>

        {/* DETALLES DE COMPRA */}
       <DetalleCompra />
      </Box>
 
    </Box>
  );
};

export default CartItems;
