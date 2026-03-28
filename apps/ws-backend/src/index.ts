import { WebSocketServer } from "ws";
import dotenv from "dotenv"
import jwt, { JwtPayload } from 'jsonwebtoken'
dotenv.config()


const wss = new WebSocketServer({ port: 8080 });

console.log(process.env.JWT_SECRET!)

wss.on("connection", (ws, request) => {

  const url = request.url
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1])
  const token = queryParams.get("token") || ""
  const decoded = jwt.verify(token, process.env.JWT_SECRET!)

  if (!decoded || !(decoded as JwtPayload).userId) {
    ws.close()
    return
  }

  ws.on("message", () => {
    ws.send("pong");
  });
});
