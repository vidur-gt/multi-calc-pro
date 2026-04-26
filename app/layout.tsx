import './globals.css'
import type { Metadata } from 'next'
import Script from "next/script";
import Disclaimer from "@/components/ui/Disclaimer";
import SiteNav from "@/components/SiteNav";
import RouteScrollReset from "@/components/RouteScrollReset";

export const metadata: Metadata = {
  title: 'S-Money | Save Smarter, Not Harder',
  description: 'Free EMI, SIP, FD, and Income Tax calculators with smart tax-saving suggestions. Save smarter, not harder.',
  keywords: 'EMI calculator, SIP calculator, Income Tax calculator India, FD calculator, Financial tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX'}`} crossOrigin="anonymous"/>
      </head>
      <body className="flex min-h-screen flex-col">
        <RouteScrollReset />
        <SiteNav />
        <main className="site-shell app-main w-full flex-grow animate-fade-in">
          {children}
        </main>
        <Disclaimer />
      </body>
    </html>
  )
}
