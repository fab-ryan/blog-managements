import { Router} from "express";
import { getAllBlogs } from './controllers/blogController'
import { ValidationMiddleware } from "./middleware/validationMiddleware";
import { AddBlogSchema } from './schemas/blogSchema'
const blogRouter = Router();
blogRouter.get('/blogs', getAllBlogs)
blogRouter.post('/blogs', ValidationMiddleware({ type:'body', schema:AddBlogSchema }),)
// blogRouter.get('blogs/{id}', ValidationMiddleware({
//     type
//     :'params',schema:
// }))
export {blogRouter}