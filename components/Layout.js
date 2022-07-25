import React from 'react'
import Head from 'next/head'
import NavBar from './NavBar'
import Footer from './Footer'
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>PFR FFF Batch Codes</title>
        <meta
          key='viewport'
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <meta
          name='description'
          content='Plant and Food Research NZ, Tool to Allocate batch code ids.'
        />
        <meta property='og:title' content='PFR FFF Batch Codes' />
        <meta
          property='og:description'
          content='Plant and Food Research NZ, Tool to Allocate batch code ids.'
        />
      </Head>
      <div className='flex flex-col min-h-screen'>
        <NavBar />
        <main className='container mx-auto flex-grow'>{children}</main>
        <Footer />
      </div>

    </>
  )
}

export default Layout
