import { MongoClient, ServerApiVersion } from 'mongodb'
import mongoose from 'mongoose';
import { config } from 'dotenv'
config()
const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.h8zcdmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const db_url = (): string => {
    const db_username = process.env.USERNAME as string
    const db_password = process.env.PASSWORD as string
    return uri?.replace("<db_username>", db_username).replace("<db_password>", db_password) as string
}



export async function run() {
    
        const client = mongoose.connect(db_url(), {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
       client.then(re => {
           re.connection
           console.log("connect suss")
        }).catch(ca => {
           console.log(ca)
        })
   
}
run().catch(console.dir);

export const generateSlug = (title: string): string => {
    return title.replace(' ', '-')
}