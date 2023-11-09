import React, { useEffect } from 'react'
import {Box, Grid, Card, CardContent, Typography, Button} from '@mui/material'
import Cart from '../components/Cart'
import { useSelector } from 'react-redux'
import { CartState, Product } from '@/commons/types.interface'
import Link from 'next/link'
import Image from 'next/image'
import AddToCartButtom from '@/commons/AddToCartButtom'

const cart = () => {

  console.log("CART", cart)
  return (
    <Cart/>
)
}

export default cart