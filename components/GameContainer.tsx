"use client"

import React, { useEffect, useRef, useState } from "react"
import { generateQuestion, Question } from "../lib/generateQuestion"
import TimerBar from "./TimerBar"
import EquationDisplay from "./EquationDisplay"
import OptionCard from "./OptionCard"
import { useRouter } from "next/navigation"

export default function GameContainer(){

  const router = useRouter()

  const [streak,setStreak] = useState(0)
  const [best,setBest] = useState<number>(()=>{
    try{
      return parseInt(localStorage.getItem("bestScore")||"0",10)||0
    }catch{
      return 0
    }
  })

  const [question,setQuestion] = useState<Question>(()=> generateQuestion(0))
  const [isFail,setIsFail] = useState(false)
  const [flashFast,setFlashFast] = useState(false)
  const [impactShow,setImpactShow] = useState(false)
  const [disabled,setDisabled] = useState(false)

  // 🕒 TIMER — 10 seconds base
  const [timerMs,setTimerMs] = useState(5000)
  const expiryRef = useRef(Date.now()+timerMs)
  const [now,setNow] = useState(Date.now())
  const tickRef = useRef<number|null>(null)

  // dynamic difficulty timer reduction
//  useEffect(()=>{
//    const base = 10000
//    const reduction = Math.min(6000, Math.floor(streak*60))
//    const next = Math.max(2500, base-reduction)
//    setTimerMs(next)
//  },[streak])

  useEffect(()=>{
    expiryRef.current = Date.now() + timerMs
  },[timerMs,question])

  useEffect(()=>{
    if(tickRef.current) window.clearInterval(tickRef.current)
    tickRef.current = window.setInterval(()=> setNow(Date.now()),50)
    return ()=>{ if(tickRef.current) window.clearInterval(tickRef.current) }
  },[])

  useEffect(()=>{
    if(isFail) return
    if(Date.now() >= expiryRef.current){
      triggerFail()
    }
  },[now,isFail])

  const newQ = (s=streak)=>{
    setQuestion(generateQuestion(s))
   // expiryRef.current = Date.now() + timerMs
  }

  const triggerFail = ()=>{
    setIsFail(true)
    const newBest = Math.max(best,streak)

    try{
      localStorage.setItem("bestScore",String(newBest))
      localStorage.setItem("lastScore",String(streak))
    }catch{}

    setTimeout(()=> router.push("/result"),220)
  }

  const handleCorrect = (elapsedMs:number)=>{
    setStreak(s=>s+1)

    // impact flash
    setImpactShow(true)
    setTimeout(()=> setImpactShow(false),140)

    // FAST badge
    if(elapsedMs < 800){
      setFlashFast(true)
      setTimeout(()=> setFlashFast(false),260)
    }

    setDisabled(true)
    setTimeout(()=>{
      setDisabled(false)
      newQ(streak+1)
    },120)
  }

  const handleWrong = ()=>{
    triggerFail()
  }

  const handleSelect = (value:number)=>{
    if(isFail || disabled) return

    const elapsed =
      timerMs - Math.max(0, expiryRef.current - Date.now())

    if(value === question.answer){
      handleCorrect(elapsed)
    }else{
      handleWrong()
    }
  }

  const pct = Math.max(
    0,
    Math.min(
      100,
      Math.round(((expiryRef.current-now)/timerMs)*100)
    )
  )

  return(
    <div className="w-full max-w-3xl mx-auto py-6 relative">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className={`flex items-center gap-3 ${streak>=5?"text-ninja-primary":"text-gray-600"}`}>
          <div className="text-sm">🔥 Streak</div>
          <div className="text-2xl font-extrabold">{streak}</div>
        </div>

        <div className="text-sm text-gray-600">
          Best: <span className="font-semibold">{best}</span>
        </div>
      </div>

      {/* Timer */}
      <TimerBar pct={pct}/>

      {/* Card */}
      <div className="card p-8 mt-6 relative overflow-hidden">

        {/* Impact ripple */}
        {impactShow && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:"linear-gradient(90deg, rgba(99,102,241,0.08), rgba(139,92,246,0.12))"
            }}
          />
        )}

        {/* Streak aura */}
        {streak>=5 && (
          <div className="absolute inset-0 blur-xl opacity-40 bg-ninja-primary/20 pointer-events-none"/>
        )}

        <EquationDisplay expression={question.expression}/>

        {/* OPTIONS — ONLY ONE GRID (FIXED) */}
        <div className="grid grid-cols-2 gap-6 mt-10">
          {question.options.map((opt,idx)=>(
            <div key={idx} className="relative group">

              {/* Ripple */}
              <span className="absolute inset-0 rounded-2xl scale-0 group-active:scale-110 bg-ninja-primary/10 transition-transform duration-200"></span>

              <OptionCard
                value={opt}
                idx={idx}
                disabled={disabled}
                onSelect={()=> handleSelect(opt)}
              />
            </div>
          ))}
        </div>

        {/* FAST badge */}
        {flashFast && (
          <div className="mt-6 flex justify-center">
            <div className="fast-badge">⚡ FAST!</div>
          </div>
        )}

      </div>
    </div>
  )
}