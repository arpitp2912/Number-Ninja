"use client"
import React from "react"

export default function TimerBar({ pct }: { pct:number }) {
  const color = pct > 70 ? "bg-ninja-safe" : pct > 30 ? "bg-ninja-warn" : "bg-ninja-danger"
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>TIME REMAINING</span>
        <span className="text-ninja-primary font-semibold">{(pct/100* ( (pct>50)?5: (pct>20?5:2) )).toFixed(1)}s</span>
      </div>
      <div className="timer-track">
        <div className={`timer-fill ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}