import React, { useEffect } from 'react'
import {Box, Grid, Card, CardContent, Typography, Button} from '@mui/material'
import Cart from '../components/Cart'
import { useSelector } from 'react-redux'
import { CartState, Product } from '@/commons/types.interface'
import Link from 'next/link'
import Image from 'next/image'
import AddToCartButtom from '@/commons/AddToCartButtom'

const cart = () => {
  const cart = useSelector((state:CartState) => state.cart)


  console.log("CART", cart)
  return (
   <Box>{cart.cart.length ? cart.cart.map((product: Product)=> 
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
        <Grid container sx={{}}>

        <Grid item  sx={{}}>
          <Button>+</Button>
        </Grid>
        <Grid item>
          <Button>-</Button>
        </Grid>
        </Grid>
      </CardContent>
    </Card>
    </Box>
  </Grid>
    ):
     <Box sx={{ bgcolor: "black", width:"50%", m:"auto", py:5}}>

    <Box sx={{ color:"white", fontWeight:"bold", fontSize:"25px"}}>No hay productos en el carrito</Box> 
    </Box>}
    </Box>
  )
}

export default cart