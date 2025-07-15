import { Response } from "express"
interface IResponse<T>{
    status?: number
    success?: boolean
    message?: string
    data?: T,
    res:Response
}
export const ResponseService = <T>({ data, status = 200,
    message,success=true,res
}: IResponse<T>): Response<IResponse<T>> => {
    if (status === 500) {
        message='Internal server error'
    }

    /*{
    Getting status code 200
     incorrect validation = 400
     incorrect auth = 401
     incorrect right permission =403
     saving or creating = 201
     Hex 0-9 a-f
     bin 10+11
     Oct 0-7
     }*/
    return res.status(status).json({
        data,
        message,
        success
    })
}