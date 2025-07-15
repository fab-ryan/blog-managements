import { UserModel } from "../models/userModel";
import { Response,Request } from "express";
import { hashPassword } from '../utils/helper'
import { CreateUserRequest, UserControllerImplementation, UserInterface } from "../types/userInterface";
import { ResponseService } from "../utils/response";

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
    
    public async getAllUsers(req: Request, res: Response){
    try {
        
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