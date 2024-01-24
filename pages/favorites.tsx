import React, { useEffect, useState } from "react";
import ProductsCard from "@/commons/ProductsCard";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { UserState } from "@/commons/types.interface";

const favorites = () => {
  const user = useSelector((state: UserState) => state.user);
  const favoriteProducts = useSelector((state: any) => state.favorites);
  const userId = user?._id
  const userFavorites = favoriteProducts.users[userId] || [];
  const [products, setProducts] = useState([])
  const router = useRouter();

  useEffect(() => {

    const getProductsById = async () => {
  
      const response = await fetch('http://localhost:8000/products/byIds', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userFavorites }),
    });
    
    if (response.ok) {
      const data = await response.json();
      setProducts(data)
    } else {
      console.error('Error fetching products:', response.status);
    }
  };
  
  getProductsById();
},[userFavorites ])

  return (
    <Box sx={{ py: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
        <Typography variant="h3">Tus favoritos</Typography>
      </Box>
      {userFavorites.length ? (
        <ProductsCard products={products} />
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
