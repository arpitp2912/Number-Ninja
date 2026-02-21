"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function ResultPage() {
  const [last, setLast] = useState<number | null>(null)
  const [best, setBest] = useState<number | null>(null)
  const [isNew, setIsNew] = useState(false)
  useEffect(()=>{
    const l = parseInt(localStorage.getItem("lastScore") || "0", 10) || 0
    const b = parseInt(localStorage.getItem("bestScore") || "0", 10) || 0
    setLast(l || null)
    setBest(b || null)
    setIsNew(l > b)
  },[])
  return (
    <main className="w-full max-w-2xl mx-auto px-6 text-center py-12">
      <h1 className="text-6xl font-extrabold text-ninja-text">GAME OVER</h1>

      <div className="mt-10 card p-8">
        <div className="text-sm text-gray-500">FINAL PERFORMANCE</div>
        <div className="mt-6 flex items-end justify-center gap-4">
          <div className="text-xl text-ninja-primary font-semibold">STREAK</div>
          <div className="text-6xl font-extrabold">{last ?? 0}</div>
        </div>

        <div className={`mt-4 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white shadow-sm ${isNew ? 'animate-pulse ring-2 ring-ninja-primary/30' : ''}`}>
          <span>🏆 PERSONAL BEST:</span>
          <span className="font-semibold">{best ?? 0}</span>
        </div>

        <div className="mt-8">
          <Link href="/game" className="inline-block">
            ↻ PLAY AGAIN
          </Link>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <Link href="/" className="underline">Back to Menu</Link>
        </div>
      </div>
    </main>
  )
}