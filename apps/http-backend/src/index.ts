import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
import bcrypt from "bcrypt"


const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {

    const parsedData = CreateUserSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10)

    //db call
    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10)
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.email,
                password: hashedPassword,
                name: parsedData.data.name,
            }
        })
        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET!)
        return res.json({
            message: "User created successfully",
            token
        })
    } catch (error) {
        return res.status(411).json({
            message: "User already exists with this email"
        })
    }
})


app.post("/signin", (req, res) => {
    const data = SigninSchema.safeParse(req.body)
    if (!data.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    //db call

    const token = jwt.sign({
        userId: 1,
    }, JWT_SECRET!)

    return res.json({
        token
    })
})
app.post("/room", middleware, (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body)
    if (!data.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    return res.json({
        roomId: 123
    })
})

app.listen(3001);
