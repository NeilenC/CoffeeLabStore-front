import React, { useEffect, useState } from "react";
import ProductsCard from "@/commons/ProductsCard";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { UserState } from "@/commons/types.interface";
import NotFound from "@/commons/NotFound";

const favorites = () => {
  const user = useSelector((state: UserState) => state.user);
  const favoriteProducts = useSelector((state: any) => state.favorites);
  const userId = user?._id
  const userFavorites = favoriteProducts.users[userId] || [];
  const [products, setProducts] = useState([])
  const router = useRouter();

  console.log("userfavo", products)

  useEffect(() => {

    const getProductsById = async () => {
      const response = await fetch('http://localhost:8000/products/byIds', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productIds: userFavorites }),
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
      {userFavorites.length ? (
        <Box>
        <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
          <Typography variant="h3">Tus favoritos</Typography>
        </Box>
        <ProductsCard products={products} />
        </Box> 
      ) : (
       <NotFound>  Aún no agregaste favoritos a tu lista </NotFound>
      )}
    </Box>
  );
};

export default favorites;
