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
} | {
    type: "pencil",
    startX: number,
    startY: number,
    endX: number,
    endY: number
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
            existingShapes.push(parsedShape)
            clearCanvas(existingShapes, canvas, ctx)
        }
    }

    clearCanvas(existingShapes, canvas, ctx)

    let clicked = false
    let startX = 0
    let startY = 0


    canvas.addEventListener("mousedown", (e) => {
        clicked = true
        startX = e.clientX
        startY = e.clientY
    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false
        const width = e.clientX - startX
        const height = e.clientY - startY

        let shape: Shape | null = null

        const selectedTool = window.selectedTool

        if (selectedTool == "rect") {
            shape = {
                //@ts-ignore
                type: window.selectedTool,
                x: startX,
                y: startY,
                width,
                height
            };
        }
        else if (selectedTool == "circle") {
            const radius = Math.max(width, height) / 2
            shape = {
                //@ts-ignore
                type: window.selectedTool,
                centerX: startX + radius,
                centerY: startY + radius,
                radius
            };
        }

        if (!shape) return

        existingShapes.push(shape)

        socket.send(JSON.stringify({
            type: "chat",
            message: shape,
            roomId
        }))
    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX
            const height = e.clientY - startY

            clearCanvas(existingShapes, canvas, ctx)
            ctx.strokeStyle = "rgba(255,255,255,1)"
            //@ts-ignore
            const selectedTool = window.selectedTool
            if (selectedTool == "rect") {
                ctx.strokeRect(startX, startY, width, height)
            }
            else if (selectedTool == "circle") {
                const radius = Math.max(width, height) / 2;
                const centerX = startX + radius;
                const centerY = startY + radius;
                ctx.beginPath();
                ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2)
                ctx.stroke();
            }
        }
    })
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(0,0,0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height) //whole bg black 

    existingShapes.map(shape => {
        if (shape.type == "rect") {
            ctx.strokeStyle = "rgb(255,255,255)"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }
        else if (shape.type == "circle") {
            const centerX = shape.centerX;
            const centerY = shape.centerY;
            const radius = shape.radius;
            ctx.beginPath();
            ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2)
            ctx.stroke();
        }
    })
}

async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${BACKEND_URL}/chats/${roomId}`)
    const messages = res.data.messages;
    // array of chats message:{"type":"rect",....}

    const shapes = messages.map((message: {
        type: "chat";
        message: string;
        roomId: string;
    }) => {
        const messageData = JSON.parse(message.message)
        return messageData
    })

    return shapes
}