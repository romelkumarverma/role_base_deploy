import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exitUser = await UserModel.findOne({ email });
        if (exitUser) {
            return res.status(401).json({ success: false, message: "User already exists..." });
        }

        const hasepassword = await bcryptjs.hashSync(password,10)
        const newUser = new UserModel({ name, email, password:hasepassword });
        await newUser.save();

        res.status(200).json({message:"User registered successfully... ", newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error...." });
        console.log(error);
    }
};

////////  For Login  //////////////

const Login = async(req, res)=>{
    try{
        const {email,password} = req.body;

        const user = await UserModel.findOne({email})

        if(!user) {
            return res.status(404).json({success:false, message:"Invalid credentails..."})
        }

        const ispasswordValid = await bcryptjs.compare(password,user.password)
        if(!ispasswordValid){
            return res.status(400).json({success:false, message:"Invalid Credential...."})
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET, {expiresIn:'1d'})      ///// for jwt token

        //// This is the name of token
        res.cookie('token',token,{
            httpOnly:true, 
            secure: false,
            // maxAge:3600000
        }) 
        console.log(token);

        res.status(200).json({success:true, message:"Login Successfully...", user,token})

    } catch (error) {
        res.status(500).json({Success:false,message:"Internal Server error..."})
        console.log(error)
    }
}



////////// For logout //////////

const logout = async(req, res)=>{
    try{
        res.clearCookie('token')
        res.status(200).json({message:"User Logout Successfylly...."})
    } catch (error) {
        res.status(500).json({Success:false,message:"Internal Server error...."})
        console.log(error)
    }
}


export {register,Login, logout};
