// import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js';

const Getuser = async(req,res)=>{
    try {
        // res.send({message:"Hello This is Admin Here...."})
        const users=await UserModel.find();
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message: "Internal server error..."})
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from request parameters
        console.log(userId);

        const checkAdmin = await UserModel.findById(userId)

        if(checkAdmin.role == 'admin') {
            return res.status(409).json({message:"You can not delete yourself..."});
        }

        const user = await UserModel.findByIdAndDelete(userId);

        if(!user) {
            return res.status(404).json({message:"User not found..."});
        }

        res.status(200).json({message:"User Deleted Successfully...",user})

    } catch (error) {
        
        res.status(500).json({ message: "Internal Server Error..." });
        console.log(error);
    }
};

// Use named exports
export { Getuser, deleteUser };


