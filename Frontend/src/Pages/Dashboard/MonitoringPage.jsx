import React, { useState } from 'react'
import RideColumn from '../../Components/RideColumn2'
import { UnsafeRides } from '../../../../DashboardData'
import RideMonitor from '../../Components/RideMonitor'

function MonitoringPage() {
  const [rideSelected,setRideSelected] =useState(null)
  return (
    <div className='w-[90%] h-full flex flex-col p-8'>
      <div className='head'>
        <h1 className='font-bold text-2xl'>Monitoring Page</h1>
        <p className='font-semibold text-base'>6:30</p> {/* Current Time */}
      </div>

      <div id="Ride" className='mt-8 mb-8'>
        {!rideSelected ? <p>No Ride Selected</p> : <RideMonitor data={UnsafeRides[0]} />}
      </div>

      <div className='w-[95%] bordered p-4'>
        <table className="table table-md  w-full gap-4">
          {/* Head */}
          <thead>
            <tr className='text-white text-base' >
              <th className='flex justify-center'>Ride Id</th>
              <th >Car Owner</th>
              <th >Riders</th>
              <th >Progress</th>
              <th className='flex justify-center'>Monitor</th>
            </tr>
          </thead>
          <tbody>
            {UnsafeRides.map((data, index) => (
              <RideColumn key={index} data={data} selected={rideSelected} setSelected={setRideSelected} />
            ))}
          </tbody>
          
        </table>
      </div>

      
    </div>
  )
}

export default MonitoringPage