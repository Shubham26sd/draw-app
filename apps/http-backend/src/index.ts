import express from "express";
import z from "zod"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import dotenv from "dotenv"
import { JWT_SECRET } from "@repo/backend-common/config"

dotenv.config()

const app = express();

const signupBody = z.object({

})

app.post("/signup", (req, res) => {
    //db call

    res.json({
        userId: 123
    })

})
app.post("/signin", (req, res) => {
    //db call

    const token = jwt.sign({
        userId: 1,
    }, JWT_SECRET!)

    return res.json({
        token
    })
})
app.post("/room", middleware, (req, res) => {
    res.json({
        roomId: 123
    })
})

app.listen(3001);
