import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../utils/response";
import jwt from "jsonwebtoken"
import { secretkey } from "../utils/helper";
type userPayload = {
    _id: string,
    email: string
}
interface jwtPayloadExtra extends jwt.JwtPayload {
    _id: string,
    email: string
}
export interface AuthRequest extends Request {
    user?: userPayload
}
export const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers
        if (!authorization) ResponseService({
            res,
            message: "Unauthorize Access",
            status: 401,
        })
        const token = authorization?.split(' ')[1]
        const isValid = jwt.verify(token as string, secretkey)
        const user: userPayload = {
            _id: (isValid as jwtPayloadExtra)._id,
            email: (isValid as jwtPayloadExtra).email
        }
        req.user = user
        next()
    } catch (error) {
        const { stack } = error as Error
        ResponseService({
            res,
            data: stack,
            message: "please Login Again",
            status: 401
        })
    }
}