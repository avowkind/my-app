import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'
import '@fontsource/roboto-mono' // Defaults to weight 400.
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
