import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../Store/useAuthStore';

function Home() {
  const navigate=useNavigate();
  const { authUser } = useAuthStore(); 
  return (
    <div className='pt-20 flex justify-center gap-4 items-center'>
      {console.log(authUser)}
      {authUser && !authUser.role.includes("Owner") && (
        <button
          className="btn bg-slate-100"
          onClick={() => navigate("/owner-register")}
        >
          Register As Driver
        </button>
      )}
      {authUser && authUser.role.includes("Admin") && (
        <button
          className="btn bg-slate-100"
          onClick={() => navigate("/dashboard")}
        >
          Admin Panel
        </button>
      )}
    </div>
  )
}

export default Home