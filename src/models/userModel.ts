import { model, Schema, InferSchemaType } from 'mongoose'
import { GenderEnum } from '../schemas/userSchemaValidation'

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    isActive: Boolean,
    gender: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    deletedAt: {
        type: Date

    }
})
type Users = InferSchemaType<typeof UserSchema>

export const UserModel = model<Users>('Users',UserSchema)