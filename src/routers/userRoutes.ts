import { Router } from "express";
import { ValidationMiddleware } from "../middleware/validationMiddleware";
import { LoginUserSchema, UserCreationValidation } from "../schemas/userSchemaValidation";
import { UserController } from "../controllers/userController";
import { AuthMiddleware } from "../middleware/authMiddleware";

const userRouter = Router();
const controller = new UserController; 
userRouter.post('/users', ValidationMiddleware({
    type: 'body',
    schema:UserCreationValidation
}),
controller.createUser
)
userRouter.get('/users',AuthMiddleware, controller.getAllUsers)
userRouter.post('/login', ValidationMiddleware({
    type: 'body',
    schema: LoginUserSchema
}),controller.login)
export {userRouter}