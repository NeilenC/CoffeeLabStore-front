import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { CartState, UserState } from "@/commons/types.interface";
import theme from "@/styles/theme";
import { calculateTotalProducts, calculateTotalQuantity } from "@/functions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormaEntrega = () => {
  const cart = useSelector((state: CartState) => state.cart);
  const { product, quantity } = useSelector((state: any) => state.purchase);

  const userId = useSelector((state: UserState) => state.user._id);
  const cartForUser = useSelector(
    (state: CartState) => state.cart.carts[userId]
  );

  const totalQuantity =
    cartForUser && cartForUser.length && !product
      ? calculateTotalProducts(cartForUser)
      : 0;
  const totalPrice =
    cartForUser && cartForUser.length && !product
      ? calculateTotalQuantity(cartForUser)
      : 0;

  const totalQuantityForSingleProduct = quantity || 0;
  const totalPriceForSingleProduct = product ? product.price * quantity : 0;

  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();
  const domicilioCosto = 2500;
  const correoCosto = 1000;

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  function handleContinuarButtom() {
    if (!userId) {
      toast.error("¡Debes iniciar sesión para continuar con tu compra!", {
        autoClose: 2000,
      });
      return;
    }

    if (selectedValue === "domicilio") {
      router.push("/order/deliveryHome");
    }
    if (selectedValue === "local") {
      router.push("/order/localpickup");
    }
  }

  const calculateTotal = () => {
    if (product) {
      return totalPriceForSingleProduct;
    } else if (cartForUser && cartForUser.length) {
      return totalPrice;
    }
    return 0;
  };

  const calculateFinalPrice = () => {
    const baseTotal = calculateTotal();
    if (selectedValue === "domicilio") {
      return baseTotal + domicilioCosto;
    }
    if (selectedValue === "correo") {
      return baseTotal + correoCosto;
    }
    return baseTotal;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "whitesmoke",
        width: "100%",
        padding: { xs: 2, md: 4 },
      }}
    >
      <Grid container justifyContent="center">
        {/* Sección de Entrega */}
        <Grid item xs={12} md={5}>
          <Typography variant="h5" sx={{ pb: 2 }}>
            Seleccione la forma de entrega:
          </Typography>
          <RadioGroup value={selectedValue || null} onChange={handleChange}>
            <Box
              sx={{
                p: 3,
                width: "100%",
                bgcolor: "white",
                borderRadius: 2,
                mb: 2,
                boxShadow: "0px 0px 12px -9px black",
              }}
            >
              <FormControlLabel
                value="domicilio"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": { color: theme.palette.primary.main },
                    }}
                  />
                }
                label="Envío a domicilio"
              />
              <Divider />
              <Typography sx={{ ml: 3, p: 0.5 }}>
                Adicional envío domicilio: ${domicilioCosto}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
                width: "100%",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: "0px 0px 12px -9px black",
              }}
            >
              <FormControlLabel
                value="local"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": { color: theme.palette.primary.main },
                    }}
                  />
                }
                label="Retiro por local"
              />
            </Box>
          </RadioGroup>

          <Box sx={{ pt: 2.5 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinuarButtom}
            >
              Continuar
            </Button>
          </Box>
        </Grid>

        {/* Resumen de Compra */}

        <Grid
          item
          xs={12}
          md={5}
          sx={{
            alignContent: "center",
            pt: { xs: "20px" , md: "0px"},
          }}
        >
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              width: { xs: "100%", sm: "80%", md: "90%" },
              mx: "auto",
              bgcolor: "white",
              boxShadow: "0px 0px 12px -9px black",
              minHeight: { xs: "130px" , sm: "130px", md: "235px" }
            }}
          >
            <Typography variant="h6">Resumen de compra</Typography>
            <Divider />

            <Typography
              sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
            >
              <Box sx={{ textAlign: "right" }}>
                Productos (
                {product ? totalQuantityForSingleProduct : totalQuantity})
              </Box>
              <Typography sx={{ mr: 1 }}>
                ${product ? totalPriceForSingleProduct : totalPrice}
              </Typography>
            </Typography>

            {selectedValue === "domicilio" && (
              <>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  <Box sx={{ textAlign: "right" }}>Envío</Box>
                  <Typography sx={{ mr: 1 }}>${domicilioCosto}</Typography>
                </Typography>
                <Divider sx={{ py: 2 }} />
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  <Box sx={{ textAlign: "right" }}>Total</Box>
                  <Typography sx={{ mr: 1 }}>
                    ${calculateFinalPrice()}
                  </Typography>
                </Typography>
              </>
            )}

            {selectedValue === "local" && (
              <>
                <Divider sx={{ py: 2 }} />
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                  }}
                >
                  <Box sx={{ textAlign: "right" }}>Total</Box>
                  <Typography sx={{ mr: 1 }}>${calculateTotal()}</Typography>
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormaEntrega;
