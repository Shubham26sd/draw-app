"use client"

import { WS_URL } from "@/config"
import { useEffect, useState } from "react"
import { Canvas } from "./Canvas"

export default function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=${localStorage.getItem("token")}`)

    ws.onopen = () => {
      setSocket(ws)
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        }),
      )
    }
    return () => {
      ws.close()
    }
  }, [roomId])

  if (!socket) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <>Connecting to server...</>
      </div>
    )
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  )
}
