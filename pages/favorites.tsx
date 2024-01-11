import React from 'react'
import ProductsCard from '@/commons/ProductsCard';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux'


const favorites = () => {
const favorites = useSelector((state:any) => state.favorites)


  return (
<Box sx={{ py: 10 }}>
  <Box sx={{ display: 'flex', justifyContent: 'center', pb:4 }}>
    <Typography variant='h3'>Tus favoritos</Typography>
  </Box>
  <ProductsCard products={favorites.favorites}/>
</Box>

  )
}

export default favorites
