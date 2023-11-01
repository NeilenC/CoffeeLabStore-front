import Image from 'next/image'
import React from 'react'
import { Inter } from 'next/font/google'
import Products from '@/commons/Products'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Categories from '@/components/Categories'
import { useSelector } from 'react-redux'
import { UserState } from '@/commons/types.interface'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const user = useSelector((state: UserState) => state.user)

  return (
    <>
    <Categories/>
    <Products/>
    </>
  )
}
