import React from "react";
import { Box, Typography } from "@mui/material";

const OrderPickupNotice = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        bgcolor: "#F5f5f5f5",
        textAlign: "center",
        px: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        ¡Te esperamos para retirar tu pedido! 📦✨
      </Typography>
      <Typography variant="h6" mt={2}>
        Pasa a recogerlo en el horario de <strong>8am a 21pm</strong> en{" "}
        <strong>Calle XX</strong>.
      </Typography>
    </Box>
  );
};

export default OrderPickupNotice;
