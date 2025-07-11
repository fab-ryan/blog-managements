export interface BlogInterface{
    id: number
    title: string
    author: string
    isPublished: boolean
    description: string
}
export interface interfaceAddBlog extends Omit<BlogInterface,'id'>{}
export interface GetAllBlogs{
    blogs:BlogInterface[]
}