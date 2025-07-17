import joi from 'joi'
export const AddBlogSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().min(20).required(),
    isPublished: joi.boolean().required(),
    content:joi.string()
})

export const IdValidationSchema = joi.object({
    id:joi.string().min(24)
})