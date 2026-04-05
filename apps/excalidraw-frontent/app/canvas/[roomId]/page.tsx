import RoomCanvas from "@/components/RoomCanvas"

export default async function CanvasPage({
  params,
}: {
  params: {
    roomId: string
  }
}) {
  const room = (await params).roomId

  return <RoomCanvas roomId={room} />
}
