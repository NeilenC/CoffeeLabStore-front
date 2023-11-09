import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartState, Product } from './types.interface'
import { addToCart, removeFromCart } from '@/redux/actions';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from '@mui/material';


const AddToCartButtom = ({product, quantity}: any) => {


   const cart = useSelector((state: CartState) => state.cart)
   const dispatch = useDispatch()

   
   function addItemToCart(product: Product, quantity:number) {
       dispatch(addToCart(product, quantity))
    }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); 

  return (
    <Button
              onClick={() => addItemToCart(product, quantity)}
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