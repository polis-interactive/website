import '../styles/globals.css'
import type { NextPageWithLayout } from 'types'
import type { AppProps } from 'next/app'

import Layout from 'layouts/default-layout'

import '../src/assets/fontawesome'

import { ChakraProvider } from '@chakra-ui/react'

import theme from '../src/assets/theme'

import Head from 'next/head'


type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}



function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout
      ? Component.getLayout
      : Layout

  return (
      <>
          <Head>
              <title>Polis Interactive</title>
          </Head>
        <ChakraProvider theme={theme}>
            { getLayout(<Component {...pageProps} />) }
        </ChakraProvider>
      </>
  )
}

export default App
