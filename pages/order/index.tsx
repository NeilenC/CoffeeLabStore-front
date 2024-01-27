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
import { CartState, Product, UserState } from "@/commons/types.interface";
import theme from "@/styles/theme";
import { calculateTotalProducts, calculateTotalQuantity } from "@/functions";


const FormaEntrega = () => {
  const cart = useSelector((state: CartState) => state.cart);
  const userId = useSelector((state: UserState) => state.user._id);
  const cartForUser = useSelector((state: CartState) => state.cart.carts[userId]);
  const totalQuantity = calculateTotalProducts(cartForUser);
  const totalPrice = calculateTotalQuantity(cartForUser);
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();
  const domicilioCosto = 1500;
  const correoCosto = 1000;


  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  function handleContinuarButtom() {
    if (selectedValue === "domicilio") {
      router.push("/order/deliveryHome");
    }
    if (selectedValue === "correo") {
      router.push("/order/deliveryMail");
    }
    if (selectedValue === "local") {
      router.push("/order/retiroLocal");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "lightgrey",
        width: "100%",
        padding: "20px",
        p: 8,
      }}
    >
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={5}>
          <Typography variant="h6">Seleccione la forma de entrega:</Typography>
          <RadioGroup value={selectedValue || null} onChange={handleChange}>
            <Box
              sx={{
                p: 3,
                width: "100%",
                bgcolor: "white",
                borderRadius: 4,
                mb: 4,
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
              <Box>
                <Divider />
                <Typography sx={{ ml: 3, p: 0.5 }}>
                  {" "}
                  Adicional envío domicilio: ${domicilioCosto}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                p: 3,
                width: "100%",
                bgcolor: "white",
                borderRadius: 4,
                mb: 4,
              }}
            >
              <FormControlLabel
                value="correo"
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": { color: theme.palette.primary.main },
                    }}
                  />
                }
                label="Envío a correo"
              />
              <Box>
                <Divider />
                <Typography sx={{ ml: 3, p: 0.5 }}>
                  {" "}
                  Adicional envío domicilio: ${correoCosto}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{ p: 3, width: "100%", bgcolor: "white", borderRadius: 4 }}
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
          <Box sx={{ pt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinuarButtom}
            >
              Continuar
            </Button>
          </Box>
        </Grid>

        {/* <Grid item xs={7} sx={{  }}> */}

        {cartForUser && cartForUser.length  && (
          <Box width="30%" sx={{ width: "50%", m: "auto" }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                width: "90%",
                ml: "auto",
                mr: 4,
                bgcolor: "white",
              }}
            >
              <Typography variant="h6">Resumen de compra</Typography>
              <Divider />

              <Typography sx={{ py: 1 }}>
                Productos ({totalQuantity}) {totalPrice}
              </Typography>

              {selectedValue == "domicilio" ? (
                <>
                  <Typography variant="body1">
                    Envío ${domicilioCosto}
                  </Typography>

                  <Typography variant="body1">
                    Total ${totalPrice + domicilioCosto}
                  </Typography>
                </>
              ) : null}

              {selectedValue == "correo" ? (
                <>
                  <Typography variant="body1">
                    Envío ${domicilioCosto}
                  </Typography>

                  <Typography variant="body1">
                    Total ${totalPrice + correoCosto}
                  </Typography>
                </>
              ) : null}

              {selectedValue == "local" ? (
                <>
                  <Typography variant="body1">Total ${totalPrice}</Typography>
                </>
              ) : null}
            </Box>
          </Box>
        )}
        {/* </Grid>   */}
      </Grid>
    </Box>
  );
};

export default FormaEntrega;
