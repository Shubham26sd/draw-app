"use client"

interface CardProps {
  title: string
  desc: string
}

// Card Component
export const Card = ({ title, desc }: CardProps) => {
  return (
    <div className="p-6 bg-black rounded-2xl border border-zinc-800 hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  )
}
