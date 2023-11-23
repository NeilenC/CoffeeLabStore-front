import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartState, Product, UserState } from './types.interface'
import { addToCart, removeFromCart } from '@/redux/actions';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from '@mui/material';


const AddToCartButtom = ({product, quantity}: any) => {
   const cart = useSelector((state: CartState) => state.cart)
   const user = useSelector((state: UserState) => state.user)
   const userId = user._id
   const dispatch = useDispatch()

   function addItemToCart(product: Product, quantity:number, userId:string ) {
       dispatch(addToCart(product, quantity, userId ))
    }

  return (
    <Button
              onClick={() => addItemToCart(product, quantity, userId)}
              sx={{ fontWeight:"bold", '&:hover': {color:"white", bgcolor:"black"}}}
              variant="contained"
              color="primary"
              fullWidth
            >   
              Agregar al &nbsp;
              <ShoppingCartOutlinedIcon/>
            </Button>
  )
}

export default AddToCartButtom