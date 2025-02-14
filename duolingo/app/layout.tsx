import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Duolingo",
  description: "Learn languages with Duolingo",
    generator: 'khaled'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex min-h-screen bg-[#ffffff]">
       
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        
        </div>
      </body>
    </html>
  )
}



import './globals.css'