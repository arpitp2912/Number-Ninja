"use client"
import React from "react"

export default function OptionCard({
  value,
  onSelect,
  idx,
  disabled
}:{
  value:number
  onSelect:()=>void
  idx:number
  disabled?:boolean
}){

  return(
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`
        option-card
        w-full p-10 text-4xl font-semibold
        transition-all duration-150
        hover:-translate-y-1
        hover:shadow-2xl
        active:scale-95
        relative
        overflow-hidden
        ${disabled?"opacity-60":""}
      `}
      style={{transitionDelay:`${idx*40}ms`}}
    >
      {value}
    </button>
  )
}