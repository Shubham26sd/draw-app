"use client"

import { BACKEND_URL } from "@/config"
import { Button } from "@repo/ui/button"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function CreateRoomPage() {
  const router = useRouter()
  const [roomName, setRoomName] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/signin")
    }
  }, [router])

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/signin")
      return
    }

    if (!roomName.trim()) {
      toast.error("Please enter a room name")
      return
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/room`,
        { name: roomName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      toast.success("Room created successfully")
      router.push(`/canvas/${response.data.roomId}`)
    } catch (error) {
      console.error(error)
      toast.error("Unable to create room. Try a different name.")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h1 className="text-2xl font-bold">Create room</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Start a fresh whiteboard and invite your team.
          </p>

          <form className="mt-6 space-y-4" onSubmit={createRoom}>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-zinc-300">
                Room name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="sprint-planning"
                className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-sm text-white outline-none transition focus:border-white"
              />
            </div>

            <Button className="w-full" variant="primary">
              Create room
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-zinc-400">
            Have an invite?{" "}
            <Link className="underline underline-offset-4" href="/join-room">
              Join room
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
