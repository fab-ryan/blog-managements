import { config } from 'dotenv'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
config()

export const generateUUid = () => {
    return uuidv4()
}
const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.h8zcdmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const db_url = (): string => {
    const db_username = process.env.USERNAME as string
    const db_password = process.env.PASSWORD as string
    return uri?.replace("<db_username>", db_username).replace("<db_password>", db_password) as string
}



// export async function run() {

//         const client = mongoose.connect(db_url(), {
//             serverApi: {
//                 version: ServerApiVersion.v1,
//                 strict: true,
//                 deprecationErrors: true,
//             }
//         });
//        client.then(re => {
//            re.connection
//            console.log("connect suss")
//         }).catch(ca => {
//            console.log(ca)
//         })

// }
// run().catch(console.dir);

export const generateSlug = (title: string): string => {
    return title.replace(' ', '-')
}

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10)
}
export const isPasswordMatch = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    const ismatch = await bcrypt.compare(plainPassword, hashedPassword)
    return ismatch
}
export const secretkey = process.env.JWT_SECRET || 'secret'

export const generateToken = ({ _id, email }: {
    _id: string, email: string
}): string => {
    return jwt.sign({ _id, email }, secretkey, {
        expiresIn: '15min'
    })
}

// Login - return access token how do we generate token jsonwebtokennpm i jsonwebtoken