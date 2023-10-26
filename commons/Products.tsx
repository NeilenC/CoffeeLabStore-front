import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react'
import {Typography, Box, Button, Card, CardMedia, CardContent, Grid } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '@/redux/actions';
import { CartState } from './types.interface';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from './types.interface';
import { UserState } from '@/commons/types.interface'

const Products = () => {
const [products, setProducts] = useState<Product[]>([])
const router = useRouter()
  const user = useSelector((state: UserState) => state.user)
  const cart = useSelector((state:CartState) => state.cart)
const dispatch = useDispatch()


async function getProducts() {
    try {
      const response = await fetch('http://localhost:8000/products', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
useEffect(()=> {
    getProducts()
},[])

async function handleAddToCart(product: Product, quantity: number) {
  try {
    if(!user.id) {
      alert('Debes loguearte para agregar productos al carrito')
    }
    const result = await fetch(`http://localhost:8000/cart/${user.id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        productId: product._id,
        quantity: product.quantity ,
      }),
    });

    // if (!result.ok) {
    //   throw new Error('Failed to add product to cart');
    // }

    const cartResult = await result.json();

    console.log("cartResult", cartResult);

    dispatch(addToCart(product));

  } catch (error) {
    console.error('Error al agregar el producto al carrito', error);
   
  }
}


console.log("CART", cart)
return (
    <Grid container spacing={2} sx={{p:4}}>
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
              onClick={() => handleAddToCart(product, 1)}
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