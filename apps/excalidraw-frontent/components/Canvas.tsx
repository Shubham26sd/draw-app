import { initDraw } from "@/app/draw"
import { useEffect, useRef, useState } from "react"

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string
  socket: WebSocket
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  //window resizing useEffect
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
      initDraw(canvasRef.current, roomId, socket)
    }
  }, [])

  return (
    <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
  )
}
