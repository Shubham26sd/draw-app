import e, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"


export function middleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"]
    const token = authHeader?.split("")[1]
    if (!token) {
        return res.json({
            message: "Auth header missing"
        })
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)

        if (typeof decoded == 'string') {
            return
        }

        req.userId = decoded.userId
        next()

    } catch (error) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }
}