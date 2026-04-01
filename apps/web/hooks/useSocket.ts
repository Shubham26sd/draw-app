
import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true)
    const [socket, setSocket] = useState<WebSocket>()

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNzVhZjM5Ny0zMWZiLTRmMjgtOWM4NC1hMWQzZWU5MGEyMzciLCJpYXQiOjE3NzQ5NjE3OTd9.DRoLoUrSpH32JWuO4OMNmrhvAwPOzHww6cruPMb3eCQ")
        ws.onopen = () => {
            setLoading(false)
            setSocket(ws)
        }
    }, [])

    return {
        socket,
        loading
    }

}