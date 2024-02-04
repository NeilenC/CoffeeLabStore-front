import { Box, Button, Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product, UserState } from './types.interface'
import { decrementCartItem, incrementCartItem, removeFromCart } from '@/redux/actions'

const CartCard = ({product}:any) => {
  const isMediumScreen = useMediaQuery('(max-width: 950px)')
  const isMidScreen = useMediaQuery('(max-width: 800px)')
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const userId = useSelector((state: UserState) => state.user._id);
  const dispatch = useDispatch()

    function incrementItem(product: Product) {
        dispatch(incrementCartItem(product, userId));
      }
    
      function decrementItem(product: Product) {
        dispatch(decrementCartItem(product, userId));
      }
    
      function deleteFromCart(product: Product) {
        dispatch(removeFromCart(product, userId));
      }

  return (
    <Grid 
    item 
    key={product._id} 
    xs={12} 
    sx={{pb: isSmallScreen ? "40%": (isMediumScreen || isMidScreen ? "26%": 1)}}
    >
      <Card
        sx={{
          borderRadius: 2,
          display: "flex",
          flexDirection: "row", 
          maxHeight: isSmallScreen || isMediumScreen ? "75%" : "97%",
           maxWidth: "100%",
        }}
      >
          <Link href={`/products/${product._id}`}>
            <Image  
              src={product.imageURL[0]}
              width={220}
              height={220}
              alt={product.name}
            />
          </Link>

        {/* Detalles del producto */}
        <Box sx={{ width: "50%", pl: 2, m: "auto" }}>
          <CardContent>
            <Typography variant="h6" color="initial" sx={{ pb: 2 }}>
              {product.name}
            </Typography>
            <Typography variant="body2" sx={{ pb: 0.5 }}>
              Precio por unidad: ${product.price}
            </Typography>
            <Typography variant="body2" sx={{ pb: 0.5 }}>
              Cantidad seleccionada: {product.quantity}
            </Typography>

            {product.category.name === "Café" && product.productPreferences?.grind ? (
              <Typography variant="body2">
                {" "}
                Molido para: {product.productPreferences?.grind}
              </Typography>
            ) : <Box>
               <Typography variant="body2">
                {" "}
                Café en grano
              </Typography>
              </Box>}

            <Grid
              container
              spacing={2}
              sx={{ pt: 2, color: "black"  }}
            >
              <Grid item xs={6}>
                <Button
                  sx={{ color: "black",  '&:hover': {bgcolor:"whitesmoke"} }}
                  onClick={() => deleteFromCart(product._id)}
                >
                  eliminar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
        <Grid container sx={{ flexDirection: "row", m: "auto" }}>
          <Grid item xs={1}>
            <Button
              sx={{ color: "black" }}
              onClick={() => incrementItem(product)}
            >
              <Box sx={{ fontSize: "25px" }}> +</Box>
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              sx={{ color: "black", ml: 3 }}
              onClick={() => decrementItem(product)}
            >
              <Box sx={{ fontSize: "25px" }}>-</Box>
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">
              $ {product.price * product.quantity}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default CartCard