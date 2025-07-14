import { ResponseService } from "../utils/response";
import { BlogInterface, GetAllBlogs, interfaceAddBlog } from '../types/blogInterface'
import { blogModel } from "../models/blogModal";
import { Request, Response } from 'express'
import { generateSlug } from "../utils/helper";
const getAllBlogs = async(req: Request, res: Response) => {
    try {
        const blogs =await  blogModel.find();
        console.log(blogs)
        
        ResponseService({
            data: blogs,
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
const createBlog = async(req: IRequestBlog, res: Response) => {
    try {
        const { title, description, author,content, isPublished } = req.body
        const blog = new blogModel({
            title,
            description,
            content,
            slug:generateSlug(title),
            author,
            isPublished,
            createdAt:new Date()
        })
     await  blog.save();
        ResponseService({
            data: blog,
            success: true,
            message: "Saved well",
            status: 201,
            res
        })

    } catch (error) {
console.log(error)
    }
}

    export { getAllBlogs,createBlog }