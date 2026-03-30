import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
import bcrypt, { hash } from "bcrypt"


const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {

    const parsedData = CreateUserSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }

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


app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }

    //db call
    try {

        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.email
            }
        })

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        const hashCheck = await bcrypt.compare(parsedData.data.password, user.password)

        if (!hashCheck) {
            return res.status(401).json({
                message: "Incorrect password"
            })
        }

        const token = jwt.sign({
            userId: user.id,
        }, JWT_SECRET!)

        return res.json({
            token
        })
    } catch (error) {
        res.status(400).json({
            message: "Unable to sign in"
        })
    }
})

app.post("/room", middleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const userId = req.userId
    //db call
    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId,
            }
        })

        return res.json({
            roomId: room.id
        })
    } catch (error) {
        return res.status(411).json({
            message: "Room name already exists with this name"
        })
    }

})

app.listen(3001);
