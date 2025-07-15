import { ResponseService } from "../utils/response";
import { BlogInterface, GetAllBlogs, interfaceAddBlog } from '../types/blogInterface'
import { blogModel } from "../models/blogModal";
import { Request, Response } from 'express'
import { generateSlug } from "../utils/helper";
import { ObjectId } from "mongodb";
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
interface GetBlogByIdRequestInterface extends Request{
    params: {
        id:string
    }
}
const getABlog = async (req: GetBlogByIdRequestInterface, res: Response) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findOne({
            _id: new ObjectId(id),
        })
        if (!blog) {
            ResponseService({
                status: 404,
                success: false,
                message: "Blog not Found",
                res
            })
        }
        ResponseService({
            data: blog,
            res,
            message:"Blog Fetch successfuly"
        })
    } catch (error) {
        const { message,stack } = (error as Error)
        ResponseService({
            res,
            data:stack,
            message,
            status: 500,
            success:false
        })
    }
}

    export { getAllBlogs,createBlog,getABlog }