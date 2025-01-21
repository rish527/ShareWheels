import mongoose from "mongoose";

const userSchema =mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: [String], enum: ['Car Owner', 'Passenger'], default:["Passenger"] },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    profilePicture:{type:String, default:""},
},{timestamps:true});

const User=mongoose.model("User",userSchema);
export default User;
  