import joi from 'joi'
export enum GenderEnum {
    male = "male",
    female = "female",
    other = "other"
}
export const UserCreationValidation = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6),
    gender:joi.string().valid(...Object.values(GenderEnum))
})