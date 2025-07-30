import { Response, Request } from "express";

export interface UserInterface {
    name: string,
    email: string,
    gender: 'male' | 'female' | 'other'
    password:string
}
export interface CreateUserRequest extends Request{
    body: UserInterface
}
export interface LoginUserRequest extends Request{
    body: {
        email: string,
        password:string
    }
}
export interface UserControllerImplementation {
    createUser(req: CreateUserRequest, res: Response):void
    getAllUsers(req: Request, res: Response): void
    login(req:LoginUserRequest,res:Response):void
}