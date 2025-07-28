import express from "express"
import { config } from 'dotenv'
import { routers } from "./src/routers"
config()
const app = express()
app.use(express.json())

// dev
//  production
// test
// stage


app.use(routers)

export { app }