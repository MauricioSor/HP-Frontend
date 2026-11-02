'use client'

import Navbar from './Navbar'
import Footer from './Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  )
}
