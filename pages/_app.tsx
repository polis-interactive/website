import '../styles/globals.css'
import type { NextPageWithLayout } from '../types'
import type { AppProps } from 'next/app'

import Layout from '../components/layouts/default-layout'


type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout
      ? Component.getLayout
      : Layout

  return getLayout(<Component {...pageProps} />)

}

export default App
