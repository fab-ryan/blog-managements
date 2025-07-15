import { Router } from "express";
import { ValidationMiddleware } from "../middleware/validationMiddleware";
import { UserCreationValidation } from "../schemas/userSchemaValidation";
import { UserController } from "../controllers/userController";

const userRouter = Router();
const controller = new UserController; 
userRouter.post('/users', ValidationMiddleware({
    type: 'body',
    schema:UserCreationValidation
}),
controller.createUser
)
userRouter.get('/users', controller.getAllUsers)

export {userRouter}