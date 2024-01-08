import ProductsCard from '@/commons/ProductsCard';
import { Product, UserState } from '@/commons/types.interface'
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface FavoritesData {
    productId: string[]; 
  }

const favorites = () => {
const user = useSelector((state:UserState) => state.user)
const [favorites, setFavorites] = useState<FavoritesData[]>([]);
const [products, setProducts] = useState<Product[]>([])


useEffect(() => {
    async function getFavorites() {
        const response = await fetch(`http://localhost:8000/favorites/${user._id}/get-favorites`, {
            method: "GET"
        });

        const data = await response.json();
        console.log("data", data);

        const productsIdArray = data.map((favorite: any) => favorite.productId); // Cambiado a 'productId'
        console.log("productsIdArray", productsIdArray);

        setFavorites(productsIdArray);
    }

    getFavorites();
}, [user._id]);


console.log("setFavorites", favorites)

useEffect(() => {
    const fetchProductsByIds = async () => {
      try {
        const url = 'http://localhost:8000/products/byIds';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productIds: favorites[0] }),
        });
  
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProductsByIds();
  }, [favorites]);
  

  return (
<Box sx={{ py: 10 }}>
  <Box sx={{ display: 'flex', justifyContent: 'center', pb:4 }}>
    <Typography variant='h3'>Tus favoritos</Typography>
  </Box>
  <ProductsCard products={products}/>
</Box>

  )
}

export default favorites
