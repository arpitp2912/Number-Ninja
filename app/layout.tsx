import "./globals.css"
import React from "react"

export const metadata = {
  title:"Number Ninja",
  description:"Precision logic & speed"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="blob w-72 h-72 rounded-full bg-gradient-to-br from-ninja-primary to-ninja-secondary animate-floatBlob absolute left-8 top-6 opacity-20 pointer-events-none"></div>
        <div className="blob w-56 h-56 rounded-full bg-gradient-to-br from-ninja-secondary to-ninja-primary animate-floatBlob absolute right-8 bottom-10 opacity-18 pointer-events-none"></div>
        {children}
      </body>
    </html>
  )
}