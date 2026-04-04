"use client"
import { initDraw } from "@/app/draw"
import { useEffect, useRef, useState } from "react"

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {

    if (canvasRef.current) {
      initDraw(canvasRef.current)
    }
    
  }, [])

  return (
    <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
  )
}
