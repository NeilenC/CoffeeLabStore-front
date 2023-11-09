import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react'
import {Typography, Box, Button, Card, CardMedia, CardContent, Grid } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from './types.interface';
import { UserState } from '@/commons/types.interface'
import useUserData from '@/Hooks/useUserData';
import { CartState } from './types.interface';
import AddToCartButtom from './AddToCartButtom';

const Products = () => {
  useUserData()
const [products, setProducts] = useState<Product[]>([])
const user = useSelector((state: UserState) => state.user)

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
    <Grid container spacing={1} sx={{p:4}}>
    {products.map((product) => (
      <Grid item key={product._id} xs={12} sm={6} md={4}>
        <Box sx={{ width:"55%"}}>
        <Card sx={{ bgcolor:""}}>
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
            <AddToCartButtom product={product} quantity={1}/>
          </CardContent>
        </Card>
        </Box>
      </Grid>
    ))}
  </Grid>
  )
}

export default Products