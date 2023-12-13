import Navbar from '@/components/Navbar'
import React, { useEffect } from 'react'
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useMemo } from 'react';
import Footer from '@/components/Footer';
import store from '@/redux/store';
import { Provider } from 'react-redux'
import theme from '../styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  
  
  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         primary: {
  //           main: '#f0f0f0', 
  //         },
  //       },
  //     }),
  //     [],
  //     );
      
      
        useEffect(() => {
          if (typeof window !== 'undefined') {
            const savedCartString = localStorage.getItem('cart');
            const savedCart = savedCartString ? JSON.parse(savedCartString) : [];
            store.dispatch({ type: 'INITIALIZE_CART', payload: savedCart });
          }
        }, []);

        
  return (
   <Provider  store={store}>
    <ThemeProvider theme={theme}>
   
      <CssBaseline />
     <Navbar/>
     <Component {...pageProps} />
     {/* <Footer/> */}
    </ThemeProvider>


    </Provider>
  );
}
