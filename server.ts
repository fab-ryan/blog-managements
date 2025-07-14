import express from "express"
import{config} from 'dotenv'
import { blogRouter } from "./src"
import { run as db_connection } from "./src/utils/helper"
config()
db_connection()
const app = express()
app.use(express.json())

// dev
//  production
// test
// stage

const port = parseInt(process.env.PORT as string) ||5500
app.use(blogRouter)
app.listen(port, () => {
    console.log("Our server is running 🔥🔥🔥🔥🔥🔥 ")
})