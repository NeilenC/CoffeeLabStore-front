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
        bgcolor: "whitesmoke",
        width: "100%",
        padding: "20px",
        p: 8,
      }}
    >
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={5}>
          <Typography variant="h5" sx={{pb:2}}>Seleccione la forma de entrega:</Typography>
          <RadioGroup value={selectedValue || null} onChange={handleChange}>
            <Box
              sx={{
                p: 3,
                width: "100%",
                bgcolor: "white",
                borderRadius: 2,
                mb: 4,
                boxShadow: "0px 0px 12px -9px black"
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
                  Adicional envío domicilio: ${domicilioCosto}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                p: 3,
                width: "100%",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: "0px 0px 12px -9px black",
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
                
                sx={{ p: 3, width: "100%", bgcolor: "white", borderRadius: 2, boxShadow: "0px 0px 12px -9px black"}}
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
          <Box sx={{ pt: 2.5}}>
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
                boxShadow: "0px 0px 12px -9px black"

              }}
            >
              <Typography variant="h6">Resumen de compra</Typography>

              <Divider />

              <Typography sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', py: 1 }}>
                <Box sx={{ textAlign: 'right' }}>
                  Productos ({totalQuantity})
                </Box>

                <Typography sx={{mr:1}}>
                $ {totalPrice}
                </Typography>
              </Typography>

           
              {selectedValue == "domicilio" ? (
                <>
                  <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', py: 1 }}>
                <Box sx={{ textAlign: 'right' }}>
                    Envío 
                    </Box>
                    <Typography sx={{mr:1}}>
                    $ {domicilioCosto}
                    </Typography>
                  </Typography>
                  <Divider sx={{py:2}}/>

                  <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', py: 1 }}>
                 <Box sx={{ textAlign: 'right' }}>
                    Total 
                  </Box>
                  

                  <Typography sx={{mr:1}}>
                  ${totalPrice + domicilioCosto}
                  </Typography>
                    </Typography>
                 
                </>
              ) : null}

              {selectedValue == "correo" ? (
                <>
                   <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', py: 1 }}>
                <Box sx={{ textAlign: 'right' }}>
                    Envío
                    </Box>
                    <Typography sx={{mr:1}}>
                    $ {domicilioCosto}
                    </Typography>
                  </Typography>
                  <Divider sx={{py:2}}/>

                  <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', py: 1 }}>
                <Box sx={{ textAlign: 'right' }}>
                    Total 
                    </Box>
                    <Typography sx={{mr:1}}>
                      ${totalPrice + correoCosto}</Typography>
                  </Typography>
                </>
              ) : null}

              {selectedValue == "local" ? (
                <>
                  <Divider sx={{py:2}}/>

                      <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', py: 1 }}>
                <Box sx={{ textAlign: 'right' }}>
                    Total 
                  </Box>
                  <Typography sx={{mr:1}}>
                  ${totalPrice}
                  </Typography>
                    </Typography>
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
