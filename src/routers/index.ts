import { Router } from "express";
import { blogRouter } from "./blogRoutes";
import { userRouter } from "./userRoutes";

const routers = Router()
const allRotures = [blogRouter,userRouter]
routers.use('/api/v1',...allRotures)
export {routers}