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
    sx={{
     pb: isSmallScreen ? "40%": (isMediumScreen || isMidScreen ? "26%": 1),
    }}
    >
      <Card
        sx={{
          borderRadius: 2,
          display: "flex",
          flexDirection: "row", 
          maxHeight:  "95%",
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
        <Grid container 
        sx={{ 
            width: isSmallScreen || isMediumScreen ? "70%" : "70%", 
            }}>
          <CardContent >
            <Grid item xs={12}>
            <Typography 
            variant={isMediumScreen || isSmallScreen? "body2" : "h6"} color="initial"
             sx={{ 
             pb: 1, 
             whiteSpace: 'nowrap', 
             maxWidth: isSmallScreen ? "70px" : "100%"
            }}>
              {product.name}
            </Typography>
            </Grid>

            <Grid item xs={12} >
            <Typography 
             sx={{ pb: 0.5, fontSize:  isSmallScreen || isMediumScreen ?  "11px" : "15px", }}>
              Precio por unidad: ${product.price}
            </Typography>
            </Grid>

            <Grid item xs={12} >
            <Typography 

             sx={{ pb: 0.5, fontSize:  isSmallScreen || isMediumScreen ?  "11px" : "15px", }}>
              Cantidad seleccionada: {product.quantity}
            </Typography>
            </Grid>


            {product.category.name === "Café" && product.productPreferences?.grind ? (
             <Grid item xs={12} >
                <Typography 
                sx={{ fontSize:  isSmallScreen || isMediumScreen ?  "11px" : "15px",}}
                >
                {" "}
                Molido para: {product.productPreferences?.grind}
              </Typography>
            </Grid>
            ) : <Box>
               <Typography 
                sx={{ 
                fontSize:  isSmallScreen || isMediumScreen ?  "11px" : "15px",
               }}
               >
                Café en grano
              </Typography>
              </Box>}

            <Grid
              container
              spacing={2}
              sx={{ pt: 2, color: "black"  }}
            >
              <Grid item xs={6} sm={2}>
                <Button
                sx={{
                 color: "black", 
                 '&:hover': {bgcolor:"whitesmoke"},
                 fontSize:  isSmallScreen || isMediumScreen ? "0.7rem" : "0.9rem", 
                }}
                 onClick={() => deleteFromCart(product._id)}
                >
                  eliminar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid container xs={12} 
         sx={{
         position:"sticky",
         mr:1,
         flexDirection: isSmallScreen || isMediumScreen ? "column" : "row", m: "auto", }}>

          <Grid item xs={1} sm={1} sx={{ pt:1}}>
            <Button
              sx={{ 
                fontSize:  isSmallScreen || isMediumScreen ?  "20px" : "25px",
                color: "black" , 
                bgcolor:"whitesmoke",
                
            }}
              onClick={() => incrementItem(product)}
            >
              <Box > +</Box>
            </Button>
          </Grid>
          <Grid item xs={5}  sm={1}
           sx={{
            pt:1 ,  
            pl:  !isSmallScreen || !isMediumScreen ? 3 : null}}>
            <Button
              sx={{ 
                fontSize:  isSmallScreen || isMediumScreen  ?  "20px" : "25px",
                color: "black", 
                ml: !isSmallScreen || !isMediumScreen || !isMidScreen ? 3 : null,  
                bgcolor:"whitesmoke", 
                m: isSmallScreen || isMediumScreen ? "auto" : null}}
              onClick={() => decrementItem(product)}
            >
              <Box sx={{  }}>-</Box>
            </Button>
          </Grid>
          <Grid item xs={12}  sm={5} 
          sx={{
          m: "auto" ,
          ml: isSmallScreen ? 1 : null,
          pt: isSmallScreen || isMediumScreen ? 2 : null
          }}>

            <Typography sx={{ 
                fontSize:  isSmallScreen ? "13px" : ( isMediumScreen || isMidScreen  ? "18px"  : "22px"),
                 textAlign: "right" }}>
              $ {product.price * product.quantity}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default CartCard