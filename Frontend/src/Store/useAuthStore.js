import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
import toast from 'react-hot-toast';
import { Navigate } from "react-router-dom";

export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigningUp: false,
    isRegistering: false,
    isLoggingIn: false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth: async()=>{
        try {
            const resp=await axiosInstance.get("/auth/check");
            set({authUser:resp.data});
        } catch (error) {
            console.log("Error in CheckAuth:",error)
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false});
        }
    },
    signup: async (data)=>{
        set({isSigningUp:true});
        try {
            const res=await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false});
        }
    },
    login:async (data)=>{
        set({isLoggingIn:true});
        try {
            const res=await axiosInstance.post("/auth/login",data);
            console.log(res);
            set({authUser:res.data});
            toast.success("Logged in Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
            // console.log(error);
        }finally{
            set({isLoggingIn:false});
        }
    },
    logout:async ()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out Successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    ownerRegister: async (data)=>{
        set({isRegistering:true});
        try {
            console.log(data);
            const res=await axiosInstance.post("/auth/owner-register",data);
            toast.success("Registeration Request Sent");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isRegistering:false});
        }
    },

}))