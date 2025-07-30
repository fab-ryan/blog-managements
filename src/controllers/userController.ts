import { UserModel } from "../models/userModel";
import { Response, Request } from "express";
import { generateToken, hashPassword, isPasswordMatch } from '../utils/helper'
import { CreateUserRequest, LoginUserRequest, UserControllerImplementation, UserInterface } from "../types/userInterface";
import { ResponseService } from "../utils/response";
import { AuthRequest } from "../middleware/authMiddleware";
import { ObjectId } from "mongoose";
import { Database } from '../database/'
export class UserController implements UserControllerImplementation {

    public async createUser(req: CreateUserRequest, res: Response) {
        try {
            const { email, password, gender, name } = req.body

            const userExist = await Database.User.findOne({
                where: {
                    email
                }
            })
            if (userExist) {
                ResponseService({
                    data: null,
                    res,
                    status: 400,
                    message: "User Already Exists"
                })
            }
            const user = await Database.User.create({
                email,
                password: await hashPassword(password),
                name,
                role: 'user',
                gender: 'male'
            })
            ResponseService({
                data: user?.dataValues,
                res,
                status: 201,
                message: "UserCreated Succffy"
            })
        } catch (error) {
            const { message, stack } = error as Error
            ResponseService({
                res,
                data: stack,
                message,
                status: 500,
                success: false
            })
        }
    }

    public async getAllUsers(req: AuthRequest, res: Response) {
        try {
            const _id = req?.user?._id as string
            const user = await Database.User.findOne({
                where: {
                    id: _id
                },

            })
            ResponseService({
                res,
                data: user?.toJSON(),
                message: "user Details"
            })
        } catch (error) {
            const { message, stack } = error as Error
            ResponseService({
                res,
                data: stack,
                message,
                status: 500,
                success: false
            })
        }
    }
    public async login(req: LoginUserRequest, res: Response) {
        try {
            const { email, password } = req.body
            const user = await Database.User.findOne({
                where: {
                    email
                },
                // include:['']
            })
            if (!user) {
                ResponseService({
                    data: null,
                    res,
                    status: 404,
                    message: "User doesn't exists please sign-in"
                })
            }
            const isMatching = await isPasswordMatch(password, user?.dataValues.password as string)
            if (!isMatching) {
                ResponseService({
                    message: "Invalid email or password",
                    res,
                    status: 401
                })
            }

            const token = generateToken({ _id: user?.dataValues.id.toString() as string, email: user?.email as string })
            ResponseService({
                data: token,
                message: "User Logins succesfuly",
                status: 201,
                success: true,
                res
            })
        } catch (error) {
            const { message, stack } = error as Error
            ResponseService({
                res,
                data: stack,
                message,
                status: 500,
                success: false
            })
        }
    }

}