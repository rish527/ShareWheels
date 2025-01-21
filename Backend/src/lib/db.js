import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
export async function connectDB(){
    try{
        
        // console.log("MongoDB URI:", process.env.MONGO_URI);
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    }
    catch(error){
        console.error(`Error in connecting with MongoDB:${error.message}`);
        process.exit(1);
    }
}