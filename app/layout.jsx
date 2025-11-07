// Next.js App Router Layout with Vercel Analytics
// Use this file if you migrate to Next.js App Router

import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

