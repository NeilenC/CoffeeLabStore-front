import React, { useEffect, useState } from 'react'
import {Box} from '@mui/material'
import { useSelector } from 'react-redux';
import { OrderState, UserState } from "../../commons/types.interface";


const historial = () => {
  const user = useSelector((state:UserState) => state.user)
  const [orders, setOrders] = useState<OrderState | null>(null); 
  const [cartId, setCartId] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/order/${user._id}`, { method: 'GET' });
  
        if (!response.ok) {
          throw new Error('Error');
        }
  
        const orderData = await response.json();
  
        setOrders(orderData);

        const cartId = orderData.cartId[0]._id
        setCartId(cartId)

      } catch (error) {
        console.log('Error fetching data:');
      }
    };
  
    fetchData();
  
  }, [user._id]);


  useEffect(() => {

    const getCart = async () => {
      try {
        const response = await fetch(`http://localhost:8000/cart/${cartId}`, { method: 'GET' });
  
        if (!response.ok) {
          throw new Error('Error');
        }
  
        const cartData = await response.json();

        console.log("CARTDATA", cartData)

      } catch (error) {
        console.log('Error fetching data:');
      }
    };
  
    getCart();
  
  }, [user._id]);

  
  return (
    <Box>
      hola
    </Box>
  )
}

export default historial