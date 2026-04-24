"use client"
import { BACKEND_URL } from "@/config"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      return
    }

    axios
      .get(`${BACKEND_URL}/me`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        setIsAuthenticated(true)
      })
      .catch(() => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold">Drawify</h1>
        <div className="space-x-6 text-sm">
          <a href="#features" className="hover:text-gray-300">
            Features
          </a>
          <a href="#about" className="hover:text-gray-300">
            About
          </a>
          {isAuthenticated ? (
            <Link href="/create-room">
              <Button variant="primary">Create Room</Button>
            </Link>
          ) : (
            <Link href="/signin">
              <Button variant="primary">Try Now</Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-bold max-w-3xl leading-tight">
          Sketch. Collaborate. Create.
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl">
          A minimal whiteboard tool inspired by Excalidraw. Draw diagrams,
          wireframes, and ideas effortlessly.
        </p>

        {isAuthenticated ? (
          <div className="mt-8 flex gap-4">
            <Link href="/create-room">
              <Button>Create Room</Button>
            </Link>
            <Link href="/join-room">
              <Button variant="secondary">Join Room</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 flex gap-4">
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
            <Link href="/signin">
              <Button variant="secondary">Sign In</Button>
            </Link>
          </div>
        )}
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-20 bg-zinc-900">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Real-time Collaboration",
              desc: "Work with your team instantly with shared canvases.",
            },
            {
              title: "Infinite Canvas",
              desc: "Never run out of space while brainstorming.",
            },
            {
              title: "Export & Share",
              desc: "Download your drawings or share links easily.",
            },
          ].map((f, i) => (
            <Card key={i} title={f.title} desc={f.desc} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-4xl font-bold">Start creating today</h2>
        <p className="mt-4 text-gray-400">
          {isAuthenticated
            ? "Create a room or join one and start drawing."
            : "Sign up, open a room, and start drawing."}
        </p>

        <div className="mt-8">
          {isAuthenticated ? (
            <div className="flex justify-center gap-4">
              <Link href="/create-room">
                <Button>Launch Create Room</Button>
              </Link>
              <Link href="/join-room">
                <Button variant="secondary">Launch Join Room</Button>
              </Link>
            </div>
          ) : (
            <Link href="/signup">
              <Button>Launch App</Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 border-t border-zinc-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Drawify. All rights reserved.
      </footer>
    </div>
  )
}
