import { useEffect, useRef, useState } from "react"
import { IconButton } from "./Icons"
import { Circle, RectangleHorizontalIcon, Ruler, Pencil } from "lucide-react"
import { Game } from "@/app/draw/Game"

export type Tool = "circle" | "rect" | "line" | "pencil"

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string
  socket: WebSocket
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [selectedTool, setSelectedTool] = useState<Tool>("rect")
  const [game, setGame] = useState<Game>()

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

  //tool sync
  useEffect(() => {
    game?.setTool(selectedTool)
  }, [selectedTool, game])

  //canvas redraw on resize
  useEffect(() => {
    game?.clearCanvas()
  }, [size])

  //game initialization
  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket)
      setGame(g)

      return () => {
        g.destroy()
      }
    }
  }, [socket])

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
  selectedTool: Tool
  setSelectedTool: (s: Tool) => void
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
          activated={selectedTool == "line"}
          icon={<Ruler />}
          onClick={() => {
            setSelectedTool("line")
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
