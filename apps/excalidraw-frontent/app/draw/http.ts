import { BACKEND_URL } from "@/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
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