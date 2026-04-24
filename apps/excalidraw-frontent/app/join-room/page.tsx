"use client"
import { Button } from "@repo/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function JoinRoomPage() {
  const router = useRouter()
  const [roomId, setRoomId] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/signin")
    }
  }, [router])

  const joinRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!roomId.trim()) {
      toast.error("Please enter a room ID")
      return
    }

    try {
      router.push(`/canvas/${roomId.trim()}`)
      toast.success("Joined the room successfully")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h1 className="text-2xl font-bold">Join room</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Enter a room ID shared by your teammate.
          </p>

          <form className="mt-6 space-y-4" onSubmit={joinRoom}>
            <div>
              <label
                htmlFor="roomId"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Room ID
              </label>
              <input
                type="text"
                id="roomId"
                name="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-sm text-white outline-none transition focus:border-white"
                placeholder="1234"
              />
            </div>

            <Button className="w-full" variant="primary">
              Join room
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-zinc-400">
            Need a fresh board?{" "}
            <Link className="underline underline-offset-4" href="/create-room">
              Create room
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
