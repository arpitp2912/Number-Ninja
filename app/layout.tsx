import "./globals.css"
import React from "react"

export const metadata = {
  title: "Number Ninja",
  description: "Precision logic & speed",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center relative overflow-hidden">

        {/* ✅ Keep ONLY the TOP ambient blob */}
        <div
          className="
            blob
            w-72
            h-72
            rounded-full
            bg-gradient-to-br
            from-ninja-primary
            to-ninja-secondary
            animate-floatBlob
            absolute
            left-8
            top-6
            opacity-20
            pointer-events-none
          "
        />

        {/* ❌ Removed bottom purple blob (was breaking mobile taps) */}

        {children}
      </body>
    </html>
  )
}