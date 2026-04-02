"use client"

import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
}

// Button Component
export const Button = ({
  children,
  className,
  variant = "primary",
  onClick,
}: ButtonProps) => {
  const base = "px-6 py-3 rounded-2xl font-medium transition"

  const variants = {
    primary: "bg-white text-black hover:scale-105 ",
    secondary: "border border-gray-600 hover:bg-white hover:text-black",
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className} hover:bg-red-500`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
