import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {SessionProvider} from 'next-auth/react';
// import CredentialsProvider from "next-auth/providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
