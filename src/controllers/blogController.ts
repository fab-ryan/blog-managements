import { ResponseService } from "../utils/response";
import { GetAllBlogs, interfaceAddBlog } from '../types/blogInterface'
import { db } from "../utils/helper";
import { Request, Response } from 'express'
import Joi from "joi";
import { AddBlogSchema } from "../schemas/blogSchema";
const getAllBlogs = (req: Request, res: Response) => {
    try {
        const blogs = db;
        console.log(req)
        ResponseService<GetAllBlogs>({
            data: JSON.parse(blogs),
            status: 200,
            success: true,
            res
        })
    } catch (err) {
        const { message, stack } = err as Error
        res.status(500).json({ message, stack })
    }
}
interface IRequestBlog extends Request {
    body: interfaceAddBlog
}
const createBlog = (req: IRequestBlog, res: Response) => {
    try {
        // const { title, description, author, isPublished } = req.body
        // const { error } = AddBlogSchema.validate({
        //     title, description, author, isPublished
        // })
        // if (error)
        //     ResponseService({
        //         data: error,
        //         status: 400,
        //         success: false,
        //         res
        //     })

    } catch (error) {

    }
}

    export { getAllBlogs,createBlog }