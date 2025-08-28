import '../styles/globals.css'
import type { ReactNode } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* <auto-gen start: crew-site-mimicker> */}
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        {/* <auto-gen end: crew-site-mimicker> */}
      </body>
    </html>
  )
}
