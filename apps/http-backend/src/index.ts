import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types"


const app = express();
app.use(express.json());

app.post("/signup", (req, res) => {

    const data = CreateUserSchema.safeParse(req.body)
    if (!data.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    //db call

    res.json({
        userId: 123
    })

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
