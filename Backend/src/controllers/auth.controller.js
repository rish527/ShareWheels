import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { genarateToken } from "../lib/utils.js";

export const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        
        const isValidUser=await bcrypt.compare(password,user.password);

        if(isValidUser){
            genarateToken(user._id,res);
            res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic,
            })
        }
        else{
            return res.status(400).json({message:"Invalid Credentials"})
        }

    } catch (error) {
        console.log("Error in Login Controller:",error.message);
        return res.status(400).json({message:"Internal Server Error"})
    }
}
export const signup=async (req,res)=>{
    try {
        const {fullName,email,password}= req.body;
        // console.log(req.body);
        if(!fullName || !email || !password){
            return res.status(400).json({message:"Please fill in all fields"})
        }
        const existing=await User.findOne({email});
        if(existing) return res.status(400).json({message:"User email Already Exists"});

        if(password.length<6) return res.status(400).json({message:"Password must be at least 6 characters"});

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const user=new User({
            fullName:fullName,
            email,
            password:hashedPassword,
        })

        await user.save();
        console.log("Data saved to database");

        const token=jwt.sign({userId:user._id}, process.env.JWT_SECRET,{expiresIn:"1d"} );
        res.cookie("jwt-linkedin",token,{
            httpOnly:true,  //XSS
            maxAge:1*24*60*60*1000,
            sameSite:"strict", //CSRF
            secure:process.env.NODE_ENV==="production"
        })
        res.status(201).json({message:"User registerd successfully"});

        
    } catch (error) {
        console.log("Error in SignUp:",error.message);
        res.status(500).json({message:"Internal server issue"})
    }

}

export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out Successfully"})
    } catch (error) {
        res.status(400).json({message:"Internal Server Error"});
        console.log("Error in Logout Controler:",error.message);
    }
}


export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}