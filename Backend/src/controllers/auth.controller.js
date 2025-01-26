import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { genarateToken } from "../lib/utils.js";
import Owner from "../models/owner.model.js";
import cloudinary from "../lib/cloudinary.js";

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
                role:user.role,
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
        const {fullName,email,password,phone}= req.body;
        // console.log(req.body);
        if(!fullName || !email || !password || !phone){
            return res.status(400).json({message:"Please fill in all fields"})
        }
        const existingEmail=await User.findOne({email});
        if(existingEmail) return res.status(400).json({message:"User email Already Exists"});

        const existingPhone=await User.findOne({phone});
        if(existingPhone) return res.status(400).json({message:"User Phone Number Already Exists"});

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

export const OwnerRegister = async (req, res) => {
    try {
      // Fetch the authenticated user from the request
      const userCalled = req.user;
  
      // Validate the user exists
      const user = await User.findById(userCalled._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Destructure required fields from the request body
      const { registrationNumber, carPicture, license, registrationCertificate } = req.body;
    //   console.log(req.body);
      // Validate all required fields are provided
      if (!registrationNumber || !carPicture || !license || !registrationCertificate) {
        return res.status(400).json({ message: "Please fill in all fields" });
      }
      
      const uploadResponse1=await cloudinary.uploader.upload(carPicture);
      const carUrl=uploadResponse1.secure_url;
      const uploadResponse2=await cloudinary.uploader.upload(carPicture);
      const licenceUrl=uploadResponse2.secure_url;
      const uploadResponse3=await cloudinary.uploader.upload(carPicture);
      const cirtificateUrl=uploadResponse3.secure_url;

      // Create a new owner object
      const owner = new Owner({
        userId: user._id,
        carDetails: {
          registrationNumber,
          carPicture:carUrl,
        },
        documents: {
          license: licenceUrl,
          registrationCertificate: cirtificateUrl,
        },
      });
  
      // Save the owner data to the database
      await owner.save();
      console.log("Owner data saved to the database");
  
      // Send a success response
      res.status(201).json({ message: "User requested to be an owner successfully" });
    } catch (error) {
      console.error("Error in OwnerRegister controller:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  