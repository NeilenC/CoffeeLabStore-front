import Navbar from '@/components/Navbar'
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useMemo } from 'react';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  // Define un tema personalizado (puedes personalizarlo según tus necesidades)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#f0f0f0', // Color principal personalizado
          },
        },
        // Agrega otras configuraciones de tema según tus necesidades
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     <Navbar/>
        <Component {...pageProps} />
     <Footer/>
    </ThemeProvider>
  );
}
