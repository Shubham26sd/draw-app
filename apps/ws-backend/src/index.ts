import "dotenv/config";
import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config"
import { prismaClient } from "@repo/db/client"

const wss = new WebSocketServer({ port: 8080 });


interface User {
  ws: WebSocket,
  rooms: number[],
  userId: string
}


const users: User[] = []


function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!)

    if (typeof decoded == 'string') {
      return null
    }

    if (!decoded || !decoded.userId) {
      return null
    }

    return decoded.userId

  } catch (error) {
    return null
  }
}

wss.on("connection", (ws, request) => {

  const url = request.url
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1])
  const token = queryParams.get("token") || ""
  const userId = checkUser(token)

  if (userId == null) {
    ws.close()
    return null
  }

  users.push({
    ws,
    userId,
    rooms: [],
  })

  ws.on("message", async (data) => {
    const parsedData = JSON.parse(data as unknown as string)
    // {type:"join_room", roomId:1}
    const roomId = Number(parsedData.roomId)


    if (parsedData.type === "join_room") {
      const user = users.find(x => x.ws === ws)
      if (user && !user.rooms.includes(roomId)) {
        user.rooms.push(roomId)
      }
    }

    if (parsedData.type === "leave_room") {
      const user = users.find(x => x.ws === ws)
      if (!user) {
        return
      }
      user.rooms = user.rooms.filter(x => x !== roomId)
    }

    if (parsedData.type === "chat") {
      const roomId = Number(parsedData.roomId);
      if (isNaN(roomId)) {
        console.log("Invalid roomId");
        return;
      }

      const message = parsedData.message
      const strMsg = JSON.stringify(message)


      await prismaClient.chat.create({
        data: {
          message: strMsg,
          roomId,
          userId
        }
      })

      users.forEach(user => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({
            type: "chat",
            message,
            roomId
          }))
        }
      })

    }
  });


  ws.on("close", () => {
    const index = users.findIndex(u => u.ws === ws)
    if (index !== -1) {
      users.splice(index, 1)
    }
    console.log("Connection closed. Active users:", users.length)
  })
});

