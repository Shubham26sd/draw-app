import { initDraw } from "@/app/draw"
import { useEffect, useRef, useState } from "react"
import { IconButton } from "./Icons"
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react"

type Shape = "circle" | "rect" | "pencil"

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string
  socket: WebSocket
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [selectedTool, setSelectedTool] = useState<Shape>("rect")

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
    //@ts-ignore
    window.selectedTool = selectedTool
  }, [selectedTool])

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket)
    }
  }, [])

  return (
    <div className="h-screen overflow-hidden">
      <canvas ref={canvasRef} width={size.width} height={size.height}></canvas>
      <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  )
}

function TopBar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Shape
  setSelectedTool: (s: Shape) => void
}) {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2">
      <div className="flex gap-2">
        <IconButton
          activated={selectedTool == "pencil"}
          icon={<Pencil />}
          onClick={() => {
            setSelectedTool("pencil")
          }}
        />
        <IconButton
          activated={selectedTool == "rect"}
          icon={<RectangleHorizontalIcon />}
          onClick={() => {
            setSelectedTool("rect")
          }}
        />
        <IconButton
          activated={selectedTool == "circle"}
          icon={<Circle />}
          onClick={() => {
            setSelectedTool("circle")
          }}
        />
      </div>
    </div>
  )
}
