import mongoose, {model,Schema} from "mongoose"
import { BlogInterface } from "../types/blogInterface"
interface BlogSchemaInterface{
    slug: string
    title: string
    author: string
    content: string
    isPublished: boolean
    description: string
    createdAt: NativeDate
    updatedAt: NativeDate
    deletedAt: null | string | undefined
}
const blogModelSchema = new Schema<BlogSchemaInterface> ({
    title: String,
    slug: String,
    description: String,
    content: String,
    author: String,
    isPublished: Boolean,
    createdAt: Date,
    updatedAt: {
        type: Date,
        default: new Date(),
        unique:true
    },
    deletedAt:Date
})
export const blogModel =  model<BlogSchemaInterface>("blogs", blogModelSchema)