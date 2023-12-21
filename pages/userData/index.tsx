import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserState } from "@/commons/types.interface";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import { useRouter } from "next/router";

type ShippingData = {
  address: string;
  apartment: string;
  directionNum: string;
  codigo: string;
  localidad: string;
};

const UserData = () => {
  const user = useSelector((state: UserState) => state.user);
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const router = useRouter();

  const handleUpdateClick = () => {
    router.push("/userData/modifyData");
  };

  useEffect(() => {
    const storedShippingData = JSON.parse(
      localStorage.getItem("shippingData") || "{}",
    );
    setShippingData(storedShippingData);
  }, []);

  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          maxWidth: "600px",
          margin: "auto",
          padding: "70px",
          textAlign: "center",
          my: 8,
          borderRadius: 4,
          bgcolor: "white",
          boxShadow: "0px 2px 18px 0px rgba(0,0,0,0.3)",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Datos del Usuario
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography>
              <strong>Nombre:</strong> {user.name} {user.lastname}
            </Typography>
          </Grid>
          <Divider sx={{ color: "black", width: "300px", pt: 1 }} />

          <Grid item xs={12}>
            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>
          </Grid>
          <Divider sx={{ color: "black", width: "300px", pt: 1 }} />

          <Grid item xs={12}>
            <Typography>
              <strong>Teléfono:</strong> {user.phoneNumber}
            </Typography>
          </Grid>

          <Divider sx={{ color: "black", width: "300px", pt: 1 }} />

          <Grid item xs={12}>
            <Typography>
              <strong>Dirección:</strong> {shippingData?.address} n°
              {shippingData?.directionNum}{" "}
              {shippingData?.apartment ? shippingData?.apartment : null}
            </Typography>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={handleUpdateClick}
          sx={{ marginTop: 8 }}
        >
          Modificar Datos
        </Button>
      </Box>
    </Box>
  );
};

export default UserData;
