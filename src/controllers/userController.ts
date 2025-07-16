import { UserModel } from "../models/userModel";
import { Response,Request } from "express";
import { generateToken, hashPassword,isPasswordMatch } from '../utils/helper'
import { CreateUserRequest, LoginUserRequest, UserControllerImplementation, UserInterface } from "../types/userInterface";
import { ResponseService } from "../utils/response";
import { RequestedUser } from "../middleware/authMiddleware";
import { ObjectId } from "mongoose";

export class UserController implements UserControllerImplementation {

    public async createUser(req: CreateUserRequest, res: Response) {
    try {
        const { email, password, gender, name } = req.body
    
        const userExist = await UserModel.exists({
        email
        })
        if (userExist) {
            ResponseService({
                data: null,
                res,
                status: 400,
                message:"User Already Exists"
            })
        }
        const user = new UserModel({
            email,
            password:await hashPassword(password),
            name,
            gender,
            isActive: true,
            createdAt:new Date()
        })
        await user.save()
        ResponseService({
            data: user,
            res,
            status: 201,
            message: "UserCreated Succffy"
        })
    } catch (error) {
        const { message, stack } = error as Error
         ResponseService({
                    res,
                    data:stack,
                    message,
                    status: 500,
                    success:false
                })
    }
    }
    
    public async getAllUsers(req: RequestedUser, res: Response){
    try {
        const _id = req?.user?._id as string
        const user = await UserModel.findOne({
            _id:_id as unknown as  ObjectId 
        })
        ResponseService({
            res,
            data: user,
            message:"user Details"
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
            const user = await UserModel.findOne({
                email
            },)
            if (!user) {
                ResponseService({
                    data: null,
                    res,
                    status: 404,
                    message: "User doesn't exists please sign-in"
                })
            }
            const isMatching = await isPasswordMatch(password,user?.password as string)
            if (!isMatching) {
                ResponseService({
                    message: "Invalid email or password",
                    res,
                    status:401
                })
            }

            const token = generateToken({ _id: user?._id.toString() as string, email: user?.email as string })
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
                    success:false
                })
        }
    }

}