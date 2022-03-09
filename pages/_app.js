import React, { useEffect } from "react";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
