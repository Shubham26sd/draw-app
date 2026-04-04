"use client"

import { BACKEND_URL } from "@/config"
import { Button } from "@repo/ui/button"
import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

async function handleAuth(
  isSignin: boolean,
  email: string,
  password: string,
  username?: string,
): Promise<boolean> {
  try {
    const url = isSignin ? `${BACKEND_URL}/signin` : `${BACKEND_URL}/signup`

    const payload = isSignin
      ? { email, password }
      : { email, password, name: username }

    const response = await axios.post(url, payload)

    const token = response.data.token
    localStorage.setItem("token", token)

    return true
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      alert("Incorrect email or password")
    } else {
      alert("Something went wrong")
    }

    return false
  }
}
export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    axios
      .get(`${BACKEND_URL}/me`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => router.push("/"))
      .catch((e) => {
        if (e instanceof AxiosError && e.response?.status == 401) {
          alert("Invalid Token")
        }
        localStorage.removeItem("token")
      })
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-6 m-2 bg-white rounded-lg">
        <div className="p-2">
          <div className="pb-4">
            <h1 className="text-3xl text-center text-black font-bold">
              {isSignin ? "Sign In" : "Sign Up"}
            </h1>
          </div>

          <input
            className="text-background p-2 border rounded-md focus:outline-none"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          ></input>
        </div>

        <div className="p-2">
          <input
            className="text-background p-2 border rounded-md focus:outline-none"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          ></input>
        </div>

        {isSignin ? (
          ""
        ) : (
          <div className="p-2">
            <input
              className="text-background p-2 border rounded-md focus:outline-none"
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            ></input>
          </div>
        )}

        <div className="p-2 text-center">
          <Button
            variant="secondary"
            onClick={async () => {
              if (!email || !password) {
                alert("Email and password required")
                return
              }
              const res = await handleAuth(isSignin, email, password, username)
              if (res) router.push("/")
            }}
          >
            {isSignin ? "Sign in" : "Sign up"}
          </Button>
        </div>
      </div>
    </div>
  )
}
