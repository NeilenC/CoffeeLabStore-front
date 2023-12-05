import React,{useEffect,useState} from 'react'
import { CartState } from './types.interface'
import { useSelector } from 'react-redux'
import { Box, Button, TextField, Typography, Grid, Divider } from '@mui/material';
import { useRouter } from 'next/router';

const calculateTotalQuantity = (cart: any) => {
    return cart.reduce((total: any, product: any) => {
      return total + product.quantity;
    }, 0);
  };

const DetalleCompra = () => {
    const cart = useSelector((state:CartState) => state.cart)
    const totalQuantity = calculateTotalQuantity(cart.cart);
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter()

    const handleButtonClick = async () => {
      const productDetails = cart.cart.map((product: any) => ({
        productId: product._id,
        quantity: product.quantity
       }));
  
      try {
        const response = await fetch(`http://localhost:8000/cart/${cart.userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productDetails }),
        });
        if(response.ok) {
          router.push('/order');
        }
  
      } catch (error) {
        console.error('Error al enviar el carrito al backend', error);
      }
  };

    useEffect(() => {
        function totalPriceCounter() {
          let newTotalPrice = 0;
          cart.cart.forEach((product: any) => {
            const productTotal = product.price * product.quantity;
            newTotalPrice += productTotal;
          });
          setTotalPrice(newTotalPrice);
        }
      
        totalPriceCounter();
      }, [cart]);

      

    return (
      <Box sx={{width:"40%"}}>
      <Box>

          {cart.cart.length > 0 && (
        <Box width="30%" sx={{width:"50%" , m:"auto"}}>
          <Box sx={{p: 3, borderRadius: 2, width: '90%', ml: 'auto',  mr: 4 , bgcolor:"white"}}>
              <Typography variant='h6'>
              Resumen de compra
            </Typography>
            <Divider />
  
            <Typography sx={{py:1}}>
                Productos {totalQuantity}
            </Typography>
            
            <Typography variant='body1'>
              Total ${totalPrice}
            </Typography>
  
          {/* {window.location.pathname == '/cart' ?  */}
                <Button sx={{color: 'black', mt: 3, bgcolor:"lightblue" , mx:"auto" }}
                 onClick={handleButtonClick}>
                Continuar compra
                </Button>
              {/* : null } */}
           </Box>
        </Box>
      )}
      </Box>
      </Box>
    )
}

export default DetalleCompra