import { useEffect, useState } from 'react'
import {Navigate, Route, Routes} from "react-router-dom"

import Navbar from './Components/Navbar'
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import {Toaster} from "react-hot-toast";
import {Loader} from "lucide-react";
import { useAuthStore } from './Store/useAuthStore';
import Dashboard from './Pages/Dashboard';
import OwnerRegistration from './Pages/OwnerRegister';

function App() {

  const {authUser, checkAuth, isCheckingAuth}=useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  // console.log(authUser);

  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader  className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <div className='h-screen bg-base-200'>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser?<Home />:<Navigate to="/login" /> } />
        <Route path='/signup' element={!authUser? <SignUp/>: <Navigate to="/" />} />
        <Route path='/login' element={!authUser? <Login />: <Navigate to="/"/>} />
        <Route path='/owner-register' element={authUser? <OwnerRegistration /> : <Navigate to="/"/>} />
        <Route path='/dashboard/*' element={authUser? <Dashboard />: <Navigate to="/"/>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
