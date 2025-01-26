
import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainPage from './Dashboard/MainPage'
import RidesPage from './Dashboard/RidesPage'
import MonitoringPage from './Dashboard/MonitoringPage'
import EmergencyPage from './Dashboard/EmergencyPage'
import { useAuthStore } from '../Store/useAuthStore';
import UsersPage from './Dashboard/UsersPage'

function Dashboard() {
    const {authUser, checkAuth, isCheckingAuth}=useAuthStore();
      useEffect(()=>{
        checkAuth();
      },[checkAuth]);
  return (
    <div className='pt-[65px] h-full flex'>
        <Sidebar />
        <Routes>
            <Route path="/" element={authUser?<MainPage />:<Navigate to="/" /> } />
            <Route path='rides' element={authUser? <RidesPage />: <Navigate to="/" />} />
            <Route path='monitor' element={authUser? <MonitoringPage />: <Navigate to="/"/>} />
            {/* <Route path='emergency' element={authUser? <EmergencyPage />: <Navigate to="/"/>} /> */}
            <Route path='users' element={authUser? <UsersPage />: <Navigate to="/"/>} />
      </Routes>
    </div>
  )
}

export default Dashboard