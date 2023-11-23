import React, { useEffect,useState } from 'react'
import {Box, Grid, Card, CardContent, Typography, Button, Divider} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { CartState, Product } from '@/commons/types.interface'
import Link from 'next/link'
import Image from 'next/image'
import { decrementCartItem, incrementCartItem } from '@/redux/actions'
import useUserData from '@/Hooks/useUserData'
import { useRouter } from 'next/router'
import DetalleCompra from '@/commons/DetalleCompra'


const CartItems = () => {
  useUserData()
  const cart = useSelector((state:CartState) => state.cart)
  const dispatch = useDispatch()
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); 

  function incrementItem(product: Product) {
    dispatch(incrementCartItem(product))
 }

 function decrementItem(product:Product) {
  dispatch(decrementCartItem(product))
 }

 
return (
  <Box display="flex" justifyContent="space-between" sx={{p:5, bgcolor:"lightgrey"}}>
    <Box width="65%">
      <Grid container spacing={2} >
        {cart.cart.length ? (
          cart.cart.map((product: any) => (
            <Grid item key={product._id} xs={12}>
              <Card sx={{ borderRadius: 2, display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ width: '40%' }}>
                  <Link href={`/products/${product._id}`}>

                    <Image
                      src={product.imageURL}
                      width={220}
                      height={220}
                      alt={product.name}
                    />

                  </Link>
                </Box>

                {/* Detalles del producto */}
                <Box sx={{ width: '50%', pl: 2 , m:"auto"}}>
                  <CardContent>
                    <Typography variant="h6" color="initial" sx={{py:1}}>
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                     Precio por unidad:  ${product.price}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Cantidad seleccionada: {product.quantity}
                    </Typography>
                 
                  </CardContent>
                </Box>
                <Grid container sx={{flexDirection:"row", m:"auto"}}>
                <Grid item xs={1}>
                        <Button sx={{ color: 'black'}} onClick={() => incrementItem(product)}>
                         <Box sx={{fontSize:"25px"}}> +</Box>
                        </Button>
                      </Grid>
                      <Grid item xs={5}>
                        <Button sx={{ color: 'black'}} onClick={() => decrementItem(product)}>
                        <Box sx={{fontSize:"25px"}}>-</Box>
                        </Button>
                      </Grid>
                 <Grid item xs={2}>
                  <Typography variant='h6'>
                    $ {product.price * product.quantity}
                  </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))
        ) : (
          <Box sx={{ bgcolor: 'black', width: '100%', m: 'auto', py: 5 }}>
            <Box sx={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }}>No hay productos en el carrito</Box>
          </Box>
        )}
      </Grid>
    </Box>

    {/* DETALLES DE COMPRA */}
    <DetalleCompra/>
 
  </Box>
);



}

export default CartItems;