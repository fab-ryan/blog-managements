import { NextFunction, Request, Response } from "express"
import { ObjectSchema } from 'joi'
import * as zod from 'zod'
import { ResponseService } from "../utils/response"
interface ValidateOption<T>{
    type: 'body' | 'headers' | 'params',
    schema: ObjectSchema<T> 
    refType?:'joi'|'zod'
}

export const ValidationMiddleware = <T>({ type, schema ,refType}: ValidateOption<T>)=>(req: Request, res: Response, next: NextFunction) => {
    try {
        const validationQueries = req[type]
      
        const { error } = schema.validate(validationQueries)
        if (error) {
            ResponseService({
                data: error,
                status: 400,
                success: false,
                res
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}