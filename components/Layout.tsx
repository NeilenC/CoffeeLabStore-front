import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}:any) => {
  return (
    <>
    <Navbar/>
    {children}
    <Footer/>
    </>
  )
}

export default Layout