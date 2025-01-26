import React, { useState } from 'react'
import { useAuthStore } from '../Store/useAuthStore';
import { Car, Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({fullName:"",email:"",password:"",phone:""});
  
  const {signup,isSigningUp}=useAuthStore();

  const ValidateForm=()=>{
    if(!formData.fullName.trim()) return toast.error("Full name is requires")
    if(!formData.email.trim()) return toast.error("Email is requires")
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit=(e)=>{
    e.preventDefault();

    const success=ValidateForm();
    if(success) signup(formData);
  };

  return (
    <div className='hero bg-base-200 min-h-screen mt-10'>
      <div className='card bg-base-100  shadow-2xl flex flex-col  justify-center items-center p-2 sm:p-3 mt-5 w-[30rem]'>
          <div className='w-full max-w-md space-y-8'>
            {/* Logo */}
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <Car className="w-10 h-10 text-red-500" />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='w-full p-10 space-y-6'>
            <div className="form-control">
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex  items-center pointer-events-none'>
                  <User className='size-5 text-base-content/40' />
                </div>
                <input type="text" 
                  className={`input input-bordered w-full pl-10`}
                  placeholder='Full Name'
                  value={formData.fullName}
                  onChange={(e)=>setFormData({...formData, fullName:e.target.value})}
                />
              </div>
            </div>

            <div className="form-control">
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex  items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input type="email" 
                  className={`input input-bordered w-full pl-10`}
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData, email:e.target.value})}
                />
              </div>
            </div>
            <div className="form-control">
              <label className='label'>
                <span className='label-text font-medium'>Phone</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex  items-center pointer-events-none'>
                  <Phone className='size-5 text-base-content/40' />
                </div>
                <input type="text" 
                  className={`input input-bordered w-full pl-10`}
                  placeholder='Phone Number'
                  value={formData.phone}
                  onChange={(e)=>setFormData({...formData, phone:e.target.value})}
                />
              </div>
            </div>

            <div className="form-control">
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex  items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input type={showPassword?"text":"password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData, password:e.target.value})}
                />
                <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={()=>setShowPassword(!showPassword)}
                >
                  {showPassword?(
                    <EyeOff className='size-5 text-base-content/40' />
                  ):(
                    <Eye className='size-5 text-base-content/40' />
                  )}
                </button>
              </div>
            </div>
            
            <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
              {isSigningUp?(
                <>
                  <Loader2 className='size-5 animate-spin' />
                  Loading...
                </>
              ):("Create Account")}
            </button>

          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
      </div>
    </div>
  )
}

export default SignUp