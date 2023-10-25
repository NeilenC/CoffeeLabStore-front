import Image from 'next/image'
import React from 'react'
import { Inter } from 'next/font/google'
import Products from '@/commons/Products'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Categories from '@/components/Categories'
import { useSelector } from 'react-redux'
// import { UserInfo } from '@/redux/userInfo';

const inter = Inter({ subsets: ['latin'] })

interface RootState {
  user: string[]
}

export default function Home() {
  const user = useSelector((state: RootState) => state.user)

  console.log("USERRRRR", user)
  return (
    <>
    <Categories/>
    <Products/>
    </>
  )
}
