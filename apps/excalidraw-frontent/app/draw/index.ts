import { BACKEND_URL } from "@/config";
import axios from "axios";

type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number
}



export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {

    const ctx = canvas.getContext("2d")
    const existingShapes: Shape[] = await getExistingShapes(roomId);

    if (!ctx) return
    if (!socket) return

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type == "chat") {
            const parsedShape = message.message
            console.log(message);
            existingShapes.push(parsedShape)
            clearCanvas(existingShapes, canvas, ctx)
        }
    }

    clearCanvas(existingShapes, canvas, ctx)

    let clicked = false
    let startX = 0
    let startY = 0

    const getCoords = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
    }

    canvas.addEventListener("mousedown", (e) => {
        clicked = true
        const { x, y } = getCoords(e)
        startX = x
        startY = y
    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false
        const { x, y } = getCoords(e)

        const shape: Shape = {
            type: "rect",
            x: startX,
            y: startY,
            width: x - startX,
            height: y - startY
        };

        existingShapes.push(shape)
        socket.send(JSON.stringify({
            type: "chat",
            message: shape,
            roomId
        }))

    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const { x, y } = getCoords(e)

            const width = x - startX
            const height = y - startY

            clearCanvas(existingShapes, canvas, ctx)
            ctx.strokeStyle = "rgba(255,255,255,1)"
            ctx.strokeRect(startX, startY, width, height)
        }
    })
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(0,0,0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height) //whole bg black 

    existingShapes.map(shape => {
        if (shape.type == "rect") {
            ctx.strokeStyle = "rgba(255,255,255,1)"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }
    })
}

async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${BACKEND_URL}/chats/${roomId}`)
    const messages = res.data.messages;
    // array of chats message:{"type":"rect",....}

    const shapes = messages.map((message) => {
        const messageData = JSON.parse(message.message!)
        return messageData
    })

    return shapes
}