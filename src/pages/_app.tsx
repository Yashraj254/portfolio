import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import Head from "next/head";
import { Metadata } from "next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <meta name="author" content="Yashraj Singh" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
