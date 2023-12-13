import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react'
import {Typography, Box, Button, Card, CardMedia, CardContent, Grid } from '@mui/material'
import Link from 'next/link';
// import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { Product } from './types.interface';
import { UserState } from '@/commons/types.interface'
import useUserData from '@/Hooks/useUserData';
import AddToCartButtom from './AddToCartButtom';

const Products = () => {
  useUserData()
const [products, setProducts] = useState<Product[]>([])
const user = useSelector((state: UserState) => state.user)
const [visibleProducts, setVisibleProducts] = useState(9);
const visibleProductsList = products.slice(0, visibleProducts);

useEffect(()=>{
async function getProducts() {
    try {
      const response = await fetch('http://localhost:8000/products', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  getProducts()
},[])



return (
  <Box sx={{ p: 6 }}>
  <Grid container spacing={3} sx={{ ml: 0}}>
    {visibleProductsList.map((product) => (
      <Grid item key={product._id} xs={9} sm={6} md={4} sx={{}}>
        <Box sx={{}}>
          <Card sx={{ display: 'flex', flexDirection: 'column' , mx:13,}}>
            <Link href={`/products/${product._id}`}>
              <Box sx={{mx:"auto", width:"80%", heigth:"100px"}}>

                <Image
                  src={product.imageURL[0]}
                  width={300}
                  height={300}
                  alt={product.name}
                  />
              </Box>
            </Link>
            <CardContent sx={{ }}>
              <Typography variant="body1" color="initial">
                {product.name}
              </Typography>
              <Typography variant="body2" color= "black" sx={{ py: 1 }}>
                ${product.price}
              </Typography>
              <AddToCartButtom product={product} quantity={1} />
            </CardContent>
          </Card>
        </Box>
      </Grid>
    ))}
  </Grid>
  <Box>
    {visibleProducts < products.length && (
      <Box sx={{ p: 3 }}>
        <Button
          fullWidth
          color="warning"
          variant="contained"
          onClick={() => setVisibleProducts((prev) => prev + 9)}
          sx={{
            bgcolor: '#DAA520',
            p: 1,
            borderRadius: 8,
            color: 'black',
            '&:hover': { color: 'white' },
          }}
        >
          Ver más
        </Button>
      </Box>
    )}
  </Box>
</Box>
  )
}

export default Products