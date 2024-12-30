import express from 'express'
import {Login, logout, register} from '../controllers/Auth.js'
const AuthRoute = express.Router()

AuthRoute.post('/register', register)

AuthRoute.post('/login',Login)

AuthRoute.post('/logout',logout);

export default AuthRoute;