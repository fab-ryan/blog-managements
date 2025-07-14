import mongoose, {model,Schema} from "mongoose"
import { BlogInterface } from "../types/blogInterface"
const blogModelSchema = new Schema <BlogInterface>({
    title: String,
    slug:String,
    description: String,
    content: String,
    author: String,
    isPublished: Boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt:Date
})
export const blogModel =  model<BlogInterface>("blogs", blogModelSchema)