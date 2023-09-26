import express from "express"
import dotenv from 'dotenv'
dotenv.config();
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000
import userRoutes from "./routes/userRoutes.js"

connectDB()

const app =express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRoutes)

app.get('/',(req,res)=>res.send("server is ready"))

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`server start port ${port}`))
 