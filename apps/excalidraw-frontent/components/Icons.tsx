import { ReactNode } from "react"

export function IconButton({
  icon,
  onClick,
  activated,
}: {
  icon: ReactNode
  onClick: () => void
  activated: boolean
}) {
  return (
    <div
      className={`pointer ${activated ? "text-red-500" : "text-white"} rounded-full border p-2 bg-black hover:bg-gray-700`}
      onClick={onClick}
    >
      {icon}
    </div>
  )
}
