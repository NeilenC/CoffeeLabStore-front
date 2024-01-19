import React from "react";
import ProductsCard from "@/commons/ProductsCard";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const favorites = () => {
  const favorites = useSelector((state: any) => state.favorites);
  const router = useRouter();

  return (
    <Box sx={{ py: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
        <Typography variant="h3">Tus favoritos</Typography>
      </Box>
      {favorites.favorites.length ? (
        <ProductsCard products={favorites.favorites} />
      ) : (
        <Box
          sx={{
            bgcolor: "black",
            width: "70%",
            p: 8,
            m: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              m: "auto",
              fontSize: "25px",
              px: 5,
              mb: 3,
            }}
          >
            Aún no agregaste favoritos a tu lista
          </Typography>
          <Button
            sx={{ m: "auto" }}
            color="warning"
            onClick={() => {
              router.push("/");
            }}
          >
            Ir a inicio
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default favorites;
