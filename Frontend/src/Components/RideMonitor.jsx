import React from 'react'
import UserBar from './UserBar'
import { passengers } from '../../../DashboardData'

function RideMonitor({data}) {
  return (
    <div>
        <div className='mb-4'>
            <progress className='progress progress-primary w-full h-3' value={data.progress} max='100'></progress>
        </div>
        <div className="left w-[45%] flex flex-col gap-4">
            <UserBar data={data} />
            <div className='flex flex-col justify-between  mt-4 '>
                <div className='flex items-center gap-3'>
                    <div className='text-sm'>Completed</div>
                    <div className='font-bold'>{data.progress}%</div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='text-md'>Distance Remaining</div>
                    <div className='font-bold'>{data.distanceRemaining} m</div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='text-md'>Duration</div>
                    <div className='font-bold'>{data.duration} hr</div>
                </div>
            </div>
            <p className='font-medium text-lg underline'>Passengers</p>
            {passengers.map((passenger, index)=>(
                <UserBar key={index} data={passenger} />
            ))}

        </div>
       
    </div>
  )
}

export default RideMonitor