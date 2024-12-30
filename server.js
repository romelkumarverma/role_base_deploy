import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import DbCon from './utils/db.js'
import AuthRoutes from './routes/Auth.js'
import AdminRoutes from './routes/AdminRoute.js'
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express();

/// Mongodb
DbCon()

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173'],
    // methods:['GET','POST','PUT','DELETE'],
    credentials:true
  }))

app.use('/', AuthRoutes)
app.use('/',AdminRoutes)

app.listen(PORT, ()=>{
    console.log(`Server in running on ${PORT}...`)
})