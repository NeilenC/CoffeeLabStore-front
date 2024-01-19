import { Box, Button } from "@mui/material";
import React from "react";

const BuyButton = ({ product, quantity }: any) => {
  return (
    <Box sx={{ pt: 2 }}>
      <Button
        sx={{
          fontWeight: "bold",
          "&:hover": { color: "white", bgcolor: "black" },
        }}
        variant="contained"
        color="primary"
        fullWidth
      >
        comprar
      </Button>
    </Box>
  );
};

export default BuyButton;
