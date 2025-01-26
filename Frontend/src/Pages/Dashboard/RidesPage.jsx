import React from 'react'
import { ridesData } from '../../../../DashboardData'
import RideColumn from '../../Components/RideColumn'

function RidesPage() {
  return (
    <div className='w-[90%] h-full flex flex-col items-center '>
      <div className='w-[95%] bordered p-4'>
        <table className="table table-md  w-full gap-4">
          {/* Head */}
          <thead>
            <tr className='text-white text-base' >
              <th className='flex justify-center'>Ride Id</th>
              <th >Car Owner</th>
              <th >Riders</th>
              <th >Progress</th>
              <th className='flex justify-center'>Safety Status</th>
            </tr>
          </thead>
          <tbody>
            {ridesData.map((data, index) => (
              <RideColumn key={index} data={data} />
            ))}
          </tbody>
          
        </table>
      </div>
    </div>
  )
}

export default RidesPage