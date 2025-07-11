import express from "express"
import{config} from 'dotenv'
import { blogRouter } from "./src"
config()
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