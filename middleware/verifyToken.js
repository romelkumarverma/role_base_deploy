import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'


const isAdmin = async(req,res,next) =>{
    try {
        const token=req.cookies.token;
        console.log(token)

        if(!token) {
            return res.status(401).json({message: "Unauthorizes: No token provided..."});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        const user = await UserModel.findById(decoded.userId)
        console.log(user);

        if(!user){
            return res.status(401).json({message:"User not Found...."})
        }

        if(user.role !=='admin')
        {
            return res.status(403).json({message: "Unathorize: User is not a admin..."})
        }

        req.user=user
        next();

    } catch (error) {
        console.log(error);
    }
}

export default isAdmin;