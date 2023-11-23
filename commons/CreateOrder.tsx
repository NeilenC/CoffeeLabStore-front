import React, {useEffect, useState} from 'react'
import {Box, Button} from '@mui/material'
import { CartState } from './types.interface';
import { useSelector } from 'react-redux';

const CreateOrder = () => {
 const cart = useSelector((state: CartState) => state.cart)

 console.log("CARRITO E" , cart)
 
    useEffect(() => {
        const sendCartToBackend = async () => {
          if (cart.cart.length === 0 && !cart.userId) {
            return; 
          }
          try {
            const response = await fetch(`http://localhost:8000/cart/${cart.userId}`, {
                method:"POST",
                // body: {cart.cart}
            });
    
            // console.log(response.data); // Muestra la respuesta del backend en la consola
    
            // Puedes realizar otras acciones después de un envío exitoso, si es necesario
    
          } catch (error) {
            console.error('Error al enviar el carrito al backend', error);
          } 
        };
    
        // Llama a la función para enviar el carrito cuando el componente se monta o cuando cambia el carrito
        sendCartToBackend();
    
        // Dependiendo de tus necesidades, puedes agregar otras dependencias al array de dependencias del useEffect
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
  return (
   <Box>
    <Button sx={{color:"black"}}>Crear orden</Button>
   </Box>
  )
}

export default CreateOrder