import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react'
import {Typography, Box, Button, Card, CardMedia, CardContent, Grid } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/router';
import Link from 'next/link';


type Product = {
    _id: string;
    name: string;
    imageURL: string,
    price: number
  };
  
const Products = () => {
const [products, setProducts] = useState<Product[]>([])
const router = useRouter()


async function getProducts() {
    try {
      const response = await fetch('http://localhost:8000/products', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      console.log("data", data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
useEffect(()=> {
    getProducts()
},[])
return (
    <Grid container spacing={2} sx={{p:4, bgcolor:"pink"}}>
    {products.map((product) => (
      <Grid item key={product._id} xs={12} sm={6} md={4}>
        <Box sx={{ width:"55%"}}>
        <Card sx={{ bgcolor:"lightblue"}}>
        <Link href={`/products/${product._id}`}>

        <Image 
        src={product.imageURL}
        width={300}
        height={300}
        alt={product.name}
        />
       
        </Link>
          <CardContent>
            <Typography variant="body1" color="initial">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ${product.price}
            </Typography>
            <Button
            sx={{color:"black"}}
              variant="contained"
              color="primary"
              fullWidth
            >
              Agregar al carrito <ShoppingCartOutlinedIcon/>
            </Button>
          </CardContent>
        </Card>
        </Box>
      </Grid>
    ))}
  </Grid>
  )
}

export default Products