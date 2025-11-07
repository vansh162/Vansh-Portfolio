// Next.js Pages Router App with Vercel Analytics
// Use this file if you migrate to Next.js Pages Router

import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

