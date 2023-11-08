import { CartState, Product } from '@/commons/types.interface'
import {Box} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const cart = useSelector((state:CartState) => state.cart)

  return (
    <Box>
    {cart ? cart.cart.map((product: Product)=>{
        <Box key={product._id}>
            {product.name}
        </Box>
    }): <Box>No existe tal carrito</Box>
        
        
        }
    </Box>
  )
}

export default Cart