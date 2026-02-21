"use client"
import React from "react"

export default function EquationDisplay({ expression }: { expression:string }) {
  return (
    <div className="w-full flex items-center justify-center mt-8 relative">
      <h2 className="text-7xl md:text-8xl font-extrabold tracking-tight text-ninja-text animate-ninjaPop">
        {expression}
      </h2>
    </div>
  )
}