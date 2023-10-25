import Navbar from '@/components/Navbar'
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useMemo } from 'react';
import Footer from '@/components/Footer';
import store from '@/redux/store';
import { Provider } from 'react-redux'
export default function App({ Component, pageProps }: AppProps) {

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#f0f0f0', 
          },
        },
      }),
    [],
  );

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
