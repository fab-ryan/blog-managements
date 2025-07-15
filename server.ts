import express from "express"
import { config } from 'dotenv'
import { blogRouter } from "./src/routers/blogRoutes"
import { run as db_connection } from "./src/utils/helper"
import { routers } from "./src/routers"
config()
db_connection()
const app = express()
app.use(express.json())

// dev
//  production
// test
// stage

const port = parseInt(process.env.PORT as string) || 5500
app.use(routers)
app.listen(port, () => {
    console.log("Our server is running 🔥🔥🔥🔥🔥🔥 ")
})