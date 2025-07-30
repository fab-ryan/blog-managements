import { Router } from "express";
import { getAllBlogs, createBlog, getABlog } from '../controllers/blogController'
import { ValidationMiddleware } from "../middleware/validationMiddleware";
import { AddBlogSchema, IdValidationSchema } from '../schemas/blogSchema'
import { AuthMiddleware } from "../middleware/authMiddleware";
const blogRouter = Router();
blogRouter.get('/blogs', getAllBlogs)
blogRouter.post('/blogs', AuthMiddleware, ValidationMiddleware({ type: 'body', schema: AddBlogSchema }), createBlog)
blogRouter.get('blogs/:id', ValidationMiddleware({
    type: 'params', schema: IdValidationSchema,
}),
    getABlog
)
export { blogRouter }