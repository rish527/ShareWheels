import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';


import authRoutes from "./routes/auth.route.js";
import {connectDB} from "./lib/db.js";

dotenv.config();
const app=express();

const PORT=process.env.PORT;

// app.get("/",(req,res)=>{
//     res.send("Server is Working...")
// })

app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173", credentials:true}));

app.use('/api/auth',authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})


