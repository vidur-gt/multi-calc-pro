
import "./globals.css";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`} crossOrigin="anonymous"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
