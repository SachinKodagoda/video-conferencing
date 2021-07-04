import { AnimationContextProvider } from '@ctx/AnimationContext';
import { CartContextProvider } from '@ctx/CartContext';
import { UserContextProvider } from '@ctx/UserContext';
import '@styles/globals.sass';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <title>{process.env.APP_NAME}</title>
        <meta
          name='viewport'
          content='width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no, shrink-to-fit=no'
        />
        <meta name='author' content='Duminda Kodagoda' />
        <meta name='keywords' content='Davinci Arts' />
        <meta name='description' content='Art for everyone' />
        <meta name='theme-color' content='#000' />
        <meta name='apple-mobile-web-app-status-bar-style' content='#000' />
      </Head>

      <UserContextProvider>
        <CartContextProvider>
          <AnimationContextProvider>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </AnimationContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
};
export default MyApp;
