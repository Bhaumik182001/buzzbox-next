import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import { SessionProvider } from "next-auth/react"
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { Toaster } from 'react-hot-toast';

/**
 * Components are wrapped in AppolloProvider and Session Provider with Head, Header and Toaster render before childern Components
 */
function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
  <ApolloProvider client={client}>
  {/* session provided by different providers through next auth */}
    <SessionProvider session={session}>
      {/* wrap containr to include Head and Header */}
      <div className='h-screen overflow-y-scroll'>
        {/* Next js's Head component for icon and label */}
        <Head>
            <title>Buzz Box</title>
            <meta name="description" content="Buzz Box" />
            <link rel="icon" href="https://i.imgur.com/ZnrUWVB.png" />
        </Head>
        {/* Header passing as a global component through _app */}
        <Header />
        <Toaster />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  </ApolloProvider>
  )
}

export default MyApp
