import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Calculator } from 'lucide-react'
import Script from "next/script";

export const metadata: Metadata = {
  title: 'S-Money | Smart Financial Calculators',
  description: 'Free EMI, SIP, FD, and Income Tax calculators with smart tax-saving suggestions. Built for precision and simplicity.',
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
      <body>
        <nav className="navbar">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)' }}>
            <Calculator className="w-6 h-6" />
            <span>S-Money</span>
          </Link>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            <Link href="/emi-calculator" style={{ color: 'var(--secondary-foreground)' }}>EMI</Link>
            <Link href="/sip-calculator" style={{ color: 'var(--secondary-foreground)' }}>SIP</Link>
            <Link href="/fd-calculator" style={{ color: 'var(--secondary-foreground)' }}>FD</Link>
            <Link href="/income-tax-calculator" style={{ color: 'var(--primary)', fontWeight: 600 }}>Income Tax</Link>
          </div>
        </nav>
        <main className="container animate-fade-in">
          {children}
        </main>
        <footer style={{ textAlign: 'center', padding: '3rem', borderTop: '1px solid var(--border)', marginTop: '4rem', color: 'var(--accent)' }}>
          <p>&copy; {new Date().getFullYear()} S-Money. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
