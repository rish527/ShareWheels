import React from 'react'
import { mainData, rideData } from '../../../../DashboardData'
import DataHolder from '../../Components/DataHolder'

function MainPage() {
  return (
    <div className='p-10  h-full flex flex-col gap-4'>
      <h1 className='font-bold text-2xl'>Admin Dashboard</h1>
      <div id="dataHolder " className='flex flex-col gap-8' >
        <div id="mainDataHolder" className='flex flex-wrap gap-4 '>
          {mainData.map((data, index) => (
            <DataHolder key={index} data={data} />
          ))}
        </div>
        <div id="mainDataHolder" className='flex flex-wrap  gap-4'>
          {rideData.map((data, index) => (
            <DataHolder key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainPage