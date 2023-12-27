import Navbar from "@/components/Navbar";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import store, {persistor} from "@/redux/store";
import { Provider } from "react-redux";
import theme from "../styles/theme";
import Layout from "@/components/Layout";
import { PersistGate } from "redux-persist/integration/react";

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
    if (typeof window !== "undefined") {
      const savedCartString = localStorage.getItem("cart");
      const savedCart = savedCartString ? JSON.parse(savedCartString) : [];
      store.dispatch({ type: "INITIALIZE_CART", payload: savedCart });
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
