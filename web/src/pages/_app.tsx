import { AppProps } from 'next/app';

import { QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';

import { queryClient } from '../services/queryClient';
import { theme } from '../styles/theme';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer limit={8} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp;
