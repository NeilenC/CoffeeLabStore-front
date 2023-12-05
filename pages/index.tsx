import React from 'react'
import { Inter } from 'next/font/google'
import Products from '@/commons/Products'
import cafe from '../public/cafe.png'
import osloweb from '../public/osloweb.png'
import trinity from '../public/trinity.png'
import ImageCarousel from '@/commons/Carousel'
import Map from '@/commons/deliveryMail'

const inter = Inter({ subsets: ['latin'] })

const images = [
  { src: cafe, alt: 'imagen' },
  { src: osloweb, alt: 'imagen'},
  { src: trinity, alt: 'imagen'},
];

export default function Home() {

  return (
    <>
    <ImageCarousel images={images}/>
    <Products/>
    <Map/>

    </>
  )
}
